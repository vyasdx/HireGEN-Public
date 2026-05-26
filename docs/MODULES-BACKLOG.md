# HireGEN — Modules Backlog & Feature Specs

> Captured product modules and extensions beyond the initial 4-feature MVP.
> Each entry has: idea, why it matters, scope, dependencies, MVP/v2/v3 classification, and open questions.
> Source: founder brain-dump session, 2026-05-16 morning.

**Last updated:** 2026-05-16
**Status:** Active backlog — pending MVP scope re-decision

---

## Summary table

| # | Module | Type | Proposed phase | Affects |
|---|---|---|---|---|
| M-A | Dual persona system: Student vs Employee | Foundational | **MVP** (rescopes existing features) | F1, F3, F4 |
| M-B | Anti-cheat & proctored validation | Extension of F2 | **MVP** (required for trust) | F2 |
| M-C | Dynamic test-environment spin-up | Extension of F2 | **MVP** (required for trust) | F2 |
| M-D | Git portfolio analyzer | Extension of F1 | **MVP** | F1, F2 |
| M-E | Resume Builder + Career Guide | New standalone module | **v2 (post-MVP)** but built as traction wedge | New |
| M-F | "AI Impact on Jobs" visualization | New standalone module | **v2 (post-MVP)** — marketing surface | New |

Legend: **F1** = Proof Profile · **F2** = Skill Validation · **F3** = Matching Engine · **F4** = Recruiter Dashboard (from D-004).

---

## M-A · Dual persona system: Student vs Employee

### Idea

Two distinct profile types. Both flow into the same matching engine but are evaluated by different weights and rubrics.

### Why it matters

- A 21-year-old final-year student and a 31-year-old senior engineer cannot be matched on the same axes.
- Different signal types matter for each persona.
- Recruiters hire from each pool for different reasons (campus hire vs. lateral hire).
- This decision affects the data model from day one — retrofitting later is painful.

### Profile dimensions

| Dimension | Student profile | Employee profile |
|---|---|---|
| **Primary signal** | Academic + project + curiosity signals | Hands-on expertise + delivered outcomes |
| **What counts** | Projects, coursework, PhDs, theses, papers, seminars, hackathons, internships, open-source contributions, competitions | Work experience, shipped products, scope of responsibility, management, team size, business impact, certifications |
| **Skill validation depth** | Foundational + applied | Applied + scenario-based + system-design |
| **Time horizon for proof** | Last 6–24 months | Last 3–7 years |
| **Recruiter-side framing** | "Campus / fresher / early-career hire" | "Lateral / experienced / leadership hire" |
| **Salary expectation source** | Market band for fresher segment | Self-reported, sanity-checked vs market |

### Implications for existing features

- **F1 (Proof Profile):** Two parsers, two onboarding flows.
- **F3 (Matching):** Two ranking models (or one model with persona weighting).
- **F4 (Recruiter Dashboard):** Toggle / filter for "Student pool" vs "Experienced pool". Some recruiters only want one.

### Open questions

1. Does a 1-year-experience candidate count as Student or Employee? (Suggested: candidate chooses, with hint from data — past 2 years primarily academic = Student.)
2. Can a profile shift from Student to Employee over time? (Suggested: yes, auto-suggest after 18 months of continuous employment.)
3. Do we expose this taxonomy to candidates as "Student / Employee" or use friendlier terms like "Early Career / Experienced"?

---

## M-B · Anti-cheat & proctored validation

### Idea

Skill validation tests must be cheat-resistant. Recruiters will not trust scores that can be Googled or LLM-generated.

### Required policies

1. **Typed-only questions** — disable paste on certain answer fields. Track keystroke cadence to detect copy-paste even via screenshots/OCR.
2. **AI-generated text detection** — run candidate's submitted prose through a detector (perplexity-based, watermark detection where available, semantic-pattern analysis).
3. **Lab-tested questions** — flag specific questions as requiring a live coding/sandbox environment (no external internet, no LLM access).
4. **Webcam / proctor signals** (optional, opt-in for higher-trust roles) — face presence, multiple-person detection, screen-share monitoring.
5. **Time-banded sessions** — most questions answered in a single session with a hard time limit.
6. **Per-attempt randomization** — question pool of 5–10x the test size; each candidate gets a unique subset.
7. **Honor declaration** — explicit attestation per session (legally meaningful in DPDP framework).

### How this composes with M-C (test environment)

The anti-cheat policy is what makes the test environment trusted. Without enforcement, the environment is just a fancy IDE.

### Open questions

1. Do we offer "low-trust quick test" + "high-trust proctored test" as two tiers? (Recruiter chooses which they trust.)
2. Is AI-text detection reliable enough to gate decisions, or only to flag for human review? (Recommended: flag-only, never auto-reject.)
3. What's our policy for false positives? (Recommended: candidate can request human re-review; result hold until reviewed.)
4. Do we publish our anti-cheat methodology publicly? (Recommended: yes — transparency builds recruiter trust.)

