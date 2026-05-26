# HireGEN — Application Context & Build Prompt

> Self-contained handover document. Copy-paste either section into a fresh AI session, share with a teammate, or use as a brief for a designer / developer.

**Last updated:** 2026-05-15
**Current artifact:** `D:\HireGEN\index.html` (Liquid Glass landing mockup, v0.2)

---

# PART 1 — Application Context

*(This is the full project context. Paste this at the start of any new AI session to recover state.)*

## What we're building

**HireGEN** is an AI-enabled SaaS hiring platform, India-first, that **complements LinkedIn rather than competing with it on network size**.

The core idea:

> *"LinkedIn shows who you are. HireGEN proves what you can do."*

LinkedIn is a **System of Record** (identity + network). HireGEN is a **System of Action** (skill proof + hiring outcomes). The wedge is **skill-validated hiring** for the Indian market, with explicit access to Tier-2/3 talent that LinkedIn's network-bias structurally under-serves.

**One-line vision:** *"The fastest path from skill → job."*

## Target market

- **Primary geography:** India only at launch. English-speaking global expansion deferred.
- **Primary candidate persona:** "Priya the Proof-Builder" — 22–32, Tier-2/3 city, 1–4 yrs experience, has projects/GitHub but invisible on LinkedIn.
- **Primary recruiter persona:** "Ravi the Tech Hiring Lead" — Series B–D tech company in Bangalore/Hyderabad/Mumbai/Pune, hires 30–200 engineers/yr.

## What's in scope (MVP — exactly 4 features)

1. **Smart Profile / Proof Profile** — AI parses GitHub, projects, work history into a structured skill graph.
2. **Skill Validation** — 15-min adaptive challenges + project review. Each skill carries a confidence score and decay date.
3. **Job Matching Engine** — recruiter-side surfaces only qualified candidates; candidate-side surfaces only fit roles.
4. **Recruiter Dashboard** — top candidates view, request-intro flow, outcome tracking.

## What's explicitly NOT in scope

- ❌ Social feed / posts / influencer content
- ❌ Messaging / DM inbox
- ❌ Browsable job board (matching only — no spray-and-pray)
- ❌ Mobile app at launch (responsive web only)
- ❌ Course marketplace (affiliate links only)
- ❌ Resume generator (we kill resumes, not enable them)
- ❌ Premium tier for candidates (free forever — moat)
- ❌ User data resale, ever (moat)

## Monetization

- **Candidates:** Free forever. ₹0.
- **Recruiters:** Pay per **accepted** intro (₹2,000–₹10,000). Aligned incentives — we earn only when the user accepts.
- **Enterprise:** Subscription dashboards ₹50k–₹5L/month.
- **EdTech affiliate:** 5–15% disclosed commission.

## Visual & brand language

- **Design system:** Liquid Glass / Glassmorphism — matching iOS 26, Android 16, Microsoft Fluent 2.
- **Typography:** Segoe UI Variable (Microsoft Fluent) with system fallbacks. Renders natively on Windows 11+.
- **Color palette:** Light theme. Indigo `#6366F1` (primary), amber `#F59E0B` (accent), cyan `#06B6D4` + pink `#EC4899` (ambient color blobs).
- **Mood:** Modern, light, vibrant. Floating ambient color blobs behind frosted glass surfaces. Subtle motion (14–22s blob drifts).

## Tech stack (to be applied when we scaffold)

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide |
| Auth | Clerk (LinkedIn OAuth + Google + GitHub + email) |
| Database | Neon Postgres + pgvector |
| ORM | Drizzle |
| Object storage | Cloudflare R2 |
| Background jobs | Inngest |
| Email | Resend + React Email |
| AI | Claude Sonnet 4.6 (extraction, matching, coach) + Voyage/OpenAI embeddings |
| Analytics | PostHog |
| Errors | Sentry |
| Hosting | Vercel (web) + Cloudflare (files/CDN) |

**Estimated MVP cost:** ~$80–$200/month.

## Compliance baseline

- **DPDP Act 2023** — granular per-purpose consent, right-to-erase enforced.
- No user data resale, ever.
- All PII encrypted at rest and in transit.
- Audit log on every recruiter-side access to candidate data.

## Project state — as of 2026-05-15

