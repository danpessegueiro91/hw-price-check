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

test('site keeps public registration disabled and exposes only the private admin login', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', route => route.abort());
  await page.goto('/');
  for (const id of ['#authGate', '#account', '#signupTop', '#signupHero', '#tabAccount', '#accountPage', '#newsletterForm', '#newsletterEmail']) {
    await expect(page.locator(id)).toHaveCount(0);
  }
  await expect(page.locator('#openAdminLogin')).toBeVisible();
  await expect(page.locator('#hwpcAdminModal')).toHaveCount(1);
  await expect(page.locator('#hwpcAdminModal')).toBeHidden();
  await page.locator('#openAdminLogin').click();
  await expect(page.locator('#hwpcAdminModal')).toBeVisible();
  await expect(page.locator('#hwpcAdminForm')).toBeVisible();
  await expect(page.locator('#hwpcAdminEmail')).toHaveAttribute('type', 'email');
  await expect(page.locator('#hwpcAdminPassword')).toHaveAttribute('type', 'password');

  const fs = require('node:fs');
  const path = require('node:path');
  const appSource = fs.readFileSync(path.join(__dirname, '../assets/js/app-core.js'), 'utf8');
  expect(appSource).not.toContain('auth.signUp');
  expect(appSource).toContain('signInWithPassword');
  expect(appSource).toContain("sb.rpc('is_catalog_image_admin')");
  expect(appSource).toContain('signInAnonymously');
});

test('collection and watchlist persist locally without a user account', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', route => route.abort());
  await page.goto('/');
  await page.locator('#heroAnalyse').click();
  await page.locator('[data-view="watch"]').click();
  await page.locator('#wanted').fill('Nissan Skyline GT-R');
  await page.locator('#limit').fill('5');
  await page.locator('#addWatch').click();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('hwpc_local_collection_v1') || '{}'));
  expect(stored.watch).toHaveLength(1);
  expect(stored.watch[0].name).toBe('Nissan Skyline GT-R');
  await page.reload();
  await page.locator('#heroAnalyse').click();
  await page.locator('[data-view="watch"]').click();
  await expect(page.locator('#watchItems')).toContainText('Nissan Skyline GT-R');
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

