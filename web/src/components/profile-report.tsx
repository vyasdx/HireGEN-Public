import { DemoChip } from "@/components/demo-chip";
import type { SkillGraph } from "@/lib/skill-graph-schema";

type ProfileReportProps = {
  candidate: SkillGraph;
  demo?: boolean;
  modeLabel?: string;
};

export function ProfileReport({ candidate: c, demo = false, modeLabel }: ProfileReportProps) {
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
          <div className="text-xs text-ink-500 mt-1">vs target role</div>
        </div>
      </div>

      <section className="glass-strong p-6 md:p-8 mb-8">
        <div className="relative z-10">
          <div className="chip mb-3">Proof summary</div>
          <p className="text-ink-700 leading-relaxed">{c.summary}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="display text-2xl mb-4">Skill graph</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {c.skills.map((s) => (
            <div key={s.name} className="glass p-4">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{s.name}</div>
                  <span className="display text-2xl text-brand-700">{s.score}</span>
                </div>
                <div className="text-[10px] text-ink-500 uppercase tracking-wider mt-1">
                  {s.category} · refreshed {s.freshness_days}d ago
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
        <h2 className="display text-2xl mb-4">Proof badges</h2>
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
        <h2 className="display text-2xl mb-4">Gaps</h2>
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
