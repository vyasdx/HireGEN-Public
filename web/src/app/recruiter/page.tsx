import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DemoChip } from "@/components/demo-chip";
import { ProofBadgeIcon } from "@/components/proof-badge-icon";
import { demoCandidate, type DemoCandidate } from "@/lib/demo-data";

type RecruiterCandidate = DemoCandidate & {
  headline: string;
  currentRole: string;
  experience: string;
  location: string;
  matchBreakdown: {
    direct: string[];
    transferable: string[];
    missing: string[];
  };
  riskFlags: string[];
  recruiterAction: string;
};

const candidates: RecruiterCandidate[] = [
  {
    ...demoCandidate,
    headline: "Frontend proof profile with shipped UI work",
    currentRole: "Freelance frontend developer",
    experience: "2 years",
    location: "Hyderabad · Remote-ready",
    matchBreakdown: {
      direct: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      transferable: ["Freelance delivery", "API integration", "GitHub cadence"],
      missing: ["System design depth", "Lab Proof", "LLM integration proof"],
    },
    riskFlags: ["System design evidence is still weak", "No timed lab completed yet"],
    recruiterAction: "Invite to React + TypeScript validation lab",
  },
  {
    ...demoCandidate,
    id: "infra-ai-transition",
    name: "Vedavyas V.",
    city: "Bangalore",
    education: "B.Tech, Electronics and Communication",
    target_role: "Senior AI Systems Engineer",
    match_score: 39,
    headline: "Senior infrastructure leader transitioning into AIOps",
    currentRole: "Senior Technical Lead · AIX/Linux/Azure",
    experience: "14+ years",
    location: "Bangalore · Hybrid",
    summary:
      "Strong enterprise operations evidence across AIX, SUSE Linux, HA clusters, Azure, SAP migrations, technical health checks, incidents, and RCA. Target AI role fit is promising but needs proof in Python, ML, RAG, agentic workflows, and production AI services.",
    github: "https://github.com/vyasdx",
    skills: [
      { name: "UNIX/Linux operations", category: "backend", score: 86, freshness_days: 0, evidence: [{ kind: "resume", ref: "AIX/SUSE/Linux administration", note: "Direct match" }] },
      { name: "HA cluster operations", category: "domain", score: 78, freshness_days: 0, evidence: [{ kind: "resume", ref: "PowerHA/HACMP/Pacemaker/GPFS", note: "Logical transfer" }] },
      { name: "Incident/RCA workflows", category: "soft_skill", score: 76, freshness_days: 0, evidence: [{ kind: "resume", ref: "Major incidents, RCA, health checks", note: "Direct match" }] },
      { name: "Cloud/SAP operations", category: "cloud", score: 72, freshness_days: 0, evidence: [{ kind: "resume", ref: "Azure/SAP/HANA operations", note: "Logical transfer" }] },
      { name: "Python + ML on ops data", category: "ai", score: 34, freshness_days: 45, evidence: [{ kind: "resume", ref: "Target JD requirement", note: "Missing proof" }] },
    ],
    badges: [
      { id: "skill-graph", label: "Skill Graph", awarded: true, reason: "Target-role skills mapped against resume evidence" },
      { id: "git-verified", label: "Git Portfolio", awarded: true, reason: "Public GitHub supplied for portfolio scan" },
      { id: "project-builder", label: "Live Projects", awarded: true, reason: "Live project links supplied as proof signals" },
      { id: "career-bridge", label: "Career Bridge", awarded: true, reason: "Strong transferable operations base" },
      { id: "lab-proof", label: "Lab Proof", awarded: false, reason: "No timed AI systems validation lab yet" },
      { id: "ai-ready", label: "AI Ready", awarded: false, reason: "Core AI proof below target-role threshold" },
    ],
    gaps: [
      { skill: "Python + ML on operations data", severity: "high", recommendation: "Build Python proof using logs, metrics, or tickets." },
      { skill: "RAG over runbooks and incidents", severity: "high", recommendation: "Create cited RAG prototype over RCA/runbook content." },
      { skill: "Agentic RCA workflow", severity: "high", recommendation: "Show Detection -> Triage -> RCA -> Human approval." },
    ],
    roadmap_90d: demoCandidate.roadmap_90d,
    matchBreakdown: {
      direct: ["UNIX/Linux operations", "Incident/RCA", "Technical health checks"],
      transferable: ["HA clusters -> resilient platforms", "Azure/SAP -> enterprise AI ops context"],
      missing: ["Python/ML proof", "RAG implementation", "Agentic workflow", "AI service deployment"],
    },
    riskFlags: ["High-priority AI proof gaps", "Git portfolio needs stronger README/project packaging"],
    recruiterAction: "Send AIOps proof assignment before interview",
  },
  {
    ...demoCandidate,
    id: "student-data-analyst",
    name: "Aarav M.",
    city: "Pune",
    education: "B.E. Computer Engineering (2026)",
    target_role: "Junior Data Analyst",
    match_score: 74,
    headline: "Student profile with analytics projects and clear gaps",
    currentRole: "Final-year student",
    experience: "Student",
    location: "Pune · Internship-ready",
    summary:
      "Good student signal through SQL, Python notebooks, academic projects, and presentation work. Needs stronger live project packaging, validation lab, and business-facing analytics storytelling.",
    github: "https://github.com/example-aarav",
    skills: [
      { name: "SQL", category: "database", score: 82, freshness_days: 9, evidence: [{ kind: "github", ref: "college analytics repo", note: "Direct match" }] },
      { name: "Python notebooks", category: "ai", score: 76, freshness_days: 12, evidence: [{ kind: "github", ref: "EDA projects", note: "Direct match" }] },
      { name: "Data storytelling", category: "soft_skill", score: 61, freshness_days: 45, evidence: [{ kind: "project", ref: "seminar deck", note: "Partial proof" }] },
      { name: "Dashboarding", category: "frontend", score: 58, freshness_days: 60, evidence: [{ kind: "project", ref: "student project", note: "Needs live demo" }] },
    ],
    badges: [
      { id: "skill-graph", label: "Skill Graph", awarded: true, reason: "Student skills mapped from projects and coursework" },
      { id: "git-verified", label: "Git Verified", awarded: true, reason: "GitHub supplied with academic projects" },
      { id: "project-builder", label: "Project Builder", awarded: false, reason: "No live demos attached yet" },
      { id: "lab-proof", label: "Lab Proof", awarded: false, reason: "Analytics validation lab pending" },
      { id: "career-bridge", label: "Career Bridge", awarded: true, reason: "Ready for guided internship track" },
    ],
    gaps: [
      { skill: "Live dashboard proof", severity: "medium", recommendation: "Deploy one analytics dashboard with README and screenshots." },
      { skill: "Business storytelling", severity: "medium", recommendation: "Write one case study explaining insights and decisions." },
    ],
    roadmap_90d: demoCandidate.roadmap_90d,
    matchBreakdown: {
      direct: ["SQL", "Python notebooks", "academic projects"],
      transferable: ["Seminars -> stakeholder communication", "coursework -> analyst foundations"],
      missing: ["Live dashboard", "business case study", "validation lab"],
    },
    riskFlags: ["Student profile; professional production signal is limited", "No live analytics demo"],
    recruiterAction: "Shortlist for internship with SQL case task",
  },
];

