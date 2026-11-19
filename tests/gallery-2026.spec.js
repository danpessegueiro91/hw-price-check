const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('2026 photo pilot manifest contains only 2026 TH/STH records and at least one real image', async () => {
  const manifestPath = path.join(__dirname, '../assets/data/hotwheels-images.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  expect(manifest.scope).toEqual({ year: 2026, types: ['th', 'sth'] });
  expect(manifest.catalogModels).toBe(30);
  expect(manifest.matchedImages).toBeGreaterThan(0);
  expect(Object.keys(manifest.images)).toHaveLength(manifest.matchedImages);
  for (const [key, record] of Object.entries(manifest.images)) {
    expect(key).toMatch(/^2026\|(th|sth)\|.+$/);
    expect(record.verified).toBe(true);
    expect(record.image.startsWith('https://')).toBe(true);
    expect(record.source).toContain('hwtreasure.com');
  }
  expect(manifest.pending.length + manifest.matchedImages).toBe(30);
});

test('2026 catalog cards load real photos and open the enlarged photo viewer', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  await expect(page.locator('#catalogPage')).toBeVisible();
  await expect(page.locator('.catalog-card')).toHaveCount(30);
  await page.waitForFunction(() => window.HWPC_IMAGES_READY === true);
  await page.locator('#catalogYear').selectOption('2025');
  await page.locator('#catalogYear').selectOption('2026');
  console.log("HWPC_IMAGE_DEBUG", await page.evaluate(() => window.HWPC_IMAGE_DEBUG));

  const cardWithPhoto = page.locator('.catalog-card').filter({ has: page.locator('.catalog-thumb img') }).first();
  await expect(cardWithPhoto).toBeVisible();
  const photo = cardWithPhoto.locator('.catalog-thumb img');
  await expect(photo).toBeVisible();
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate(img => img.complete && img.naturalWidth > 0), { timeout: 20000 }).toBe(true);

  await cardWithPhoto.locator('.catalog-thumb').click();
  await expect(page.locator('#catalogDetail')).toBeVisible();
  const detailPhoto = page.locator('#catalogDetailImage img');
  await expect(detailPhoto).toBeVisible();
  await detailPhoto.click();
  const viewer = page.locator('.catalog-photo-lightbox');
  await expect(viewer).toBeVisible();
  await viewer.locator('img').click();
  await expect(viewer.locator('img')).toHaveClass(/zoomed/);
  await page.keyboard.press('Escape');
  await expect(viewer).toBeHidden();
});
