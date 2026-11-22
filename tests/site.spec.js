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

test('header logo returns to the homepage from a workspace view', async ({ page }) => {
  await page.goto('/');
  await page.locator('#heroAnalyse').click();
  await expect(page.locator('#appWorkspace')).toBeVisible();
  await page.locator('#top .brand-lockup').click();
  await expect(page.locator('#homePage')).toBeVisible();
  await expect(page.locator('#appWorkspace')).toBeHidden();
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
    { code: 'pt', locale: 'pt-PT', placeholder: 'Pesquisa um modelo Hot Wheels...', ariaLabel: 'Pesquisar modelo', cameraTitle: 'Pesquisar por fotografia' },
    { code: 'en', locale: 'en', placeholder: 'Search for a Hot Wheels model...', ariaLabel: 'Search model', cameraTitle: 'Search by photo' },
    { code: 'es', locale: 'es', placeholder: 'Busca un modelo Hot Wheels...', ariaLabel: 'Buscar modelo', cameraTitle: 'Buscar por foto' },
    { code: 'fr', locale: 'fr', placeholder: 'Rechercher un modèle Hot Wheels...', ariaLabel: 'Rechercher un modèle', cameraTitle: 'Rechercher par photo' },
    { code: 'de', locale: 'de', placeholder: 'Nach einem Hot-Wheels-Modell suchen...', ariaLabel: 'Modell suchen', cameraTitle: 'Nach Foto suchen' },
    { code: 'it', locale: 'it', placeholder: 'Cerca un modello Hot Wheels...', ariaLabel: 'Cerca modello', cameraTitle: 'Cerca per foto' },
    { code: 'nl', locale: 'nl', placeholder: 'Zoek een Hot Wheels-model...', ariaLabel: 'Zoek model', cameraTitle: 'Zoeken op foto' },
    { code: 'br', locale: 'pt-BR', placeholder: 'Pesquise um modelo Hot Wheels...', ariaLabel: 'Pesquisar modelo', cameraTitle: 'Pesquisar por foto' },
  ];

  for (const language of languages) {
    await page.locator('#language').selectOption(language.code);
    await expect(page.locator('html')).toHaveAttribute('lang', language.locale);
    await expect(page.locator('#heroSearch')).toHaveAttribute('placeholder', language.placeholder);
    await expect(page.locator('#heroSearch')).toHaveAttribute('aria-label', language.ariaLabel);
    await expect(page.locator('#heroCamera')).toHaveAttribute('title', language.cameraTitle);
    if (language.code !== 'pt') {
      await expect(page.locator('#headline')).not.toContainText('Descobre o valor das tuas');
    }
  }
});

test('account renderer defines localized words used by premium billing labels', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/app-core.js'), 'utf8');
  const renderer = source.match(/function renderAccount\(\)\s*\{([\s\S]*?)\n\}/);
  expect(renderer, 'renderAccount function should exist').not.toBeNull();
  expect(renderer[1]).toMatch(/const words\s*=\s*ACCOUNT_I18N\[lang\]\s*\|\|\s*ACCOUNT_I18N\.pt/);
  expect(renderer[1]).toContain('words.premiumActive');
  expect(renderer[1]).toContain('words.renewalCancelled');
  expect(renderer[1]).toContain('words.manage');
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

test('translation dictionary has no duplicate source keys', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/i18n.js'), 'utf8');
  const entries = source.split("\n").map(line => line.match(/^\s*"([^"]+)"\s*:\s*\[([^\]]*)\]/)).filter(Boolean);
  const keys = entries.map(entry => entry[1]);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  expect(duplicates).toEqual([]);
});

test('newsletter rejects invalid email addresses', async ({ page }) => {
  await page.goto('/');
  const email = page.locator('#newsletterEmail');
  await email.evaluate(input => { input.removeAttribute('required'); input.type = 'text'; });
  await email.fill('invalid');
  await page.locator('#newsletterForm').evaluate(form =>
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  );
  await expect(page.locator('#newsletterStatus')).toHaveText('Indica um endereço de email válido.');
});

test('catalog interface translates but Hot Wheels model names stay unchanged', async ({ page }) => {
  await page.goto('/');
  await page.locator('#language').selectOption('en');
  await page.locator('[data-page="guides"]').click();
  await expect(page.locator('#catalogPage')).toBeVisible();
  const modelName = await page.locator('.catalog-copy h3').first().textContent();
  await expect(page.locator('.catalog-copy h3').first()).toHaveAttribute('data-no-translate', 'true');
  await expect(page.locator('.catalog-view-detail').first()).toHaveText('View details');
  await page.locator('.catalog-view-detail').first().click();
  await expect(page.locator('#catalogDetailTitle')).toHaveText(modelName);
  await expect(page.locator('#catalogDetailTitle')).toHaveAttribute('data-no-translate', 'true');
});

