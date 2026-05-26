import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DemoChip } from "@/components/demo-chip";
import { demoCandidate } from "@/lib/demo-data";

export default function RecruiterPage() {
  const candidates = [demoCandidate]; // Day 1: 1 demo. Day 2+: real Postgres list.

  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-8">
          <div>
            <DemoChip label="Demo recruiter view" />
            <h1 className="display text-4xl md:text-5xl mt-3">
              Top candidates <span className="gradient-text">for your role.</span>
            </h1>
            <p className="text-ink-700 mt-2 max-w-2xl">
              Ranked by proof, not pedigree. Each card surfaces real evidence — skill graph,
              Git authorship, project artifacts. Click for the full proof profile.
            </p>
          </div>
          <div className="glass-soft p-4 min-w-[200px]">
            <div className="text-xs text-ink-500 uppercase tracking-wider">Open role</div>
            <div className="font-semibold">Frontend Engineer</div>
            <div className="text-xs text-ink-500">Razorpay-tier fintech · ₹18-26 LPA</div>
          </div>
        </div>

        <div className="grid gap-4">
          {candidates.map((c) => (
            <Link key={c.id} href={`/profile/${c.id}`} className="glass-strong p-6 hover:scale-[1.005] transition-transform block">
              <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center display text-lg">
                      {c.name.split(" ").map((p) => p[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-ink-500">{c.education} · {c.city}</div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 text-center">
                  <div className="text-xs text-ink-500 uppercase tracking-wider">Match</div>
                  <div className="display text-3xl gradient-text">{c.match_score}</div>
                </div>

                <div className="md:col-span-4">
                  <div className="text-xs text-ink-500 uppercase tracking-wider mb-1">Top skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.slice(0, 4).map((s) => (
                      <span key={s.name} className="text-[11px] px-2 py-1 rounded-full bg-white/60 border border-white/60 text-ink-700">
                        {s.name} <span className="text-brand-700 font-semibold">{s.score}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-xs text-ink-500 uppercase tracking-wider mb-1">Badges</div>
                  <div className="flex flex-wrap gap-1">
                    {c.badges.filter((b) => b.awarded).slice(0, 3).map((b) => (
                      <span key={b.id} className="chip !text-[9px] !py-0.5 !px-1.5">
                        {b.label}
                      </span>
                    ))}
                    <span className="text-[10px] text-ink-500 self-center">
                      +{c.badges.filter((b) => b.awarded).length - 3} more
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-4 border-t border-white/40 text-xs text-ink-500">
                {c.summary}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 glass p-6 text-center">
          <div className="relative z-10">
            <p className="text-sm text-ink-700">
              Day 1 scaffold: 1 demo candidate. Day 2+ wires real Postgres + matching engine. By Friday: 5-10 demo candidates ranked.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
