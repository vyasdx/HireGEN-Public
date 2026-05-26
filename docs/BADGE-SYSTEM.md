# HireGEN - Candidate Badge System

> Living taxonomy for candidate trust badges used in HireGEN profiles, recruiter views, and validation reports.

**Created:** 2026-05-24  
**Status:** Draft  
**Asset folder:** `assets/badges/`

---

## 1. Purpose

HireGEN badges should make proof visible at a glance.

The logo system can become a product language:

- The full HireGEN logo represents the platform.
- Icon-only badges represent specific proof achievements on candidate profiles.

Badges should never be decorative only. Every badge must map to an evidence rule.

---

## 2. Badge Principles

1. Badge only what HireGEN can verify.
2. Show the evidence source behind every badge.
3. Use badges to increase recruiter trust, not candidate vanity.
4. Avoid too many badges on one profile.
5. Make badge criteria transparent to candidates.
6. Badge states should support expiry or revalidation.

---

## 3. Initial Badge Taxonomy

| Badge | Asset | Meaning | Evidence Required |
|---|---|---|---|
| Git Verified | `hiregen-badge-git-verified.svg` | Candidate has verified Git portfolio evidence. | GitHub account ownership, repo history, meaningful commits, project linkage. |
| Lab Proof | `hiregen-badge-lab-proof.svg` | Candidate passed a controlled skill validation. | Time-boxed lab result, final diff/output, policy tags, evaluator summary. |
| Project Builder | `hiregen-badge-project-builder.svg` | Candidate has strong hands-on project evidence. | Project demo, README, architecture notes, code quality, deployed or reproducible output. |
| Skill Graph | `hiregen-badge-skill-graph.svg` | Candidate has a high-confidence skill graph. | Multiple evidence sources across resume, Git, projects, validation, or work history. |
| AI Ready | `hiregen-badge-ai-ready.svg` | Candidate can work effectively with AI-era tools. | AI workflow task, prompt/tool usage explanation, productivity artifact, policy-compliant validation. |
| Career Bridge | `hiregen-badge-career-bridge.svg` | Candidate has a validated transition roadmap. | Resume analysis, target role mapping, skill gap plan, project roadmap, progress checkpoints. |

---

## 4. Candidate Profile Usage

Badges can appear in:

- Candidate profile header
- Skill rows
- Project cards
- Recruiter shortlist cards
- Validation report
- Career roadmap milestones

Example:

```text
Priya A.
Frontend Engineer - Hyderabad

[Git Verified] [Project Builder] [Skill Graph]
```

---

## 5. Badge Assignment Rules

### Git Verified

Assign when:

- Candidate connects GitHub.
- Ownership is verified.
- At least one repo has meaningful project evidence.
- Commit history is not obviously fake or single-upload only.
- Repo supports at least one claimed skill.

### Lab Proof

Assign when:

- Candidate completes a controlled task.
- The task is tied to a target skill.
- The session has validation policy metadata.
- Output passes minimum rubric.

### Project Builder

Assign when:

- Candidate has at least one strong portfolio project.
- Project includes code, README, implementation notes, and demo or reproducible setup.
- Project maps to target-role skills.

### Skill Graph

Assign when:

- Candidate has enough evidence to create a structured skill graph.
- At least three skill categories have medium or strong confidence.
- Skill evidence is not based on resume text alone.

### AI Ready

Assign when:

- Candidate demonstrates practical AI workflow usage.
- Candidate can explain how AI was used and where human judgment mattered.
- Output is not simply AI-generated text.

### Career Bridge

Assign when:

- Candidate completed Career Guide analysis.
- Target role is defined.
- 3-month or 6-month roadmap is generated.
- Candidate has started or completed at least one roadmap milestone.

---

## 6. Badge Metadata

Each badge instance should eventually store:

```ts
type CandidateBadge = {
  id: string;
  candidateId: string;
  badgeType:
    | "git_verified"
    | "lab_proof"
    | "project_builder"
    | "skill_graph"
    | "ai_ready"
    | "career_bridge";
  status: "active" | "expired" | "revoked" | "pending";
  issuedAt: string;
  expiresAt?: string;
  evidenceIds: string[];
  confidence: number;
  summary: string;
};
```

---

## 7. Design Notes

- Use icon-only badges on candidate profiles.
- Use full logo only for brand surfaces.
- Add tooltips explaining badge meaning.
- Add click-through evidence drawer later.
- Avoid using badges as gamification without proof.

---

## 8. Update Log

| Date | Update | Author |
|---|---|---|
| 2026-05-24 | Initial candidate badge taxonomy and SVG assets created. | Codex |

