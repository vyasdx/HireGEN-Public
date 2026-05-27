import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { stressFixtures } from "./stress-fixtures.mjs";

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => {
      const [key, ...rest] = arg.split("=");
      return [key.replace(/^--/, ""), rest.join("=") || "true"];
    }),
);

const baseUrl = (args.get("base") ?? "http://localhost:3000").replace(/\/$/, "");
const limit = Number(args.get("limit") ?? stressFixtures.length);
const outDir = args.get("out") ?? "../docs/stress-results";
const fixtures = stressFixtures.slice(0, limit);

const runStarted = new Date().toISOString();
const results = [];

for (const fixture of fixtures) {
  const startedAt = Date.now();
  const response = await fetch(`${baseUrl}/api/skill-graph`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      analysis_mode: fixture.mode,
      name: fixture.name,
      target_role: fixture.target_role,
      target_job_description: fixture.target_job_description,
      resume_text: fixture.resume_text,
      github_url: fixture.github_url,
      project_links: fixture.project_links,
    }),
  }).catch((error) => ({ ok: false, status: 0, error }));

  const elapsedMs = Date.now() - startedAt;
  let payload = null;
  if ("json" in response) {
    payload = await response.json().catch(() => null);
  }

  const evaluation = evaluateFixture(fixture, response, payload);
  results.push({
    id: fixture.id,
    candidateType: fixture.candidateType,
    mode: fixture.mode,
    status: response.status,
    elapsedMs,
    generationMode: payload?.mode ?? "none",
    score: payload?.graph?.match_score ?? null,
    skillCount: payload?.graph?.skills?.length ?? 0,
    gapCount: payload?.graph?.gaps?.length ?? 0,
    highGapCount: (payload?.graph?.gaps ?? []).filter((gap) => gap.severity === "high").length,
    pass: evaluation.pass,
    warnings: evaluation.warnings,
    graph: payload?.graph
      ? {
          summary: payload.graph.summary,
          skills: payload.graph.skills.map((skill) => `${skill.name} (${skill.score})`),
          gaps: payload.graph.gaps.map((gap) => `${gap.severity}: ${gap.skill}`),
          badges: payload.graph.badges.map((badge) => `${badge.awarded ? "awarded" : "locked"}: ${badge.label}`),
        }
      : null,
  });
}

const passed = results.filter((result) => result.pass).length;
const failed = results.length - passed;
const date = runStarted.slice(0, 10);
const absoluteOutDir = outDir;

await mkdir(absoluteOutDir, { recursive: true });
await writeFile(join(absoluteOutDir, `${date}-stress-test.json`), JSON.stringify({ baseUrl, runStarted, results }, null, 2));
await writeFile(join(absoluteOutDir, `${date}-stress-test.md`), renderMarkdown({ baseUrl, runStarted, results, passed, failed }));

console.log(`Stress test complete: ${passed}/${results.length} passed against ${baseUrl}`);
for (const result of results) {
  const mark = result.pass ? "PASS" : "CHECK";
  console.log(`${mark} ${result.id} score=${result.score ?? "n/a"} mode=${result.generationMode} warnings=${result.warnings.length}`);
  for (const warning of result.warnings) console.log(`  - ${warning}`);
}

function evaluateFixture(fixture, response, payload) {
  const warnings = [];
  const graph = payload?.graph;

  if (!response.ok) warnings.push(`HTTP ${response.status}`);
  if (!graph) warnings.push("No graph returned");
  if (!payload?.mode) warnings.push("Generation mode missing");
  if (!graph) return { pass: false, warnings };

  const text = [
    graph.summary,
    graph.target_role,
    ...graph.skills.map((skill) => `${skill.name} ${skill.evidence?.map((evidence) => `${evidence.ref} ${evidence.note ?? ""}`).join(" ")}`),
    ...graph.gaps.map((gap) => `${gap.skill} ${gap.severity} ${gap.recommendation}`),
    ...graph.badges.map((badge) => `${badge.label} ${badge.reason}`),
  ].join("\n");

  if (typeof graph.match_score !== "number") warnings.push("Match score missing");
  if (graph.match_score < fixture.expected.scoreMin || graph.match_score > fixture.expected.scoreMax) {
    warnings.push(`Score ${graph.match_score} outside expected range ${fixture.expected.scoreMin}-${fixture.expected.scoreMax}`);
  }

  if (!fixture.expected.includeAny.some((term) => includesTerm(text, term))) {
    warnings.push(`Did not find expected signals: ${fixture.expected.includeAny.join(", ")}`);
  }

  const forbidden = fixture.expected.forbidAny.filter((term) => includesTerm(text, term));
  if (forbidden.length > 0) warnings.push(`Possible hallucination/drift terms found: ${forbidden.join(", ")}`);

  if (fixture.expected.requireHighGap && !graph.gaps.some((gap) => gap.severity === "high")) {
    warnings.push("Expected at least one high-severity gap");
  }

  if (fixture.mode === "target_gap" && /networking with professionals|seek mentorship|follow trends/i.test(text)) {
    warnings.push("Generic roadmap advice found");
  }

  if (fixture.mode === "baseline_profile" && /target JD requirement/i.test(text)) {
    warnings.push("Target-role language leaked into baseline mode");
  }

  return { pass: warnings.length === 0, warnings };
}

function includesTerm(text, term) {
  return text.toLowerCase().includes(term.toLowerCase());
}

function renderMarkdown({ baseUrl, runStarted, results, passed, failed }) {
  const rows = results
    .map((result) =>
      [
        result.id,
        result.candidateType,
        result.mode,
        result.status,
        result.generationMode,
        result.score ?? "n/a",
        result.highGapCount,
        result.pass ? "PASS" : "CHECK",
        result.warnings.join("; ") || "-",
      ].join(" | "),
    )
    .join("\n");

  const details = results
    .map(
      (result) => `## ${result.id} - ${result.candidateType}

- Status: ${result.status}
- Generation mode: ${result.generationMode}
- Match score: ${result.score ?? "n/a"}
- Result: ${result.pass ? "PASS" : "CHECK"}
- Warnings: ${result.warnings.length ? result.warnings.join("; ") : "None"}
- Summary: ${result.graph?.summary ?? "No graph returned"}
- Skills: ${result.graph?.skills.join(", ") ?? "-"}
- Gaps: ${result.graph?.gaps.join(", ") ?? "-"}
`,
    )
    .join("\n");

  return `# HireGEN Stress Test Results - ${runStarted.slice(0, 10)}

**Run started:** ${runStarted}  
**Target:** ${baseUrl}  
**Result:** ${passed}/${results.length} passed, ${failed} needs review

These cases use synthetic/JSON Resume-inspired resumes. They are safe to commit and repeat, and they avoid scraping personal resumes from the internet.

| ID | Type | Mode | HTTP | Engine | Score | High gaps | Result | Warnings |
|---|---|---|---:|---|---:|---:|---|---|
${rows}

${details}
`;
}