test('catalog controls localize across all eight languages without changing model names', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  await expect(page.locator('#catalogPage')).toBeVisible();

  const languages = [
    { code: 'pt', detail: 'Ver ficha', photos: 'Arquivo HW Price Check', forgot: 'Esqueci-me da palavra-passe' },
    { code: 'en', detail: 'View details', photos: 'HW Price Check archive', forgot: 'Forgot Password' },
    { code: 'es', detail: 'Ver ficha', photos: 'Archivo HW Price Check', forgot: 'Olvidé mi contraseña' },
    { code: 'fr', detail: 'Voir la fiche', photos: 'Archives HW Price Check', forgot: 'Mot de passe oublié' },
    { code: 'de', detail: 'Details ansehen', photos: 'HW Price Check-Archiv', forgot: 'Passwort vergessen' },
    { code: 'it', detail: 'Vedi scheda', photos: 'Archivio HW Price Check', forgot: 'Password dimenticata' },
    { code: 'nl', detail: 'Bekijk details', photos: 'HW Price Check-archief', forgot: 'Wachtwoord vergeten' },
    { code: 'br', detail: 'Ver ficha', photos: 'Arquivo HW Price Check', forgot: 'Esqueci minha senha' },
  ];

  const firstCard = page.locator('.catalog-card').first();
  const modelName = await firstCard.locator('h3').textContent();

  for (const language of languages) {
    await page.locator('#language').selectOption(language.code);
    await expect(firstCard.locator('.catalog-view-detail')).toHaveText(language.detail);
    await expect(firstCard.locator('.catalog-local-source')).toContainText(language.photos);
    await expect(page.locator('#forgotPassword')).toHaveText(language.forgot);
    await expect(firstCard.locator('h3')).toHaveText(modelName);
    await expect(firstCard.locator('h3')).toHaveAttribute('data-no-translate', 'true');

    await firstCard.locator('.catalog-view-detail').click();
    await expect(page.locator('#catalogDetailTitle')).toHaveText(modelName);
    await expect(page.locator('#catalogDetailTitle')).toHaveAttribute('data-no-translate', 'true');
    await page.locator('#catalogDetailClose').evaluate(button => button.click());
  }
});

test('catalog dictionary source keys are unique and have eight locale values', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/i18n.js'), 'utf8');
  const entries = source.split("\n").map(line => line.match(/^\s*"([^"]+)"\s*:\s*\[([^\]]*)\]/)).filter(Boolean);
  const keys = entries.map(entry => entry[1]);
  expect(new Set(keys).size).toBe(keys.length);
  for (const entry of entries) {
    const values = [...entry[2].matchAll(/"(?:[^"\\\\]|\\\\.)*"/g)];
    expect(values, `Expected seven translations for ${entry[1]}`).toHaveLength(7);
  }
});

test('photo identification is the only valuation entry point', async ({ page }) => {
  await page.goto('/');
  await page.locator('#heroAnalyse').click();
  await expect(page.locator('#identify')).toBeVisible();
  await expect(page.locator('#soldSite')).toBeVisible();
  await expect(page.locator('#evaluate')).toHaveCount(0);
  await expect(page.locator('#soldSearch')).toHaveCount(0);
});


test('headline translation builds safe emphasis without interpreting HTML', async ({ page }) => {
  await page.goto('/');
  await page.locator('#language').selectOption('en');
  const headline = page.locator('#headline');
  await expect(headline.locator('em')).toHaveText('Hot Wheels');
  await expect(headline).toContainText('Discover the value of your Hot Wheels');
  const result = await headline.evaluate(el => ({ text: el.textContent, emphasis: el.querySelector('em')?.textContent }));
  expect(result).toEqual({ text: 'Discover the value of your Hot Wheels', emphasis: 'Hot Wheels' });
});

test('guest language and appearance preferences are not persisted in browser storage', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { localStorage.removeItem('hwpc_lang'); localStorage.removeItem('hwpc-language'); localStorage.removeItem('hwpc_theme'); });
  await page.locator('#language').selectOption('en');
  await page.locator('#themeToggle').click();
  const stored = await page.evaluate(() => ({ language: localStorage.getItem('hwpc_lang'), legacyLanguage: localStorage.getItem('hwpc-language'), theme: localStorage.getItem('hwpc_theme') }));
  expect(stored).toEqual({ language: null, legacyLanguage: null, theme: null });
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('body')).toHaveClass(/theme-light/);
});

test('visitor counter reuses the authenticated Supabase UUID without a separate browser identifier', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/app-core.js'), 'utf8');
  const match = source.match(/async function updateVisitorCounter\(\)\s*\{([\s\S]*?)\n\}/);
  expect(match, 'visitor counter function should exist').not.toBeNull();
  expect(match[1]).toContain('session?.user?.id');
  expect(match[1]).not.toMatch(/localStorage\.(getItem|setItem|removeItem)\s*\(/);
  expect(match[1]).not.toContain('crypto.randomUUID');
});

