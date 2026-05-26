import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BrandMark } from "@/components/brand-mark";

export default function BriefPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="chip mb-4 mx-auto">MVP checkpoint · Day 3</div>
          <div className="flex justify-center mb-5">
            <BrandMark size="lg" />
          </div>
          <p className="display text-2xl text-ink-500 italic">
            Get hired on proof, not polish.
          </p>
        </div>

        <section className="glass-strong p-8 md:p-10 space-y-9">
          <div className="relative z-10 space-y-8">

            <div>
              <h2 className="display text-2xl mb-2">Problem</h2>
              <p className="text-ink-700 leading-relaxed">
                Hiring teams need signal, not more resumes. Candidates have proof scattered
                across work history, GitHub, live projects, certifications, labs, papers, and
                interviews. Recruiters still spend hours decoding noisy resumes, keyword stuffing,
                generic project claims, and unclear role fit. Strong candidates get missed, and
                companies lose time on profiles that look good but are not role-ready.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Solution</h2>
              <p className="text-ink-700 leading-relaxed">
                HireGEN turns candidate evidence — resumes, GitHub portfolios, projects, and
                validation tasks — into <strong>structured skill graphs with confidence scores
                and proof citations</strong>. Recruiters can see what matches the role directly,
                what transfers logically, what is missing, and why the score is honest.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">What shipped</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li>Live MVP: <a className="text-brand-700 font-semibold hover:underline" href="https://hiregen-swart.vercel.app">hiregen-swart.vercel.app</a></li>
                <li>Public build repo: <a className="text-brand-700 font-semibold hover:underline" href="https://github.com/vyasdx/HireGEN-Public">github.com/vyasdx/HireGEN-Public</a></li>
                <li>Profile baseline mode: resume-first proof profile with GitHub and live-project signals.</li>
                <li>Target-role gap mode: direct match, logical transfer, missing proof, and 12-week roadmap.</li>
                <li>OpenAI structured output with Zod validation, evidence refs, and deterministic fallback.</li>
                <li>Recruiter-facing proof report with match score, skills, badges, gaps, and next actions.</li>
              </ul>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Demo flow</h2>
              <ol className="text-ink-700 leading-relaxed space-y-1 list-decimal pl-5">
                <li>Candidate opens <code>/builder</code> and chooses Profile baseline or Target-role gap.</li>
                <li>Candidate adds resume text, GitHub URL, live project links, and optionally a target JD.</li>
                <li>HireGEN generates a skill graph with scores, evidence type, proof badges, gaps, and roadmap.</li>
                <li>Recruiter opens <code>/recruiter</code> to review proof-ranked candidates and risk signals.</li>
                <li>Future validation labs convert claims into timed, role-specific proof.</li>
              </ol>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Why it is different</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li>Not another job board. Not a resume beautifier. HireGEN is a <strong>proof layer</strong>.</li>
                <li>It separates direct skills, transferable skills, and missing proof instead of doing keyword matching.</li>
                <li>It works for all candidates, while giving extra visibility to people whose proof is real but under-discovered.</li>
                <li>It is recruiter-paid: candidates build proof for free; hiring teams pay for trusted signal and accepted intros.</li>
              </ul>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Why now</h2>
              <p className="text-ink-700 leading-relaxed">
                Generative AI made polished resumes cheaper and proof more valuable. Recruiters
                need faster ways to trust capability, and candidates need a fair way to show what
                they can actually do. HireGEN sits in that gap.
              </p>
            </div>

            <div>
              <h2 className="display text-2xl mb-2">Architecture</h2>
              <ul className="text-ink-700 leading-relaxed space-y-1 list-disc pl-5">
                <li>Next.js 16 + TypeScript + Tailwind v4 + Liquid Glass design system</li>
                <li>OpenAI for skill extraction (structured output, Zod schema)</li>
                <li>Server-side GitHub repo scan + live project reachability scan</li>
                <li>Planned: Neon Postgres + pgvector, Clerk, Cloudflare R2, and agentic validation workflows</li>
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
                <li>Codex built resume-first extraction, GitHub/live-project scanning, target-role scoring, Vercel deploy, and the clean public mirror.</li>
                <li>Codex + Claude split the build with session logs, V-Office status, and explicit handoffs.</li>
              </ul>
              <p className="text-ink-700 leading-relaxed mt-3 text-sm">
                Every commit by Codex is direct judging evidence for Lens 04 (20% of total score).
              </p>
            </div>

            <div id="privacy" className="border-t border-white/40 pt-8">
              <h2 className="display text-2xl mb-2">Privacy &amp; safety</h2>
              <p className="text-ink-700 leading-relaxed text-sm">
                Aligned with India&apos;s <strong>DPDP Act 2023</strong>: granular per-purpose consent,
                right-to-erase, no third-party data resale ever, and audit logs on recruiter-side access.
                Current MVP avoids committed secrets and stores production keys in Vercel environment variables.
                Full safety notes: <code>docs/TRUST-SAFETY-ANTI-HALLUCINATION.md</code>.
              </p>
            </div>

            <div className="border-t border-white/40 pt-8 text-center">
              <p className="text-sm text-ink-500">
                <strong>Vyas (Vedavyas Vayalpadu)</strong> · OpenAI × Outskill Hackathon · May 2026 · India
              </p>
              <p className="text-xs text-ink-500/70 mt-1">
                Built with Codex + Claude Code · Day 3 of 5
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
