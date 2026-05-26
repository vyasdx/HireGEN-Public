import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const productCards = [
  { title: "Proof Profile", body: "Candidate identity built from evidence — resume, GitHub, projects.", href: "/builder" },
  { title: "Skill Graph", body: "Structured skill map with confidence scores + freshness dates.", href: "/profile/demo" },
  { title: "Git Verified", body: "Authorship, cadence, complexity — read straight from your repos.", href: "/profile/demo" },
  { title: "Lab Proof", body: "15-min adaptive challenges that recruiters trust.", href: "/profile/demo" },
  { title: "Career Guide", body: "Resume + target role → gap analysis + 3-month roadmap.", href: "/builder" },
  { title: "Recruiter View", body: "Top candidates ranked by real signal, not pedigree.", href: "/recruiter" },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* Announcement banner */}
      <div className="px-3 mt-3">
        <div className="max-w-7xl mx-auto chip mx-auto text-center justify-center !text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          OpenAI × Outskill Hackathon build in progress · Day 1 of 5
        </div>
      </div>

      <main className="px-6 pt-12 pb-24">
        {/* Hero */}
        <section className="relative max-w-7xl mx-auto text-center">
          <h1 className="display text-5xl md:text-7xl max-w-4xl mx-auto">
            Get hired on <span className="gradient-text">proof,</span><br />
            not <span className="text-ink-500 italic font-normal">polish.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-700 max-w-2xl mx-auto">
            HireGEN turns resumes, GitHub portfolios, projects, and validation tasks into
            structured skill graphs recruiters can trust. India-first. Proof-first.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/builder" className="btn-primary">
              Build proof profile
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/profile/demo" className="btn-glass">
              View sample profile →
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-500">Free for candidates. Forever.</p>
        </section>

        {/* Product rail */}
        <section className="mt-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="chip mb-3 mx-auto">The proof layer</div>
            <h2 className="display text-3xl md:text-4xl">
              Six surfaces. <span className="gradient-text">One proof story.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {productCards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="glass p-6 hover:scale-[1.01] transition-transform"
              >
                <div className="relative z-10">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{c.body}</p>
                  <div className="mt-4 text-xs text-brand-700 font-semibold">Open →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Demo CTA */}
        <section className="mt-20 max-w-5xl mx-auto">
          <div className="glass-strong p-10 md:p-14 text-center relative">
            <div className="relative z-10">
              <div className="chip mb-4 mx-auto">Live demo</div>
              <h2 className="display text-3xl md:text-4xl">
                See the candidate journey end-to-end.
              </h2>
              <p className="mt-4 text-ink-700 max-w-xl mx-auto">
                One sample candidate. Real skill graph. Recruiter view. Pitch story.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/builder" className="btn-primary">Start as candidate</Link>
                <Link href="/recruiter" className="btn-glass">See recruiter view →</Link>
                <Link href="/brief" className="btn-glass">Read the pitch →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
