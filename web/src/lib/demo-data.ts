/**
 * Single source of truth for the demo candidate fixture.
 * Used on /profile/demo and /recruiter until the OpenAI pipeline lands.
 *
 * Per hackathon rule (kickoff slide 15/20): screens using this data
 * MUST render a <DemoChip /> to label it as fixture content.
 */

export type SkillCategory = "frontend" | "backend" | "database" | "cloud" | "testing" | "ai" | "soft_skill" | "domain";

export type Skill = {
  name: string;
  category: SkillCategory;
  score: number; // 0-100 confidence
  freshness_days: number;
  evidence: { kind: "github" | "project" | "resume" | "lab"; ref: string; note?: string }[];
};

export type Badge = {
  id: string;
  label: string;
  awarded: boolean;
  reason: string;
};

export type DemoCandidate = {
  id: string;
  name: string;
  city: string;
  education: string;
  target_role: string;
  match_score: number;
  summary: string;
  skills: Skill[];
  badges: Badge[];
  gaps: { skill: string; severity: "high" | "medium" | "low"; recommendation: string }[];
  roadmap_90d: { week: number; focus: string; deliverable: string }[];
  github: string;
};

export const demoCandidate: DemoCandidate = {
  id: "demo",
  name: "Priya A.",
  city: "Hyderabad",
  education: "B.Tech, OUCE (2024)",
  target_role: "Frontend Engineer · Razorpay-tier fintech",
  match_score: 92,
  summary:
    "Tier-2 college, 2 years freelance frontend, 3 shipped React projects, active on GitHub. Strong on React + TypeScript + design systems; growing on backend + system design.",
  github: "https://github.com/example-priya",
  skills: [
    { name: "React", category: "frontend", score: 94, freshness_days: 4, evidence: [{ kind: "github", ref: "example-priya/dashboard-kit", note: "12 commits in last 30 days" }] },
    { name: "TypeScript", category: "frontend", score: 91, freshness_days: 4, evidence: [{ kind: "github", ref: "example-priya/dashboard-kit" }] },
    { name: "Next.js", category: "frontend", score: 86, freshness_days: 9, evidence: [{ kind: "project", ref: "shipped freelance e-commerce" }] },
    { name: "Tailwind CSS", category: "frontend", score: 88, freshness_days: 4, evidence: [{ kind: "github", ref: "example-priya/dashboard-kit" }] },
    { name: "Python", category: "backend", score: 72, freshness_days: 28, evidence: [{ kind: "github", ref: "example-priya/ml-experiments" }] },
    { name: "SQL", category: "database", score: 81, freshness_days: 14, evidence: [{ kind: "resume", ref: "2 yrs freelance" }] },
    { name: "REST APIs", category: "backend", score: 78, freshness_days: 14, evidence: [{ kind: "project", ref: "fintech integration" }] },
    { name: "Vitest", category: "testing", score: 65, freshness_days: 21, evidence: [{ kind: "github", ref: "example-priya/dashboard-kit" }] },
    { name: "System Design", category: "soft_skill", score: 52, freshness_days: 60, evidence: [{ kind: "resume", ref: "self-taught" }] },
  ],
  badges: [
    { id: "git-verified", label: "Git Verified", awarded: true, reason: "Authorship verified across 8 repos with consistent commit cadence" },
    { id: "skill-graph", label: "Skill Graph", awarded: true, reason: "9 skills mapped, 7 evidence-backed" },
    { id: "project-builder", label: "Project Builder", awarded: true, reason: "3 shipped projects with live URLs" },
    { id: "lab-proof", label: "Lab Proof", awarded: false, reason: "Validation lab session not yet completed" },
    { id: "ai-ready", label: "AI Ready", awarded: false, reason: "AI/ML skills below target threshold (72 < 80)" },
    { id: "career-bridge", label: "Career Bridge", awarded: true, reason: "Tier-2 → Tier-1 candidate eligible for recruiter intro" },
  ],
  gaps: [
    { skill: "System Design", severity: "high", recommendation: "Ship one mid-complexity case study (e.g. URL shortener architecture) and document trade-offs." },
    { skill: "AI Ready (LLM integration)", severity: "medium", recommendation: "Build one project that calls an LLM API meaningfully." },
    { skill: "Lab Proof", severity: "medium", recommendation: "Complete a 15-min adaptive validation on React + TypeScript." },
  ],
  roadmap_90d: [
    { week: 1, focus: "System design fundamentals", deliverable: "Read DDIA Ch. 1-3, post 1 takeaway thread" },
    { week: 2, focus: "Ship system design case study", deliverable: "URL shortener with caching layer — architecture doc + repo" },
    { week: 3, focus: "LLM integration project", deliverable: "Chat app with structured-output OpenAI calls" },
    { week: 4, focus: "Lab Proof completion", deliverable: "15-min React + TypeScript validation passed" },
    { week: 5, focus: "Open source contribution", deliverable: "1 merged PR to a popular React project" },
    { week: 6, focus: "Public writing", deliverable: "Long-form post on system design trade-offs from week 2" },
    { week: 7, focus: "Mock interviews", deliverable: "3 system design mocks with peers" },
    { week: 8, focus: "Portfolio polish", deliverable: "Update Proof Profile, refresh GitHub README" },
    { week: 9, focus: "Recruiter outreach", deliverable: "Apply to 5 Razorpay-tier roles via HireGEN intros" },
    { week: 10, focus: "Interview cycle", deliverable: "Convert 2-3 intros to phone screens" },
    { week: 11, focus: "Offer negotiation prep", deliverable: "Research salary bands for target role + city" },
    { week: 12, focus: "Close", deliverable: "Accept best-fit offer" },
  ],
};
