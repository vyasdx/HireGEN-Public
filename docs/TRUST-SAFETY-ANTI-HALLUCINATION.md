# HireGEN - Trust, Safety, and Anti-Hallucination Plan

> Living document for how HireGEN protects candidate data, recruiter trust, and AI output reliability.

**Created:** 2026-05-26  
**Status:** MVP baseline  
**Owner:** Codex + Claude Code  

---

## 1. Product Trust Principle

HireGEN should not help candidates look better than they are.

HireGEN should help candidates prove what they can actually do.

Every product surface should separate:

- Candidate-claimed information
- AI-inferred information
- Evidence-backed information
- HireGEN-verified information

This is the core difference between HireGEN and a resume builder.

---

## 2. Current MVP Security Posture

### Already Implemented

| Area | Current Control |
|---|---|
| Secrets | `.env.local`, `.env*`, and `.vercel/` are gitignored. |
| Production secrets | `OPENAI_API_KEY` and `OPENAI_MODEL` are stored in Vercel environment variables, not committed to Git. |
| Transport security | Vercel production deployment uses HTTPS. |
| API validation | `/api/skill-graph` validates request body with Zod. |
| Output validation | OpenAI structured output is parsed and validated before rendering. |
| Data persistence | MVP does not store candidate resume data in a database yet. |
| Demo transparency | Demo profile data is labeled using the DemoChip pattern. |

### Still Pending Before Real Public Users

| Area | Needed Control |
|---|---|
| Authentication | Clerk auth for candidates and recruiters. |
| Authorization | Role-based access: candidate, recruiter, admin. |
| Rate limiting | Per-IP and per-user limits on `/api/skill-graph`. |
| Abuse prevention | CAPTCHA or bot protection for unauthenticated form submission. |
| Consent | Clear consent before processing resumes, GitHub, and project links. |
| Privacy rights | Delete/export profile data flow. |
| Audit logs | Recruiter profile views and validation events should be logged. |
| Storage security | Encrypt or provider-secure PII at rest once Neon/R2 persistence lands. |
| Data retention | Auto-delete unverified draft profiles after a defined retention window. |

MVP conclusion:

> Safe enough for a hackathon demo and invited testers. Not yet ready for broad public launch.

---

## 3. Anti-Hallucination Controls

### Current Controls

| Layer | Control |
|---|---|
| Prompt | The model is explicitly told not to invent employers, degrees, repos, links, or lab results. |
| Structured output | OpenAI must return a defined JSON shape. |
| JSON schema | Required fields and minimum lengths are enforced in the schema sent to OpenAI. |
| Zod validation | Final server-side validation rejects malformed output. |
| Evidence normalization | Empty evidence refs are replaced with the supplied GitHub URL, project link, or "candidate supplied resume evidence" instead of silently showing blank proof. |
| Fallback handling | If OpenAI fails, the app returns deterministic local output labeled as fallback. |
| Badge language | Badges distinguish awarded vs locked states. Lab Proof stays locked until actual validation exists. |

### Important Limitation

The current MVP can structure claims, but it does not fully verify them yet.

That means a skill based only on resume text should be treated as:

> Candidate-claimed / AI-structured

Not:

> HireGEN-verified

---

## 4. Evidence Confidence Model

Each skill should eventually carry an evidence level.

| Level | Meaning | Example |
|---|---|---|
| L0 - Claimed | Candidate wrote it, not externally checked. | Resume says "React". |
| L1 - Referenced | Candidate provided a link or project context. | GitHub URL or project URL supplied. |
| L2 - Parsed | HireGEN read the source and found matching evidence. | Repo contains React + recent commits. |
| L3 - Defended | Candidate explained or defended the work. | Project defense Q&A. |
| L4 - Lab Verified | Candidate passed a controlled validation. | Timed lab, final diff, test result. |

Recruiter surfaces should show the evidence level next to every key skill.

---

## 5. Badge Safety Rules

Badges are not decoration. They are trust claims.

Existing badge documentation lives in:

- `docs/BADGE-SYSTEM.md`
- `assets/badges/`

Initial badge assets:

- `hiregen-badge-git-verified.svg`
- `hiregen-badge-lab-proof.svg`
- `hiregen-badge-project-builder.svg`
- `hiregen-badge-skill-graph.svg`
- `hiregen-badge-ai-ready.svg`
- `hiregen-badge-career-bridge.svg`

### Badge Rules

| Badge | Safe MVP Meaning | Must Not Claim Until |
|---|---|---|
| Git Verified | GitHub URL was supplied or connected. | Ownership and repo analysis are implemented. |
| Skill Graph | A structured skill graph was generated. | High-confidence evidence scoring is implemented. |
| Project Builder | Candidate supplied project links. | Project quality and authorship are analyzed. |
| Lab Proof | Locked in MVP. | Controlled lab validation is implemented. |
| AI Ready | Locked or low-confidence unless evidence exists. | Candidate completes AI workflow task. |
| Career Bridge | Roadmap generated. | Progress milestones are tracked. |

Candidate-facing rule:

> Stricter validation increases recruiter trust. We protect your proof.

---

## 6. Logo and Brand Assets

Yes, HireGEN already has logo concepts.

Logo assets live in:

- `assets/logos/`

Current concepts:

- `hiregen-logo-01-proofmark.svg`
- `hiregen-logo-02-skillgraph.svg`
- `hiregen-logo-03-verified-h.svg`
- `hiregen-logo-04-talent-signal.svg`
- `hiregen-logo-05-lab-proof.svg`
- `hiregen-logo-concepts-preview.png`

### Recommended Use

| Asset Type | Where To Use |
|---|---|
| Full HireGEN logo | Navbar, landing hero, pitch page, social preview. |
| Icon-only proofmark | Favicon, app icon, small navigation mark. |
| Badge icons | Candidate profile proof badges and recruiter cards. |

The current app still uses a simple text/letter `H` mark in the navbar. A future UI pass should replace it with the chosen SVG logo from `assets/logos/`.

---

## 7. Hallucination-Safe Copy Rules

Avoid unsafe phrases:

- "Verified React expert" unless lab/Git validation exists.
- "Proven production experience" unless employer/project evidence exists.
- "Guaranteed job match."
- "AI-certified candidate."

Prefer safer phrases:

- "Candidate-claimed skill."
- "Evidence-backed signal."
- "GitHub evidence supplied."
- "Lab Proof pending."
- "Structured from resume and project links."
- "Needs verification before recruiter trust badge."

---

## 8. Near-Term Implementation Backlog

| Priority | Task |
|---|---|
| P0 | Add trust labels per skill: Claimed, Referenced, Parsed, Lab Verified. |
| P0 | Add rate limiting to `/api/skill-graph`. |
| P0 | Add privacy consent checkbox before resume submission. |
| P1 | Replace navbar `H` mark with selected logo SVG. |
| P1 | Add evidence drawer in profile view. |
| P1 | GitHub parser: ownership, repo history, language/framework detection. |
| P1 | Recruiter view: show confidence and source type per skill. |
| P2 | Validation Lab policy tags: `typed_required`, `paste_blocked`, `lab_required`, `repo_based`. |
| P2 | DPDP-aligned privacy document and delete/export flow. |

---

## 9. Update Log

| Date | Update | Author |
|---|---|---|
| 2026-05-26 | Initial safety and anti-hallucination baseline documented after Vercel deployment. | Codex |
