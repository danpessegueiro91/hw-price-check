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

test('all eight languages update the document locale, labels and form hints', async ({ page }) => {
  await page.goto('/');
  const languages = [
    { code: 'pt', locale: 'pt-PT', placeholder: 'Pesquisa um modelo Hot Wheels...' },
    { code: 'en', locale: 'en', placeholder: 'Search for a Hot Wheels model...' },
    { code: 'es', locale: 'es', placeholder: 'Busca un modelo Hot Wheels...' },
    { code: 'fr', locale: 'fr', placeholder: 'Rechercher un modèle Hot Wheels...' },
    { code: 'de', locale: 'de', placeholder: 'Nach einem Hot-Wheels-Modell suchen...' },
    { code: 'it', locale: 'it', placeholder: 'Cerca un modello Hot Wheels...' },
    { code: 'nl', locale: 'nl', placeholder: 'Zoek een Hot Wheels-model...' },
    { code: 'br', locale: 'pt-BR', placeholder: 'Pesquise um modelo Hot Wheels...' },
  ];

  for (const language of languages) {
    await page.locator('#language').selectOption(language.code);
    await expect(page.locator('html')).toHaveAttribute('lang', language.locale);
    await expect(page.locator('#heroSearch')).toHaveAttribute('placeholder', language.placeholder);
    await expect(page.locator('#heroSearch')).toHaveAttribute(
      'aria-label',
      language.code === 'pt' ? 'Pesquisar modelo' : 'Search model'
    );
    await expect(page.locator('#heroCamera')).toHaveAttribute(
      'title',
      language.code === 'pt' ? 'Pesquisar por fotografia' : 'Search by photo'
    );
    if (language.code !== 'pt') {
      await expect(page.locator('#headline')).not.toContainText('Descobre o valor das tuas');
    }
  }
});

test('account dialog can be opened and closed', async ({ page }) => {
  // Isolate this UI test from Supabase/network availability: an unavailable auth SDK
  // leaves the app in its signed-out state, which is the state this dialog serves.
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', route => route.abort());
  await page.goto('/');
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
