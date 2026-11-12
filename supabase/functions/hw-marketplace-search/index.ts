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

const API_ORIGIN = "https://api.soldgraph.com";
const API_BASE = API_ORIGIN + "/v1";
const KEY = () => Deno.env.get("SOLDGRAPH_API_KEY") || Deno.env.get("SOLDGRAPH_KEY") || "";

async function soldgraph(path: string, params: Record<string, string>) {
  const url = new URL(API_BASE + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const headers = { Authorization: "Bearer " + KEY() };
  let response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  let data = await response.json();
  if (!response.ok) throw new Error("Soldgraph " + response.status + ": " + JSON.stringify(data).slice(0, 400));
  const pollPath = data?.poll_url;
  for (let attempt = 0; data?.status === "pending" && pollPath && attempt < 4; attempt++) {
    const poll = new URL(String(pollPath), API_ORIGIN);
    poll.searchParams.set("wait", "20");
    response = await fetch(poll, { headers, signal: AbortSignal.timeout(25000) });
    data = await response.json();
    if (!response.ok) throw new Error("Soldgraph poll " + response.status);
  }
  return { status: data?.status || (response.status === 200 ? "complete" : "pending"), result: data?.result || null, error: data?.error || null, credits: Number(data?.credits || 0) };
}

async function soldgraphSoldHistory(query: string) {
  const rows: Record<string, unknown>[] = [];
  let page = 1;
  let credits = 0;
  let status = "complete";
  // eBay exposes paginated sold results. Fetch up to five pages (1,000 sales)
  // so quieter searches can reach further back than the first page.
  for (let attempt = 0; attempt < 5; attempt++) {
    const value = await soldgraph("/ebay/sold", {
      q: query, country: "uk", page: String(page), count: "200", sort: "recently_sold"
    });
    credits += value.credits;
    if (value.status !== "complete" || !value.result) {
      status = value.status || "pending";
      break;
    }
    const pageRows = Array.isArray(value.result.data) ? value.result.data : [];
    rows.push(...pageRows);
    const nextPage = Number(value.result.next_page);
    if (!Number.isFinite(nextPage) || nextPage <= page || pageRows.length === 0) break;
    page = nextPage;
  }
  return { status, result: { data: rows }, error: null, credits };
}


function modelKey(value: string) {
  return value.normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim().replace(/\\s+/g, " ").slice(0, 180);
}
function saleAmount(row: Record<string, any>): number | null {
  const candidates = [row.sold_price?.value, row.displayed_price?.amount, row.price?.amount,
    row.sold_price, row.displayed_price, row.price, row.price_value];
  for (const value of candidates) {
    const n = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^0-9.,-]/g, "").replace(",", "."));
    if (Number.isFinite(n) && n > 0) return Math.round(n * 100) / 100;
  }
  return null;
}
function quantile(values: number[], q: number) {
  const sorted = [...values].sort((a,b)=>a-b);
  if (!sorted.length) return null;
  const pos = (sorted.length - 1) * q, base = Math.floor(pos), rest = pos - base;
  return Math.round((sorted[base] + (sorted[Math.min(base+1, sorted.length-1)] - sorted[base]) * rest) * 100) / 100;
}
async function savePriceSnapshot(admin: ReturnType<typeof createClient>, query: string, variant: string, sold: Record<string, any>[]) {
  const prices = sold.map(saleAmount).filter((v): v is number => v !== null);
  if (!prices.length) return null;
  const currency = String(sold.find(x => x.sold_price?.currency || x.displayed_price?.currency || x.currency)?.sold_price?.currency
    || sold.find(x => x.displayed_price?.currency || x.currency)?.displayed_price?.currency
    || sold.find(x => x.currency)?.currency || "GBP").toUpperCase();
  const capturedAt = new Date().toISOString();
  const key = modelKey(query + (variant ? " " + variant : ""));
  if (!key) return null;
  const sample = sold.map(x => String(x.id || x.item_id || x.link || x.url || x.title || "")).filter(Boolean).sort().join("|");
  const sampleHash = capturedAt + ":" + sample.slice(0, 1500);
  const row = {
    model_key: key, model_name: query.slice(0,180), variant_key: variant.slice(0,180),
    captured_at: capturedAt, currency, median_price: quantile(prices,0.5),
    p25_price: quantile(prices,0.25), p75_price: quantile(prices,0.75),
    min_price: Math.min(...prices), max_price: Math.max(...prices),
    sales_count: prices.length, source: "Soldgraph eBay UK", query_text: query.slice(0,180), sample_hash: sampleHash
  };
  const { data, error } = await admin.from("hw_model_price_history").insert(row).select("id").single();
  if (error) throw new Error("price_history_save_failed: " + error.message);
  return data;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!KEY()) return json({ error: "missing_secret", message: "Adiciona SOLDGRAPH_API_KEY aos Secrets do Supabase." }, 503);
  try {
    const body = await req.json();
    const query = String(body.query || "").trim().slice(0, 180);
    const variant = String(body.variant || "").trim().slice(0, 180);
    if (body.action === "history") {
      if (!query) return json({ error: "missing_query", message: "Indica o modelo a consultar." }, 400);
      const token = (req.headers.get("Authorization") || "").replace(/^Bearer\\s+/i, "");
      const parts = token.split(".");
      if (parts.length !== 3) return json({ error: "authentication_required" }, 401);
      const encoded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const claims = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")));
      if (!claims.sub) return json({ error: "authentication_required" }, 401);
      const url = Deno.env.get("SUPABASE_URL"), serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!url || !serviceKey) throw new Error("supabase_server_env_missing");
      const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const key = modelKey(query + (variant ? " " + variant : ""));
      const { data, error } = await admin.from("hw_model_price_history").select("captured_at,currency,median_price,p25_price,p75_price,min_price,max_price,sales_count,source,model_name,variant_key").eq("model_key", key).order("captured_at", { ascending: true }).limit(500);
      if (error) throw new Error("price_history_read_failed: " + error.message);
      return json({ history: data || [], model_key: key });
    }
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
      soldgraphSoldHistory(query)
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
    let historySaved = false;
    if (sold.length) {
      try {
        const url = Deno.env.get("SUPABASE_URL"), serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        if (!url || !serviceKey) throw new Error("supabase_server_env_missing");
        const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
        historySaved = Boolean(await savePriceSnapshot(admin, query, variant, sold));
      } catch (historyError) { errors.push("Histórico: " + String(historyError).slice(0,180)); }
    }
    return json({
      provider: "Soldgraph",
      query,
      status: pending ? "partial" : "complete",
      active: unique(active),
      sold: unique(sold),
      history_saved: historySaved,
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
