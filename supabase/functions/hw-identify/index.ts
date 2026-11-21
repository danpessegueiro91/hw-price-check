import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

async function consumeQuota(req: Request) {
  const authorization = req.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("authentication_required");

  // The Edge Function gateway validates this JWT (verify_jwt=true) before this code runs.
  const encoded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const claims = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")));
  const userId = String(claims.sub || "");
  if (!userId) throw new Error("authentication_required");
  const isAnonymous = claims.is_anonymous === true || claims.is_anonymous === "true";

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) throw new Error("supabase_server_env_missing");

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data, error } = await admin.rpc("consume_hw_usage", {
    p_user_id: userId,
    p_is_anonymous: isAnonymous
  });
  if (error) throw new Error("quota_check_failed: " + error.message);
  return data as { allowed: boolean; reason?: string; tier: string; used: number; limit: number; remaining: number };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) return json({ error: "missing_secret", message: "Configura GEMINI_API_KEY nos secrets do Supabase." }, 503);

  try {
    const body = await req.json();
    const images = Array.isArray(body.images) ? body.images.slice(0, 3) : [];
    const parts: any[] = [{
      text: "You are a careful Hot Wheels identification specialist. A SINGLE clear photo is enough to attempt identification; inspect whatever packaging/car view is supplied and identify the most likely visible model from that photo. Never require front, back, or detail photos before attempting model identification. Never infer Treasure Hunt or Super Treasure Hunt without visible, specific evidence; if TH/STH cannot be verified from this single view, keep th_sth_status inconclusive and list optional useful views in missing_photos. Return ONLY valid JSON with keys: model, year, series, number, reference_code, variant, classification (mainline|th|sth|premium|unknown), th_sth_status (confirmed|probable|inconclusive|not_applicable), visible_evidence (array), missing_photos (array), confidence (0-100), notes. Distinguish model identification from TH/STH confirmation. Do not invent details; describe uncertainty while still attempting to identify the model."
    }];

    for (const img of images) {
      if (typeof img.data !== "string" || !img.data.startsWith("data:image/")) continue;
      const [meta, b64] = img.data.split(",", 2);
      const mime = meta.startsWith("data:") ? meta.slice(5, meta.indexOf(";")) : "";
      if (mime.startsWith("image/") && b64) parts.push({ inline_data: { mime_type: mime, data: b64 } });
    }

    if (parts.length === 1) return json({ error: "no_images", message: "Escolhe pelo menos uma fotografia." }, 400);

    const quota = await consumeQuota(req);
    if (!quota.allowed) {
      return json({
        error: "quota_exceeded",
        reason: quota.reason,
        quota,
        message: quota.reason === "guest_limit"
          ? "Já utilizaste as 3 pesquisas gratuitas. Cria uma conta ou inicia sessão para continuar."
          : quota.tier === "premium"
            ? "Atingiste o limite diário definido para este plano Premium."
            : "Já utilizaste as 10 pesquisas gratuitas de hoje. Volta amanhã ou consulta as opções Premium quando estiverem disponíveis."
      }, 402);
    }

    const requestBody = {
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
    };

    // Tenta o modelo principal e, em caso de sobrecarga temporária, muda automaticamente
    // para outro modelo multimodal estável, sem consumir novamente a quota do utilizador.
    const models = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
    let response: Response | null = null;
    let data: any = null;
    let selectedModel = models[0];
    let lastProviderMessage = "";

    for (const model of models) {
      selectedModel = model;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + encodeURIComponent(key),
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestBody),
              signal: AbortSignal.timeout(30000)
            }
          );
          data = await response.json();
        } catch (error) {
          lastProviderMessage = String(error);
          response = null;
          if (attempt === 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
          }
          break;
        }

        if (response.ok) break;
        lastProviderMessage = data?.error?.message || data?.message || "O fornecedor não devolveu uma mensagem de erro.";
        const temporary = [429, 500, 502, 503, 504].includes(response.status);
        if (!temporary) break;
        if (attempt === 0) {
          await new Promise(resolve => setTimeout(resolve, 700));
          continue;
        }
        break;
      }

      if (response?.ok) break;
      const temporaryFailure = !response || [429, 500, 502, 503, 504].includes(response.status);
      if (!temporaryFailure) break;
    }

    if (!response?.ok) {
      const status = response?.status || 503;
      console.error("Gemini models unavailable", { status, model: selectedModel, message: lastProviderMessage });
      return json({
        error: "gemini_temporarily_unavailable",
        message: "O serviço de identificação está com muita procura neste momento. Tenta novamente dentro de alguns instantes.",
        provider_status: status,
        quota
      }, 503);
    }
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map((p: any) => p.text || "").join("") || "";
    if (!text) {
      console.error("Gemini returned no text", { model: "gemini-3.5-flash-lite", finishReason: candidate?.finishReason || "unknown" });
      return json({ error: "empty_model_response", message: "O Gemini não devolveu texto. Tenta fotografias mais nítidas e próximas.", model: selectedModel, quota }, 502);
    }
    let parsed;
    try { parsed = JSON.parse(text); }
    catch { parsed = { raw: text, th_sth_status: "inconclusive" }; }

    return json({ analysis: parsed, model: selectedModel, quota });
  } catch (e) {
    const message = String(e);
    if (message.includes("authentication_required")) return json({ error: "authentication_required", message: "Não foi possível iniciar a sessão gratuita. Ativa os acessos anónimos no Supabase Auth." }, 401);
    return json({ error: "request_failed", message }, 500);
  }
});