| What | Status |
|---|---|
| Brainstorm / strategy docs | ✅ Captured |
| Vision, positioning, personas | ✅ Written (`docs/VISION.md`) |
| Decisions log | ✅ 12 decisions logged (`docs/DECISIONS.md`) |
| Stack plan | ✅ Written (`docs/STACK.md`) |
| Landing page mockup | ✅ Built (`index.html`, v0.2 Liquid Glass) |
| Brand name finalized | 🟡 Working name "HireGEN" — placeholder |
| Next.js scaffold | ⏳ Not started |
| Feature #1 (Profile) | ⏳ Not started |
| Feature #2 (Skill validation) | ⏳ Not started |
| Feature #3 (Matching) | ⏳ Not started |
| Feature #4 (Recruiter dashboard) | ⏳ Not started |

## File structure

```
D:\HireGEN\
├── README.md                  ← project overview
├── index.html                 ← landing page mockup (Liquid Glass + Segoe UI)
└── docs\
    ├── DECISIONS.md           ← 12 decisions logged, 10 parked
    ├── STACK.md               ← infrastructure plan
    ├── VISION.md              ← positioning + personas + win conditions
    └── CONTEXT-AND-PROMPT.md  ← this file
```

## Key decisions made (summary — see `docs/DECISIONS.md` for full rationale)

| # | Decision |
|---|---|
| D-001 | Position as LinkedIn complement, not replacement |
| D-002 | India-first market focus |
| D-003 | Working name "HireGEN" (placeholder) |
| D-004 | MVP scoped to 4 features only |
| D-005 | UI direction: modern minimalism, generous whitespace |
| D-006 | Color system: light theme, indigo + amber + cyan + pink |
| D-007 | ~~Typography: Inter + Instrument Serif~~ → superseded by D-012 |
| D-008 | Frontend: Next.js 14 + Tailwind + shadcn/ui |
| D-009 | Build HTML mockup first, then scaffold Next.js |
| D-010 | Free for candidates forever, recruiters pay per accepted intro |
| D-011 | Visual language: Liquid Glass / Glassmorphism |
| D-012 | Typography: Segoe UI Variable (Microsoft Fluent) |

---

# PART 2 — The Build Prompt

*(This is the effective prompt that produced the current `index.html`. Paste this into a fresh AI session along with Part 1 above to regenerate or evolve the landing page.)*

## How to use this prompt

1. Open a new AI session (Claude, ChatGPT, etc.).
2. Paste **Part 1 (Application Context)** above as the first message — gives the AI full project context.
3. Paste **the prompt below** as the build instruction.
4. The AI should produce a single-file `index.html` matching the current mockup.

---

## The Prompt

