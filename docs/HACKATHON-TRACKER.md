# HireGEN Hackathon Tracker

> Single source of truth for the OpenAI x Outskill AI Builders Hackathon sprint.
> Tracks 16 criteria, dual journeys (founder + user), daily build log, and build-in-public posts.
> Updated by Codex and Claude Code at the end of every working session.

**Hackathon:** OpenAI x Outskill AI Builders
**Sprint:** 2026-05-25 (Mon) → 2026-05-29 (Fri ship) → 2026-05-31 (Sun demo)
**Product:** HireGEN — proof-of-capability hiring platform, India-first
**Founder:** Vyas (Vedavyas Vayalpadu)
**Agents:** Codex + Claude Code
**Last updated:** 2026-05-25 IST

---

## 1. Mission (one paragraph)

HireGEN proves what candidates can do, not what they wrote. In 4 days we ship a working web app where a candidate enters evidence (resume + GitHub + projects + target role), an AI agent turns that evidence into a structured skill graph with confidence scores and proof citations, and a recruiter sees only candidates ranked by verifiable signal — not pedigree. The hackathon MVP proves one core claim: **AI can turn messy candidate evidence into a structured skill graph that recruiters can trust.**

---

## 2. The 16 Boxes — Scoreboard

Status legend: ⬜ Not started · 🟡 In progress · 🟢 Done · 🔵 Documented (architectural story, not code) · ⚪ Out of scope this sprint

| # | Criterion | Status | Self-score (/10) | Evidence / Where it lives | Owner |
|---|---|---|---|---|---|
| 1 | **Automation** | ⬜ | 0 | Planned: Hermes Agent cron-driven feed ingestion (post-MVP) | Codex |
| 2 | **Skills** (agent skill architecture) | ⬜ | 0 | Planned: 5 skills (Skill Graph, Git Portfolio, Career Research, Validation Lab, Recruiter Match) per kickoff notes | Both |
| 3 | **Critical flows** | 🟢 | 9/10 | Live Vercel URL + 5 routes + working `/api/skill-graph` endpoint with production OpenAI smoke test (`mode=openai`). | Both |
| 4 | **Workflows** (multi-step) | 🟡 | 8/10 | Builder supports Profile baseline and Target-role gap modes; resume + GitHub scan + live link scan → structured profile/roadmap. | Codex |
| 5 | **Agents** | 🔵 | — | Hermes Agent locked in DECISIONS.md (D-021 proposed); hackathon demo uses OpenAI direct, production architecture documented in STACK.md | Claude |
| 6 | **Enterprise-level build** | ⬜ | 0 | Auth + scoped data + audit log on recruiter actions (Clerk + Postgres) | Codex |
| 7 | **Innovation** | 🟡 | 8/10 | Proof-of-capability layer now combines resume, GitHub repo quality, live project reachability, badges, and senior target-gap roadmaps. | Both |
| 8 | **Code security** | 🟡 | 5/10 | `.env.example` in repo, real `.env.local` and `.vercel/` gitignored; Vercel env vars set without committing secrets | Both |
| 9 | **Application security** (not hackable) | 🟡 | 3/10 | Zod input validation on `/api/skill-graph` (Codex). Auth + signed sessions + audit log pending. | Codex |
| 10 | **Data privacy** (DPDP Act 2023) | ⬜ | 0 | Write `docs/PRIVACY.md` — granular consent, right-to-erase, no data resale; PII encrypted at rest (Neon native) and in transit | Claude |
| 11 | **User journey** | 🟡 | 8/10 | Live builder supports baseline profile and target-role gap analysis; manual feedback fixed for resume-heavy senior profiles, GitHub, and live projects. | Both |
| 12 | **Creativity & originality** | 🟡 | 7/10 | Liquid Glass + Microsoft Fluent + Zoom-inspired layout = unique synthesis; badges + skill graph + demo chip enforce honesty | Codex |
| 13 | **What problem are we solving?** | 🟢 | 9/10 | Documented in VISION.md + APPLICATION-VIABILITY-REPORT.md: resume noise, network gatekeeping, Tier-2/3 invisibility | Claude |
| 14 | **Scalability story** | 🔵 | — | STACK.md: Vercel edge + Neon Postgres + Hermes Agent on Hostinger; pgvector → Pinecone migration path documented | Claude |
| 15 | **User validation** | ⬜ | 0 | Target: 1–2 developers + 1 recruiter give feedback before Fri ship | Vyas |
| 16 | **1-page Investor Pitch** | 🟡 | 6/10 | Draft live at `/brief` — Problem, Solution, Uniqueness, Demo flow, Why now, Architecture, Business model, Codex usage, Privacy. Polish Wed. | Both |

