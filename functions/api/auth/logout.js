import { clearSessionCookie, getCookie, assertSameOrigin } from "../../_shared/auth.js";
import { json, requireDb } from "../../_shared/http.js";
async function hash(value) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map(v => v.toString(16).padStart(2, "0")).join("");
}
export async function onRequestPost({ request, env }) {
  try {
    const db = requireDb(env);
    if (!assertSameOrigin(request)) return json({ error: "invalid_origin" }, 403);
    const token = getCookie(request, "hwpc_session");
    if (token && /^[a-f0-9]{64}$/.test(token)) {
      await db.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").bind(await hash(token)).run();
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "set-cookie": clearSessionCookie() }
    });
  } catch {
    return json({ error: "auth_unavailable" }, 503);
  }
}
