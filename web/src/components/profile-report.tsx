import { DemoChip } from "@/components/demo-chip";
import type { SkillGraph } from "@/lib/skill-graph-schema";

type ProfileReportProps = {
  candidate: SkillGraph;
  demo?: boolean;
  modeLabel?: string;
  analysisMode?: "baseline_profile" | "target_gap";
};

export function ProfileReport({ candidate: c, demo = false, modeLabel, analysisMode }: ProfileReportProps) {
  const isTargetGap = analysisMode === "target_gap";
  const scoreBreakdown = isTargetGap ? buildTargetScoreBreakdown(c) : null;

  return (
    <main className="px-6 pt-12 pb-24 max-w-6xl mx-auto w-full">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          {demo ? <DemoChip /> : <span className="chip mb-3">Generated proof profile</span>}
          {modeLabel && <span className="chip chip-amber mb-3 ml-2">{modeLabel}</span>}
          <h1 className="display text-4xl md:text-5xl mt-3">{c.name}</h1>
          <p className="text-ink-500">{c.education} · {c.city}</p>
          <p className="mt-1 text-sm text-ink-700">
            Target: <span className="font-semibold">{c.target_role}</span>
          </p>
        </div>
        <div className="glass-soft p-4 text-center min-w-[160px]">
          <div className="text-xs text-ink-500 uppercase tracking-wider">Match score</div>
          <div className="display text-4xl gradient-text mt-1">{c.match_score}</div>
          <div className="text-xs text-ink-500 mt-1">{isTargetGap ? "target-role fit" : "vs target role"}</div>
        </div>
      </div>

      <section className="glass-strong p-6 md:p-8 mb-8">
        <div className="relative z-10">
          <div className="chip mb-3">Proof summary</div>
          <p className="text-ink-700 leading-relaxed">{c.summary}</p>
        </div>
      </section>

      {scoreBreakdown && (
        <section className="mb-8">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h2 className="display text-2xl">Target fit breakdown</h2>
              <p className="text-xs text-ink-500 mt-1">
                This is separate from the current proof graph. It explains why the target-role score is {c.match_score} and where the next points can come from.
              </p>
            </div>
            <span className="chip chip-amber">Goal: 90+ strong fit</span>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <div className="glass p-4">
              <div className="relative z-10">
                <div className="text-xs text-ink-500 uppercase tracking-wider">Validated target fit</div>
                <div className="display text-3xl text-brand-700 mt-1">{scoreBreakdown.current}</div>
                <p className="text-xs text-ink-500 mt-2">Points already earned from resume, project, product, Git, or logical-transfer proof.</p>
              </div>
            </div>
            <div className="glass p-4">
              <div className="relative z-10">
                <div className="text-xs text-ink-500 uppercase tracking-wider">Needed for 90+</div>
                <div className="display text-3xl text-brand-700 mt-1">+{scoreBreakdown.toStrongFit}</div>
                <p className="text-xs text-ink-500 mt-2">The practical lift required before HireGEN should call this a strong target-role match.</p>
              </div>
            </div>
            <div className="glass p-4">
              <div className="relative z-10">
                <div className="text-xs text-ink-500 uppercase tracking-wider">Open headroom</div>
                <div className="display text-3xl text-brand-700 mt-1">{scoreBreakdown.headroom}</div>
                <p className="text-xs text-ink-500 mt-2">Remaining target-role points. Not all are needed for shortlist-ready fit.</p>
              </div>
            </div>
          </div>

          <div className="glass-strong p-5">
            <div className="relative z-10 space-y-3">
              {scoreBreakdown.gapLifts.map((gap) => (
                <div key={gap.skill} className="grid gap-3 md:grid-cols-[96px_1fr] items-start">
                  <div className="chip chip-demo text-center">+{gap.points} pts</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm">{gap.skill}</span>
                      <span className={`chip !text-[10px] ${gap.severity === "high" ? "chip-demo" : gap.severity === "medium" ? "chip-amber" : ""}`}>
                        {gap.severity}
                      </span>
                    </div>
                    <p className="text-xs text-ink-500 mt-1">{gap.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="display text-2xl mb-4">{isTargetGap ? "Current evidence graph" : "Skill graph"}</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {c.skills.map((s) => (
            <div key={s.name} className="glass p-4">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{s.name}</div>
                  <span className="display text-2xl text-brand-700">{s.score}</span>
                </div>
                <div className="text-[10px] text-ink-500 uppercase tracking-wider mt-1">
                  {s.category} · evidence age {s.freshness_days === 0 ? "current" : `${s.freshness_days}d`}
                </div>
                <div className="h-1.5 mt-3 rounded-full bg-white/60 overflow-hidden border border-white/60">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 via-pink-500 to-accent-500 rounded-full"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                {s.evidence[0] && (
                  <div className="mt-2 text-[11px] text-ink-500">
                    Evidence: {s.evidence[0].kind} · <span className="font-mono">{s.evidence[0].ref}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="display text-2xl mb-4">{isTargetGap ? "Current proof badges" : "Proof badges"}</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {c.badges.map((b) => (
            <div key={b.id} className={`glass p-4 ${b.awarded ? "" : "opacity-50"}`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{b.label}</div>
                  {b.awarded ? (
                    <span className="chip !text-[10px]">Awarded</span>
                  ) : (
                    <span className="chip-demo chip !text-[10px]">Locked</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-ink-500">{b.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="display text-2xl mb-4">{isTargetGap ? "Target gaps" : "Gaps"}</h2>
        <div className="space-y-2">
          {c.gaps.map((g) => (
            <div key={g.skill} className="glass-soft p-4 flex items-start gap-4">
              <span className={`chip !text-[10px] ${g.severity === "high" ? "chip-demo" : g.severity === "medium" ? "chip-amber" : ""}`}>
                {g.severity}
              </span>
              <div>
                <div className="font-semibold text-sm">{g.skill}</div>
                <p className="text-xs text-ink-500 mt-1">{g.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="display text-2xl mb-4">12-week roadmap</h2>
        <div className="glass p-6">
          <div className="relative z-10 grid md:grid-cols-2 gap-3">
            {c.roadmap_90d.map((w) => (
              <div key={w.week} className="flex gap-3">
                <div className="display text-brand-700 text-xl w-8 shrink-0">W{w.week}</div>
                <div>
                  <div className="font-semibold text-sm">{w.focus}</div>
                  <div className="text-xs text-ink-500">{w.deliverable}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function buildTargetScoreBreakdown(candidate: SkillGraph) {
  const current = candidate.match_score;
  const target = 90;
  const toStrongFit = Math.max(0, target - current);
  const headroom = Math.max(0, 100 - current);
  const severityWeight = {
    high: 3,
    medium: 2,
    low: 1,
  } as const;
  const totalWeight = candidate.gaps.reduce((sum, gap) => sum + severityWeight[gap.severity], 0) || 1;
  let assigned = 0;

  const gapLifts = candidate.gaps.map((gap, index) => {
    const isLast = index === candidate.gaps.length - 1;
    const points = toStrongFit === 0
      ? 0
      : isLast
        ? Math.max(0, toStrongFit - assigned)
        : Math.max(1, Math.round((toStrongFit * severityWeight[gap.severity]) / totalWeight));
    assigned += points;

    return {
      skill: gap.skill,
      severity: gap.severity,
      recommendation: gap.recommendation,
      points,
    };
  });

  return {
    current,
    toStrongFit,
    headroom,
    gapLifts,
  };
}
