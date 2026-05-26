// One-off script to capture design surfaces for review.
// Saves PNGs into ../docs/design-screenshots/
//
// USAGE (from web/):
//   npm install --no-save playwright          # playwright is NOT a project dep
//   npx playwright install --only-shell chromium
//   npm run dev                               # ensure localhost:3000 is up
//   node scripts/screenshot-designs.mjs
//
// Captures: 2 standalone mockups (served from public/) + 5 Next.js routes.
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(import.meta.dirname, '..', '..', 'docs', 'design-screenshots');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const pages = [
  { name: '01-mockup-liquid-glass',   url: `${BASE}/mockup-liquid-glass.html`,  scrollY: 0 },
  { name: '02-mockup-enterprise',     url: `${BASE}/mockup-enterprise.html`,    scrollY: 0 },
  { name: '03-nextjs-landing',        url: `${BASE}/`,                           scrollY: 0 },
  { name: '04-nextjs-builder',        url: `${BASE}/builder`,                    scrollY: 0 },
  { name: '05-nextjs-profile-demo',   url: `${BASE}/profile/demo`,               scrollY: 0 },
  { name: '06-nextjs-recruiter',      url: `${BASE}/recruiter`,                  scrollY: 0 },
  { name: '07-nextjs-brief',          url: `${BASE}/brief`,                      scrollY: 0 },
];

const browser = await chromium.launch({ headless: true, chromiumSandbox: false, channel: undefined });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const p of pages) {
  console.log(`→ ${p.name}  ${p.url}`);
  const page = await ctx.newPage();
  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait for fonts + animations to settle
    await page.waitForTimeout(800);
    await page.screenshot({ path: resolve(OUT, `${p.name}.png`), fullPage: true });
    console.log(`  ✓ saved ${p.name}.png`);
  } catch (err) {
    console.error(`  ✗ ${p.name}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log(`\nDone. Output in: ${OUT}`);
