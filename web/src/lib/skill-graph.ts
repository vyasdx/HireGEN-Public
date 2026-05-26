import {
  type BuilderInput,
  type SkillGraph,
  skillGraphJsonSchema,
  skillGraphSchema,
} from "@/lib/skill-graph-schema";

type GenerationMode = "openai" | "fallback";
type SkillCategory = SkillGraph["skills"][number]["category"];
type GithubRepoSignal = {
  name: string;
  url: string;
  description: string;
  language: string;
  updated_at: string;
  has_readme: boolean;
  homepage: string;
  archived: boolean;
};
type EvidenceSignals = {
  github: {
    handle: string;
    scanned: boolean;
    repo_count: number;
    quality: "structured" | "needs_structure" | "empty" | "unavailable";
    summary: string;
    repos: GithubRepoSignal[];
  };
  projects: Array<{
    url: string;
    reachable: boolean;
    status: number;
    title: string;
    note: string;
  }>;
};

export type SkillGraphGeneration = {
  graph: SkillGraph;
  mode: GenerationMode;
  warning?: string;
};

type ResponsesApiContent = { type?: string; text?: string };
type ResponsesApiItem = { content?: ResponsesApiContent[] };
type ResponsesApiResult = {
  output_text?: string;
  output?: ResponsesApiItem[];
};

export async function generateSkillGraph(input: BuilderInput): Promise<SkillGraphGeneration> {
  const evidenceSignals = await collectEvidenceSignals(input);

  if (!process.env.OPENAI_API_KEY) {
    return {
      graph: buildFallbackSkillGraph(input, evidenceSignals),
      mode: "fallback",
      warning: "OPENAI_API_KEY is not set; generated deterministic local demo output.",
    };
  }

  try {
    return {
      graph: await generateWithOpenAI(input, evidenceSignals),
      mode: "openai",
    };
  } catch (error) {
    console.error("OpenAI skill graph generation failed", error);
    return {
      graph: buildFallbackSkillGraph(input, evidenceSignals),
      mode: "fallback",
      warning: "OpenAI generation failed; generated deterministic local demo output.",
    };
  }
}

