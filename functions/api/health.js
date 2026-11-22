import { json, requireDb } from "../_shared/http.js";

export async function onRequestGet({ env }) {
  try {
    const db = requireDb(env);
    const row = await db.prepare("SELECT 1 AS ok").first();
    if (row?.ok !== 1) return json({ status: "degraded", database: false }, 503);
    return json({ status: "ok", service: "hw-price-check-api", database: true });
  } catch {
    return json({ status: "not_configured", service: "hw-price-check-api", database: false }, 503);
  }
}
