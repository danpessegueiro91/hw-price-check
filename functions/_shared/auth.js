import { json, requireDb } from "./http.js";

const SESSION_SECONDS = 60 * 60 * 24 * 30;
const ITERATIONS = 310000;

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map(value => value.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(value) {
  return new Uint8Array((value.match(/.{1,2}/g) || []).map(part => Number.parseInt(part, 16)));
}
async function sha256(value) {
  return bytesToHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}
async function derivePassword(password, saltHex, iterations = ITERATIONS) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: hexToBytes(saltHex), iterations }, key, 256);
  return bytesToHex(bits);
}
function randomHex(length = 32) {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(length)));
}
export function assertSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin || origin !== new URL(request.url).origin) return false;
  return true;
}
export async function rateLimited(db, request, email) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const bucket = await sha256(ip + "|" + email.toLowerCase());
  const now = Math.floor(Date.now() / 1000);
  const row = await db.prepare("SELECT attempts, window_started_at, blocked_until FROM auth_rate_limits WHERE bucket = ?").bind(bucket).first();
  if (row?.blocked_until && row.blocked_until > now) return true;
  if (!row || now - row.window_started_at >= 900) {
    await db.prepare("INSERT INTO auth_rate_limits (bucket, attempts, window_started_at, blocked_until) VALUES (?, 1, ?, NULL) ON CONFLICT(bucket) DO UPDATE SET attempts = 1, window_started_at = excluded.window_started_at, blocked_until = NULL").bind(bucket, now).run();
    return false;
  }
  const attempts = Number(row.attempts || 0) + 1;
  const blocked = attempts >= 8 ? now + 900 : null;
  await db.prepare("UPDATE auth_rate_limits SET attempts = ?, blocked_until = ? WHERE bucket = ?").bind(attempts, blocked, bucket).run();
  return Boolean(blocked);
}
export async function createSession(db, userId) {
  const token = randomHex(32);
  const tokenHash = await sha256(token);
  const id = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  await db.prepare("INSERT INTO auth_sessions (id, user_id, token_hash, expires_at, last_seen_at) VALUES (?, ?, ?, ?, ?)").bind(id, userId, tokenHash, expires, new Date().toISOString()).run();
  return { token, expires };
}
export function sessionCookie(token, maxAge = SESSION_SECONDS) {
  return `hwpc_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
export function clearSessionCookie() {
  return "hwpc_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}
export function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const item = header.split(";").map(part => part.trim()).find(part => part.startsWith(name + "="));
  return item ? item.slice(name.length + 1) : null;
}
export async function currentUser(request, env) {
  const db = requireDb(env);
  const token = getCookie(request, "hwpc_session");
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const tokenHash = await sha256(token);
  const row = await db.prepare(`
    SELECT u.id, u.email, u.display_name, u.preferred_language, u.appearance,
           u.is_admin, u.email_verified_at, u.created_at
    FROM auth_sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?
  `).bind(tokenHash, new Date().toISOString()).first();
  if (!row) return null;
  await db.prepare("UPDATE auth_sessions SET last_seen_at = ? WHERE token_hash = ?").bind(new Date().toISOString(), tokenHash).run();
  return row;
}
export async function signup(request, env) {
  const db = requireDb(env);
  if (!assertSameOrigin(request)) return json({ error: "invalid_origin" }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const displayName = String(body.display_name || "").trim().slice(0, 60);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json({ error: "invalid_email" }, 400);
  if (password.length < 12 || password.length > 128) return json({ error: "password_policy", message: "A palavra-passe deve ter entre 12 e 128 caracteres." }, 400);
  if (await rateLimited(db, request, email)) return json({ error: "rate_limited" }, 429);
  const existing = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return json({ error: "account_exists" }, 409);
  const salt = randomHex(16);
  const passwordHash = await derivePassword(password, salt);
  const userId = crypto.randomUUID();
  await db.prepare("INSERT INTO users (id, email, password_hash, password_salt, password_iterations, display_name) VALUES (?, ?, ?, ?, ?, ?)").bind(userId, email, passwordHash, salt, ITERATIONS, displayName || null).run();
  await db.prepare("INSERT INTO hw_user_entitlements (user_id, tier, daily_limit) VALUES (?, 'free', 10)").bind(userId).run();
  const session = await createSession(db, userId);
  const user = { id: userId, email, display_name: displayName || null, preferred_language: "pt", appearance: "dark", is_admin: 0, email_verified_at: null };
  return new Response(JSON.stringify({ user }), { status: 201, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "set-cookie": sessionCookie(session.token) } });
}
export async function login(request, env) {
  const db = requireDb(env);
  if (!assertSameOrigin(request)) return json({ error: "invalid_origin" }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || password.length > 128) return json({ error: "invalid_credentials" }, 400);
  if (await rateLimited(db, request, email)) return json({ error: "rate_limited" }, 429);
  const user = await db.prepare("SELECT id, email, password_hash, password_salt, password_iterations, display_name, preferred_language, appearance, is_admin, email_verified_at FROM users WHERE email = ?").bind(email).first();
  if (!user?.password_hash || !user.password_salt) return json({ error: "invalid_credentials" }, 401);
  const candidate = await derivePassword(password, user.password_salt, Number(user.password_iterations || ITERATIONS));
  if (candidate !== user.password_hash) return json({ error: "invalid_credentials" }, 401);
  const session = await createSession(db, user.id);
  delete user.password_hash; delete user.password_salt; delete user.password_iterations;
  return new Response(JSON.stringify({ user }), { status: 200, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "set-cookie": sessionCookie(session.token) } });
}
