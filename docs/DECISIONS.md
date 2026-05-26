# HireGEN — Decisions Log

> Living document. Every product, design, and tech decision lands here with rationale and date.
> When a decision is later overturned, **don't delete** — strike through and note the replacement.

**Last updated:** 2026-05-15

---

## Decision Index

| # | Date | Decision | Status |
|---|---|---|---|
| D-001 | 2026-05-15 | Position as LinkedIn *complement*, not replacement | ✅ Active |
| D-002 | 2026-05-15 | India-first market focus | ✅ Active |
| D-003 | 2026-05-15 | Working name: **HireGEN** | 🟡 Placeholder |
| D-004 | 2026-05-15 | MVP scoped to 4 features only | ✅ Active |
| D-005 | 2026-05-15 | UI direction: Linear / Vercel / Cal.com school | ✅ Active |
| D-006 | 2026-05-15 | Color system: light theme, indigo + amber accent | ✅ Active |
| D-007 | 2026-05-15 | Typography: Inter (UI) + Instrument Serif (display) | ✅ Active |
| D-008 | 2026-05-15 | Frontend stack: Next.js 14 + Tailwind + shadcn/ui | ✅ Active |
| D-009 | 2026-05-15 | Build HTML mockup first, scaffold Next.js after approval | ✅ Active |
| D-010 | 2026-05-15 | Free for candidates, forever. Recruiter pays per accepted intro | ✅ Active |
| D-011 | 2026-05-15 | Visual language: **Liquid Glass / Glassmorphism** (supersedes D-005 minimalism) | ✅ Active |
| D-012 | 2026-05-15 | Typography: **Segoe UI Variable** (Microsoft Fluent) — supersedes Inter + Instrument Serif | ✅ Active |
| D-013 | 2026-05-16 | MVP wedge narrowed: Frontend/full-stack engineers in India, 1–4 yrs experience | ✅ Active (from viability report) |
| D-014 | 2026-05-16 | Tiered monetization — 5 revenue lines, not 3 (amends D-010 numbers) | ✅ Active (from viability report) |
| D-015 | 2026-05-16 | **Dual persona system** — Student profile + Employee profile, both flow into matching but evaluated differently | 🟡 Proposed |
| D-016 | 2026-05-16 | Anti-cheat is mandatory for skill validation trust — multi-layer policies required | 🟡 Proposed |
| D-017 | 2026-05-16 | Git portfolio analysis is a required input to Proof Profile (extends F1) | 🟡 Proposed |
| D-018 | 2026-05-16 | Resume Builder + Career Guide added as standalone module (M-E) — recommended as traction wedge | 🟡 Proposed |
| D-019 | 2026-05-16 | "AI Impact on Jobs" visualization module added to roadmap (M-F) — marketing surface | 🟡 Proposed |
| D-020 | 2026-05-16 | D-004 MVP scope re-opened pending Option A/B/C decision | 🟡 Pending |
| D-021 | 2026-05-26 | **Background color: Variant B (Cobalt / Sky)** — single soft blue wash; 4-variant preview, founder picked B over Periwinkle / Slate-dusk / Plum | ✅ Active |

---

## D-001 · Position as LinkedIn complement, not replacement

**Decided:** 2026-05-15
**Status:** Active

**Decision:** HireGEN is positioned as a complement to LinkedIn, not a replacement.

**Rationale:**
- Competing on network size with LinkedIn is unwinnable for a new entrant.
- LinkedIn = system of record (identity, network). HireGEN = system of action (hiring outcomes, skill proof).
- The brainstorm doc explicitly warned: *"You win by NOT competing on network size. Competing on better hiring outcomes."*
- Lower trust barrier — users keep LinkedIn, add HireGEN, no migration friction.

**Implication:** Future feature decisions must ask "does this strengthen the proof/outcomes wedge?" not "does this match a LinkedIn feature?"

---

## D-002 · India-first market focus

**Decided:** 2026-05-15
**Status:** Active

**Decision:** Launch India-only. Open English-speaking global expansion deferred to post-product-market-fit.

