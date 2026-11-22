import { currentUser, assertSameOrigin } from "../../_shared/auth.js";
import { json, methodNotAllowed, requireDb } from "../../_shared/http.js";

export async function onRequest({ request, env }) {
  if (!["GET", "PUT"].includes(request.method)) return methodNotAllowed(["GET", "PUT"]);
  try {
    const db = requireDb(env);
    const user = await currentUser(request, env);
    if (!user) return json({ error: "unauthorized" }, 401);
    if (request.method === "GET") {
      const row = await db.prepare("SELECT payload, updated_at FROM user_data WHERE user_id = ?").bind(user.id).first();
      let payload = {};
      try { payload = row?.payload ? JSON.parse(row.payload) : {}; } catch { payload = {}; }
      return json({ data: payload, updated_at: row?.updated_at || null });
    }
    if (!assertSameOrigin(request)) return json({ error: "invalid_origin" }, 403);
    const length = Number(request.headers.get("Content-Length") || 0);
    if (length > 1_000_000) return json({ error: "payload_too_large" }, 413);
    let body;
    try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
    const payload = body?.data;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json({ error: "invalid_payload" }, 400);
    const serialized = JSON.stringify(payload);
    if (serialized.length > 1_000_000) return json({ error: "payload_too_large" }, 413);
    await db.prepare(`
      INSERT INTO user_data (user_id, payload, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
    `).bind(user.id, serialized, new Date().toISOString()).run();
    return json({ ok: true, updated_at: new Date().toISOString() });
  } catch {
    return json({ error: "user_data_unavailable" }, 503);
  }
}