```
Build a single-file HTML landing page for HireGEN — an AI-enabled, India-first
skill-validated hiring platform that complements LinkedIn (not replaces it).

The brand is positioned as:
"LinkedIn shows who you are. HireGEN proves what you can do."

One-line vision: "The fastest path from skill → job."

=== TECHNICAL CONSTRAINTS ===

- Single self-contained index.html file (no build step, no separate CSS/JS files).
- Use Tailwind CSS via CDN (cdn.tailwindcss.com).
- No external font requests — use system font stack (see typography below).
- Must work by double-clicking the file; no dev server required.
- Mobile-responsive.

=== VISUAL LANGUAGE: LIQUID GLASS / GLASSMORPHISM ===

Match the design vocabulary of iOS 26 Liquid Glass, Android 16 Material You
Expressive, and Microsoft Fluent 2 (Windows 11 Mica/Acrylic).

Concrete ingredients required on every glass surface:

1. **Frosted backdrop:** backdrop-filter: blur(24px) saturate(180%) on
   white at 55% alpha (rgba(255,255,255,0.55)).
2. **Specular sheen:** ::before pseudo with linear-gradient(180deg,
   rgba(255,255,255,0.55) 0%, transparent 35%) — the bright top-edge
   highlight that makes glass read as glass.
3. **Refractive rim:** ::after pseudo with box-shadow:
   inset 0 0 24px rgba(255,255,255,0.18) — subtle inner glow.
4. **White border at 55% alpha** + inset white top-edge highlight via
   box-shadow: inset 0 1px 0 rgba(255,255,255,0.75).
5. **Vibrant colorful backdrop** that the glass refracts. Use 4 floating
   animated radial-gradient blobs in indigo, amber, cyan, pink. The page
   body background should ALSO have 4 large radial gradients in those colors.
   Without colorful content behind the glass, blur has nothing to blur.

Define four glass tiers:
- .glass — standard cards (most of the page)
- .glass-soft — nested elements inside other glass surfaces
- .glass-strong — hero panel + featured sections (heavier blur, higher opacity)
- .glass-dark — CTA banner (dark glass on bright backdrop)

Add subtle floating animations on the blobs (14–22 second ease-in-out loops)
to suggest light moving behind the glass.

=== TYPOGRAPHY: MICROSOFT FLUENT ===

Use Segoe UI Variable with system fallbacks. NO webfont requests.

font-family: 'Segoe UI Variable', 'Segoe UI', -apple-system,
             BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif;

Define a .display class for headlines using:
  font-family: 'Segoe UI Variable Display', 'Segoe UI', -apple-system, sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.04;

Gradient text effect for hero key phrases — use background-clip: text with
a gradient from indigo → cyan → pink → amber.

=== COLOR TOKENS ===

Configure tailwind.config.theme.extend.colors:
- ink: 900=#0B1020, 800=#1A2236, 700=#334155, 500=#64748B, 300=#CBD5E1,
       200=#E2E8F0, 100=#F1F5F9, 50=#F8FAFC
- brand (indigo): 50=#EEF2FF, 100=#E0E7FF, 300=#A5B4FC, 500=#6366F1,
                  600=#4F46E5, 700=#4338CA
- accent (amber): 500=#F59E0B, 600=#D97706
- cyan: 500=#06B6D4
- pink: 500=#EC4899

=== PAGE STRUCTURE (top to bottom) ===

1. **Sticky floating glass nav** — floats 12px from top, capsule shape,
   contains logo (gradient H mark + "HireGEN" wordmark + "India · Beta" chip),
   nav links (How it works, Features, Companies, Candidates, FAQ),
   Sign in link, dark "Get started" primary button.

2. **Hero section** with:
   - Chip with pulsing dot: "Built for the AI-era job market"
   - H1 (display class): "Get hired on what you [GRADIENT]can do.[/GRADIENT]
     Not what you [italic gray]wrote.[/italic gray]"
   - Subhead: "HireGEN turns proof — projects, skills, validated tests —
     into your career identity. Companies see only the qualified.
     You stop applying into the void."
   - Two CTAs: primary dark "Create your skill profile →" + glass
     "I'm hiring →"
   - Fine print: "Free for candidates. Forever. No résumé spam."
   - Below CTAs, a glass-strong panel containing 3 glass-soft preview cards:
     a) Candidate card — avatar (PA), "Priya A. · B.Tech · Hyderabad",
        92 match chip, 3 skill scores (React 94, Python 88, SQL 81),
        "3 verified projects · 2 skill tests"
     b) Match panel — "Frontend Engineer · Razorpay", Remote · ₹18-26 LPA,
        Skill fit 94% gradient bar, Intent signal 88% gradient bar,
        dark "Request intro" button
     c) AI Career Coach — star icon, message: "You're 1 verified project
        from unlocking Senior roles. Suggested: ship a system-design case
        study." Two chips: "+12% match", "~3 hrs"

3. **Logo strip** — glass-soft container with horizontal marquee of
   illustrative company names (Razorpay, Zerodha, Postman, Cred, Freshworks,
   Zoho — duplicated for seamless loop). Caption: "Trusted by hiring teams
   across India" + small italic disclaimer "Logos shown are illustrative."

4. **Problem section** — 2-column grid:
   - Left: chip "The hiring problem", display H2 "Resumes lie. / Networks
     gate-keep." (second line italic gray), two paragraphs about 1.5M
     Indian graduates and Tier-2/3 invisibility.
   - Right: 2x2 grid of glass stat cards: 73% (resumes lie), 42d (avg
     hire time), 8% (Tier-3 → Tier-1), 100+ (apps per search).

5. **How it works** — chip "How it works", display H2 "Four steps.
   [gradient]Zero spray-and-pray.[/gradient]" Then 4-column grid of glass
   cards with numbered gradient badges (1-4):
   - 1: Build a proof profile
   - 2: Validate with short tests
   - 3: Get matched, not listed
   - 4: Close the loop

6. **Features** — chip "The product", display H2 "Built different.
   [italic gray]From the ground up.[/italic gray]" Then 3-column grid of
   6 glass cards with gradient icon badges:
   - Skill graph, not keywords
   - Intent-based matching
   - AI career copilot
   - Tier-agnostic discovery
   - Verifiable, portable
   - Outcome dashboards

7. **Split section** — 2-column grid of glass-strong cards:
   - LEFT (#companies): indigo chip "For Companies", display H3 "Hire faster.
     With proof.", 3 checked bullet points (Skill-validated shortlist /
     Pay only on accepted intros / Access Tier-2/3 talent), primary dark
     CTA "Start hiring →". Indigo blur blob in background.
   - RIGHT (#candidates): amber chip "For Candidates", display H3 "Be found.
     On merit.", 3 checked bullet points (Free forever / AI coach / No social
     noise), amber gradient CTA "Create profile →". Amber blur blob in
     background.

8. **Testimonial** — single glass-strong card, centered, with quote icon,
   display H2 quote: "We cut tech hiring from [gradient]42 days to 11.[/gradient]
   Quality went up, not down. Half our last cohort came from cities we'd never
   recruited from before." Attribution: "Talent lead, Bangalore-based fintech
   (pilot customer)" + italic disclaimer about illustrative pilot scenario.

9. **CTA section** — glass-dark large card with bright color blobs bleeding
   through (indigo, amber, pink). Display H2: "The fastest path from
   [gradient]skill → job.[/gradient]" Email input + "Get early access" button.
   Caption: "No spam. We'll email when your invite is ready."

10. **FAQ** — chip "FAQ", display H2 "Questions, answered." 4 glass <details>
    accordion items (Is this a LinkedIn replacement? / How do you verify skills?
    / What does it cost? / When is it launching?). Use + icon that rotates 45°
    on open.

11. **Footer** — glass card with 4-column grid:
    - Brand col: logo + tagline
    - Product: For Candidates, For Companies, Skill Library, Pricing
    - Company: About, Blog, Careers, Contact
    - Legal: Privacy, Terms, DPDP Compliance
    Bottom row: © 2026 HireGEN. Made in India. / v0.2 · Liquid Glass mockup

=== BUTTONS ===

Three button styles:
- .btn-primary — dark gradient (#0B1020 → #1A2236), white text, inset white
  top highlight, dark shadow, 12px rounded
- .btn-glass — glass with backdrop blur, dark text, white border
- .btn-accent — amber gradient (#F59E0B → #D97706), white text

=== CHIPS ===

Small pill-shaped glass labels with backdrop blur for category tags
("India · Beta", "How it works", "The product", "For Companies", etc.).
Default text color #4338CA (indigo-700). Amber variant for candidate-side.

=== MICROCOPY RULES ===

- Headlines mix bold gradient phrases with italic-gray emotional anchors:
  "what you [bold gradient]can do[/bold gradient]. Not what you
  [italic gray]wrote[/italic gray]."
- Always disclose illustrative content (logos, testimonials) as such — don't
  fake credibility.
- Indian context: use ₹, mention Indian cities, reference Tier-2/3.
- No emojis in body copy.
- Tone: confident but not corporate; never "synergize" or "leverage."

=== ACCESSIBILITY ===

- Body text stays at ink-900 (#0B1020) for >15:1 contrast on white.
- All interactive elements have hover states.
- Glass surfaces never have body text directly on the most saturated parts
  of the colored backdrop.

=== DELIVERABLE ===

A single index.html file. Self-contained. Opens in any modern browser by
double-clicking. No installs, no build step, no dependencies beyond
Tailwind CDN.
```

---

## How to evolve this prompt

When you want to change the landing page in the future, edit this prompt and rerun. Key levers:

| Want to change... | Edit this part of the prompt |
|---|---|
| Color palette | "COLOR TOKENS" section |
| Visual language (less glass, more flat, etc.) | "VISUAL LANGUAGE" section |
| Font (back to Inter, etc.) | "TYPOGRAPHY" section |
| Page sections / order | "PAGE STRUCTURE" section |
| Tone of voice | "MICROCOPY RULES" section |
| Add/remove a feature card | The Features list in "PAGE STRUCTURE" item 6 |

When you scaffold the real Next.js app, this prompt becomes the **design spec** — it describes exactly what the production components must look like. Each section maps to a real component file.