**Rationale:**
- 1.5M engineering graduates/year in India, mostly under-served by LinkedIn's pedigree-biased graph.
- Tier-2/3 city talent is the largest under-monetized supply pool.
- INR pricing structures (₹2k–₹10k per accepted intro) work for the Indian recruiter market.
- DPDP Act 2023 compliance is mandatory either way — better to nail one jurisdiction first.

**Open question:** Indian rupee pricing only, or USD parallel for global remote roles?

---

## D-003 · Working name "HireGEN" (placeholder)

**Decided:** 2026-05-15
**Status:** 🟡 Placeholder — final name TBD

**Decision:** Use **HireGEN** as working name until brand exercise.

**Rationale:** Folder name on disk. Functional placeholder. Suggests "Hire + GEN(eration / GenAI)."

**Alternatives to revisit before launch:**
- Skill-forward names (e.g., ProofHire, Skillforge, Vetted)
- Indic-rooted names (e.g., Karya, Yukti)
- Action verbs (e.g., Match, Spark)

**Action:** Brand naming exercise before scaffolding the real Next.js project.

---

## D-004 · MVP scoped to 4 features only

**Decided:** 2026-05-15
**Status:** Active

**Decision:** MVP ships with exactly these four features. Everything else is post-MVP.

1. **Smart Profile / Proof Profile** — AI parses GitHub, projects, work history into a structured skill graph.
2. **Skill Validation** — short (15-min) adaptive challenges + project review. Each skill carries a confidence score.
3. **Job Matching Engine** — recruiter-side surfaces only qualified candidates; candidate-side surfaces only fit roles.
4. **Recruiter Dashboard** — top candidates view, request-intro flow, outcome tracking.

**Rationale:** Source brainstorm explicitly warned *"avoid feature overload."* Four features keep the wedge sharp.

**Out of scope for MVP (explicitly deferred):**
- Social feed / posts / influencer content
- Messaging / inbox / DMs
- Job board listing browse (matching only, no browse)
- Mobile app (web-responsive only)
- Multi-language UI (English only at launch)
- Course marketplace (affiliate links only, no native learning)

---

## D-005 · UI design direction

**Decided:** 2026-05-15
**Status:** Active

**Decision:** Visual school is **Linear / Vercel / Cal.com / Stripe** — modern minimalism, generous whitespace, soft shadows, rounded corners (`rounded-xl` to `rounded-2xl`), serif-display + sans-body mix.

**Rationale:** User asked for "modern + light colors." This aesthetic is currently the gold standard for B2B SaaS and signals seriousness without corporate dryness.

**Concrete rules:**
- Whitespace > density. No "above the fold cram."
- Soft shadows (`shadow-soft`), never harsh.
- Rounded corners minimum `rounded-lg` (8px), preferred `rounded-xl` (12px) and `rounded-2xl` (16px) for cards.
- Borders use `#E2E8F0` (ink-200), never pure gray.
- Animations are subtle: 200ms transitions, no bouncy springs.

---

## D-006 · Color system

**Decided:** 2026-05-15
**Status:** Active

**Decision:** Light theme. Indigo primary, amber accent, slate-based neutrals.

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#0F172A` | Primary text, dark CTAs |
| `ink-700` | `#334155` | Body text |
| `ink-500` | `#64748B` | Muted text |
| `ink-200` | `#E2E8F0` | Borders, dividers |
| `ink-50`  | `#F8FAFC` | Page background tints |
| `brand-500` | `#6366F1` | Primary brand (indigo) |
| `brand-700` | `#4338CA` | Primary on hover / strong |
| `accent-500` | `#F59E0B` | Accent / candidate-side CTA (amber) |

**Gradient signature:** `from-brand-500 via-sky-500 to-accent-500` — used for hero headline, CTA card, and key chart fills.

**Rationale:**
- Indigo reads as trustworthy + modern (Linear, Vercel use blue-purple range).
- Amber gives warmth and differentiates candidate-side CTAs from recruiter-side (reinforces two-sided product structurally).
- Slate neutrals are gentler than pure gray, more modern than warm beiges.

**Dark mode:** Deferred to post-MVP. Light-only at launch.

---

## D-007 · Typography

**Decided:** 2026-05-15
**Status:** Active

**Decision:**
- **UI / body:** Inter (400, 500, 600, 700, 800).
- **Display / headlines:** Instrument Serif (italic available).

