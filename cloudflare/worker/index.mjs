const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "access-control-allow-headers": "authorization, content-type, x-requested-with",
};

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: JSON_HEADERS });
    }

    if (url.pathname === "/health" || url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "hw-price-check",
        migration: "in-progress",
        database: "not-configured",
      });
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return json({
        ok: false,
        error: "api_not_migrated",
        message: "A API de produção continua no serviço actual até a migração e os testes estarem concluídos.",
      }, 503);
    }

    return json({ ok: false, error: "not_found" }, 404);
  },
};
