// Generate 4 background-variant previews of the landing page for design selection.
// Edits globals.css + layout.tsx in-place, screenshots, then restores originals.
//
// Usage (from web/):
//   1. npm run dev (in another terminal) — server must be running at localhost:3000
//   2. npm install --no-save playwright (if not already)
//   3. node scripts/preview-bg-variants.mjs
//
// Output: docs/design-screenshots/variant-A..D.png

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';

const WEB = resolve(import.meta.dirname, '..');
const CSS = resolve(WEB, 'src/app/globals.css');
const LAYOUT = resolve(WEB, 'src/app/layout.tsx');
const OUT = resolve(WEB, '..', 'docs', 'design-screenshots');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const cssOriginal = readFileSync(CSS, 'utf8');
const layoutOriginal = readFileSync(LAYOUT, 'utf8');

const BODY_RE = /body\s*\{[\s\S]*?background-attachment: fixed;\s*\}/m;
const AMBIENT_RE = /function AmbientBlobs\(\)\s*\{[\s\S]*?\n\}\n/m;

const variants = [
  {
    id: 'A-periwinkle',
    label: 'A — Periwinkle (Linear / Notion school)',
    body: `body {
  font-family: var(--font-sans);
  color: #0B1020;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(1100px 800px at 50% -20%, rgba(165,180,252,0.55), transparent 65%),
    linear-gradient(180deg, #F4F6FF 0%, #FFFFFF 55%, #EEF2FF 100%);
  background-attachment: fixed;
}`,
    blobs: `function AmbientBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob float-a"
        style={{ width: 700, height: 700, top: -200, left: "50%", transform: "translateX(-50%)", background: "#A5B4FC", opacity: 0.5 }}
      />
    </div>
  );
}
`,
  },
  {
    id: 'B-cobalt',
    label: 'B — Cobalt / Sky (Stripe / Vercel school)',
    body: `body {
  font-family: var(--font-sans);
  color: #0B1020;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(1100px 800px at 50% -20%, rgba(96,165,250,0.55), transparent 65%),
    linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 55%, #F0F9FF 100%);
  background-attachment: fixed;
}`,
    blobs: `function AmbientBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob float-a"
        style={{ width: 700, height: 700, top: -200, left: "50%", transform: "translateX(-50%)", background: "#60A5FA", opacity: 0.42 }}
      />
    </div>
  );
}
`,
  },
  {
    id: 'C-slate-dusk',
    label: 'C — Slate dusk + warm horizon (editorial)',
    body: `body {
  font-family: var(--font-sans);
  color: #0B1020;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(900px 700px at 25% -10%, rgba(148,163,184,0.45), transparent 65%),
    radial-gradient(1000px 700px at 75% 110%, rgba(254,215,170,0.55), transparent 65%),
    linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 55%, #FEF3C7 100%);
  background-attachment: fixed;
}`,
    blobs: `function AmbientBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob float-a"
        style={{ width: 520, height: 520, top: -130, left: -130, background: "#94A3B8", opacity: 0.35 }}
      />
      <div
        className="blob float-b"
        style={{ width: 580, height: 580, bottom: -150, right: -150, top: "auto", background: "#FCD34D", opacity: 0.4 }}
      />
    </div>
  );
}
`,
  },
  {
    id: 'D-plum-violet',
    label: 'D — Plum / violet (signature premium)',
    body: `body {
  font-family: var(--font-sans);
  color: #0B1020;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(1100px 800px at 50% -20%, rgba(196,181,253,0.6), transparent 65%),
    linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 55%, #FDF4FF 100%);
  background-attachment: fixed;
}`,
    blobs: `function AmbientBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob float-a"
        style={{ width: 700, height: 700, top: -200, left: "50%", transform: "translateX(-50%)", background: "#C4B5FD", opacity: 0.55 }}
      />
    </div>
  );
}
`,
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

try {
  for (const v of variants) {
    console.log(`\n→ ${v.label}`);

    // Patch CSS + layout
    const newCss = cssOriginal.replace(BODY_RE, v.body);
    const newLayout = layoutOriginal.replace(AMBIENT_RE, v.blobs);
    if (newCss === cssOriginal) throw new Error('CSS body block not found — regex match failed');
    if (newLayout === layoutOriginal) throw new Error('AmbientBlobs function not found — regex match failed');

    writeFileSync(CSS, newCss);
    writeFileSync(LAYOUT, newLayout);

    // Give Next.js HMR a moment
    await wait(3000);

    const page = await ctx.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
    await wait(1500); // let blob animation settle

    const out = resolve(OUT, `variant-${v.id}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`  ✓ ${out}`);
    await page.close();
  }
} finally {
  // ALWAYS restore originals
  writeFileSync(CSS, cssOriginal);
  writeFileSync(LAYOUT, layoutOriginal);
  console.log('\n✓ Restored originals (globals.css + layout.tsx)');
  await browser.close();
}