---

## M-C · Dynamic test-environment spin-up

### Idea

Based on a candidate's profile and the role they're being validated for, spin up a small isolated testing environment specific to the assessment.

### Example flows

- **Frontend candidate validating React:** Sandbox with starter app, candidate ships a component with constraints (no copy-paste, no external internet, time-banded).
- **Backend candidate validating API design:** Containerized environment with a problem spec, candidate implements an endpoint, automated tests run on submission.
- **Data engineer:** Sandbox with a sample dataset, candidate writes transformations, output is graded.
- **System design:** Whiteboard-like canvas with structured prompts and timed sections.

### Technical components needed

| Component | Purpose | Suggested tech |
|---|---|---|
| Per-candidate sandbox | Isolated runtime, ephemeral | StackBlitz WebContainers / CodeSandbox SDK / Gitpod / E2B sandbox |
| Test runner | Auto-grade submissions | Vitest / Jest / Pytest in container |
| Recording layer | Replay session for human review | rrweb (DOM replay) + keystroke log |
| AI judge | Code quality + approach review | Claude Sonnet 4.6 |
| Anti-cheat hooks | Tied to M-B policies | Custom |

### Cost model

Each test = one ephemeral container for ~30 min. At scale this is the most expensive part of the platform. Pricing model must price this in (e.g., recruiter pays for premium "lab-tested" candidate flag, not the candidate).

### Open questions

