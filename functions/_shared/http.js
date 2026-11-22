export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "same-origin"
    }
  });
}

export function methodNotAllowed(allowed) {
  return json({ error: "method_not_allowed", allowed }, 405);
}

export function requireDb(env) {
  if (!env?.DB) throw new Error("D1 binding DB is not configured");
  return env.DB;
}
