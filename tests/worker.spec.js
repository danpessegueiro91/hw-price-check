const { test, expect } = require('@playwright/test');

test('Cloudflare Worker responds to health checks without touching production data', async () => {
  const { default: worker } = await import('../cloudflare/worker/index.mjs');
  const request = new Request('https://worker.example/health');
  const response = await worker.fetch(request, {});
  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toMatchObject({
    ok: true,
    service: 'hw-price-check',
    migration: 'in-progress',
    database: 'not-configured',
  });
});

test('Cloudflare Worker does not pretend unported APIs are ready', async () => {
  const { default: worker } = await import('../cloudflare/worker/index.mjs');
  const response = await worker.fetch(new Request('https://worker.example/api/account'));
  expect(response.status).toBe(503);
  await expect(response.json()).resolves.toMatchObject({
    ok: false,
    error: 'api_not_migrated',
  });
});

test('Cloudflare Worker handles CORS preflight', async () => {
  const { default: worker } = await import('../cloudflare/worker/index.mjs');
  const response = await worker.fetch(new Request('https://worker.example/api/health', {
    method: 'OPTIONS',
  }));
  expect(response.status).toBe(204);
  expect(response.headers.get('access-control-allow-methods')).toContain('POST');
});
