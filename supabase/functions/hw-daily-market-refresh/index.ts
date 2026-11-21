import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = { "Content-Type": "application/json" };
const API = "https://api.soldgraph.com/v1";
const MODELS = [
  { year: 2026, kind: "th", name: "'87 Buick Regal GNX" },
  { year: 2026, kind: "th", name: "'92 Dodge Viper RT/10" },
  { year: 2026, kind: "th", name: "2 Jet Z" },
  { year: 2026, kind: "th", name: "2016 Ford GT Race" },
  { year: 2026, kind: "th", name: "Amaru GTC" },
  { year: 2026, kind: "th", name: "Cone Shaker" },
  { year: 2026, kind: "th", name: "Electro Silhouette" },
  { year: 2026, kind: "th", name: "Fast Fish" },
  { year: 2026, kind: "th", name: "Ford Model A Custom '31" },
  { year: 2026, kind: "th", name: "Gazella GT" },
  { year: 2026, kind: "th", name: "Hot Wheengs" },
  { year: 2026, kind: "th", name: "Mad Manga" },
  { year: 2026, kind: "th", name: "Nissan Skyline HT 2000GT-X" },
  { year: 2026, kind: "th", name: "Sweet Driver" },
  { year: 2026, kind: "th", name: "Total Disposal" },
  { year: 2026, kind: "sth", name: "'23 Ram 1500" },
  { year: 2026, kind: "sth", name: "'64 Impala" },
  { year: 2026, kind: "sth", name: "'67 Pontiac Firebird 400" },
  { year: 2026, kind: "sth", name: "'70 Plymouth AAR 'Cuda" },
  { year: 2026, kind: "sth", name: "'87 Ford Sierra Cosworth" },
  { year: 2026, kind: "sth", name: "'94 Toyota Supra" },
  { year: 2026, kind: "sth", name: "Custom Otto" },
  { year: 2026, kind: "sth", name: "Drift-Ender" },
  { year: 2026, kind: "sth", name: "Ferrari F40 Competizione" },
  { year: 2026, kind: "sth", name: "Ford Mustang GTD" },
  { year: 2026, kind: "sth", name: "Honda Civic Custom" },
  { year: 2026, kind: "sth", name: "Lotus Sport Elise" },
  { year: 2026, kind: "sth", name: "Nissan Maxima Drift Car" },
  { year: 2026, kind: "sth", name: "Porsche 911 Carrera RS 2.7" },
  { year: 2026, kind: "sth", name: "Subaru Impreza" }
];

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: cors });

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function waitForBatch(batchId: string, key: string) {
  let result: any = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const url = new URL(API + "/batches/" + encodeURIComponent(batchId));
    url.searchParams.set("wait", "20");
    url.searchParams.set("include", "results");
    const response = await fetch(url, {
      headers: { Authorization: "Bearer " + key },
      signal: AbortSignal.timeout(25000)
    });
    result = await response.json();
    if (!response.ok) throw new Error("Soldgraph batch poll " + response.status + ": " + JSON.stringify(result).slice(0, 250));
    if (result.status !== "pending") return result;
  }
  return result;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const soldgraphKey = Deno.env.get("SOLDGRAPH_API_KEY") || Deno.env.get("SOLDGRAPH_KEY");
  if (!supabaseUrl || !serviceKey || !soldgraphKey) {
    console.error("Daily market refresh missing required server secrets");
    return json({ error: "server_configuration_missing" }, 503);
  }

  try {
    const suppliedToken = req.headers.get("x-hw-refresh-token") || "";
    if (suppliedToken.length < 32) return json({ error: "unauthorized" }, 401);

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    const { data: authRow, error: authError } = await admin
      .from("hw_market_refresh_auth").select("token_hash").eq("id", 1).maybeSingle();
    if (authError || !authRow?.token_hash || await sha256(suppliedToken) !== authRow.token_hash) {
      return json({ error: "unauthorized" }, 401);
    }

    const usageResponse = await fetch(API + "/usage", {
      headers: { Authorization: "Bearer " + soldgraphKey },
      signal: AbortSignal.timeout(15000)
    });
    const usage = await usageResponse.json();
    if (!usageResponse.ok) throw new Error("Soldgraph usage check failed: " + usageResponse.status);
    const remaining = usage.remaining == null ? null : Number(usage.remaining);
    if (remaining !== null && remaining < MODELS.length) {
      return json({
        status: "paused_quota",
        message: "Daily refresh paused to avoid unexpected charges; Soldgraph allowance is below 30 searches.",
        remaining_requests: remaining,
        required_requests: MODELS.length,
        updated: 0
      }, 402);
    }

    const fxResponse = await fetch("https://api.frankfurter.dev/v1/latest?base=GBP&symbols=EUR", {
      signal: AbortSignal.timeout(15000)
    });
    const fx = await fxResponse.json();
    const gbpToEur = Number(fx?.rates?.EUR);
    if (!fxResponse.ok || !Number.isFinite(gbpToEur) || gbpToEur <= 0) {
      throw new Error("Daily GBP/EUR reference rate unavailable; no prices were changed.");
    }

    const today = new Date().toISOString().slice(0, 10);
    let updated = 0;
    let insufficient = 0;
    let failed = 0;
    let charged = 0;
    const errors: string[] = [];

    // Free accounts can only hold ten searches pending at once. Use three sequential batches.
    for (let start = 0; start < MODELS.length; start += 10) {
      const group = MODELS.slice(start, start + 10);
      const searches = group.map((model) => ({
        q: "Hot Wheels " + model.name + " 2026 " +
          (model.kind === "sth" ? "Super Treasure Hunt STH" : "Treasure Hunt TH"),
        count: 120,
        sort: "recently_sold",
        condition: "new"
      }));
      const idempotencyKey = "hwpc-daily-" + today + "-batch-" + Math.floor(start / 10);
      const createResponse = await fetch(API + "/batches", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + soldgraphKey,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey
        },
        body: JSON.stringify({
          defaults: { endpoint: "ebay/sold", country: "uk", count: 120, sort: "recently_sold", condition: "new" },
          searches
        }),
        signal: AbortSignal.timeout(25000)
      });
      let batch = await createResponse.json();
      if (!createResponse.ok) {
        throw new Error("Soldgraph batch creation failed (" + createResponse.status + "): " + JSON.stringify(batch).slice(0, 300));
      }
      if (batch.batch_id) batch = await waitForBatch(String(batch.batch_id), soldgraphKey);
      else if (batch.status === "pending") throw new Error("Soldgraph returned a pending batch without batch_id.");
      if (batch.status !== "complete" || !Array.isArray(batch.items)) {
        throw new Error("Soldgraph batch did not complete: " + String(batch.status));
      }

      for (const item of batch.items) {
        const model = group[Number(item.index)];
        if (!model) continue;
        charged += Number(item.credits || 0);
        if (item.status !== "complete" || !item.summary) {
          failed++;
          errors.push(model.name + ": " + String(item.error?.code || item.status || "sem resultado"));
          continue;
        }
        const summary = item.summary;
        const resultRows = Array.isArray(item.result?.data) ? item.result.data : [];
        const normalize = (value: string) => value.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        const titleTokens = normalize(model.name).split(" ").filter((token) => token.length > 1);
        const matchingRows = resultRows.filter((sale: any) => {
          const title = normalize(String(sale.title || ""));
          const modelMatches = titleTokens.every((token) => title.includes(token));
          const variantMatches = model.kind === "sth"
            ? title.includes("super treasure hunt") || title.split(" ").includes("sth")
            : (title.includes("treasure hunt") && !title.includes("super treasure hunt")) || title.split(" ").includes("th");
          return modelMatches && variantMatches && sale.best_offer_accepted !== true;
        });
        const prices = matchingRows
          .map((sale: any) => Number(sale.displayed_price?.amount))
          .filter((price: number) => Number.isFinite(price) && price > 0)
          .sort((a: number, b: number) => a - b);
        const sampleCount = prices.length;
        if (sampleCount < 3) {
          insufficient++;
          continue;
        }
        const quantile = (q: number) => {
          const pos = (prices.length - 1) * q;
          const base = Math.floor(pos);
          const fraction = pos - base;
          return prices[base] + ((prices[Math.min(base + 1, prices.length - 1)] - prices[base]) * fraction);
        };
        const latestSale = matchingRows.map((sale: any) => String(sale.sold_date || ""))
          .filter((date: string) => /^\\d{4}-\\d{2}-\\d{2}$/.test(date)).sort().at(-1) || null;
        const eur = (value: number | null) => value !== null && Number.isFinite(value) && value > 0
          ? Math.round(value * gbpToEur * 100) / 100 : null;
        const query = searches[Number(item.index)].q;
        const row = {
          model_key: model.year + "|" + model.kind + "|" +
            normalize(model.name),
          model_name: model.name,
          variant_key: model.kind.toUpperCase(),
          model_year: model.year,
          model_kind: model.kind,
          captured_at: new Date().toISOString(),
          currency: "EUR",
          source_currency: String(summary.currency || "GBP").toUpperCase(),
          fx_rate_to_eur: gbpToEur,
          median_price: eur(quantile(0.5)),
          p25_price: eur(quantile(0.25)),
          p75_price: eur(quantile(0.75)),
          min_price: eur(prices[0]),
          max_price: eur(prices[prices.length - 1]),
          sales_count: sampleCount,
          latest_sold_date: latestSale,
          best_offer_accepted_count: Number(summary.best_offer_accepted_count || 0),
          source: "Soldgraph · eBay UK sold listings · blister novo · títulos confirmados",
          query_text: query,
          sample_hash: today + ":" + String(item.request_id || item.index)
        };
        const { error } = await admin.from("hw_model_price_history").insert(row);
        if (error) {
          failed++;
          errors.push(model.name + ": database write failed");
          console.error("Price snapshot insert failed", model.name, error.message);
        } else {
          updated++;
        }
      }
    }

    const report = {
      status: failed === 0 ? "complete" : "partial",
      date: today,
      source: "Soldgraph eBay UK sold listings",
      currency: "EUR",
      fx: { base: "GBP", quote: "EUR", rate: gbpToEur, date: fx.date },
      total_models: MODELS.length,
      updated,
      insufficient_sales: insufficient,
      failed,
      credits_charged: charged,
      errors
    };
    console.log("Daily market refresh", JSON.stringify(report));
    return json(report, failed ? 207 : 200);
  } catch (error) {
    console.error("Daily market refresh failed", String(error));
    return json({ error: "refresh_failed", message: String(error).slice(0, 300) }, 502);
  }
});
