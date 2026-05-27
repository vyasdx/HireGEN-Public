"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SampleAudience, StressSample } from "@/lib/sample-profiles";

type Filter = "all" | SampleAudience;

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "students", label: "Students" },
  { id: "employees", label: "Employees" },
  { id: "recruiters", label: "Recruiter checks" },
];

export function SampleProfileLab({ samples }: { samples: StressSample[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [runningId, setRunningId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const visibleSamples = useMemo(() => {
    if (filter === "all") return samples;
    return samples.filter((sample) => sample.audience.includes(filter));
  }, [filter, samples]);

  async function runSample(sample: StressSample) {
    setRunningId(sample.id);
    setError(null);

    const response = await fetch("/api/skill-graph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        analysis_mode: sample.analysis_mode,
        name: sample.name,
        target_role: sample.target_role,
        target_job_description: sample.target_job_description,
        resume_text: sample.resume_text,
        github_url: sample.github_url,
        project_links: sample.project_links,
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.graph) {
      setError(`${sample.id} did not generate. Please retry or open Builder manually.`);
      setRunningId(null);
      return;
    }

    sessionStorage.setItem("hiregen:last-skill-graph", JSON.stringify(data));
    router.push("/profile/generated");
  }

  return (
    <section className="space-y-8">
      <div className="glass p-2 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === item.id ? "bg-ink-950 text-white shadow-soft" : "bg-white/65 text-ink-600 hover:text-ink-950"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="glass-soft border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {visibleSamples.map((sample) => (
          <article key={sample.id} className="glass-strong p-5">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip !text-[10px]">{sample.id}</span>
                  <span className="chip chip-demo !text-[10px]">{sample.candidate_type}</span>
                  <span className="chip !text-[10px]">
                    {sample.analysis_mode === "target_gap" ? "Target gap" : "Baseline"}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink-950">{sample.title}</h2>
                <p className="mt-2 text-sm text-ink-600">{sample.what_it_tests}</p>
              </div>
            </div>

            <dl className="relative z-10 mt-5 grid gap-3 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-ink-500">Candidate</dt>
                <dd className="mt-1 font-semibold text-ink-900">{sample.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-ink-500">Target</dt>
                <dd className="mt-1 text-ink-700">{sample.target_role || "Current profile baseline"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-ink-500">Expected signal</dt>
                <dd className="mt-1 text-ink-700">{sample.expected_signal}</dd>
              </div>
            </dl>

            <details className="relative z-10 mt-5 group">
              <summary className="cursor-pointer text-sm font-semibold text-brand-700 group-open:text-ink-950">
                View sample input
              </summary>
              <div className="mt-3 rounded-2xl bg-white/70 p-4 text-xs leading-6 text-ink-600">
                <div className="font-semibold text-ink-900">Resume</div>
                <pre className="mt-2 whitespace-pre-wrap font-mono">{sample.resume_text}</pre>
                {sample.target_job_description && (
                  <>
                    <div className="mt-4 font-semibold text-ink-900">Target JD</div>
                    <pre className="mt-2 whitespace-pre-wrap font-mono">{sample.target_job_description}</pre>
                  </>
                )}
              </div>
            </details>

            <button
              type="button"
              onClick={() => runSample(sample)}
              disabled={runningId !== null}
              className="btn-primary relative z-10 mt-5 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {runningId === sample.id ? "Generating..." : "Run this sample"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