1. Build sandbox infra in-house or use a vendor (E2B is built for AI agent sandboxing and is the most relevant)?
2. Should sandboxes be reused across candidates (templated) or fully fresh each time?
3. How do we handle test infrastructure failures mid-session (don't penalize candidate)?

---

## M-D · Git portfolio analyzer

### Idea

Every candidate is expected to maintain a Git portfolio. We analyze it as part of the proof profile and skill validation.

### What we analyze

| Signal | Why it matters |
|---|---|
| Repo authorship — who actually wrote the code | Detect ghost-authored or forked-only profiles |
| Commit cadence + recency | Active developers signal active skill |
| Language / framework breakdown | Validates self-reported skill stack |
| Project complexity | Lines, files, dependencies, architectural patterns |
| Code quality | Static analysis, complexity, test coverage |
| README + docs quality | Communication ability |
| Issue / PR participation | Collaboration signal |
| External contributions (PRs to other repos) | Open-source credibility |
| AI-generated code patterns | Distinguish "ships with help" vs "generated wholesale" |

### Founder note

> "I have tools for this already — we need to modify."

→ **Action:** Founder to share existing analyzer tool/code. Decision: extend that codebase vs. greenfield rebuild based on what's already there.

### Open questions

1. **GitHub-only or also GitLab/Bitbucket/Codeberg?** (Suggested: GitHub first, others post-MVP.)
2. Do we support private repos via OAuth? (Suggested: yes — many candidates have meaningful private work.)
3. How do we handle the AI-generated code question — penalize, neutral, or evaluate the human's curation/integration ability? (Suggested: neutral on AI use, evaluate integration + understanding.)
4. Do we expose the analyzer publicly as a "free GitHub audit" lead magnet?

---

## M-E · Resume Builder + Career Guide

### Idea

A standalone module — and likely the **best traction wedge before the matching marketplace has liquidity**.

### Flow

1. User uploads resume (PDF / DOCX / LinkedIn export).
2. User states **target role** + **target technology / domain** + **target timeline** (e.g., "Senior Backend Engineer with Go + Distributed Systems, in 6 months").
3. HireGEN produces a structured **Career Plan** document:

### Output sections

| Section | Content |
|---|---|
| **Profile snapshot** | What you have right now — skills, projects, experience, validated strengths |
| **Ambition fit score** | 0–100 score of how close the current profile is to the target role |
| **Technical gap** | Specific skills missing or weak, ranked by criticality for the target role |
| **Learning path** | Courses + tutorials + books, ordered by what to learn first, with estimated hours |
| **Hands-on projects** | 2–4 portfolio projects the user should build to demonstrate the target skills |
| **3-month plan** | Week-by-week milestones for the next 90 days |
| **6-month plan** | Month-by-month for 180 days |
| **Market evidence** | Live JD analysis showing what the target role actually requires (scraped from real listings) |
| **Salary band** | Realistic expected salary for the target role + city |
| **Affiliated training** | (Future) links to partnered providers with disclosed affiliate commission |

### Why this is the right traction wedge

- **Standalone value** — works even with zero marketplace liquidity.
- **Distribution lever** — anyone with a resume is a potential user. SEO + "free career audit" pulls traffic.
- **Funnels into HireGEN proper** — once they complete a learning plan and build proof, they're a high-quality candidate for the matching engine.
- **Builds recruiter trust indirectly** — candidates who used the career guide arrive with verified gaps closed.

### Reuses

- Skill graph (from F1)
- Market data (live JD scraping)
- Git analyzer (M-D) if user links GitHub
- AI reasoning (Claude Sonnet 4.6) for the plan generation
- Skill validation (F2) as the "verify your progress" loop

### Monetization paths

- **Free tier** — basic plan (single output, no save, no progress tracking).
- **Premium** — saved plans, weekly progress check-ins, AI tutor chat, partner course discounts.
- **Affiliate** — disclosed commission on partnered training (Coursera, Scaler, GreatLearning, etc.)

### Open questions

1. Should this be a standalone product subdomain (e.g., `plan.hiregen.com`) or a feature inside HireGEN proper?
2. Free forever, or paywall after first plan?
3. Do we let users *share* their plans publicly (viral mechanic) or keep private by default?
4. JD scraping ethics + legality — partner with Naukri/Indeed via API, or scrape? (Strong preference: official partnerships only.)

---

## M-F · "AI Impact on Jobs" Visualization Module

### Idea

A separate, marketing-forward module. Futuristic, data-driven UI showing how AI is impacting different jobs and job functions.

### Output dimensions

- **Job → AI exposure heatmap** — every job role, shaded by AI impact intensity
- **AI feature → affected job functions** — which capabilities (code-gen, summarization, image-gen, agentic flows) impact which roles
- **Trend lines** — how impact has changed quarter over quarter
- **Geography filter** — India vs. US vs. global
- **"Your job" view** — user enters role, sees personalized impact + adjacent safer roles
- **Beneficiaries view** — which jobs are *expanding* because of AI (not just shrinking)

### Why this matters

1. **Marketing** — viral-worthy, shareable, press-friendly. Free traffic.
2. **Authority signal** — positions HireGEN as the company that *understands* the AI labor market.
3. **Strategic moat** — the data we collect from users running this tool becomes a feedback loop for the matching engine.
4. **Synergy with Layoff Forensics sibling product** — the same data backbone serves both surfaces.

### Reuses

- Same data sources as the planned **Layoff Forensics** sibling product (see `Layoff-Forensics-Brief.md` in source brainstorms).
- BLS / NSO occupational data
- Job posting trends (from F3 matching infra)
- AI capability tracking (manually curated v1, automated v2)

### Open questions

1. Build standalone or integrate with Layoff Forensics roadmap?
2. Public free tool (lead-gen) or gated dashboard (B2B)?
3. India-only data at launch, or global?

---

## Implications for the MVP scope decision

The original D-004 locked MVP at exactly 4 features. With these additions, we need to choose:

### Option A — Stay narrow (recommended for speed)

**MVP keeps 4 features.** New modules go to v2.

- ✅ Faster to market.
- ✅ Validates core thesis first.
- ❌ Loses the M-E (Career Guide) traction lever.

### Option B — Expand MVP to include the traction lever

**MVP becomes 5 features:** original 4 + **M-E Career Guide** as the wedge that pulls traffic before marketplace liquidity exists.

- ✅ Solves the marketplace cold-start problem (Codex's #1 risk).
- ✅ Career Guide can launch independent of matching engine working.
- ❌ Longer build time before first launch.
- ❌ Risk of feature dilution.

### Option C — Sequence (recommended overall)

**Launch in two waves.**

- **Wave 1 (MVP, 90 days):** F1 (with M-A persona split + M-D Git analyzer baked in) + F2 (with M-B anti-cheat + M-C test env baked in) + M-E Career Guide. Total: 3 surfaces, but the heavy lifting in F1/F2 is foundational.
- **Wave 2 (90–180 days):** F3 Matching + F4 Recruiter Dashboard. Marketplace launches once supply is real.
- **Wave 3 (180+ days):** M-F AI Impact viz (marketing surface, sibling to Layoff Forensics).

**Why I recommend C:** Career Guide is a user magnet without needing recruiters. The Git analyzer + persona split + anti-cheat are foundational and can't be retrofitted cleanly. F3/F4 only matter once F1/F2 + Career Guide have created supply quality.

---

## Open decisions needed from founder

1. **Persona terminology** — "Student / Employee" internally, "Early Career / Experienced" externally? Or other?
2. **Anti-cheat trust tier** — single-tier or two-tier (quick test vs. lab-tested)?
3. **Test sandbox infra** — build in-house or partner with E2B / StackBlitz / CodeSandbox?
4. **Git analyzer existing tool** — share repo / link so we can decide extend vs. rebuild.
5. **Career Guide launch** — standalone subdomain or feature inside main app?
6. **JD data source** — partner-only (Naukri / Indeed API) or scraping fallback acceptable?
7. **AI Impact module** — own product or merged with Layoff Forensics?
8. **MVP scope** — Option A, B, or C above?

---

## Update log

| Date | Update | Author |
|---|---|---|
| 2026-05-16 | Initial backlog capture from founder brain-dump | Claude (Vyas dictation) |