test('newsletter and email capture controls are absent', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#newsletterForm')).toHaveCount(0);
  await expect(page.locator('#newsletterEmail')).toHaveCount(0);
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
    { code: 'pt', detail: 'Ver ficha', photos: 'Arquivo HW Price Check' },
    { code: 'en', detail: 'View details', photos: 'HW Price Check archive' },
    { code: 'es', detail: 'Ver ficha', photos: 'Archivo HW Price Check' },
    { code: 'fr', detail: 'Voir la fiche', photos: 'Archives HW Price Check' },
    { code: 'de', detail: 'Details ansehen', photos: 'HW Price Check-Archiv' },
    { code: 'it', detail: 'Vedi scheda', photos: 'Archivio HW Price Check' },
    { code: 'nl', detail: 'Bekijk details', photos: 'HW Price Check-archief' },
  ];

  const firstCard = page.locator('.catalog-card').first();
  const modelName = await firstCard.locator('h3').textContent();

  for (const language of languages) {
    await page.locator('#language').selectOption(language.code);
    await expect(firstCard.locator('.catalog-view-detail')).toHaveText(language.detail);
    await expect(firstCard.locator('.catalog-local-source')).toContainText(language.photos);
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

test('collection persistence is local and the save path does not write user data to Supabase', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/app-core.js'), 'utf8');
  expect(source).toContain("const LOCAL_DATA_KEY='hwpc_local_collection_v1'");
  const save = source.match(/async function save\(\)\s*\{([\s\S]*?)\n\}/);
  expect(save, 'save function should exist').not.toBeNull();
  expect(save[1]).toContain('localStorage.setItem(LOCAL_DATA_KEY');
  expect(save[1]).not.toContain('user_data');
  expect(save[1]).not.toContain('.upsert(');
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

test('AI identification can be saved to the collection without storing the submitted photo', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', route => route.fulfill({
    contentType: 'application/javascript',
    body: `
      window.__savedPayloads = [];
      const mockUser = { id: 'collector-test', is_anonymous: true, user_metadata: {}, created_at: '2026-01-01T00:00:00.000Z' };
      const session = { user: mockUser, access_token: 'test-access-token' };
      window.supabase = {
        createClient: () => ({
          auth: {
            getSession: async () => ({ data: { session }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
          },
          from: table => {
            const query = {
              select: () => query,
              eq: () => query,
              not: () => query,
              order: () => query,
              limit: () => query,
              maybeSingle: async () => ({
                data: table === 'user_data' ? { payload: { items: [], watch: [] } } : null,
                error: null
              }),
              single: async () => ({ data: null, error: null }),
              then: (resolve, reject) => Promise.resolve({ data: [], error: null }).then(resolve, reject),
              upsert: async row => {
                if (table === 'user_data') window.__savedPayloads.push(JSON.parse(JSON.stringify(row.payload)));
                return { error: null };
              },
              insert: async () => ({ error: null })
            };
            return query;
          },
          storage: { from: () => ({ getPublicUrl: path => ({ data: { publicUrl: 'https://example.invalid/' + path } }) }) },
          rpc: async name => ({ data: name === 'is_catalog_image_admin' ? false : 1, error: null }),
          functions: {
            invoke: async (name, { body }) => {
              if (name === 'hw-identify') return { error: null, data: { analysis: {
                model: 'Porsche 911 GT3 RS', year: '2026', classification: 'sth',
                th_sth_status: 'confirmed', confidence: 94, notes: 'Detalhes visuais consistentes.',
                visible_evidence: ['Rodas Real Riders', 'Pintura Spectraflame'], missing_photos: []
              } } };
              if (name === 'hw-sold-comps') return { error: null, data: {
                provider: 'SoldComps · eBay completed sales',
                stats: { median: 12, p25: 9, p75: 15, currency: 'GBP', excluded: 1 },
                count: 12, items: [], quota: { remaining: 9, used: 1, limit: 10, tier: 'guest' }
              } };
              if (name === 'hw-marketplace-search' && body.action === 'history') return { error: null, data: { history: [] } };
              if (name === 'hw-marketplace-search') return { error: null, data: { status: 'complete', active: [], sold: [], credits: { charged: 0 } } };
              throw new Error('Unexpected function: ' + name);
            }
          }
        })
      };
    `
  }));
  await page.goto('/');
  await page.locator('#heroAnalyse').click();
  await page.locator('input[data-photo="0"]').setInputFiles({
    name: 'hot-wheels-front.png',
    mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/z9sAAAAASUVORK5CYII=', 'base64')
  });
  await page.locator('#purchasePrice').fill('1.49');
  await page.locator('#purchaseShipping').fill('0.50');
  await page.locator('#identify').click();
  await expect(page.locator('#saveAnalysisToCollection')).toBeVisible();
  await page.locator('#saveAnalysisToCollection').click();
  await expect(page.locator('#saveAnalysisToCollection')).toHaveText('Guardado na coleção.');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('hwpc_local_collection_v1') || '{}'));
  expect(saved.items).toHaveLength(1);
  expect(saved.items[0]).toMatchObject({
    model: 'Porsche 911 GT3 RS',
    ask: 1.49,
    shipping: 0.5,
    classification: 'sth',
    condition: 'mint',
    th_sth_status: 'confirmed',
    confidence: 94,
    min: 0,
    marketEvidence: { currency: 'GBP', median: 12, salesCount: 12 }
  });
  expect(JSON.stringify(saved)).not.toContain('data:image');
  expect(JSON.stringify(saved)).not.toContain('hot-wheels-front.png');
  await page.locator('#tabCollection').click();
  await expect(page.locator('#items')).toContainText('Porsche 911 GT3 RS');
  await expect(page.locator('#items')).toContainText('12,00');
  await expect(page.locator('#items')).toContainText('£');
});

