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

  const key = Deno.env.get("SOLDCOMPS_API_KEY");
  if (!key) return json({ error: "missing_secret", message: "Configura SOLDCOMPS_API_KEY nos secrets do Supabase." }, 503);

  try {
    const body = await req.json();
    const q = String(body.query || "").trim().slice(0, 160);
    if (!q) return json({ error: "missing_query" }, 400);

    const site = ["EBAY_US", "EBAY_GB", "EBAY_DE"].includes(body.site) ? body.site : "EBAY_GB";
    const limit = Math.min(50, Math.max(5, Number(body.limit) || 30));

    const supabaseUrl = Deno.env.get("SUPABASE_URL"), serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("supabase_server_env_missing");
    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const cacheKey = "soldcomps|" + site + "|" + q.toLowerCase().replace(/\\s+/g, " ").trim() + "|" + limit;
    const { data: cached } = await admin.from("hw_market_search_cache").select("payload,expires_at")
      .eq("cache_key", cacheKey).maybeSingle();
    if (cached?.payload && Date.parse(cached.expires_at) > Date.now()) {
      return json({ ...cached.payload, cached: true, cache_expires_at: cached.expires_at });
    }

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

    const url = new URL("https://www.soldcomps.io/v1/sold");
    url.searchParams.set("q", q);
    url.searchParams.set("site", site);
    url.searchParams.set("days", "90");
    url.searchParams.set("limit", String(limit));

    const upstream = await fetch(url, { headers: { Authorization: "Bearer " + key } });
    const data = await upstream.json();
    if (!upstream.ok) { console.error("SoldComps provider unavailable", { status: upstream.status, details: data }); return json({ error: "sold_data_provider_error", status: upstream.status, message: "A fonte de vendas concluídas está temporariamente indisponível. Tenta novamente mais tarde.", results: [], quota }); }

    const payload = {
      ...data,
      provider: "SoldComps",
      source: "eBay " + ({ EBAY_US: "US", EBAY_GB: "UK", EBAY_DE: "DE" } as Record<string,string>)[site],
      site,
      sale_type: "completed",
      window_days: 90,
      captured_at: new Date().toISOString(),
      status: "complete"
    };
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const { error: cacheError } = await admin.from("hw_market_search_cache").upsert({
      cache_key: cacheKey, payload, captured_at: payload.captured_at, expires_at: expiresAt
    }, { onConflict: "cache_key" });
    if (cacheError) console.warn("SoldComps cache write failed:", cacheError.message);
    return json({ ...payload, quota });
  } catch (e) {
    const message = String(e);
    if (message.includes("authentication_required")) return json({ error: "authentication_required", message: "Não foi possível iniciar a sessão gratuita. Ativa os acessos anónimos no Supabase Auth." }, 401);
    return json({ error: "request_failed", message }, 500);
  }
});