test('photo previews clear their label without interpreting HTML', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/app-core.js'), 'utf8');
  expect(source).toContain("l.textContent=''");
  expect(source).not.toContain("l.innerHTML=''");
});


test('catalog detail can close and reopen repeatedly without refreshing', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  const open = page.locator('.catalog-card').first().locator('.catalog-view-detail');
  for (let attempt = 0; attempt < 3; attempt++) {
    await open.click();
    await expect(page.locator('#catalogDetail')).toBeVisible();
    await page.locator('#catalogDetailClose').click();
    await expect(page.locator('#catalogDetail')).toBeHidden();
  }
});

test('photo viewer exposes working zoom controls', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.HWPCPhotoViewer.open(
    'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="320" height="240" fill="black"/></svg>'),
    'Test photo'
  ));
  const viewer = page.locator('.hwpc-photo-viewer');
  await expect(viewer).toBeVisible();
  await viewer.locator('[data-photo-zoom="in"]').click();
  await expect(viewer.locator('.hwpc-photo-zoom-label')).toHaveText('125%');
  await viewer.locator('[data-photo-zoom="reset"]').click();
  await expect(viewer.locator('.hwpc-photo-zoom-label')).toHaveText('100%');
  await viewer.locator('.hwpc-photo-close').click();
  await expect(viewer).toBeHidden();
});

test('catalog detail labels follow all selected languages', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  const languages = [
    ['en', 'Market estimate', 'Photo from the HW Price Check archive'],
    ['es', 'Estimación de mercado', 'Fotografía del archivo HW Price Check'],
    ['fr', 'Estimation du marché', 'Photo des archives HW Price Check'],
    ['de', 'Marktschätzung', 'Foto aus dem HW Price Check-Archiv'],
    ['it', 'Stima di mercato', 'Foto dall’archivio HW Price Check'],
    ['nl', 'Marktschatting', 'Foto uit het HW Price Check-archief'],
    ['br', 'Estimativa de mercado', 'Fotografia do arquivo HW Price Check'],
  ];
  for (const [code, estimate, source] of languages) {
    await page.locator('#language').selectOption(code);
    await page.locator('.catalog-view-detail').first().click();
    await expect(page.locator('.catalog-detail-value span')).toHaveText(estimate);
    await expect(page.locator('#catalogDetailSource')).toContainText(source);
    await page.locator('#catalogDetailClose').click();
  }
});


test('interface translations do not depend on an external translation service', async ({ page }) => {
  const externalTranslations = [];
  page.on('request', request => {
    if (request.url().includes('api.mymemory.translated.net')) externalTranslations.push(request.url());
  });
  await page.goto('/');
  await page.locator('#language').selectOption('en');
  await expect(page.locator('#headline')).toContainText('Discover the value');
  await expect.poll(() => externalTranslations.length).toBe(0);
});


test('2026 catalog uses local first-party photos, loads every image and preserves the Supra photo', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  await expect(page.locator('#catalogYear')).toHaveValue('2026');
  await expect(page.locator('.catalog-card')).toHaveCount(30);
  await expect(page.locator('.catalog-thumb img')).toHaveCount(30);

  const photos = await page.locator('.catalog-thumb img').evaluateAll(images =>
    images.map(image => image.getAttribute('src'))
  );
  expect(photos).toHaveLength(30);
  expect(photos.every(src =>
    src && /^\/assets\/catalog\/2026\/(?:th|sth)\/[^/]+\.jpg$/i.test(src)
  )).toBe(true);

  await page.locator('.catalog-thumb img').evaluateAll(images =>
    images.forEach(image => { image.loading = 'eager'; })
  );
  await expect.poll(async () =>
    page.locator('.catalog-thumb img').evaluateAll(images =>
      images.filter(image => !image.complete || image.naturalWidth === 0).length
    )
  ).toBe(0);

  await expect(page.locator('.catalog-card').filter({ hasText: "'94 Toyota Supra" })
    .locator('.catalog-thumb img')).toHaveAttribute('src',
      '/assets/catalog/2026/sth/94-toyota-supra-tooned.jpg'
    );

  const externalLinks = await page.locator('#catalogGrid a').evaluateAll(links =>
    links.filter(link => /^https?:/i.test(link.getAttribute('href') || '')).map(link => link.href)
  );
  expect(externalLinks).toEqual([]);
  await expect(page.locator('#catalogGrid').getByText('Fonte externa')).toHaveCount(0);
  await expect(page.locator('.catalog-price')).toHaveCount(30);
});
