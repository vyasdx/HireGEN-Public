# HireGEN - Hackathon Delivery Plan

> Execution plan for the OpenAI x Outskill AI Builders Hackathon.
> Goal: deliver a credible, working HireGEN MVP after shortlist confirmation.

**Created:** 2026-05-22  
**Status:** Shortlisted confirmed on 2026-05-24  
**Owner:** User + Codex + Claude Code  
**Primary goal:** Ship a working MVP, product brief, and live demo.

---

## 1. Confirmed Hackathon Schedule

The official shortlist email received on 2026-05-24 confirms the schedule below.

All dates are in IST.

| Date | Actual Day | Hackathon Meaning |
|---|---|---|
| 2026-05-24 | Sunday | Shortlist confirmed |
| 2026-05-25 | Monday | Onboarding + kickoff at 7 PM IST |
| 2026-05-27 | Wednesday | Product brief + MVP direction submission |
| 2026-05-29 | Friday | Final MVP submission + launch |

Use these official dates going forward.

---

## 2. Hackathon Thesis

HireGEN is an India-first, skill-validated hiring platform that replaces resume noise with verifiable proof of capability.

The hackathon version should prove one core claim:

> AI can turn messy candidate evidence into a structured skill graph that recruiters can trust.

Do not try to build the entire hiring marketplace during the hackathon.

---

## 3. MVP Scope

### Must Ship

1. Candidate input flow
   - Upload or paste resume/profile text
   - Add GitHub/project links
   - Choose target role
   - Choose target technology/domain

2. Skill graph engine
   - Extract skills from profile/resume/project evidence
   - Normalize skills into categories
   - Assign confidence scores
   - Attach evidence sources
   - Identify freshness or missing proof

3. Career gap analysis
   - Compare current profile to target role
   - Show skill match score
   - Show missing skills
   - Recommend projects and learning path
   - Generate 3-month roadmap

4. Recruiter proof view
   - Candidate proof card
   - Skill graph summary
   - Evidence list
   - Match explanation
   - Red flags / missing evidence

5. Validation / anti-cheat preview
   - Display validation policy tags
   - Example lab-test task generated from candidate profile
   - Explain how proof would be protected

6. Product brief
   - Problem
   - Solution
   - Market
   - MVP demo flow
   - Architecture
   - Business model
   - Why now

7. Live demo
   - Deployed URL
   - Demo sample candidate
   - Demo sample recruiter view

---

## 4. Explicitly Out of Scope for Hackathon

These can appear as mock/roadmap sections, but should not be fully built in the hackathon sprint:

- Full recruiter marketplace
- Real payments
- Full auth and account system unless scaffolded quickly
- Full DPDP workflow
- Real proctored browser environment
- Large-scale GitHub ingestion
- Multi-role skill taxonomy
- Training-provider affiliate marketplace
- AI Job Market Impact Explorer full data product
- Student and employee profile modes as fully separate engines

---

## 5. Recommended Hackathon Demo Flow

### Demo User

Candidate:

- Name: Priya A.
- Current profile: junior frontend developer
- Location: Hyderabad
- Target role: frontend engineer / full-stack engineer
- Target technology: React, Next.js, TypeScript, API integration

### Demo Steps

1. Landing page opens.
2. User starts "Build proof profile."
3. User enters resume text and GitHub/project links.
4. User selects target role.
5. AI extracts current skill graph.
6. System shows:
   - Current skill map
   - Evidence-backed skills
   - Weak or unsupported claims
   - Target-role match score
   - Technical gaps
7. System generates:
   - 3-month path
   - Recommended hands-on project
   - Validation task
8. Switch to recruiter view.
9. Recruiter sees candidate ranked by proof, not pedigree.
10. Show anti-cheat validation policy preview.

### Demo Punchline

> Instead of reading a resume, the recruiter sees what Priya can prove.

---

## 6. Suggested Stack

For this hackathon, the product should align with OpenAI ecosystem expectations.

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui if time permits
- Responsive web only

### AI Layer

- OpenAI model for structured extraction and reasoning
- OpenAI embeddings for skill/job similarity
- Structured JSON outputs for skill graph and roadmap

### Data

- Postgres
- pgvector if available quickly
- If time is tight: local JSON/mock DB first, then upgrade

### Deployment

- Vercel for web app
- Environment variables for API keys

### Optional

- GitHub API for repo metadata
- Resume parsing from PDF if time permits
- File upload only if it does not slow the sprint
- NVIDIA AI-Q / deep research skill pattern as architecture inspiration for market-backed career guidance

### Agent Skill Architecture Note