**Rationale:**
- Inter is the de facto B2B SaaS sans — high legibility at small sizes, neutral character.
- Instrument Serif adds editorial warmth on display headings, signals product (vs. corporate boilerplate) personality.
- The serif/sans contrast is currently a strong aesthetic signal in indie-SaaS landing pages.

**Rules:**
- Use serif ONLY for H1, H2, and pull-quotes.
- Italic serif is reserved for emotional emphasis (e.g., *"Not what you wrote."*).

---

## D-008 · Frontend stack

**Decided:** 2026-05-15
**Status:** Active (to be applied when we scaffold post-mockup approval)

**Decision:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Lucide Icons.

**Rationale:**
- **Next.js 14** — SEO is critical for a hiring product (Google must index job pages, public candidate proof profiles). SSR + App Router gives this for free.
- **TypeScript** — non-negotiable at this complexity.
- **Tailwind** — utility-first matches our iteration speed needs.
- **shadcn/ui** — components are copy-pasted, not installed. We own the source. Used by Vercel, Linear, Cal.com.
- **Framer Motion** — subtle animations only.
- **Lucide** — clean, consistent icon set.

**Rejected:**
- Plain React + Vite — loses SSR/SEO.
- MUI / Chakra / Mantine — too opinionated, harder to achieve the Linear-school aesthetic.
- Styled Components / Emotion — out of fashion, slower than Tailwind in dev loop.

---

## D-009 · Build HTML mockup first

**Decided:** 2026-05-15
**Status:** Active

**Decision:** Build a single-file HTML mockup (`index.html`, Tailwind via CDN) before scaffolding the Next.js project.

**Rationale:**
- Validates visual direction in minutes, not hours.
- Zero install friction — user can double-click to open in browser.
- Easy to throw away or radically revise without sunk cost.
- Once approved, we port to Next.js with identical Tailwind tokens.

**Exit criteria:** User approves visual direction → scaffold Next.js → port mockup to real components.

---

## D-010 · Pricing & monetization model

**Decided:** 2026-05-15
**Status:** Active

**Decision:** Free for candidates forever. Recruiters pay per **accepted** intro (aligned incentives — we earn only on outcomes the user accepts).

| Surface | Mechanism | Indicative pricing |
|---|---|---|
| Candidate profile | Free, forever | ₹0 |
| Recruiter intro | Pay per accepted intro | ₹2,000 – ₹10,000 |
| Enterprise dashboards | Subscription | ₹50,000 – ₹5,00,000 / month |
| EdTech affiliate | Disclosed commission | 5–15% |

**Hard rule:** No user data resale, ever. Trust is the moat.

**Rationale:** Same Path C model as sister product (Layoff Forensics brief). Avoids inverting user-as-product. DPDP-compliant by design.

---

## D-011 · Visual language: Liquid Glass / Glassmorphism

**Decided:** 2026-05-15
**Status:** ✅ Active — supersedes the flat-minimalism direction in D-005

**Decision:** Adopt **Liquid Glass / Glassmorphism** as the primary visual language, matching the design vocabulary of:
- **Apple** — iOS 26 Liquid Glass, macOS Tahoe materials
- **Google** — Android 16 Material You "Expressive" with translucent surfaces
- **Microsoft** — Windows 11 Mica / Acrylic, Fluent Design System

**Concrete ingredients used in `index.html`:**

| Ingredient | Implementation |
|---|---|
| Frosted surface | `backdrop-filter: blur(24px) saturate(180%)` on white at 55% alpha |
| Refractive rim | Inner ring shadow `inset 0 0 24px rgba(255,255,255,0.18)` |
| Specular sheen | Top-edge linear gradient overlay (white 55% → 0% in first 35% of card) |
| Vibrant backdrop | Multiple animated radial-gradient blobs (indigo, amber, cyan, pink) behind every glass surface |
| Border highlight | White at 55% alpha border + inset white top-edge highlight |
| Floating motion | 14–22 second ease-in-out blob drifts to suggest light moving behind glass |

**Glass tiers introduced:**
- `.glass` — standard cards
- `.glass-soft` — nested elements (children of glass)
- `.glass-strong` — hero/featured surfaces (heavier blur, more opacity)
- `.glass-dark` — CTA banner (dark glass on bright backdrop)

