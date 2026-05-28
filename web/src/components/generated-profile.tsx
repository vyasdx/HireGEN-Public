"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileReport } from "@/components/profile-report";
import { skillGraphSchema, type SkillGraph } from "@/lib/skill-graph-schema";

type StoredGeneration = {
  graph: SkillGraph;
  mode?: "openai" | "fallback";
  warning?: string;
  input_analysis_mode?: "baseline_profile" | "target_gap";
};

export function GeneratedProfile() {
  const [generation, setGeneration] = useState<StoredGeneration | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;

      const raw = sessionStorage.getItem("hiregen:last-skill-graph");
      if (raw) {
        const parsed = parseStoredGeneration(raw);
        setGeneration(parsed);
      }
      setLoaded(true);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!loaded) {
    return (
      <main className="px-6 pt-12 pb-24 max-w-3xl mx-auto w-full">
        <div className="glass-strong p-8 text-center">
          <div className="relative z-10 text-ink-700">Loading generated profile...</div>
        </div>
      </main>
    );
  }

  if (!generation) {
    return (
      <main className="px-6 pt-12 pb-24 max-w-3xl mx-auto w-full">
        <div className="glass-strong p-8 text-center">
          <div className="relative z-10">
            <div className="chip chip-demo mb-3">No generated profile found</div>
            <h1 className="display text-3xl">Build a proof profile first.</h1>
            <p className="mt-3 text-ink-600">
              Generated MVP profiles are stored in this browser session until database persistence lands.
            </p>
            <Link href="/builder" className="btn-primary mt-6">
              Open builder
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ProfileReport
      candidate={generation.graph}
      modeLabel={generation.mode === "fallback" ? "Local fallback" : "OpenAI structured output"}
      analysisMode={generation.input_analysis_mode}
    />
  );
}

function parseStoredGeneration(raw: string): StoredGeneration | null {
  try {
    const data = JSON.parse(raw) as StoredGeneration;
    const parsedGraph = skillGraphSchema.safeParse(data.graph);
    if (!parsedGraph.success) return null;

    return {
      graph: parsedGraph.data,
      mode: data.mode,
      warning: data.warning,
      input_analysis_mode: data.input_analysis_mode,
    };
  } catch {
    return null;
  }
}
