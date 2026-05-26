import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function BriefPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="chip mb-3 mx-auto">1-page pitch · Day-3 checkpoint draft</div>
          <h1 className="display text-5xl">
            HireGEN
          </h1>
          <p className="display text-2xl text-ink-500 italic">
            Get hired on proof, not polish.
          </p>
        </div>

        <section className="glass-strong p-8 md:p-10 space-y-8">
          <div className="relative z-10 space-y-8">

            <div>
              <h2 className="display text-2xl mb-2">Problem</h2>
              <p className="text-ink-700 leading-relaxed">
                Resumes are noisy, AI-generated, and weak hiring signals. Recruiters waste time
                filtering candidates while <strong>Tier-2/3 talent stays invisible</strong> on
                network-biased platforms. India ships 1.5M engineering grads a year — and the
                system still hires on pedigree.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Solution</h2>
              <p className="text-ink-700 leading-relaxed">
                HireGEN turns candidate evidence — resumes, GitHub portfolios, projects, and
                validation tasks — into <strong>structured skill graphs with confidence scores
                and proof citations</strong>. Recruiters see only candidates ranked by real signal,
                not credentials.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Uniqueness</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li>Not a job portal. Not a resume parser. A <strong>proof layer.</strong></li>
                <li>Candidate badges (Git Verified, Lab Proof, Skill Graph) — each backed by evidence.</li>
                <li>India-first: built for Tier-2/3 talent invisible to LinkedIn&apos;s graph.</li>
                <li>Dual persona: Student profile (academic + projects) and Employee profile (delivered outcomes).</li>
              </ul>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Demo flow (this app)</h2>
              <ol className="text-ink-700 leading-relaxed space-y-1 list-decimal pl-5">
                <li>Candidate pastes resume + GitHub + project links + target role on <code>/builder</code></li>
                <li>OpenAI structured-output pipeline returns a skill graph (scores + evidence + freshness)</li>
                <li>Candidate lands on <code>/profile/[id]</code> — skills, badges, gaps, 12-week roadmap</li>
                <li>Recruiter visits <code>/recruiter</code> — proof-ranked shortlist (no resumes)</li>
                <li>Validation lab preview shows how cheating is prevented</li>
              </ol>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Why now</h2>
              <p className="text-ink-700 leading-relaxed">
                Generative AI made the resume worthless and the proof signal scarce. Whoever
                owns the proof layer wins the next decade of hiring. HireGEN is that layer for India.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Architecture</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li>Next.js 16 + TypeScript + Tailwind v4 + Liquid Glass design system</li>
                <li>OpenAI for skill extraction (structured output, Zod schema)</li>
                <li>Neon Postgres + pgvector for skill graphs and matching</li>
                <li>Clerk for auth, Cloudflare R2 for portfolio uploads</li>
                <li>Production target: Nous Research Hermes Agent on Hostinger VPS for the agentic skill layer (post-hackathon)</li>
              </ul>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Business model</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li><strong>Free forever for candidates.</strong> Trust + moat.</li>
                <li>Recruiters pay per <strong>accepted intro</strong> (₹2k–₹25k tiered).</li>
                <li>Success fee per hire (₹40k–₹4L+, role-dependent).</li>
                <li>Recruiter dashboard subscription (₹15k–₹5L/mo enterprise).</li>
                <li>Validation-as-a-service for colleges and bootcamps.</li>
              </ul>
            </div>

            <div id="codex" className="border-t border-white/40 pt-8">
              <h2 className="display text-2xl mb-2">How we used Codex</h2>
              <p className="text-ink-700 leading-relaxed mb-3">
                Multi-agent dev model: <strong>Codex + Claude Code</strong>, with strict session-log handoffs.
                Each agent owns a session file in <code>docs/sessions/</code> before handing back.
              </p>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5 text-sm">
                <li>Codex authored the V-Office onboarding scaffolding and the hackathon kickoff handoff doc (commits <code>8ec37fa</code>, <code>ebd73dc</code>).</li>
                <li>Codex built the badge system (6 SVG badges + taxonomy) and 5 logo concepts.</li>
                <li>Codex wrote the application viability report with sourced market sizing (IMARC, ETHRWorld, Info Edge).</li>
                <li>Codex wrote the UI/UX teardown of Zoom that shaped this landing page&apos;s structure.</li>
                <li>Codex created the hackathon delivery plan + kickoff notes transcription.</li>
                <li>Codex + Claude split the build: Claude owns design system + V-Office sync; Codex owns shipping features.</li>
              </ul>
              <p className="text-ink-700 leading-relaxed mt-3 text-sm">
                Every commit by Codex is direct judging evidence for Lens 04 (20% of total score).
              </p>
            </div>

            <div id="privacy" className="border-t border-white/40 pt-8">
              <h2 className="display text-2xl mb-2">Privacy &amp; safety</h2>
              <p className="text-ink-700 leading-relaxed text-sm">
                Aligned with India&apos;s <strong>DPDP Act 2023</strong>: granular per-purpose consent,
                right-to-erase, no third-party data resale ever. PII encrypted at rest (Neon)
                and in transit. Audit log on every recruiter-side access. Full doc:{" "}
                <code>docs/PRIVACY.md</code> (in progress).
              </p>
            </div>

            <div className="border-t border-white/40 pt-8 text-center">
              <p className="text-sm text-ink-500">
                <strong>Vyas (Vedavyas Vayalpadu)</strong> · OpenAI × Outskill Hackathon · May 2026 · India
              </p>
              <p className="text-xs text-ink-500/70 mt-1">
                Built with Codex + Claude Code · Day 1 of 5
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
