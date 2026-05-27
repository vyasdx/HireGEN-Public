# HireGEN - Resume/JD Stress Test Plan

**Last updated:** 2026-05-27  
**Purpose:** Validate whether HireGEN produces honest, useful skill graphs across candidate types, target roles, and evidence quality.

---

## 1. Testing Principle

Use only:

- Public datasets with clear license terms.
- Open resume schemas/samples.
- Synthetic resumes created for testing.
- User-owned resumes with explicit permission.

Do not use:

- Random resumes scraped from Google, LinkedIn, Naukri, Indeed, company sites, or personal pages.
- Any resume with phone/email/address unless it is synthetic or already safely anonymized.
- Any dataset whose license is unclear.

The goal is not to train on private resumes. The goal is to stress the product behavior.

---

## 2. Candidate Sources To Use

| Source | Use | Notes |
|---|---|---|
| Kaggle public resume datasets | Bulk category coverage | Verify license on each dataset before download. Prefer CC0/public-domain datasets. |
| Hugging Face resume datasets | Resume classification / structured samples | Use only datasets with clear license and no sensitive PII. |
| JSON Resume | Open schema and sample profile structure | Good for clean synthetic and structured test resumes. |
| Synthetic resumes | Edge cases and controlled expectations | Best for privacy-safe stress tests. |
| Founder/user-provided resumes | Realistic manual checks | Use only with explicit consent and avoid committing raw PII. |

Candidate public dataset references:

- Kaggle "Updated Resume Dataset" - public resume classification dataset; listed as CC0/Public Domain at `https://www.kaggle.com/datasets/jillanisofttech/updated-resume-dataset`.
- Hugging Face resume dataset index - useful discovery surface at `https://huggingface.co/datasets?other=resume`; license must be checked per dataset before use.
- JSON Resume - open-source resume schema at `https://jsonresume.org/schema` and `https://docs.jsonresume.org/schema`; best source for clean synthetic structured resumes.
- Kaggle dataset metadata - Kaggle datasets expose license metadata; use that license field before importing any resume data.

---

## 3. Target Role/JD Set

Use 6 target job descriptions:

| ID | Role | Why |
|---|---|---|
| JD-001 | Frontend Engineer | Tests direct GitHub/project proof and UI/project evidence. |
| JD-002 | Backend Engineer | Tests APIs, databases, testing, deployment evidence. |
| JD-003 | Cloud/DevOps/SRE Engineer | Tests infra, operations, incidents, observability, cloud transfer. |
| JD-004 | Senior AI Systems Engineer / AIOps | Tests transferable ops-to-AI logic and high-gap penalties. |
| JD-005 | Data Analyst | Tests student/fresher analytics, SQL, Python, dashboarding. |
| JD-006 | Product/Business Analyst | Tests non-code career transition and soft-skill evidence. |

Use real-looking but synthetic JDs first. Later, use publicly posted JDs only by pasting limited excerpts and recording source URL.

---

## 4. Resume Mix

Minimum useful batch: 12 resumes.

| Type | Count | Expected behavior |
|---|---:|---|
| Student/fresher | 2 | Emphasize projects, coursework, internships, seminars, papers, labs. |
| Junior developer | 2 | Emphasize GitHub, shipped projects, tests, live demos. |
| Senior employee | 2 | Emphasize professional experience, impact, leadership, domain depth. |
| Career transition | 2 | Separate direct match, logical transfer, and missing proof. |
| Cloud/DevOps/SRE | 2 | Reward ops evidence; require validation for target-specific gaps. |
| Weak/noisy resume | 2 | Avoid hallucination; surface missing proof and improve-profile advice. |

---

## 5. Stress-Test Scorecard

For each run, capture:

| Field | Example |
|---|---|
| Test ID | HG-ST-001 |
| Resume source | Synthetic / Kaggle / Hugging Face / User-owned |
| Candidate type | Student / Employee / Transition |
| Target role | Senior AI Systems Engineer |
| GitHub supplied? | Yes/No |
| Live project links supplied? | Yes/No |
| Mode | Profile baseline / Target-role gap |
| Match score | 39 |
| Good extraction | AIX, Linux, Azure, RCA captured |
| Bad extraction | Missed certifications |
| Hallucination found? | Yes/No |
| Score feels fair? | Yes/No |
| Gaps useful? | Yes/No |
| Recruiter view useful? | Yes/No |
| Fix needed | Improve certification extraction |

Pass criteria:

- No invented employers, degrees, certifications, repos, or lab results.
- Resume skills and current role are captured before GitHub assumptions.
- Target-role mode scores required skills, not just resume strengths.
- High-priority gaps reduce score.
- Weak GitHub/project evidence is called out honestly.
- Student and employee profiles are evaluated differently.

---

## 6. Known Risk Areas To Watch

1. Score inflation for senior candidates with strong unrelated experience.
2. Score inflation when GitHub is missing or poorly structured.
3. Generic advice such as "learn frontend" when not role-relevant.
4. Missing certifications or current role from resume.
5. Treating target JD keywords as candidate skills.
6. Over-penalizing transferable skills.
7. Weak student profiles looking equal to experienced profiles.
8. Hallucinated badges.
9. Roadmaps that are too generic.
10. Recruiter cards that do not explain "why this person".

---

## 7. Recommended Execution

Day 3:

- Build 12-test matrix.
- Run 3 manual tests first.
- Record bugs and product-quality issues.

Day 4:

- Run remaining tests.
- Patch extraction/scoring.
- Add validation lab preview.

Day 5:

- Final smoke test.
- Record demo video.
- Submit final package.