**Rationale:**
- Glass requires colorful content *behind* it to read as glass. The page background now uses 4 large radial gradients + 4 floating colored blobs precisely so blur has something to refract.
- Matches the visual language users encounter on their primary devices (iPhone, Android 16, Windows 11). Familiar = trusted.
- Differentiates from LinkedIn's flat corporate aesthetic, reinforcing "we are not LinkedIn."

**Risks accepted:**
- Backdrop-filter has minor perf cost on low-end devices — mitigated by limiting blur radius and using `transform: translateZ(0)` if needed at scale.
- Older browsers (IE/legacy Edge) won't render the blur — acceptable; target users are on modern browsers.
- Accessibility — text contrast on glass is preserved by keeping body text at `ink-900` (#0B1020, ~16:1 on white) and never placing text directly on heavily-saturated backdrops.

**D-005 status:** Superseded but not deleted. Glass IS still modern minimalism, just with material depth added. Whitespace and rounded-xl/2xl rules from D-005 still apply.

---

## D-012 · Typography: Segoe UI Variable (Microsoft Fluent)

**Decided:** 2026-05-15
**Status:** ✅ Active — supersedes D-007 (Inter + Instrument Serif)

**Decision:** Switch to **Segoe UI Variable** with `Segoe UI` fallback, matching microsoft.com / Microsoft Fluent UI properties.

**Font stack:**
```css
font-family: 'Segoe UI Variable', 'Segoe UI',
             -apple-system, BlinkMacSystemFont, Roboto,
             'Helvetica Neue', Arial, sans-serif;
```

**Display variant for headings:**
```css
font-family: 'Segoe UI Variable Display', 'Segoe UI',
             -apple-system, sans-serif;
font-weight: 700;
letter-spacing: -0.025em;
line-height: 1.04;
```

**Why this works without licensing a webfont:**
- Segoe UI Variable ships natively on **Windows 11+** — renders perfectly for the primary target market (Indian dev/recruiter audience, predominantly Windows).
- Apple users fall back to `-apple-system` (San Francisco) — a near-identical neutral sans.
- Android users fall back to Roboto.
- The font stack is **system-resolved**, so zero font network requests. Faster loads, better core web vitals.

**Trade-off accepted:**
- Non-Windows users see *system fonts*, not literal Segoe UI. The brand identity is "looks native on each platform" rather than "identical pixel-for-pixel everywhere." Acceptable for a Microsoft-Fluent-aligned design.
- If we later need true Segoe parity across platforms, license **Selawik** (Microsoft's open-source Segoe-compatible font) or use the Selawik webfont via fonts.cdnfonts.com.

**Rationale:**
- User explicitly requested "font that reflects Microsoft websites" — Segoe UI Variable is the literal answer.
- Pairs naturally with Liquid Glass / Fluent design language. Same family.
- Inter + Instrument Serif (D-007) was nice but mixed two font families; Segoe UI Variable has a Display optical size built-in, removing the need for a serif.

**D-007 status:** Superseded but not deleted. Instrument Serif is parked for potential future use in editorial / blog surfaces.

---

## Pending decisions (parked, not yet made)

| # | Decision needed | When |
|---|---|---|
| P-01 | Final brand name | Before Next.js scaffold |
| P-02 | Logo + wordmark design | Before public beta |
| P-03 | Auth provider (Clerk vs Supabase Auth vs NextAuth) | At scaffold time |
| P-04 | Database (Neon Postgres vs Supabase vs Firestore) | At scaffold time |
| P-05 | Vector DB for matching (pgvector vs Pinecone) | When matching engine starts |
| P-06 | LLM provider primary (Claude Sonnet 4.6 vs Gemini 2.0 Pro) | When AI features start |
| P-07 | Hosting (Vercel vs Cloudflare Workers) | At scaffold time |
| P-08 | Skill taxonomy source (build vs. license O*NET adaptation) | Before matching engine |
| P-09 | Geographic scope at launch (India-only vs English-global) | Before public launch |
| P-10 | Tier-2/3 candidate acquisition strategy | Before closed beta |