### Self-honest readiness check (Day 1 start)

- ✅ **3 boxes** already strong (#13, #14, #5 — strategy/architecture)
- 🟡 **3 boxes** partially documented (#7, #12 — through positioning + assets)
- ⬜ **10 boxes** open work for Mon–Fri

Friday-realistic target: **12–14 of 16** boxes meaningfully addressed. The 2–4 that may not land: deep automation (#1), broad workflow orchestration (#4), real user validation at scale (#15) — fine per the kickoff guidance that "momentum over perfection" wins.

---

## 3. The Five Judging Lenses (official, /100)

From the kickoff deck slide 08/20:

| # | Lens | Weight | HireGEN current self-grade |
|---|---|---|---|
| 01 | Technical execution | 25 pts | 0 — no code shipped yet |
| 02 | Usefulness | 25 pts | Strong story, no live proof yet |
| 03 | Creativity & originality | 20 pts | Proof layer + badges = differentiated |
| 04 | **Codex usage** | **20 pts** | Codex is co-architect; needs to be *visible* in commits + brief |
| 05 | Presentation clarity | 10 pts | TBD with `/brief` route + demo video |

> **20% of total score is Codex usage.** Every commit Codex authors and every Codex-driven workflow we use during the sprint is direct judging evidence. Cite Codex contributions explicitly in the brief.

---

## 4. Founder Journey (building experience)

Narrative log of what's happening on the building side — friction, decisions, energy. Updated daily.

### Day 1 — Mon 2026-05-25 (Kickoff)

- 7 PM IST: Official kickoff session attended. Notes captured in `docs/KICKOFF-NOTES-2026-05-25.md`.
- Multi-agent protocol established (Codex + Claude Code session logs).
- Codex token usage at 97% — handoff complete; Claude session 001 logged.
- Founder mood: building-mode. Recovered from "thinking phase" into "shipping phase."
- Decision: clean start, track 16 criteria, dual journey, ship what we can by Friday.
- Open question Vyas is sitting with: scope discipline (don't pivot, don't bloat — kickoff guidance explicit).

### Day 2 — Tue 2026-05-26 (EOD)

**Day 1 finish state (carried into Day 2):**
- Next.js 16.2.6 + TypeScript + Tailwind v4 + Turbopack scaffolded in `web/` (ENH-HIREGEN-007 ✅)
- Liquid Glass design system ported (`globals.css` with @theme tokens, glass primitives, ambient blobs)
- Layout has AmbientBlobs component (4 floating colored blobs behind glass)
- 5 routes built: `/`, `/builder`, `/profile/[id]` (dynamic), `/recruiter`, `/brief`
- Shared components: `Nav`, `Footer`, `DemoChip` (enforces "no fake demos" policy)
- Demo candidate fixture: `lib/demo-data.ts` — Priya A., 9 skills, 6 badges, 3 gaps, 12-week roadmap
- `web/.env.example` documents all keys (OpenAI, Clerk, Neon, GitHub, R2, Resend)
- `npm run build` clean: 5/7 static, 1 dynamic, TypeScript passes
- Root README rewritten to document monorepo layout
- URL strategy proposed: Vercel preview → `hiregen.vercel.app` → `hiregen.niyamkavach.com`

**Day 2 work (Codex + Claude in parallel — multi-agent model live):**

Codex shipped (ENH-HIREGEN-008 + 009):
- `web/src/lib/skill-graph.ts` (245 lines) — skill graph engine logic
- `web/src/lib/skill-graph-schema.ts` (179 lines) — Zod schema for validated AI output
- `web/src/app/api/skill-graph/route.ts` — server route calling OpenAI structured output
- `web/src/components/builder-form.tsx` (144 lines) — interactive builder with real submit
- `web/src/components/profile-report.tsx` (123 lines) — extracted profile rendering
- `web/src/components/generated-profile.tsx` (88 lines) — server-rendered generated view
- `zod ^4.4.3` added as runtime dep
- Refactored `/builder` and `/profile/[id]` to use the new component split

Claude shipped:
- 7 design screenshots captured in `docs/design-screenshots/` for design-direction review
- `web/scripts/screenshot-designs.mjs` — reusable Playwright capture script (playwright NOT in package.json — install transiently)
- `web/public/mockup-liquid-glass.html` + `mockup-enterprise.html` — both mockups served from Next.js so the deployed app can showcase the design history
- `.claude/launch.json` — Claude Preview server config
- Tracker + V-Office EOD updates

**Day 2 EOD verification:** `npm run build` clean, 6 routes + 1 API endpoint, TypeScript ✓, Turbopack 3.4s.

**Founder decision pending overnight:** which design direction to lock for the rest of the sprint (Liquid Glass / Enterprise / Hybrid). Screenshots side-by-side in `docs/design-screenshots/`.

**Day 3 priorities (Wed — MVP CHECKPOINT, 70% target):**
- Founder picks design direction; tune `web/src/app/globals.css` accordingly
- Deploy to Vercel + claim `hiregen.vercel.app` project name
- End-to-end test: paste sample resume → /builder → API → /profile/generated → recruiter view
- Polish `/brief` to be screenshot-ready for the Day-3 1-pager submission
- First build-in-public post (LinkedIn + X)

### Day 3 — Wed 2026-05-27 — **MVP CHECKPOINT (70% target)**
*(to be populated)*

### Day 3 — Wed 2026-05-27 — **MVP CHECKPOINT (70% target)**
*(to be populated)*

### Day 4 — Thu 2026-05-28
*(to be populated)*

### Day 5 — Fri 2026-05-29 — **FINAL SHIP (100%)**
*(to be populated)*

---

## 5. User Journey (product experience)

What a HireGEN candidate or recruiter actually experiences as we build. Each day, document the new step that became live.

### The full target journey (for Friday)

**Candidate path:**
1. Lands on `/` — sees the proof-of-capability pitch
2. Clicks "Get my skill graph" → `/builder`
3. Pastes resume text + GitHub URL + 2–3 project links + target role
4. Submits → AI extracts skills, normalizes them, scores confidence, attaches evidence
5. Sees own structured skill graph at `/profile/[id]`, with strengths, gaps, recommended roadmap, and 2–4 proof badges (Git Verified, Skill Graph, Project Builder, etc.)
6. Can share the link with a recruiter

**Recruiter path:**
1. Lands on `/recruiter` or receives candidate share link
2. Sees candidate proof card: skill graph summary, evidence list, match explanation, red flags
3. Clicks into a skill → sees the evidence backing it
4. Validation lab preview shows how cheating/proof trust is handled

**Brief / pitch path:**
1. `/brief` — 1-page investor/product pitch, accessible to judges

### Day-by-day progress

| Day | Path coverage | Live URL | Demo data labeled? |
|---|---|---|---|
| Mon | Scaffold + all 5 routes built locally (`localhost:3000`) | (local only) | ✅ via `<DemoChip />` on `/profile/demo` + `/recruiter` |
| Tue | All 5 routes + `/api/skill-graph` working; BuilderForm interactive; ProfileReport extracted; 7 screenshots captured for design lock | (local only — Vercel deploy slipped to Wed) | ✅ |
| Wed | Vercel production live; API smoke-tested with OpenAI output; manual browser test pending after office | https://hiregen-swart.vercel.app | ✅ |
| Thu | *(target: badges + validation preview + /brief polish + first build-in-public post live)* | — | — |
| Fri | *(target: polished demo + collected feedback + launch post)* | — | — |

---

## 6. Build-in-Public Drafts

Per the kickoff deck slide 11 — *"90% of products fail because of poor distribution."* Daily posts required.

### Day 1 — Monday post draft

> **Day 1 of #BuildInPublic at OpenAI x Outskill Hackathon**
>
> Project: **HireGEN** — turning candidate evidence into proof-backed skill graphs recruiters can trust.
>
> Not another job portal. Not another resume parser. A proof layer.
>
> Today:
> - Kickoff session at 7 PM IST
> - Co-built with Codex + Claude Code — multi-agent dev model
> - 16-box tracker live, 5 lenses understood
> - Decision locked: ship the candidate-evidence → skill-graph → recruiter-proof path
>
> Tomorrow: Next.js scaffold + first walking skeleton.
>
> Building in the open. Friday is ship day.
>
> #OpenAI #Outskill #HireGEN #BuildInPublic #India

Channels: LinkedIn (primary) + X (secondary). Optional WhatsApp builder channel from Outskill.

### Day 2–5 — drafts to be added daily before posting

---

## 7. Codex Usage Log (judging evidence)

Per Lens 04 (20 pts) — *"Did the builder meaningfully use Codex, not just mention it?"*

| Date | Codex contribution | Commit / artifact |
|---|---|---|
| 2026-05-22 | V-Office onboarding scaffold | `8ec37fa` |
| 2026-05-25 | Hackathon kickoff handoff + badge assets + UI/UX references + multi-agent protocol | `ebd73dc` |
| 2026-05-26 | Skill-graph engine: `/api/skill-graph` route + Zod schema (179L) + engine lib (245L) + BuilderForm (144L) + ProfileReport (123L) + GeneratedProfile (88L). Adds zod^4.4.3 runtime dep. | *staged in EOD commit* |
| 2026-05-26 | Vercel deployment: project `hiregen`, public URL live, Next.js framework override, production OpenAI smoke test fixed and verified. | `https://hiregen-swart.vercel.app` |
| 2026-05-26 | Manual-test fix: added Profile baseline vs Target-role gap modes and made skill graph resume-first for senior infrastructure profiles. | `fix(web): make skill graph resume-first` |
| 2026-05-26 | Manual-test fix: GitHub repo scan + live project reachability scan + AIOps/SAP target-gap roadmap. | `fix(web): scan git and live project evidence` |

---

## 8. Open Risks / Decisions

| # | Risk / Decision | Status |
|---|---|---|
| R1 | Two parallel modules backlogs (MODULES-BACKLOG.md + PRODUCT-MODULES-BACKLOG.md) | Reconcile this week |
| R2 | `infra.md` says "Backend: TBD" — needs update for hackathon-simplified architecture | Reconcile before Day 3 |
| R3 | No application code shipped yet — Day 1 starts at 0 lines | Mitigated by full design system + decisions log already locked |
| R4 | OpenAI API vs Claude Sonnet: hackathon judges expect OpenAI usage | Decided — use OpenAI for hackathon, document Claude/Hermes as production architecture |
| R5 | User validation needs 2–3 real testers; Vyas's WhatsApp builder channel is the fastest source | Plan: send link Wed evening after Day-3 checkpoint |
| R6 | "No fake demos" policy (kickoff slide 15) — hardcoded demo data must be clearly labeled | Add "Demo data" chip on /profile/demo and /recruiter |
| R7 | `hiregen.vercel.app` is already taken | Use `hiregen-swart.vercel.app` for immediate demo; point `hiregen.niyamkavach.com` after DNS setup |

---

## 9. Wave 1 Hackathon ENH IDs

New tickets created in `.voffice/issues.md` for the 4-day sprint:

| ID | Title | Priority | Owner |
|---|---|---|---|
| ENH-HIREGEN-007 | Scaffold Next.js 14 + Tailwind + shadcn/ui + Clerk + Neon | P1 | TBD (Codex or Claude) |
| ENH-HIREGEN-008 | Candidate `/builder` flow with resume + GitHub + project inputs | P1 | Codex |
| ENH-HIREGEN-009 | Skill-graph engine via OpenAI structured output (Zod schema) | P1 | Codex |
| ENH-HIREGEN-010 | Recruiter `/recruiter` view with proof card + skill graph + evidence | P1 | Codex |
| ENH-HIREGEN-011 | `/brief` route — 1-page investor pitch | P1 | Both |
| ENH-HIREGEN-012 | `docs/PRIVACY.md` — DPDP Act 2023 compliance baseline | P2 | Claude |
| ENH-HIREGEN-013 | Demo-data chip + "Sample" labeling on fixture profiles | P2 | Either |
| ENH-HIREGEN-014 | Daily build-in-public post (LinkedIn + X) | P2 | Vyas |
| ENH-HIREGEN-015 | Codex usage log section in `/brief` + tracker | P2 | Both |

---

## 10. Daily Tracker Update Protocol

At end of every working session, the active agent (Codex or Claude) MUST update:

1. The relevant 16-box row's status + evidence
2. Founder journey log for that day
3. User journey "Day-by-day progress" row
4. Codex usage log if Codex contributed
5. Build-in-public draft if it's the last session of the day
6. Risks/decisions table if anything new emerged

Then push per V-Office rules.

---

## 11. Update Log

| Date | Update | Author |
|---|---|---|
| 2026-05-25 | Tracker created. 16-box scoreboard, dual journey, and Codex usage log seeded. 9 Wave-1 ENH IDs planned. | Claude Code |
| 2026-05-26 | Day 2 EOD. Codex shipped skill-graph engine + Zod schema + interactive BuilderForm + ProfileReport + GeneratedProfile. Claude shipped 7 design screenshots + reusable Playwright capture script. 16-box scores: Critical flows 8, Workflows 5, App security 3 added. | Codex + Claude Code |
| 2026-05-26 | Vercel production deployment live at `hiregen-swart.vercel.app`; production API smoke test returns `mode=openai`; `hiregen.vercel.app` unavailable. | Codex |
| 2026-05-26 | Manual feedback loop: builder initially over-weighted GitHub; Codex changed extraction to resume-first and deployed fix. | Codex |
| 2026-05-26 | Manual feedback loop: baseline then under-used GitHub/live projects; Codex added repo/link scanning and senior AIOps transition roadmap. | Codex |
