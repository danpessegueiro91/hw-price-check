import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

async function consumeQuota(req: Request) {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("authentication_required");
  const encoded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const claims = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")));
  const userId = String(claims.sub || "");
  if (!userId) throw new Error("authentication_required");
  const isAnonymous = claims.is_anonymous === true || claims.is_anonymous === "true";
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("supabase_server_env_missing");
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await admin.rpc("consume_hw_usage", {
    p_user_id: userId, p_is_anonymous: isAnonymous
  });
  if (error) throw new Error("quota_check_failed: " + error.message);
  return data;
}

const BASE = "https://api.soldgraph.com";
const KEY = () => Deno.env.get("SOLDGRAPH_API_KEY") || Deno.env.get("SOLDGRAPH_KEY") || "";

async function soldgraph(path: string, params: Record<string, string>) {
  const url = new URL(BASE + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const headers = { Authorization: "Bearer " + KEY() };
  let response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  let data = await response.json();
  if (!response.ok) throw new Error("Soldgraph " + response.status + ": " + JSON.stringify(data).slice(0, 400));
  for (let attempt = 0; response.status === 202 && data?.poll_url && attempt < 3; attempt++) {
    const poll = new URL(String(data.poll_url), BASE);
    poll.searchParams.set("wait", "20");
    response = await fetch(poll, { headers, signal: AbortSignal.timeout(25000) });
    data = await response.json();
    if (!response.ok) throw new Error("Soldgraph poll " + response.status);
  }
  return { status: data?.status || (response.status === 200 ? "complete" : "pending"), result: data?.result || null, error: data?.error || null, credits: Number(data?.credits || 0) };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!KEY()) return json({ error: "missing_secret", message: "Adiciona SOLDGRAPH_API_KEY aos Secrets do Supabase." }, 503);
  try {
    const body = await req.json();
    const query = String(body.query || "").trim().slice(0, 180);
    if (!query) return json({ error: "missing_query", message: "Indica o modelo Hot Wheels a pesquisar." }, 400);
    const quota = await consumeQuota(req);
    if (!quota?.allowed) return json({
      error: "quota_exceeded", quota,
      message: "Atingiste o limite de pesquisas disponível para a tua conta."
    }, 402);

    // Initial coverage prioritises marketplaces useful to Portugal/Europe.
    // Asking prices and completed sales are kept in separate collections.
    const jobs = await Promise.allSettled([
      soldgraph("/vinted/listings", { q: query, country: "pt", page: "1" }),
      soldgraph("/ebay/listings", { q: query, country: "uk", page: "1" }),
      soldgraph("/depop/listings", { q: query, country: "uk", page: "1" }),
      soldgraph("/ebay/sold", { q: query, country: "uk", page: "1", count: "40" })
    ]);
    const sources = ["Vinted PT", "eBay UK", "Depop UK", "eBay UK · vendas"];
    const active: unknown[] = [];
    const sold: unknown[] = [];
    const errors: string[] = [];
    let pending = false;
    let credits = 0;
    jobs.forEach((job, index) => {
      if (job.status === "rejected") { errors.push(sources[index] + ": " + String(job.reason).slice(0, 180)); return; }
      const value = job.value;
      credits += value.credits;
      if (value.status !== "complete") { pending = true; return; }
      const rows = Array.isArray(value.result?.data) ? value.result.data : [];
      const tagged = rows.map((row: Record<string, unknown>) => ({ ...row, source: sources[index] }));
      if (index === 3) sold.push(...tagged); else active.push(...tagged);
    });
    const unique = (rows: any[]) => {
      const seen = new Set<string>();
      return rows.filter(row => {
        const key = String(row.id || row.link || row.url || row.title || "");
        if (!key || seen.has(key)) return false;
        seen.add(key); return true;
      });
    };
    return json({
      provider: "Soldgraph",
      query,
      status: pending ? "partial" : "complete",
      active: unique(active),
      sold: unique(sold),
      sources: { active: ["Vinted PT", "eBay UK", "Depop UK"], sold: ["eBay UK"] },
      credits: { charged: credits },
      errors,
      quota
    });
  } catch (error) {
    const message = String(error);
    if (message.includes("authentication_required")) return json({ error: "authentication_required" }, 401);
    return json({ error: "marketplace_search_failed", message }, 502);
  }
});
