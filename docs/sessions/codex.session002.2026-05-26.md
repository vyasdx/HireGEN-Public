# Codex Session 002 — 2026-05-26

## Starting Context

- Repo was clean on `main`.
- Claude had locked the UI direction to Variant B (Cobalt / Sky).
- Pending item selected: deploy `web/` to Vercel before Vyas left for office.

## Work Completed

- Verified local `OPENAI_API_KEY` exists without printing the secret.
- Confirmed local API smoke test returned `mode=openai`.
- Created Vercel project `hiregen` under `vyas4c3-4341s-projects`.
- Added Vercel production env vars: `OPENAI_API_KEY`, `OPENAI_MODEL`.
- Disabled Vercel SSO deployment protection so the demo URL is public.
- Deployed production app to Vercel.
- Added `web/vercel.json` to force the Next.js framework preset; initial project creation defaulted to `Other`, which served `public/` only and caused 404s.
- Hardened OpenAI structured output handling:
  - Added `minLength` constraints to JSON schema fields.
  - Normalized empty evidence refs before Zod parsing so valid OpenAI responses do not fall back unnecessarily.
- Added `.vercel/**` to ESLint ignores because Vercel generated output was being linted locally.

## Verification

- `npm run lint` ✅
- `npm run build` ✅
- Production `GET /` ✅ `200`
- Production `POST /api/skill-graph` ✅ `status=200; mode=openai; skills=6; badges=6`

## Live URLs

- Production: https://hiregen-swart.vercel.app
- Inspector: https://vercel.com/vyas4c3-4341s-projects/hiregen

## Decisions / Notes

- `hiregen.vercel.app` is already taken on Vercel.
- Use `hiregen-swart.vercel.app` for immediate hackathon testing.
- Next branded URL candidate remains `hiregen.niyamkavach.com`.
- `.vercel/` contains local Vercel metadata and pulled env files; it must stay ignored.

## Next Recommended Actions

- Manual browser test after office: `/builder` → submit sample resume → `/profile/generated`.
- Configure `hiregen.niyamkavach.com` CNAME to Vercel if time allows.
- Polish `/brief` for Day-3 MVP checkpoint.
- Reconcile module backlog docs.

## Evening Follow-Up — Resume-First Fix

Founder tested with a senior infrastructure resume and GitHub URL. The initial output over-weighted GitHub/software skills and missed core resume evidence.

Codex changes:

- Added builder modes:
  - `Profile baseline`: current resume + GitHub profile, default career path.
  - `Target-role gap`: compare profile against a target role/JD.
- Updated OpenAI prompt so resume is primary and GitHub/project links are supplementary proof.
- Rebuilt fallback extractor around enterprise infrastructure skills: AIX, SUSE, PowerHA, Pacemaker, GPFS, VIOS/HMC/LPAR, Azure, SAP/HANA, RCA, health checks, vulnerability remediation, ITIL, datacenter, leadership.
- Normalized long OpenAI badge labels/reasons.
- Redeployed production.

Verification:

- `npm run lint` ✅
- `npm run build` ✅
- Production test returned `mode=openai` and extracted infrastructure skills: UNIX ops, Azure, SAP migrations, IBM AIX, SUSE, GPFS, RCA, PowerHA/Pacemaker.

## Evening Follow-Up — Git / Live Project Evidence + Target Gap

Founder tested again and identified four issues:

- Baseline was now resume-first but under-emphasized GitHub.
- Baseline did not need the `Current or desired direction` field.
- Live completed products like Discipline-M and VidyaSutra should count as project proof.
- SAP Senior AI Systems Engineer target-gap output was too generic for a senior ops-to-AIOps transition.

Codex changes:

- Removed the baseline direction field from the UI.
- Renamed project input to `Live project links` and clarified that completed/live products are valid.
- Added GitHub public repo scanning: repo count, recent repos, README presence, descriptions, homepage, portfolio quality.
- Added live project link scanning: reachability + HTML title extraction.
- Added `evidence_signals` to the OpenAI prompt payload.
- Added post-processing guarantees for `Git Portfolio` and `Live Projects` skills/badges when evidence exists.
- Added portfolio-structure gap when GitHub is weak.
- Added senior AIOps/SAP AI target-gap override for gaps and 12-week roadmap.

Verification:

- `npm run lint` ✅
- `npm run build` ✅
- Production baseline test returned `mode=openai`, `Git Portfolio`, `Live Product Portfolio`, and `Live Projects`.
- Production target-gap test returned senior transition gaps: Python + ML on ops data, RAG over runbooks/incidents, Agentic RCA, production AI services, SAP AI platform bridge.

## Evening Follow-Up — Baseline Drift + Evidence-Based Target Scoring

Founder tested again and identified two product-quality issues:

- Baseline profile produced irrelevant generic advice: `UI/UX in projects`.
- Target-role gap cards were still scored like resume strengths, not as target-required skill matches.

Codex changes:

- Added an infrastructure baseline guardrail so baseline gaps stay focused on proof packaging, infrastructure automation proof, and Lab Proof.
- Replaced generic baseline roadmaps when they drift into frontend/community advice.
- Changed senior AIOps target-gap mode so the skill cards represent target requirements.
- Added direct/logical/missing match behavior:
  - Direct: UNIX/Linux, incident/RCA, technical health checks.
  - Logical transfer: PowerHA/HACMP/Pacemaker/GPFS -> resilient operations; Azure/SAP/HANA -> cloud/SAP operations context.
  - Missing proof: Python + ML on ops data, statistics/anomaly detection, RAG, agentic workflows, production AI service deployment, observability/drift.
- Changed target match scoring so high/medium priority gaps reduce the score.

Verification:

- `npm run lint` ✅
- `npm run build` ✅
- Production target-gap test: score `39`; direct/logical ops matches scored 72-86; missing AI target skills scored 30-40.
- Production baseline test: no UI/UX/frontend drift; gaps are Git/project proof packaging, Infrastructure automation proof, Lab Proof.
