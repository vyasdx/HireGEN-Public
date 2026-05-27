import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SampleProfileLab } from "@/components/sample-profile-lab";
import { stressSamples } from "@/lib/sample-profiles";

export default function SamplesPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-7xl mx-auto w-full">
        <section className="max-w-3xl">
          <div className="chip mb-3">Stress test lab</div>
          <h1 className="display text-4xl md:text-6xl">
            Sample profiles for <span className="gradient-text">students, employees, and recruiters.</span>
          </h1>
          <p className="mt-5 text-ink-700 text-lg">
            These are synthetic, safe-to-share profiles used to test HireGEN&apos;s extraction, matching, scoring,
            gaps, and anti-hallucination behavior.
          </p>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Students", "Freshers, campus projects, academic research, and early proof signals."],
            ["Employees", "Experienced profiles across infra, backend, QA, business analysis, and DevOps."],
            ["Recruiters", "Target-role checks that show direct matches, logical transfers, and missing proof."],
          ].map(([title, copy]) => (
            <div key={title} className="glass-soft p-5">
              <div className="relative z-10 text-sm font-semibold text-ink-950">{title}</div>
              <p className="relative z-10 mt-2 text-sm text-ink-600">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SampleProfileLab samples={stressSamples} />
        </div>
      </main>
      <Footer />
    </>
  );
}
