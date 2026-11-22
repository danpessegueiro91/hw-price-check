import { json, methodNotAllowed, requireDb } from "../_shared/http.js";

export async function onRequest({ request, env }) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);
  try {
    const db = requireDb(env);
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const kind = url.searchParams.get("kind");
    const limit = Math.min(1000, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "1000", 10) || 1000));
    if (year && !/^\d{4}$/.test(year)) return json({ error: "invalid_year" }, 400);
    if (kind && !["th", "sth"].includes(kind)) return json({ error: "invalid_kind" }, 400);

    const clauses = [];
    const values = [];
    if (year) { clauses.push("model_year = ?"); values.push(Number(year)); }
    if (kind) { clauses.push("model_kind = ?"); values.push(kind); }
    const where = clauses.length ? "WHERE " + clauses.join(" AND ") : "";
    const query = `
      SELECT model_year, model_kind, model_name, captured_at, currency,
             median_price, sales_count, source, source_currency, fx_rate_to_eur,
             latest_sold_date, best_offer_accepted_count
      FROM (
        SELECT *, ROW_NUMBER() OVER (
          PARTITION BY model_year, model_kind, model_name
          ORDER BY captured_at DESC
        ) AS row_num
        FROM hw_model_price_history
        ${where}
      )
      WHERE row_num = 1
      ORDER BY model_year DESC, model_kind, model_name
      LIMIT ?
    `;
    const result = await db.prepare(query).bind(...values, limit).all();
    return json({ data: result.results || [] }, 200);
  } catch {
    return json({ error: "market_history_unavailable" }, 503);
  }
}