async function generateWithOpenAI(input: BuilderInput, evidenceSignals: EvidenceSignals): Promise<SkillGraph> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "You are HireGEN's skill validation engine. Build an honest candidate proof profile from the supplied resume, scanned GitHub signals, live project signals, and optional target role/job description. Resume is the primary source for experience, certifications, current role, enterprise skills, and domain expertise. GitHub/project links are proof signals: explain what repos/projects were found, whether they are well structured, and how the candidate should improve the portfolio if weak. Do not invent employers, degrees, repos, links, certifications, or lab results. Mark uncertain claims as resume evidence. For baseline_profile mode, describe the candidate's current profile and default career path. For target_gap mode, compare against the target role/JD and create a senior transition roadmap that bridges existing domain experience into the target. For AIOps/AI systems roles, avoid generic beginner advice; focus on Python over ops data, time-series anomaly detection, RAG over runbooks/incidents, agentic RCA workflows, observability, evaluation, drift monitoring, cloud deployment, and human-in-loop guardrails.",
        },
        {
          role: "user",
          content: JSON.stringify({
            analysis_mode: input.analysis_mode,
            name: input.name,
            target_role: input.target_role,
            target_job_description: input.target_job_description,
            resume_text: input.resume_text,
            github_url: input.github_url,
            project_links: input.project_links,
            evidence_signals: evidenceSignals,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hiregen_skill_graph",
          strict: true,
          schema: skillGraphJsonSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error ${response.status}`);
  }

  const data = (await response.json()) as ResponsesApiResult;
  const outputText = extractOutputText(data);
  if (!outputText) {
    throw new Error("OpenAI response did not include structured output text");
  }

  return skillGraphSchema.parse(normalizeOpenAIOutput(JSON.parse(outputText), input, evidenceSignals));
}

function extractOutputText(data: ResponsesApiResult): string | undefined {
  if (data.output_text) return data.output_text;

  for (const item of data.output ?? []) {
    for (const content of item.content ?? []) {
      if ((content.type === "output_text" || content.type === "text") && content.text) {
        return content.text;
      }
    }
  }

  return undefined;
}

function normalizeOpenAIOutput(raw: unknown, input: BuilderInput, evidenceSignals: EvidenceSignals): unknown {
  if (!raw || typeof raw !== "object") return raw;

  const graph = raw as Record<string, unknown>;
  if (typeof graph.id !== "string" || !graph.id.trim()) graph.id = "generated";
  if (typeof graph.github !== "string") graph.github = input.github_url;

  if (Array.isArray(graph.skills)) {
    graph.skills = graph.skills.map((skill) => {
      if (!skill || typeof skill !== "object") return skill;

      const nextSkill = skill as Record<string, unknown>;
      if (Array.isArray(nextSkill.evidence)) {
        nextSkill.evidence = nextSkill.evidence.map((evidence) => {
          if (!evidence || typeof evidence !== "object") return evidence;

          const nextEvidence = evidence as Record<string, unknown>;
          if (typeof nextEvidence.ref !== "string" || !nextEvidence.ref.trim()) {
            nextEvidence.ref = input.github_url || input.project_links[0] || "candidate supplied resume evidence";
          }
          if (!("note" in nextEvidence)) {
            nextEvidence.note = null;
          }

          return nextEvidence;
        });
      }

      return nextSkill;
    });
  }

  if (Array.isArray(graph.badges)) {
    graph.badges = graph.badges.map((badge) => {
      if (!badge || typeof badge !== "object") return badge;

      const nextBadge = badge as Record<string, unknown>;
      if (typeof nextBadge.label === "string" && nextBadge.label.length > 80) {
        nextBadge.label = `${nextBadge.label.slice(0, 77)}...`;
      }
      if (typeof nextBadge.reason === "string" && nextBadge.reason.length > 180) {
        nextBadge.reason = `${nextBadge.reason.slice(0, 177)}...`;
      }

      return nextBadge;
    });
  }

  ensureEvidenceSignals(graph, evidenceSignals);
  ensureBaselineProfileQuality(graph, input, evidenceSignals);
  ensureTargetGapQuality(graph, input);

  if (typeof graph.summary === "string" && evidenceSignals.github.scanned) {
    const hasGithubMention = /github|repo|portfolio/i.test(graph.summary);
    if (!hasGithubMention) {
      graph.summary = `${graph.summary} GitHub scan: ${evidenceSignals.github.summary}`.slice(0, 420);
    }
  }

  return graph;
}

function ensureEvidenceSignals(graph: Record<string, unknown>, evidenceSignals: EvidenceSignals): void {
  const skills = Array.isArray(graph.skills) ? graph.skills as Array<Record<string, unknown>> : [];
  const badges = Array.isArray(graph.badges) ? graph.badges as Array<Record<string, unknown>> : [];
  const gaps = Array.isArray(graph.gaps) ? graph.gaps as Array<Record<string, unknown>> : [];
  const liveProjects = evidenceSignals.projects.filter((project) => project.reachable);

  if (evidenceSignals.github.scanned && evidenceSignals.github.repo_count > 0 && !hasNamedItem(skills, "Git Portfolio")) {
    skills.push({
      name: "Git Portfolio",
      category: "domain",
      score: evidenceSignals.github.quality === "structured" ? 76 : 62,
      freshness_days: 7,
      evidence: [
        {
          kind: "github",
          ref: clip(evidenceSignals.github.summary, 120),
          note: evidenceSignals.github.quality === "structured" ? "Public repos have usable structure signals" : "Portfolio needs stronger README, descriptions, and live links",
        },
      ],
    });
  }

  if (liveProjects.length > 0 && !hasNamedItem(skills, "Live Product Portfolio")) {
    skills.push({
      name: "Live Product Portfolio",
      category: "domain",
      score: 78,
      freshness_days: 7,
      evidence: [
        {
          kind: "project",
          ref: clip(liveProjects.map((project) => project.url).join(", "), 120),
          note: `${liveProjects.length} supplied project link(s) returned HTTP 200`,
        },
      ],
    });
  }

  if (evidenceSignals.github.scanned && !hasNamedItem(badges, "Git Portfolio")) {
    badges.push({
      id: "git-portfolio",
      label: "Git Portfolio",
      awarded: evidenceSignals.github.repo_count > 0,
      reason: clip(evidenceSignals.github.summary, 180),
    });
  }

  if (liveProjects.length > 0 && !hasNamedItem(badges, "Live Projects")) {
    badges.push({
      id: "live-projects",
      label: "Live Projects",
      awarded: true,
      reason: clip(`Verified reachable project links: ${liveProjects.map((project) => project.title || project.url).join(", ")}`, 180),
    });
  }

  if (evidenceSignals.github.quality === "needs_structure" && !hasNamedItem(gaps, "Git portfolio structure")) {
    gaps.push({
      skill: "Git portfolio structure",
      severity: "medium",
      recommendation: "Improve GitHub with pinned proof repos, complete READMEs, architecture notes, live URLs, and clear project descriptions.",
    });
  }

  graph.skills = skills.sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0)).slice(0, 10);
  graph.badges = badges.slice(0, 8);
  graph.gaps = gaps.slice(0, 5);
}

function ensureBaselineProfileQuality(graph: Record<string, unknown>, input: BuilderInput, evidenceSignals: EvidenceSignals): void {
  if (input.analysis_mode !== "baseline_profile" || !isInfrastructureResume(input.resume_text)) return;

  graph.gaps = buildInfrastructureBaselineGaps(evidenceSignals);

  const roadmap = Array.isArray(graph.roadmap_90d) ? graph.roadmap_90d as Array<Record<string, unknown>> : [];
  const hasDriftedRoadmap = roadmap.some((item) => {
    const text = `${String(item.focus ?? "")} ${String(item.deliverable ?? "")}`;
    return hasIrrelevantBaselineAdvice(text);
  });

  if (hasDriftedRoadmap) {
    graph.roadmap_90d = buildInfrastructureBaselineRoadmap();
  }
}

function ensureTargetGapQuality(graph: Record<string, unknown>, input: BuilderInput): void {
  const target = `${input.target_role} ${input.target_job_description}`.toLowerCase();
  const resume = input.resume_text.toLowerCase();
  const isAiOpsTarget = /ai systems|aiops|agentic|rag|anomaly|predictive|machine learning|genai|llm/.test(target);
  const hasOpsBackground = /aix|suse|linux|incident|rca|sap|hana|azure|cloud|operations|pacemaker|gpfs/.test(resume);

  if (input.analysis_mode !== "target_gap" || !isAiOpsTarget || !hasOpsBackground) return;

  graph.skills = buildAiOpsTargetSkillMatches(input);
  graph.gaps = [
    {
      skill: "Python + ML on operations data",
      severity: "high",
      recommendation: "Build Python proof using logs, metrics, or tickets: feature extraction, anomaly detection, and a clear evaluation notebook.",
    },
    {
      skill: "RAG over runbooks and incidents",
      severity: "high",
      recommendation: "Create a RAG prototype over runbooks/RCA notes with citations, retrieval tests, and failure cases.",
    },
    {
      skill: "Agentic RCA workflow",
      severity: "high",
      recommendation: "Design Detection -> Triage -> RCA -> Recommendation -> Human approval flow with tool/function calls and guardrails.",
    },
    {
      skill: "Production AI service deployment",
      severity: "medium",
      recommendation: "Deploy one API with Docker/cloud, observability, evals, drift checks, and rollback notes.",
    },
    {
      skill: "SAP AI platform context",
      severity: "medium",
      recommendation: "Map existing SAP/HANA/operations background to SAP BTP AI Core, Generative AI Hub, and AI Launchpad basics.",
    },
  ];

  graph.match_score = scoreTargetMatch(graph.gaps as SkillGraph["gaps"], graph.skills as SkillGraph["skills"]);
  graph.summary = clip(
    `${input.name} has strong transferable operations evidence for ${input.target_role || "the target role"}: UNIX/Linux, high-availability clusters, Azure/SAP operations, incident handling, and RCA. The target-role score is lower because core AI engineering requirements still need proof: Python/ML on operations data, RAG over runbooks/incidents, agentic RCA workflows, and production AI service deployment.`,
    420,
  );
  graph.roadmap_90d = buildSeniorAiOpsRoadmap(input.target_role || "Senior AI Systems Engineer");
}

function buildAiOpsTargetSkillMatches(input: BuilderInput): SkillGraph["skills"] {
  const resume = input.resume_text.toLowerCase();

  return [
    targetSkill("UNIX/Linux operations foundation", "backend", hasAny(resume, [/aix/, /suse/, /linux/]) ? 86 : 45, "resume", "AIX/SUSE/Linux administration", "Direct match from current infrastructure experience"),
    targetSkill("HA cluster operations transfer", "domain", hasAny(resume, [/power\s*ha/, /hacmp/, /pacemaker/, /gpfs/]) ? 78 : 42, "resume", "PowerHA/HACMP/Pacemaker/GPFS", "Logical transfer to resilient AI operations platforms"),
    targetSkill("Incident/RCA operations signal", "soft_skill", hasAny(resume, [/incident/, /\brca\b/, /health check/]) ? 76 : 40, "resume", "major incident, RCA, technical health check", "Direct match for Detection -> Triage -> RCA workflows"),
    targetSkill("Cloud/SAP operations context", "cloud", hasAny(resume, [/azure/, /sap/, /hana/, /cloud/]) ? 72 : 38, "resume", "Azure/SAP/HANA operations", "Logical transfer to cloud-hosted AI operations services"),
    targetSkill("Python + ML on ops data", "ai", hasAny(resume, [/python/, /machine learning/, /\bml\b/]) ? 58 : 34, "resume", "target JD requirement", "No strong resume/GitHub proof found for production Python ML work"),
    targetSkill("Statistics + anomaly detection", "ai", hasAny(resume, [/statistics/, /anomaly/, /predictive/, /time-series/]) ? 56 : 32, "resume", "target JD requirement", "Required by target role; current proof is not explicit"),
    targetSkill("RAG over runbooks/incidents", "ai", hasAny(resume, [/rag/, /embedding/, /vector/, /runbook/]) ? 55 : 30, "resume", "target JD requirement", "Needs hands-on proof with citations and retrieval evaluation"),
    targetSkill("Agentic RCA workflows", "ai", hasAny(resume, [/agentic/, /tool calling/, /workflow/, /automation/]) ? 56 : 31, "resume", "target JD requirement", "Needs proof of multi-step AI workflow with guardrails"),
    targetSkill("Production AI service deployment", "backend", hasAny(resume, [/docker/, /kubernetes/, /api/, /microservice/, /ci\/cd/]) ? 58 : 40, "resume", "target JD requirement", "Needs deployable AI service/API evidence"),
    targetSkill("Observability and drift monitoring", "testing", hasAny(resume, [/prometheus/, /grafana/, /elk/, /splunk/, /observability/, /drift/]) ? 54 : 36, "resume", "target JD requirement", "Operational background helps, but target tooling proof is missing"),
  ];
}

function targetSkill(
  name: string,
  category: SkillCategory,
  score: number,
  kind: "github" | "project" | "resume" | "lab",
  ref: string,
  note: string,
): SkillGraph["skills"][number] {
  return {
    name,
    category,
    score,
    freshness_days: 0,
    evidence: [
      {
        kind,
        ref: clip(ref, 120),
        note,
      },
    ],
  };
}

function scoreTargetMatch(gaps: SkillGraph["gaps"], skills: SkillGraph["skills"]): number {
  const average = Math.round(skills.reduce((sum, skill) => sum + skill.score, 0) / skills.length);
  const penalty = gaps.reduce((sum, gap) => {
    if (gap.severity === "high") return sum + 3;
    if (gap.severity === "medium") return sum + 2;
    return sum + 1;
  }, 0);

  return Math.max(25, Math.min(92, average - penalty));
}

function buildInfrastructureBaselineGaps(evidenceSignals: EvidenceSignals): SkillGraph["gaps"] {
  const hasGithub = evidenceSignals.github.scanned && evidenceSignals.github.repo_count > 0;
  const hasProjects = evidenceSignals.projects.some((project) => project.reachable);

  return [
    {
      skill: "Git/project proof packaging",
      severity: hasGithub || hasProjects ? "medium" : "high",
      recommendation: "Improve GitHub/live proof with READMEs, architecture notes, screenshots, ownership, impact, and clear project status.",
    },
    {
      skill: "Infrastructure automation proof",
      severity: "medium",
      recommendation: "Add public-safe scripts, runbooks, or lab repos showing AIX/Linux/Azure/SAP operations automation without client data.",
    },
    {
      skill: "Lab Proof",
      severity: "medium",
      recommendation: "Create a timed infrastructure troubleshooting lab for AIX/Linux/cloud operations proof.",
    },
  ];
}

function buildInfrastructureBaselineRoadmap(): SkillGraph["roadmap_90d"] {
  return [
    { week: 1, focus: "GitHub proof cleanup", deliverable: "Pin strongest repos and add READMEs, screenshots, live links, and ownership notes" },
    { week: 2, focus: "Live product proof notes", deliverable: "Document architecture, role, status, and impact for each reachable product link" },
    { week: 3, focus: "Infrastructure case study", deliverable: "Write one AIX/Linux health-check, migration, incident, or RCA case study" },
    { week: 4, focus: "Automation artifact", deliverable: "Publish a public-safe script, runbook, or lab that shows repeatable operations skill" },
    { week: 5, focus: "Cloud/SAP bridge", deliverable: "Create an Azure/SAP migration or operations diagram with risks and trade-offs" },
    { week: 6, focus: "Validation lab", deliverable: "Define a timed AIX/Linux/cloud troubleshooting task with expected evidence" },
    { week: 7, focus: "Observability/RCA proof", deliverable: "Add a sample RCA template, health-check output, or monitoring review artifact" },
    { week: 8, focus: "Certification mapping", deliverable: "Map ITIL, AIX HA, and Azure certifications to recruiter-facing proof claims" },
    { week: 9, focus: "Portfolio alignment", deliverable: "Align resume, GitHub, LinkedIn, and live product descriptions around the same proof story" },
    { week: 10, focus: "Mock recruiter review", deliverable: "Remove unsupported claims and sharpen evidence for senior infrastructure roles" },
    { week: 11, focus: "Interview story bank", deliverable: "Prepare STAR stories for incidents, migrations, leadership, and architecture decisions" },
    { week: 12, focus: "Share proof profile", deliverable: "Use the finished profile for targeted outreach and feedback from recruiters" },
  ];
}

function buildSeniorAiOpsRoadmap(targetRole: string): SkillGraph["roadmap_90d"] {
  return [
    { week: 1, focus: "Target proof map", deliverable: `Map ${targetRole} JD requirements to current AIX/Linux/SAP/incident experience` },
    { week: 2, focus: "Python for ops data", deliverable: "Build parsers for logs, metrics, and ticket exports with clean tests" },
    { week: 3, focus: "Statistics for incidents", deliverable: "Create notebook covering distributions, correlation, regression, and anomaly thresholds" },
    { week: 4, focus: "Anomaly detection proof", deliverable: "Train baseline supervised/unsupervised/time-series model on operational data" },
    { week: 5, focus: "RAG over runbooks", deliverable: "Index runbooks/RCA notes with embeddings, citations, and retrieval evaluation" },
    { week: 6, focus: "Agentic RCA workflow", deliverable: "Implement Detection -> Triage -> RCA -> Recommendation with human approval" },
    { week: 7, focus: "Production API", deliverable: "Expose prediction/RAG/agent workflow through Python API with async job handling" },
    { week: 8, focus: "Cloud-native deployment", deliverable: "Containerize and deploy with observability dashboards and basic CI/CD" },
    { week: 9, focus: "Evaluation and drift", deliverable: "Add eval dataset, success metrics, drift checks, and failure-mode documentation" },
    { week: 10, focus: "SAP bridge", deliverable: "Write SAP operations intelligence case study connecting HANA/BTP/runbook knowledge" },
    { week: 11, focus: "Portfolio packaging", deliverable: "Publish repo README, architecture diagram, demo video, and live endpoint/screenshots" },
    { week: 12, focus: "Interview story bank", deliverable: "Prepare stories linking 14+ years ops experience to AI systems ownership" },
  ];
}

function isInfrastructureResume(resumeText: string): boolean {
  return /aix|suse|linux|incident|rca|sap|hana|azure|cloud|operations|pacemaker|gpfs|vios|hmc|power\s*ha|hacmp/i.test(resumeText);
}

function hasIrrelevantBaselineAdvice(text: string): boolean {
  return /ui\/ux|front[-\s]?end|frontend|react|typescript|community|networking|mentorship|follow trends/i.test(text);
}

function hasAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

function hasNamedItem(items: Array<Record<string, unknown>>, name: string): boolean {
  return items.some((item) => {
    const itemName = String(item.name ?? item.label ?? item.skill ?? "").toLowerCase();
    return itemName === name.toLowerCase();
  });
}

async function collectEvidenceSignals(input: BuilderInput): Promise<EvidenceSignals> {
  const [github, projects] = await Promise.all([
    analyzeGitHub(input.github_url),
    Promise.all(input.project_links.map((url) => analyzeProjectLink(url))),
  ]);

  return {
    github,
    projects,
  };
}

async function analyzeGitHub(githubUrl: string): Promise<EvidenceSignals["github"]> {
  const handle = parseGitHubHandle(githubUrl);
  if (!handle) {
    return {
      handle: "",
      scanned: false,
      repo_count: 0,
      quality: "unavailable",
      summary: "No GitHub URL supplied.",
      repos: [],
    };
  }

  try {
    const reposResponse = await fetchWithTimeout(`https://api.github.com/users/${handle}/repos?sort=updated&per_page=8`, {
      headers: githubHeaders(),
    });
    if (!reposResponse.ok) throw new Error(`GitHub API ${reposResponse.status}`);

    const repos = (await reposResponse.json()) as Array<Record<string, unknown>>;
    const repoSignals = await Promise.all(
      repos.slice(0, 6).map(async (repo) => {
        const name = String(repo.name ?? "");
        const readmeResponse = name
          ? await fetchWithTimeout(`https://api.github.com/repos/${handle}/${name}/readme`, { headers: githubHeaders() }).catch(() => null)
          : null;

        return {
          name,
          url: String(repo.html_url ?? ""),
          description: String(repo.description ?? ""),
          language: String(repo.language ?? ""),
          updated_at: String(repo.pushed_at ?? repo.updated_at ?? ""),
          has_readme: Boolean(readmeResponse?.ok),
          homepage: String(repo.homepage ?? ""),
          archived: Boolean(repo.archived),
        };
      }),
    );

    const usefulRepos = repoSignals.filter((repo) => repo.description || repo.has_readme || repo.homepage);
    const quality = repoSignals.length === 0 ? "empty" : usefulRepos.length >= Math.ceil(repoSignals.length / 2) ? "structured" : "needs_structure";
    const topRepos = repoSignals.slice(0, 3).map((repo) => repo.name).filter(Boolean).join(", ");

    return {
      handle,
      scanned: true,
      repo_count: repos.length,
      quality,
      summary:
        quality === "structured"
          ? `Found ${repos.length} public repos; strongest recent repos include ${topRepos || "unnamed repos"}.`
          : `Found ${repos.length} public repos, but portfolio structure looks weak: add clear READMEs, descriptions, live links, and pinned proof projects.`,
      repos: repoSignals,
    };
  } catch {
    return {
      handle,
      scanned: false,
      repo_count: 0,
      quality: "unavailable",
      summary: "GitHub scan was unavailable; treat GitHub as supplied but not verified.",
      repos: [],
    };
  }
}