const roleSignals = [
  { label: "Role", value: "Senior AI Systems Engineer / Proof-based hiring demo" },
  { label: "Shortlist", value: `${candidates.length} candidates` },
  { label: "Trust filter", value: "Evidence-backed only" },
  { label: "Next step", value: "Invite, lab, or hold" },
];

function severityClass(severity: "high" | "medium" | "low") {
  if (severity === "high") return "text-red-700 bg-red-50 border-red-100";
  if (severity === "medium") return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-brand-700 bg-brand-50 border-brand-100";
}

export default function RecruiterPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-7xl mx-auto w-full">
        <section className="grid lg:grid-cols-[1.25fr_.75fr] gap-6 items-stretch mb-8">
          <div>
            <DemoChip label="Recruiter proof dashboard" />
            <h1 className="display text-4xl md:text-5xl mt-3">
              Shortlist by <span className="gradient-text">trusted signal.</span>
            </h1>
            <p className="text-ink-700 mt-3 max-w-3xl leading-relaxed">
              HireGEN shows why a candidate should move forward: direct matches, logical
              transfers, missing proof, awarded badges, and risk flags. The goal is faster
              recruiter decisions without hiding uncertainty.
            </p>
          </div>
          <div className="glass-strong p-5">
            <div className="relative z-10">
              <div className="text-xs text-ink-500 uppercase tracking-wider">Open search</div>
              <div className="mt-2 grid gap-3">
                {roleSignals.map((signal) => (
                  <div key={signal.label} className="flex items-start justify-between gap-4 border-b border-white/40 pb-2 last:border-0 last:pb-0">
                    <span className="text-xs text-ink-500">{signal.label}</span>
                    <span className="text-sm font-semibold text-right">{signal.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {candidates.map((c, index) => {
            const awarded = c.badges.filter((badge) => badge.awarded);
            const blocked = c.badges.filter((badge) => !badge.awarded);
            const topGap = c.gaps[0];

            return (
              <article key={c.id} className="glass-strong p-5 md:p-6">
                <div className="relative z-10 space-y-5">
                  <div className="grid lg:grid-cols-[1fr_160px] gap-5">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-ink-900 text-white flex items-center justify-center display text-lg shrink-0">
                        {c.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="chip !py-0.5 !px-2 !text-[10px]">Rank #{index + 1}</span>
                          <span className="chip !py-0.5 !px-2 !text-[10px]">{c.experience}</span>
                        </div>
                        <h2 className="mt-2 font-semibold text-xl">{c.name}</h2>
                        <p className="text-sm text-ink-500">{c.currentRole} · {c.location}</p>
                        <p className="mt-2 text-sm text-ink-700 leading-relaxed max-w-3xl">{c.headline}</p>
                      </div>
                    </div>

                    <div className="glass-soft p-4 text-center">
                      <div className="text-xs text-ink-500 uppercase tracking-wider">Match score</div>
                      <div className="display text-4xl gradient-text mt-1">{c.match_score}</div>
                      <div className="text-xs text-ink-500">vs selected role</div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Direct matches</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.matchBreakdown.direct.map((item) => (
                          <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Logical transfer</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.matchBreakdown.transferable.map((item) => (
                          <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Missing proof</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.matchBreakdown.missing.map((item) => (
                          <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_.9fr] gap-4">
                    <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Proof badges</div>
                        <div className="text-[11px] text-ink-500">{awarded.length} awarded · {blocked.length} locked</div>
                      </div>
                      <div className="mt-3 grid sm:grid-cols-2 gap-2">
                        {c.badges.slice(0, 6).map((badge) => (
                          <div key={badge.id} className={`flex items-center gap-2 rounded-2xl border border-white/60 bg-white/60 p-2 ${badge.awarded ? "" : "opacity-60"}`}>
                            <ProofBadgeIcon id={badge.id} awarded={badge.awarded} label={badge.label} />
                            <div className="min-w-0">
                              <div className="text-sm font-semibold truncate">{badge.label}</div>
                              <div className="text-[11px] text-ink-500 truncate">{badge.awarded ? "Awarded" : "Locked"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/50 border border-white/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Risk and next action</div>
                      <div className="mt-3 space-y-2">
                        {c.riskFlags.map((risk) => (
                          <div key={risk} className="text-xs text-ink-700 flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{risk}</span>
                          </div>
                        ))}
                      </div>
                      {topGap ? (
                        <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-3">
                          <span className={`text-[10px] px-2 py-1 rounded-full border ${severityClass(topGap.severity)}`}>{topGap.severity}</span>
                          <div className="mt-2 text-sm font-semibold">{topGap.skill}</div>
                          <p className="mt-1 text-xs text-ink-500">{topGap.recommendation}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-white/40 pt-4">
                    <p className="text-sm text-ink-600 leading-relaxed max-w-3xl">{c.summary}</p>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <Link href={c.id === "demo" ? "/profile/demo" : "/profile/demo"} className="btn-glass !py-2 !px-3 !text-xs">
                        View proof profile
                      </Link>
                      <button className="btn-primary !py-2 !px-3 !text-xs" type="button">
                        {c.recruiterAction}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
