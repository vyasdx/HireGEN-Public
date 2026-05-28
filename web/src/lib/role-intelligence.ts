import type { BuilderInput } from "@/lib/skill-graph-schema";

export type RoleSkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "testing"
  | "ai"
  | "soft_skill"
  | "domain";

export type RoleSkillRequirement = {
  name: string;
  category: RoleSkillCategory;
  importance: "must_have" | "strong" | "good_to_have";
  evidence: Array<"resume" | "github" | "project" | "lab" | "certificate" | "interview">;
  aliases?: string[];
};

export type RoleSeed = {
  id: string;
  title: string;
  family: string;
  levels: string[];
  domains: string[];
  keywords: string[];
  skills: RoleSkillRequirement[];
  proof_templates: string[];
};

export type RoleIntelligenceContext = {
  source: "local_seed";
  version: string;
  generated_at: string;
  matched_roles: Array<{
    id: string;
    title: string;
    score: number;
    reason: string;
  }>;
  required_skills: RoleSkillRequirement[];
  aliases_used: Array<{
    alias: string;
    canonical: string;
  }>;
  logical_transfers: Array<{
    from: string;
    to: string;
    reason: string;
  }>;
  proof_templates: string[];
  guardrails: string[];
};

export const roleSeeds: RoleSeed[] = [
  {
    id: "business-analyst",
    title: "Business Analyst",
    family: "Business Analysis",
    levels: ["fresher", "junior", "mid"],
    domains: ["generic", "saas", "operations"],
    keywords: ["business analyst", "functional consultant", "requirements", "brd", "stakeholder", "uat", "process flow"],
    skills: [
      skill("Requirement Analysis", "domain", "must_have", ["resume", "interview"], ["requirements gathering", "requirement management", "client requirements"]),
      skill("Stakeholder Communication", "soft_skill", "must_have", ["resume", "interview"], ["client communication", "stakeholder management"]),
      skill("BRD / Functional Specification", "domain", "strong", ["resume", "project"], ["business requirement document", "functional specification", "technical specification"]),
      skill("Process Flow Mapping", "domain", "strong", ["resume", "project"], ["workflow", "process flow", "current state", "future state"]),
      skill("UAT Planning", "testing", "strong", ["resume", "project", "lab"], ["user acceptance testing", "uat cases"]),
      skill("Defect Tracking", "testing", "strong", ["resume", "project"], ["issue tracker", "bug lifecycle"]),
      skill("Traceability Matrix", "testing", "good_to_have", ["project", "lab"], ["rtm", "requirement traceability"]),
      skill("Basic SQL", "database", "good_to_have", ["project", "lab"], ["sql queries", "reporting queries"]),
      skill("Agile Collaboration", "soft_skill", "good_to_have", ["resume", "interview"], ["scrum", "jira", "user stories"]),
    ],
    proof_templates: ["Anonymized BRD", "Process flow diagram", "Requirement traceability matrix", "UAT test cases", "Defect lifecycle note"],
  },
  {
    id: "healthcare-business-analyst",
    title: "Healthcare Business Analyst",
    family: "Business Analysis",
    levels: ["junior", "mid"],
    domains: ["healthcare", "hmis", "hospital operations"],
    keywords: ["healthcare", "health care", "hmis", "hospital", "patient", "clinical", "functional consultant"],
    skills: [
      skill("Healthcare / HMIS Domain", "domain", "must_have", ["resume", "interview"], ["hospital workflows", "hmis"]),
      skill("Requirement Analysis", "domain", "must_have", ["resume", "interview"], ["client requirements", "requirement validation"]),
      skill("Process Flow Mapping", "domain", "strong", ["resume", "project"], ["hospital process flow", "workflow mapping"]),
      skill("UAT Planning", "testing", "strong", ["resume", "project", "lab"], ["uat", "test cases"]),
      skill("QA Coordination", "testing", "strong", ["resume", "interview"], ["qa review", "test case review"]),
      skill("Production Support", "soft_skill", "strong", ["resume", "interview"], ["production problems", "application support"]),
      skill("Defect Tracking", "testing", "strong", ["resume", "project"], ["issue tracker", "defect reporting"]),
      skill("Root Cause Analysis", "soft_skill", "good_to_have", ["resume", "lab"], ["cause-effect analysis", "fish bone analysis"]),
      skill("Healthcare Data Awareness", "database", "good_to_have", ["interview", "lab"], ["reports", "patient data", "operational data"]),
    ],
    proof_templates: ["HMIS workflow case study", "UAT plan", "Defect report sample", "Client requirement validation note", "Anonymized hospital process map"],
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    family: "Software Engineering",
    levels: ["fresher", "junior", "mid", "senior"],
    domains: ["saas", "platform"],
    keywords: ["backend", "api", "node", "python", "java", "microservice", "server"],
    skills: [
      skill("REST APIs", "backend", "must_have", ["github", "project", "lab"], ["api", "endpoint"]),
      skill("Backend Language", "backend", "must_have", ["github", "project", "lab"], ["node.js", "python", "java"]),
      skill("Database Design", "database", "strong", ["github", "project", "lab"], ["postgresql", "mysql", "schema"]),
      skill("Authentication", "backend", "strong", ["github", "project"], ["auth", "jwt", "oauth"]),
      skill("Testing", "testing", "strong", ["github", "lab"], ["unit tests", "integration tests"]),
      skill("Docker Basics", "cloud", "good_to_have", ["github", "project"], ["containerization"]),
      skill("CI/CD", "cloud", "good_to_have", ["github", "project"], ["github actions", "pipeline"]),
      skill("Observability", "testing", "good_to_have", ["project", "interview"], ["logs", "metrics"]),
    ],
    proof_templates: ["API repo with README", "Database schema", "Test report", "Deployment notes", "Postman collection"],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    family: "Software Engineering",
    levels: ["fresher", "junior", "mid"],
    domains: ["web", "saas"],
    keywords: ["frontend", "react", "next.js", "ui", "typescript", "css"],
    skills: [
      skill("React", "frontend", "must_have", ["github", "project", "lab"], ["react.js"]),
      skill("TypeScript", "frontend", "strong", ["github", "project", "lab"], ["ts"]),
      skill("Component Design", "frontend", "strong", ["github", "project"], ["ui components"]),
      skill("Responsive UI", "frontend", "strong", ["project", "lab"], ["mobile responsive"]),
      skill("State Management", "frontend", "good_to_have", ["github", "project"], ["zustand", "redux", "context"]),
      skill("API Integration", "frontend", "strong", ["github", "project"], ["fetch", "rest"]),
      skill("Accessibility Basics", "frontend", "good_to_have", ["project", "lab"], ["a11y"]),
      skill("Frontend Testing", "testing", "good_to_have", ["github", "lab"], ["playwright", "unit tests"]),
    ],
    proof_templates: ["Live UI demo", "Component README", "Responsive screenshots", "Accessibility checklist", "Frontend test notes"],
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud DevOps Engineer",
    family: "Cloud / Platform",
    levels: ["junior", "mid", "senior"],
    domains: ["cloud", "platform", "sre"],
    keywords: ["devops", "cloud", "docker", "kubernetes", "terraform", "ci/cd", "monitoring"],
    skills: [
      skill("Linux Administration", "cloud", "must_have", ["resume", "lab"], ["linux ops"]),
      skill("Cloud Platform", "cloud", "must_have", ["resume", "certificate", "lab"], ["aws", "azure", "gcp"]),
      skill("Docker", "cloud", "strong", ["github", "project", "lab"], ["containers"]),
      skill("Kubernetes", "cloud", "strong", ["github", "project", "lab"], ["k8s"]),
      skill("Terraform", "cloud", "strong", ["github", "project"], ["iac"]),
      skill("CI/CD", "cloud", "strong", ["github", "project"], ["pipelines"]),
      skill("Monitoring", "testing", "strong", ["project", "lab"], ["prometheus", "grafana"]),
      skill("Incident Response", "soft_skill", "good_to_have", ["resume", "interview"], ["on-call", "rca"]),
    ],
    proof_templates: ["Terraform module", "CI/CD pipeline", "Monitoring dashboard", "Dockerized service", "Incident runbook"],
  },
  {
    id: "aix-linux-administrator",
    title: "AIX/Linux Administrator",
    family: "Infrastructure",
    levels: ["mid", "senior", "lead"],
    domains: ["infrastructure", "unix", "enterprise"],
    keywords: ["aix", "suse", "linux", "powerha", "hacmp", "vios", "hmc", "lpar", "pacemaker"],
    skills: [
      skill("IBM AIX Administration", "domain", "must_have", ["resume", "certificate", "lab"], ["aix"]),
      skill("SUSE/Linux Administration", "domain", "must_have", ["resume", "lab"], ["suse", "linux"]),
      skill("PowerHA / HACMP", "domain", "strong", ["resume", "certificate", "lab"], ["hacmp", "power ha"]),
      skill("Pacemaker Clusters", "domain", "strong", ["resume", "lab"], ["pcs", "pacemaker"]),
      skill("VIOS / HMC / LPAR", "cloud", "strong", ["resume", "lab"], ["vios", "hmc", "lpar"]),
      skill("Incident / RCA", "soft_skill", "strong", ["resume", "interview"], ["major incident", "root cause analysis"]),
      skill("Patching / Upgrades", "testing", "strong", ["resume", "lab"], ["tl upgrade", "os patching"]),
      skill("Technical Health Check", "testing", "strong", ["resume", "project"], ["health check"]),
    ],
    proof_templates: ["Troubleshooting lab", "Health-check report", "Migration case study", "RCA sample", "Cluster build runbook"],
  },
  {
    id: "sdet",
    title: "SDET",
    family: "Quality Engineering",
    levels: ["junior", "mid", "senior"],
    domains: ["qa", "automation"],
    keywords: ["sdet", "automation testing", "selenium", "playwright", "api testing", "qa"],
    skills: [
      skill("Test Automation", "testing", "must_have", ["github", "project", "lab"], ["selenium", "playwright"]),
      skill("API Testing", "testing", "strong", ["project", "lab"], ["postman", "rest api testing"]),
      skill("Programming for Tests", "backend", "strong", ["github", "lab"], ["java", "javascript", "python"]),
      skill("Test Strategy", "testing", "strong", ["resume", "interview"], ["test plan"]),
      skill("CI Test Execution", "cloud", "good_to_have", ["github", "project"], ["ci/cd"]),
      skill("Defect Triage", "soft_skill", "strong", ["resume", "interview"], ["bug triage"]),
      skill("Regression Suites", "testing", "strong", ["resume", "project"], ["smoke tests", "regression"]),
    ],
    proof_templates: ["Automation repo", "API test collection", "CI test run", "Defect triage note", "Regression strategy"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    family: "Data",
    levels: ["fresher", "junior", "mid"],
    domains: ["analytics", "business"],
    keywords: ["data analyst", "sql", "excel", "dashboard", "python", "pandas", "statistics"],
    skills: [
      skill("SQL Analysis", "database", "must_have", ["project", "lab"], ["sql", "queries"]),
      skill("Excel / Spreadsheet Analysis", "database", "strong", ["project", "interview"], ["excel", "pivot"]),
      skill("Data Cleaning", "database", "strong", ["project", "lab"], ["pandas", "cleaning"]),
      skill("Dashboarding", "frontend", "strong", ["project"], ["power bi", "tableau", "dashboard"]),
      skill("Business Metrics", "domain", "strong", ["resume", "project"], ["kpi", "metrics"]),
      skill("Statistics Basics", "database", "good_to_have", ["resume", "lab"], ["statistics"]),
      skill("Data Storytelling", "soft_skill", "strong", ["project", "interview"], ["presentation"]),
    ],
    proof_templates: ["SQL case study", "Dashboard screenshots", "Cleaned dataset notebook", "KPI explanation", "Insights memo"],
  },
  {
    id: "ai-systems-engineer",
    title: "AI Systems Engineer",
    family: "AI Engineering",
    levels: ["mid", "senior"],
    domains: ["ai", "platform", "aiops"],
    keywords: ["ai systems", "aiops", "rag", "agentic", "machine learning", "llm", "anomaly detection"],
    skills: [
      skill("Python for AI", "ai", "must_have", ["github", "project", "lab"], ["python"]),
      skill("Machine Learning", "ai", "must_have", ["project", "lab"], ["ml", "prediction models"]),
      skill("Statistics", "ai", "strong", ["resume", "lab"], ["regression", "hypothesis testing"]),
      skill("RAG / Retrieval", "ai", "strong", ["github", "project", "lab"], ["embeddings", "vector stores"]),
      skill("Agentic Workflows", "ai", "strong", ["github", "project", "lab"], ["tool calling", "agent design"]),
      skill("Production API", "backend", "strong", ["github", "project"], ["api", "microservice"]),
      skill("Evaluation / Drift", "testing", "strong", ["project", "lab"], ["evals", "drift monitoring"]),
      skill("Cloud Deployment", "cloud", "strong", ["project", "lab"], ["docker", "kubernetes", "cloud"]),
    ],
    proof_templates: ["Prediction notebook", "RAG prototype", "Agent workflow demo", "Evaluation dataset", "Deployment notes"],
  },
  {
    id: "recruiter-hr-analyst",
    title: "Recruiter / HR Analyst",
    family: "People Operations",
    levels: ["junior", "mid"],
    domains: ["recruiting", "hr"],
    keywords: ["recruiter", "hr analyst", "talent acquisition", "sourcing", "screening"],
    skills: [
      skill("Candidate Sourcing", "domain", "must_have", ["resume", "interview"], ["sourcing"]),
      skill("Screening", "domain", "must_have", ["resume", "interview"], ["phone screen", "resume screening"]),
      skill("JD Intake", "soft_skill", "strong", ["resume", "interview"], ["hiring manager intake"]),
      skill("Pipeline Management", "domain", "strong", ["resume", "project"], ["ats", "pipeline"]),
      skill("Stakeholder Coordination", "soft_skill", "strong", ["resume", "interview"], ["hiring manager"]),
      skill("Recruiting Metrics", "database", "good_to_have", ["project", "interview"], ["time to hire", "conversion"]),
    ],
    proof_templates: ["Sourcing plan", "Screening scorecard", "Pipeline report", "JD intake template", "Recruiting metrics dashboard"],
  },
];

export function buildRoleIntelligence(input: BuilderInput): RoleIntelligenceContext {
  const text = [
    input.analysis_mode === "target_gap" ? input.target_role : "",
    input.analysis_mode === "target_gap" ? input.target_job_description : "",
    input.resume_text,
    input.product_context,
  ]
    .join("\n")
    .toLowerCase();

  const matched_roles = roleSeeds
    .map((role) => {
      const keywordHits = role.keywords.filter((keyword) => text.includes(keyword.toLowerCase()));
      const skillHits = role.skills.filter((roleSkill) =>
        [roleSkill.name, ...(roleSkill.aliases ?? [])].some((term) => text.includes(term.toLowerCase())),
      );
      const targetBoost = input.analysis_mode === "target_gap" && input.target_role.toLowerCase().includes(role.title.toLowerCase()) ? 25 : 0;
      const score = Math.min(100, targetBoost + keywordHits.length * 12 + skillHits.length * 5);
      return {
        id: role.id,
        title: role.title,
        score,
        reason: [...keywordHits.slice(0, 4), ...skillHits.slice(0, 2).map((skillHit) => skillHit.name)].join(", ") || "low keyword match",
      };
    })
    .filter((match) => match.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const selectedRoles = matched_roles.length
    ? matched_roles.map((match) => roleSeeds.find((role) => role.id === match.id)).filter((role): role is RoleSeed => Boolean(role))
    : [roleSeeds[0]];
  const required_skills = dedupeSkills(selectedRoles.flatMap((role) => role.skills)).slice(0, 30);
  const aliases_used = required_skills
    .flatMap((roleSkill) =>
      (roleSkill.aliases ?? [])
        .filter((alias) => text.includes(alias.toLowerCase()))
        .map((alias) => ({ alias, canonical: roleSkill.name })),
    )
    .slice(0, 12);

  return {
    source: "local_seed",
    version: "2026-05-28-mvp-seed",
    generated_at: "2026-05-28",
    matched_roles,
    required_skills,
    aliases_used,
    logical_transfers: inferLogicalTransfers(text),
    proof_templates: Array.from(new Set(selectedRoles.flatMap((role) => role.proof_templates))).slice(0, 10),
    guardrails: [
      "Use these local role records as the ground truth for role requirements.",
      "Do not invent role requirements outside this local seed. If a requirement is not in the seed, mark it as unclassified or future taxonomy work.",
      "Candidate skills must be tied to resume, GitHub, project, lab, certificate, or interview evidence.",
      "Logical transfer is allowed only when listed in logical_transfers or clearly supported by adjacent evidence.",
    ],
  };
}

function skill(
  name: string,
  category: RoleSkillCategory,
  importance: RoleSkillRequirement["importance"],
  evidence: RoleSkillRequirement["evidence"],
  aliases: string[] = [],
): RoleSkillRequirement {
  return { name, category, importance, evidence, aliases };
}

function dedupeSkills(skills: RoleSkillRequirement[]): RoleSkillRequirement[] {
  const seen = new Set<string>();
  const result: RoleSkillRequirement[] = [];
  for (const roleSkill of skills) {
    const key = roleSkill.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(roleSkill);
  }
  return result;
}

function inferLogicalTransfers(text: string): RoleIntelligenceContext["logical_transfers"] {
  const transfers: RoleIntelligenceContext["logical_transfers"] = [];
  const add = (from: string, to: string, reason: string) => transfers.push({ from, to, reason });

  if (/power\s*ha|hacmp|pacemaker|cluster/.test(text)) {
    add("HA cluster operations", "Resilient systems thinking", "Cluster operations show failover, dependency, and reliability reasoning.");
  }
  if (/incident|\brca\b|root cause|troubleshoot/.test(text)) {
    add("Incident/RCA", "AIOps triage workflow", "Incident handling transfers to detection, triage, RCA, and recommendation workflows.");
  }
  if (/uat|test cases|defect|issue tracker/.test(text)) {
    add("UAT / defect lifecycle", "Quality validation", "UAT and defect evidence transfer to acceptance criteria and validation proof.");
  }
  if (/hospital|hmis|healthcare|health care/.test(text)) {
    add("Healthcare operations", "Healthcare product/domain analysis", "Hospital workflow knowledge supports healthcare BA and product roles.");
  }
  if (/brd|requirement|process flow|stakeholder/.test(text)) {
    add("Requirements documentation", "Product/business analysis", "Requirement and process artifacts are direct proof for BA workflows.");
  }

  return transfers.slice(0, 8);
}