test('TH/STH archive updates when the selected year and category change', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  await expect(page.locator('#catalogPage')).toBeVisible();

  await page.locator('#catalogYear').selectOption('2025');
  await expect(page.locator('#catalogSummary')).toContainText('2025');
  await expect(page.locator('.catalog-card h3').first()).toHaveText('Ford Performance Supervan 4');

  await page.locator('#catalogType').selectOption('sth');
  await expect(page.locator('#catalogSummary')).toContainText('STH');
  await expect(page.locator('.catalog-card h3').first()).toHaveText("'87 Audi quattro");

  await page.locator('#catalogYear').selectOption('2010');
  await expect(page.locator('#catalogSummary')).toContainText('2010');
  await expect(page.locator('.catalog-card')).toHaveCount(12);
  await expect(page.locator('.catalog-card h3').first()).toHaveText('Custom \'53 Cadillac');

  await page.locator('#catalogYear').selectOption('2006');
  await expect(page.locator('#catalogSummary')).toContainText('2006');
  await expect(page.locator('#catalogGrid')).toContainText('Ainda não existiam Super Treasure Hunts antes de 2007.');
});


test('TH/STH archive loads historical model photos with source attribution', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-page="guides"]').click();
  await page.locator('#catalogYear').selectOption('1995');
  await page.locator('#catalogType').selectOption('th');

  const goldPassion = page.locator('.catalog-card').filter({ hasText: 'Gold Passion' });
  await expect(goldPassion.locator('.catalog-thumb img')).toHaveAttribute(
    'src', /^https:\/\/findmyhw\.com\/media\/images\//
  );
  await expect(goldPassion.locator('.catalog-local-source')).toContainText('FindMyHW');
  await expect.poll(() => goldPassion.locator('.catalog-thumb img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);

  await page.locator('#catalogYear').selectOption('2025');
  await page.locator('#catalogType').selectOption('sth');
  const audi = page.locator('.catalog-card').filter({ hasText: "'87 Audi quattro" });
  await expect(audi.locator('.catalog-thumb img')).toHaveAttribute(
    'src', /^https:\/\/findmyhw\.com\/media\/images\//
  );
  await expect(audi.locator('.catalog-local-source')).toContainText('FindMyHW');
  await expect.poll(() => audi.locator('.catalog-thumb img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
});


test('price sources page has working language switching and refreshed collector branding', async ({ page }) => {
  await page.goto('/metodologia-precos.html');
  await expect(page.locator('#language')).toBeVisible();
  await expect(page.locator('script[src*="i18n.js"]')).toHaveAttribute('src', /i18n\.js\?v=20261125-3/);
  await expect(page.locator('.brand .site-logo')).toHaveAttribute('src', /assets\/hwpc-logo-original\.png/);
  await expect.poll(() => page.locator('.brand .site-logo').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const languages = [
    ['en', 'Where do prices come from?', 'How we calculate the reference'],
    ['es', '¿De dónde vienen los precios?', 'Cómo calculamos la referencia'],
    ['fr', 'D’où viennent les prix ?', 'Comment calculons-nous la référence'],
    ['de', 'Woher kommen die Preise?', 'So berechnen wir den Richtwert'],
    ['it', 'Da dove provengono i prezzi?', 'Come calcoliamo il riferimento'],
    ['nl', 'Waar komen de prijzen vandaan?', 'Hoe we de richtprijs berekenen'],
    ['pt', 'De onde vêm os preços?', 'Como calculamos a referência'],
  ];
  for (const [code, title, section] of languages) {
    await page.locator('#language').selectOption(code);
    await expect(page.locator('html')).toHaveAttribute('lang', code === 'pt' ? 'pt-PT' : code);
    await expect(page.locator('main h1')).toHaveText(title);
    await expect(page.locator('main h2').filter({ hasText: section })).toHaveText(section);
    if (code === 'en') {
      await expect(page.locator('main .lead')).toContainText('A price is only useful');
      await expect(page.locator('footer')).toContainText('Independent project');
    }
  }
});

test('model archive page translates navigation and inner content in all languages', async ({ page }) => {
  await page.goto('/modelos/index.html');
  await expect(page.locator('#language')).toBeVisible();
  await expect(page.locator('script[src*="i18n.js"]')).toHaveAttribute('src', /i18n\.js\?v=20261125-3/);
  await expect(page.locator('.brand .site-logo')).toHaveAttribute('src', /assets\/hwpc-logo-original\.png/);
  await expect.poll(() => page.locator('.brand .site-logo').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const languages = [
    ['en', 'Models', 'How to read the archive'],
    ['es', 'Modelos', 'Cómo interpretar el archivo'],
    ['fr', 'Modèles', 'Comment lire les archives'],
    ['de', 'Modelle', 'So liest man das Archiv'],
    ['it', 'Modelli', 'Come leggere l’archivio'],
    ['nl', 'Modellen', 'Het archief lezen'],
    ['pt', 'Modelos', 'Como interpretar o arquivo'],
  ];
  for (const [code, navLabel, section] of languages) {
    await page.locator('#language').selectOption(code);
    await expect(page.locator('html')).toHaveAttribute('lang', code === 'pt' ? 'pt-PT' : code);
    await expect(page.locator('nav a').last()).toHaveText(navLabel);
    await expect(page.locator('main h2')).toHaveText(section);
    if (code === 'en') {
      await expect(page.locator('main .lead')).toContainText('Browse the annual Treasure Hunt');
      await expect(page.locator('footer')).toContainText('Independent project');
    }
  }
});

test('translation removes Markdown heading and emphasis markers from visible text', async ({ page }) => {
  await page.goto('/metodologia-precos.html');
  await page.evaluate(() => {
    const heading = document.createElement('h2');
    heading.id = 'markdownTranslationRegression';
    heading.textContent = '# *De onde vêm os preços?*';
    document.querySelector('main').prepend(heading);
  });
  await page.locator('#language').selectOption('es');
  await expect(page.locator('#markdownTranslationRegression')).toHaveText('¿De dónde vienen los precios?');
  await expect(page.locator('body')).not.toContainText('# *¿De dónde vienen los precios?');
});


test('main interface translates key public sections in every supported language', async ({ page }) => {
  await page.goto('/');
  const languages = [
    ['en', 'Free search, no registration', 'Your collection stays with you', 'How it works'],
    ['es', 'Búsqueda gratuita, sin registro', 'Tu colección se queda contigo', 'Cómo funciona'],
    ['fr', 'Recherche gratuite, sans inscription', 'Votre collection reste avec vous', 'Comment ça marche'],
    ['de', 'Kostenlose Suche, ohne Registrierung', 'Deine Sammlung bleibt bei dir', 'So funktioniert es'],
    ['it', 'Ricerca gratuita, senza registrazione', 'La tua collezione resta con te', 'Come funziona'],
    ['nl', 'Gratis zoeken, zonder registratie', 'Je verzameling blijft bij jou', 'Hoe het werkt'],
  ];
  for (const [code, free, collection, how] of languages) {
    await page.locator('#language').selectOption(code);
    await expect(page.locator('body')).toContainText(free);
    await expect(page.locator('body')).toContainText(collection);
    await expect(page.locator('body')).toContainText(how);
    await expect(page.locator('body')).not.toContainText('Pesquisa gratuita, sem registo');
  }
});


test('footer content translates in every supported language', async ({ page }) => {
  await page.goto('/');
  const footerChecks = [
    ['en', 'Independent tool for die-cast car collectors.', 'Navigation', 'Help', 'About Us', 'Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Informational estimates'],
    ['es', 'Herramienta independiente para coleccionistas de coches a escala.', 'Navegación', 'Ayuda', 'Quiénes somos', 'Términos de uso', 'Política de privacidad', 'Política de cookies', 'Estimaciones informativas'],
    ['fr', 'Outil indépendant pour les collectionneurs de voitures miniatures.', 'Navigation', 'Aide', 'Qui sommes-nous', 'Conditions d’utilisation', 'Politique de confidentialité', 'Politique relative aux cookies', 'Estimations informatives'],
    ['de', 'Unabhängiges Tool für Sammler von Modellautos.', 'Navigation', 'Hilfe', 'Über uns', 'Nutzungsbedingungen', 'Datenschutzerklärung', 'Cookie-Richtlinie', 'Unverbindliche Schätzungen'],
    ['it', 'Strumento indipendente per collezionisti di auto in scala.', 'Navigazione', 'Aiuto', 'Chi siamo', 'Termini di utilizzo', 'Informativa sulla privacy', 'Informativa sui cookie', 'Stime informative'],
    ['nl', "Onafhankelijke tool voor verzamelaars van schaalmodelauto's.", 'Navigatie', 'Help', 'Over ons', 'Gebruiksvoorwaarden', 'Privacybeleid', 'Cookiebeleid', 'Informatieve schattingen'],
  ];
  for (const [code, ...phrases] of footerChecks) {
    await page.locator('#language').selectOption(code);
    for (const phrase of phrases) await expect(page.locator('footer.site-footer')).toContainText(phrase);
    await expect(page.locator('footer.site-footer')).not.toContainText('Ferramenta independente para colecionadores de carros à escala.');
    await expect(page.locator('footer.site-footer')).not.toContainText('Navegação');
  }
});


test('all collector guide pages expose the same language selector and translate headings', async ({ page }) => {
  const guidePages = [
    ['/guias/index.html', ['Hot Wheels Guides', 'Guías Hot Wheels', 'Guides Hot Wheels', 'Hot-Wheels-Ratgeber', 'Guide Hot Wheels', 'Hot Wheels-gidsen']],
    ['/guias/identificar-th-e-sth.html', ['How to identify TH and STH', 'Cómo identificar TH y STH', 'Comment identifier les TH et STH', 'TH und STH erkennen', 'Come identificare TH e STH', 'TH en STH herkennen']],
    ['/guias/avaliar-precos-hot-wheels.html', ['How to value a Hot Wheels car', 'Cómo valorar un Hot Wheels', 'Comment estimer le prix d’une Hot Wheels', 'Den Wert eines Hot-Wheels-Modells einschätzen', 'Come valutare il prezzo di una Hot Wheels', 'De waarde van een Hot Wheels bepalen']],
    ['/guias/estado-blister-hot-wheels.html', ['How to assess the condition of the blister pack', 'Cómo evaluar el estado del blíster', 'Comment évaluer l’état du blister', 'Den Zustand der Blisterverpackung beurteilen', 'Come valutare le condizioni del blister', 'De staat van de blisterverpakking beoordelen']],
  ];
  const languages = ['en', 'es', 'fr', 'de', 'it', 'nl'];
  for (const [path, titles] of guidePages) {
    await page.goto(path);
    const selector = page.locator('#language');
    await expect(selector).toBeVisible();
    await expect(selector.locator('option')).toHaveCount(7);
    await expect(selector.locator('option[value="br"]')).toHaveCount(0);
    for (let i = 0; i < languages.length; i++) {
      await selector.selectOption(languages[i]);
      await expect(page.locator('main h1')).toHaveText(titles[i]);
    }
  }
});


test('Portuguese is labelled PT-PT and Brazilian Portuguese is not offered', async ({ page }) => {
  for (const path of ['/', '/metodologia-precos.html', '/modelos/index.html']) {
    await page.goto(path);
    const selector = page.locator('#language');
    await expect(selector).toBeVisible();
    await expect(selector.locator('option[value="pt"]')).toHaveText('PT-PT');
    await expect(selector.locator('option[value="br"]')).toHaveCount(0);
    await expect(selector.locator('option')).toHaveCount(7);
  }
});
