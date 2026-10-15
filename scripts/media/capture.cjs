// Screenshot live sites with Playwright.
// Usage: PLAYWRIGHT_DIR=<dir containing node_modules/playwright> node scripts/media/capture.cjs <jobs.json>
// jobs.json: [{ "url": "...", "out": "shot.png", "width": 1440, "height": 900, "mobile": false,
//               "fullPage": false, "scrollY": 0 }]
const path = require('path');
const { chromium } = require(path.join(process.env.PLAYWRIGHT_DIR || '.', 'node_modules', 'playwright'));

const COOKIE_RE = /^(accept( all)?|agree|i agree|got it|allow( all)?|ok(ay)?|close|dismiss|no thanks)$/i;

(async () => {
  const jobs = require(path.resolve(process.argv[2]));
  const browser = await chromium.launch();
  for (const j of jobs) {
    const ctx = await browser.newContext({
      viewport: { width: j.width || 1440, height: j.height || 900 },
      deviceScaleFactor: j.scale || 1,
      isMobile: !!j.mobile,
      hasTouch: !!j.mobile,
      userAgent: j.mobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
        : undefined,
    });
    const page = await ctx.newPage();
    try {
      const res = await page.goto(j.url, { waitUntil: 'load', timeout: 45000 });
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(2000);
      for (const b of await page.locator('button, a[role=button]').all()) {
        const t = ((await b.textContent().catch(() => '')) || '').trim();
        if (COOKIE_RE.test(t) && (await b.isVisible().catch(() => false))) {
          await b.click({ timeout: 2000 }).catch(() => {});
        }
      }
      if (j.scrollY) {
        await page.evaluate((y) => window.scrollTo(0, y), j.scrollY);
        await page.waitForTimeout(1500);
      }
      if (j.eval) await page.evaluate(j.eval).catch(() => {});
      await page.waitForTimeout(500);
      await page.screenshot({ path: j.out, fullPage: !!j.fullPage });
      console.log('OK', res && res.status(), j.url, '->', j.out, '| final', page.url());
    } catch (e) {
      console.log('FAIL', j.url, String(e).split('\n')[0]);
    }
    await ctx.close();
  }
  await browser.close();
})();