async function analyzeProjectLink(url: string): Promise<EvidenceSignals["projects"][number]> {
  try {
    const response = await fetchWithTimeout(url, {
      headers: { "User-Agent": "HireGENBot/0.1" },
    });
    const html = await response.text().catch(() => "");
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? "";

    return {
      url,
      reachable: response.ok,
      status: response.status,
      title,
      note: response.ok ? `Live project reachable${title ? `: ${title}` : ""}` : `Project returned HTTP ${response.status}`,
    };
  } catch {
    return {
      url,
      reachable: false,
      status: 0,
      title: "",
      note: "Could not reach project link during scan",
    };
  }
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function githubHeaders(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "HireGENBot/0.1",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

function parseGitHubHandle(githubUrl: string): string {
  try {
    const url = new URL(githubUrl);
    if (!url.hostname.toLowerCase().includes("github.com")) return "";
    return url.pathname.split("/").filter(Boolean)[0] ?? "";
  } catch {
    return "";
  }
}

function buildFallbackSkillGraph(input: BuilderInput, evidenceSignals: EvidenceSignals): SkillGraph {
  const resume = input.resume_text.toLowerCase();
  const targetRole = input.target_role.trim() || inferCurrentRole(input.resume_text) || "Current profile baseline";
  const target = `${targetRole} ${input.target_job_description}`.toLowerCase();
  const hasGithub = evidenceSignals.github.scanned && evidenceSignals.github.repo_count > 0;
  const liveProjects = evidenceSignals.projects.filter((project) => project.reachable);
  const hasProjects = liveProjects.length > 0;
  const skills = buildResumeFirstSkills(resume, target, hasGithub, hasProjects, evidenceSignals);

  const average = Math.round(skills.reduce((sum, skill) => sum + skill.score, 0) / skills.length);
  const matchScore = Math.max(48, Math.min(94, average + (hasGithub ? 2 : 0) + (hasProjects ? 3 : 0)));
  const projectRef = input.project_links.find(Boolean) ?? "candidate supplied project notes";
  const currentRole = inferCurrentRole(input.resume_text);
  const certifications = inferCertifications(input.resume_text);
  const modeText = input.analysis_mode === "target_gap" ? `targeting ${targetRole}` : `building a baseline profile from current experience${targetRole !== "Current profile baseline" ? ` around ${targetRole}` : ""}`;
  const strongest = skills.slice(0, 4).map((skill) => skill.name).join(", ");
  const summary = clip(
    `${input.name} is ${modeText}. HireGEN found ${skills.length} skill signals led by resume experience${hasGithub ? " with scanned GitHub as supplementary proof" : ""}. Strongest evidence appears in ${strongest}.${currentRole ? ` Current role signal: ${currentRole}.` : ""}${certifications.length ? ` Certifications found: ${certifications.slice(0, 2).join(", ")}.` : ""} ${evidenceSignals.github.summary}`,
    420,
  );

  return skillGraphSchema.parse({
    id: "generated",
    name: input.name,
    city: inferCity(input.resume_text),
    education: inferEducation(input.resume_text),
    target_role: targetRole,
    match_score: matchScore,
    summary,
    github: input.github_url,
    skills,
    badges: [
      {
        id: "git-verified",
        label: "Git Verified",
        awarded: hasGithub,
        reason: hasGithub ? clip(evidenceSignals.github.summary, 180) : "No public GitHub portfolio evidence found yet",
      },
      {
        id: "skill-graph",
        label: "Skill Graph",
        awarded: true,
        reason: `${skills.length} skills mapped from candidate-provided evidence`,
      },
      {
        id: "project-builder",
        label: "Project Builder",
        awarded: hasProjects,
        reason: hasProjects ? clip(`${liveProjects.length} live project link(s) reachable; first: ${liveProjects[0]?.title || projectRef}`, 180) : "Add reachable live projects or repository links to unlock",
      },
      {
        id: "lab-proof",
        label: "Lab Proof",
        awarded: false,
        reason: "Timed validation lab not completed yet",
      },
      {
        id: "career-bridge",
        label: "Career Bridge",
        awarded: matchScore >= 70,
        reason: matchScore >= 70 ? "Profile has enough signal for a guided 12-week career plan" : "Needs stronger evidence before recruiter intro",
      },
    ],
    gaps: buildGaps(input.analysis_mode, target, hasGithub, hasProjects, evidenceSignals),
    roadmap_90d: buildRoadmap(input.analysis_mode, targetRole, skills),
  });
}

function buildResumeFirstSkills(
  resume: string,
  target: string,
  hasGithub: boolean,
  hasProjects: boolean,
  evidenceSignals: EvidenceSignals,
): SkillGraph["skills"] {
  const catalog: Array<{
    name: string;
    category: SkillCategory;
    patterns: RegExp[];
    baseline: number;
    proofBoost?: boolean;
  }> = [
    { name: "IBM AIX Administration", category: "domain", baseline: 82, patterns: [/\baix\b/, /ibm aix/, /aix v[567]/] },
    { name: "SUSE Linux Administration", category: "domain", baseline: 80, patterns: [/suse/, /sles/, /suse 12/, /suse 15/] },
    { name: "Linux Administration", category: "domain", baseline: 78, patterns: [/linux/, /red hat/, /\brhel\b/] },
    { name: "PowerHA / HACMP Clusters", category: "domain", baseline: 84, patterns: [/power\s*ha/, /hacmp/, /high availability for aix/] },
    { name: "Pacemaker Clusters", category: "domain", baseline: 80, patterns: [/pacemaker/, /hana systems?/] },
    { name: "GPFS / Spectrum Scale", category: "database", baseline: 78, patterns: [/gpfs/, /spectrum scale/] },
    { name: "VIOS / HMC / LPAR", category: "cloud", baseline: 78, patterns: [/vios/, /\bhmc\b/, /lpar/, /wpar/, /\bnim\b/, /power vc/] },
    { name: "Azure Cloud Infrastructure", category: "cloud", baseline: 76, patterns: [/azure/, /cloud migration/, /cloud infrastructure/] },
    { name: "SAP Infrastructure Migration", category: "domain", baseline: 74, patterns: [/sap/, /hana/, /migration support/] },
    { name: "Major Incident & RCA", category: "soft_skill", baseline: 77, patterns: [/major incident/, /\brca\b/, /l4/, /l5/, /trouble ?shoot/] },
    { name: "Technical Health Check", category: "soft_skill", baseline: 76, patterns: [/health check/, /technical health/, /infrastructure health/, /compliant and secure/] },
    { name: "Vulnerability Remediation", category: "testing", baseline: 72, patterns: [/vulnerability/, /non-compliance/, /security remediation/, /compliance/] },
    { name: "ITIL / Service Management", category: "soft_skill", baseline: 70, patterns: [/itil/, /service management/] },
    { name: "Datacenter Operations", category: "domain", baseline: 74, patterns: [/datacenter/, /data center/, /onsite/, /firmware/, /hardware integration/] },
    { name: "Leadership / Chapter Lead", category: "soft_skill", baseline: 72, patterns: [/chapter lead/, /guild/, /lead/, /meetings/, /squad/] },
    { name: "React", category: "frontend", baseline: 64, patterns: [/react/], proofBoost: true },
    { name: "TypeScript", category: "frontend", baseline: 62, patterns: [/typescript/], proofBoost: true },
    { name: "Next.js", category: "frontend", baseline: 60, patterns: [/next\.?js/], proofBoost: true },
    { name: "REST APIs", category: "backend", baseline: 64, patterns: [/rest api/, /\bapi\b/], proofBoost: true },
    { name: "SQL", category: "database", baseline: 64, patterns: [/\bsql\b/, /database/], proofBoost: true },
  ];

  const found = catalog
    .map((item) => {
      const mentionCount = item.patterns.filter((pattern) => pattern.test(resume)).length;
      const targetMention = item.patterns.some((pattern) => pattern.test(target));
      const externalEvidence = Boolean(item.proofBoost && (hasGithub || hasProjects) && (mentionCount > 0 || targetMention));
      if (!mentionCount && !targetMention && !externalEvidence) return null;

      return scoreSkill(
        item.name,
        item.category,
        item.baseline + mentionCount * 4 + (targetMention ? 4 : 0),
        mentionCount > 0,
        externalEvidence,
      );
    })
    .filter((skill): skill is SkillGraph["skills"][number] => Boolean(skill));

  if (found.length < 4) {
    found.push(
      scoreSkill("Professional Experience", "soft_skill", 72, true, false),
      scoreSkill("Problem Solving", "soft_skill", 68, true, false),
      scoreSkill("Portfolio Evidence", "domain", hasGithub ? 66 : 58, hasGithub, hasGithub),
      scoreSkill("Career Roadmap Readiness", "soft_skill", 62, true, false),
    );
  }

  const repoLanguages = new Set(
    evidenceSignals.github.repos
      .map((repo) => repo.language)
      .filter(Boolean)
      .map((language) => language.toLowerCase()),
  );

  if (hasGithub && repoLanguages.size > 0 && !found.some((skill) => skill.name === "Git Portfolio")) {
    found.push(
      scoreSkill(
        "Git Portfolio",
        "domain",
        evidenceSignals.github.quality === "structured" ? 72 : 60,
        true,
        true,
        evidenceSignals.github.summary,
      ),
    );
  }

  if (hasProjects && !found.some((skill) => skill.name === "Live Product Portfolio")) {
    found.push(
      scoreSkill(
        "Live Product Portfolio",
        "domain",
        74,
        true,
        true,
        `${evidenceSignals.projects.filter((project) => project.reachable).length} reachable live project links`,
      ),
    );
  }

  return found.sort((a, b) => b.score - a.score).slice(0, 10);
}

function scoreSkill(
  name: string,
  category: SkillCategory,
  baseline: number,
  mentioned: boolean,
  externalEvidence: boolean,
  evidenceRef?: string,
): SkillGraph["skills"][number] {
  const score = Math.max(45, Math.min(96, baseline + (externalEvidence ? 3 : 0)));

  return {
    name,
    category,
    score,
    freshness_days: mentioned || externalEvidence ? 7 : 45,
    evidence: [
      {
        kind: externalEvidence ? "project" : "resume",
        ref: clip(evidenceRef ?? (externalEvidence ? "candidate supplied GitHub/project link" : "resume text"), 120),
        note: mentioned ? "Mentioned directly in supplied resume text" : "Inferred from target role and adjacent evidence",
      },
    ],
  };
}

function clip(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

function buildGaps(
  analysisMode: BuilderInput["analysis_mode"],
  target: string,
  hasGithub: boolean,
  hasProjects: boolean,
  evidenceSignals: EvidenceSignals,
): SkillGraph["gaps"] {
  const targetMentionsCloud = /cloud|azure|aws|platform|architect|devops|sre/.test(target);
  const targetMentionsAi = /ai|ml|llm|agent|automation/.test(target);

  if (analysisMode === "target_gap") {
    return [
      {
        skill: targetMentionsCloud ? "Target architecture proof" : "Target-role proof",
        severity: "high",
        recommendation: "Map current resume evidence to the target JD and create one role-specific case study with architecture, risks, and trade-offs.",
      },
      {
        skill: targetMentionsAi ? "AI-era automation evidence" : "Modern tooling evidence",
        severity: "medium",
        recommendation: targetMentionsAi
          ? "Build one AIOps proof project using ops logs/tickets: anomaly detection, RCA recommendation, RAG over runbooks, and human-in-loop guardrails."
          : "Add recent tooling, automation, observability, or cloud migration proof aligned to the target role.",
      },
      {
        skill: "Lab Proof",
        severity: "medium",
        recommendation: "Complete a controlled role-specific lab to convert senior resume claims into verified proof.",
      },
    ];
  }

  return [
    {
      skill: "Proof packaging",
      severity: "high",
      recommendation: "Turn strongest resume projects into proof artifacts: architecture note, incident/RCA sample, migration case study, and health-check template.",
    },
    {
      skill: "Git/project evidence",
      severity: hasGithub && hasProjects && evidenceSignals.github.quality === "structured" ? "low" : "medium",
      recommendation:
        hasGithub || hasProjects
          ? "Improve portfolio proof: clear READMEs, project descriptions, architecture diagrams, live links, and pinned repos matching the resume."
          : "Add public-safe infrastructure scripts, runbooks, or lab repos so GitHub supports the senior resume profile.",
    },
    {
      skill: "Lab Proof",
      severity: "medium",
      recommendation: "Create a timed infrastructure troubleshooting lab for AIX/Linux/cloud operations proof.",
    },
  ];
}

function buildRoadmap(
  analysisMode: BuilderInput["analysis_mode"],
  targetRole: string,
  skills: SkillGraph["skills"],
): SkillGraph["roadmap_90d"] {
  const strongest = skills[0]?.name ?? "core skill";
  const isTargetGap = analysisMode === "target_gap";

  return [
    { week: 1, focus: "Evidence inventory", deliverable: "Group resume projects, certifications, GitHub, and role evidence into proof buckets" },
    { week: 2, focus: "Proof profile rewrite", deliverable: `Create a concise ${targetRole} proof summary led by ${strongest}` },
    { week: 3, focus: "Case study 1", deliverable: "Write one technical health check, migration, incident, or cluster build case study" },
    { week: 4, focus: "Portfolio support", deliverable: "Add public-safe scripts, runbooks, diagrams, or README artifacts to GitHub" },
    { week: 5, focus: isTargetGap ? "Target JD mapping" : "Certification mapping", deliverable: isTargetGap ? "Map every target JD requirement to current proof or a gap" : "Map certifications and enterprise skills to recruiter-facing evidence" },
    { week: 6, focus: "Validation lab design", deliverable: "Define a timed AIX/Linux/cloud troubleshooting lab with expected output" },
    { week: 7, focus: "Automation proof", deliverable: "Build or document one automation that reduces manual ops effort" },
    { week: 8, focus: "Leadership proof", deliverable: "Document chapter lead, incident leadership, mentoring, or stakeholder impact examples" },
    { week: 9, focus: "Gap closure sprint", deliverable: "Close top two role gaps with learning notes and hands-on proof" },
    { week: 10, focus: "Mock recruiter review", deliverable: "Review profile for evidence clarity and remove unsupported claims" },
    { week: 11, focus: "Interview story bank", deliverable: "Prepare STAR stories for incidents, migrations, outages, and architecture decisions" },
    { week: 12, focus: "Final proof profile", deliverable: "Publish/share the proof profile and use it for targeted recruiter outreach" },
  ];
}

function inferCity(resumeText: string): string {
  const cityMatch = resumeText.match(/\b(Bengaluru|Bangalore|Hyderabad|Pune|Chennai|Mumbai|Delhi|Noida|Gurugram|Kochi|Trivandrum|Kolkata|Ahmedabad)\b/i);
  return cityMatch?.[0] ?? "India";
}

function inferEducation(resumeText: string): string {
  const educationMatch = resumeText.match(/\b(B\.?Tech|M\.?Tech|BCA|MCA|BSc|MSc|MBA|PhD)[^,\n.]*/i);
  return educationMatch?.[0] ?? "Education not verified";
}

function inferCurrentRole(resumeText: string): string {
  const roleMatch = resumeText.match(/(?:Job Title:\s*|Currently working as\s+)([^\n.]+)/i);
  return roleMatch?.[1]?.trim().replace(/\s+/g, " ") ?? "";
}

function inferCertifications(resumeText: string): string[] {
  const certifications = [
    /ITIL V3 Certified Professional/i,
    /IBM Certified System Expert - High Availability for AIX/i,
    /Microsoft Certified Professional - Implementing Azure Cloud Infrastructure/i,
  ];

  return certifications
    .map((pattern) => resumeText.match(pattern)?.[0])
    .filter((certification): certification is string => Boolean(certification));
}
