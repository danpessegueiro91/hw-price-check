const { test, expect } = require('@playwright/test');

test('homepage loads without uncaught JavaScript errors', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('/');
  await expect(page).toHaveTitle(/HW Price Check/i);
  await expect(page.locator('#homePage')).toBeVisible();
  await expect(page.locator('#headline')).toBeVisible();
  await expect(page.locator('#language')).toBeVisible();
  await expect(page.locator('#heroSearch')).toBeVisible();

  // Give deferred scripts and DOM observers time to initialize.
  await page.waitForTimeout(500);
  expect(pageErrors).toEqual([]);
});

test('main navigation opens analysis and collection views', async ({ page }) => {
  await page.goto('/');
  await page.locator('#heroAnalyse').click();
  await expect(page.locator('#appWorkspace')).toBeVisible();
  await expect(page.locator('#analyse')).toBeVisible();

  await page.locator('#tabCollection').click();
  await expect(page.locator('#collection')).toBeVisible();
  await expect(page.locator('#tabCollection')).toHaveClass(/active/);
});

test('language selector updates the document locale and translated headline', async ({ page }) => {
  await page.goto('/');
  await page.locator('#language').selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#headline')).not.toContainText('Descobre o valor das tuas');
});

test('account dialog can be opened and closed', async ({ page }) => {
  await page.goto('/');
  // Wait for Supabase anonymous-session initialization before testing the account action.
  await expect(page.locator('#account')).toContainText('Visitante');
  await page.locator('#account').click();
  await expect(page.locator('#authGate')).toBeVisible();
  await expect(page.locator('#authGate')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#authClose')).toBeVisible();
  await page.locator('#authClose').click();
  await expect(page.locator('#authGate')).toBeHidden();
  await expect(page.locator('#authGate')).toHaveAttribute('aria-hidden', 'true');
});

test('homepage remains within a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#homePage')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
});