The NVIDIA AI-Q article shared on 2026-05-22 is relevant to the longer-term HireGEN architecture:

- Source: https://developer.nvidia.com/blog/add-a-specialized-deep-research-skill-to-agent-harnesses/
- Core idea: general-purpose agent harnesses like Claude Code, Codex, and LangChain Deep Agents can delegate specialized deep-research tasks to a dedicated research backend.
- AI-Q exposes research as a portable skill with source attribution, data-source routing, clarification, shallow research, deep research, and evaluation.

How this maps to HireGEN:

| AI-Q Pattern | HireGEN Equivalent |
|---|---|
| Agent harness delegates research | HireGEN app delegates market/career research to a specialized skill |
| Research backend returns cited report | Career Guide returns cited market-backed roadmap |
| Enterprise data stays governed | Candidate/recruiter data remains inside controlled HireGEN environment |
| MCP data connectors | Future connectors for GitHub, job-market data, training-provider data, recruiter feedback |
| Source attribution and auditability | Recruiters and candidates can see why a recommendation was made |

Hackathon use:

- Do not build the full AI-Q stack unless already available and easy.
- Use this as an architectural reference and demo narrative.
- If time permits, create a mocked "Research Skill" panel showing market-backed career guidance with citations.

Production implication:

> HireGEN can become an agentic hiring system made of specialized skills: Skill Graph, Career Research, Git Portfolio Analysis, Validation Lab, Recruiter Matching, and Market Impact Explorer.

---

## 7. Core Data Objects

### CandidateProfile

```ts
type CandidateProfile = {
  id: string;
  name: string;
  location?: string;
  currentRole?: string;
  targetRole: string;
  targetTechnologies: string[];
  resumeText?: string;
  githubUrls: string[];
  projectUrls: string[];
};
```

### SkillEvidence

```ts
type SkillEvidence = {
  skill: string;
  category: "frontend" | "backend" | "database" | "cloud" | "testing" | "ai" | "soft_skill" | "domain";
  confidence: number;
  evidenceType: "resume" | "github" | "project" | "validation" | "work_history";
  evidenceSummary: string;
  freshness: "fresh" | "aging" | "unknown";
  proofStrength: "strong" | "medium" | "weak";
};
```

### SkillGraph

```ts
type SkillGraph = {
  candidateId: string;
  targetRole: string;
  matchScore: number;
  skills: SkillEvidence[];
  strengths: string[];
  gaps: string[];
  recommendedProjects: string[];
  validationTasks: ValidationTask[];
};
```

### ValidationTask

```ts
type ValidationTask = {
  id: string;
  title: string;
  taskType: "typed_response" | "lab_test" | "repo_defense" | "debugging" | "architecture_review";
  policyTags: Array<
    | "typed_required"
    | "paste_blocked"
    | "no_ai_text"
    | "lab_required"
    | "repo_based"
    | "oral_defense"
    | "open_resource"
    | "closed_book"
  >;
  prompt: string;
  expectedSignals: string[];
};
```

---

## 8. Build Plan

### Kickoff Guidance From 2026-05-25

Key takeaways from onboarding:

- Show up like a founder.
- Execute fast.
- Solo builders can win by staying focused.
- Do not change the core idea.
- Collect feedback.
- Post daily build updates.
- First checkpoint is Day 3 / Wednesday.
- Judging will care about user journey, technical execution, usefulness, creativity/originality, security, hackability, fidelity, and presentation clarity.

HireGEN interpretation:

> Build one sharp proof journey deeply instead of a broad platform shallowly.

### 2026-05-24 - Confirmation + Prep

Target:

- Finalize repo structure
- Confirm stack
- Prepare sample candidate data
- Prepare product brief skeleton
- Convert existing HTML mockup into Next.js layout plan
- Create prompts for skill extraction and gap analysis
- Decide MVP route structure

### 2026-05-25 - Onboarding + Repo Boilerplate

Target:

- Attend onboarding + kickoff at 7 PM IST
- Next.js app scaffolded
- Tailwind working
- Basic layout in place
- Routes defined
- Sample data wired

Routes:

| Route | Purpose |
|---|---|
| `/` | Landing/demo entry |
| `/builder` | Candidate input flow |
| `/profile/[id]` | Proof profile |
| `/recruiter` | Recruiter shortlist/demo |
| `/brief` | Product brief page |

### 2026-05-26 - Core Skill Graph Engine

Target:

- Resume/profile text input
- Target role input
- Structured AI extraction
- Skill graph JSON output
- Skill graph UI
- Gap analysis UI

### 2026-05-27 - Product Brief + MVP Direction Submission

Target:

- 1-page investor/product pitch ready
- Product brief submitted
- MVP direction submitted
- Recruiter proof card
- Candidate ranking explanation
- Validation task generator
- Anti-cheat policy tags
- Sample lab-test preview

### 2026-05-28 - Polish + Demo Hardening

Target:

- Demo data stable
- 3-minute pitch script ready
- Screenshots ready
- Mobile pass
- UI polish
- Copy polish
- Error states
- Demo recovery path

### 2026-05-29 - Final MVP Submission + Launch

Target:

- Final URL
- Final pitch
- Final product brief
- Demo walkthrough ready
- Demo video ready
- Launch/build-in-public update ready
- Final MVP submitted

---

## 9. Definition of Done

The hackathon MVP is done when:

- A user can enter candidate evidence and target role.
- AI returns structured skill graph JSON.
- UI displays skill graph, strengths, gaps, roadmap, and validation tasks.
- Recruiter view shows proof-backed candidate summary.
- Product brief explains problem, solution, business model, and architecture.
- Live URL works.
- Demo can be completed in under 3 minutes.
- 1-page pitch is clear enough for a judge/investor to understand the business.
- Demo video explains the product without needing live narration.
- At least one quick feedback loop has been completed.

---

## 9.1 Judging Checklist

| Criterion | HireGEN Target |
|---|---|
| User journey | Candidate evidence -> skill graph -> gap analysis -> recruiter proof view. |
| Technical execution | Working Next.js app with structured AI output and demo data fallback. |
| Security | No secrets committed, env-based API keys, safe sample data. |
| Hackability | Clear routes, clear data model, readable components. |
| Usefulness | Demonstrates reduction of resume noise and recruiter screening burden. |
| Creativity / originality | Proof-first skill graph, trust badges, validation lab preview. |
| Presentation clarity | One-line thesis, fast demo, crisp problem/solution/business model. |
| Fidelity | Polished enough to feel real without hiding missing backend limitations. |
| Feedback | Capture at least 2 pieces of candidate/recruiter/builder feedback. |
| Daily updates | Post concise daily progress updates. |

---

## 10. Winning Narrative

Most hiring tools optimize for more applicants.

HireGEN optimizes for more trust.

Core pitch:

> In the AI era, resumes are cheap. Proof is scarce. HireGEN converts messy candidate evidence into structured, verifiable skill graphs so recruiters can evaluate capability, not polish or pedigree.

Why now:

- AI makes resume inflation easier.
- Recruiters face applicant overload.
- Tier-2/3 Indian talent is under-discovered.
- GitHub/projects contain useful but underused signals.
- Skill half-life is shrinking.
- Hiring needs proof, not more profiles.

---

## 11. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Too much scope | Ship skill graph first, keep modules as roadmap. |
| AI output unreliable | Use strict JSON schema and fallback sample data. |
| GitHub API slows build | Accept pasted repo/project links first. |
| Resume PDF parsing slows build | Accept text input first, add PDF later. |
| pgvector setup slows build | Use in-memory/mock similarity first, upgrade if time. |
| OpenAI key/config issue | Keep deterministic sample demo mode. |
| UI takes too long | Reuse existing premium mockup style. |

---

## 12. Assets Already Available

Existing useful files:

- `README.md`
- `index.html`
- `hiregen-premium.html`
- `docs/VISION.md`
- `docs/STACK.md`
- `docs/DECISIONS.md`
- `docs/APPLICATION-VIABILITY-REPORT.md`
- `docs/PRODUCT-MODULES-BACKLOG.md`

Existing strategic assets:

- Product positioning
- MVP scope
- Monetization assumptions
- Tech stack direction
- Visual mockups
- Viability report
- Module backlog
- Anti-cheat validation notes

---

## 13. Immediate Checklist After Shortlist Confirmation

1. Attend onboarding call on 2026-05-25 at 7 PM IST.
2. Scaffold Next.js app.
3. Choose final OpenAI model and embedding approach.
4. Create environment variable template.
5. Port premium visual direction into app shell.
6. Build sample candidate data.
7. Implement structured skill graph output.
8. Build recruiter proof card.
9. Write product brief.
10. Deploy to Vercel.

---

## 14. Update Log

| Date | Update | Author |
|---|---|---|
| 2026-05-22 | Initial hackathon delivery plan created after registration note. | Codex |
| 2026-05-24 | Updated plan after official shortlist confirmation and May 25-29 schedule. | Codex |
| 2026-05-25 | Added kickoff guidance, judging checklist, pitch/demo requirements, and daily update expectations. | Codex |
