import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "What we collect",
    body: "During the MVP, HireGEN may process candidate-provided resume text, GitHub URLs, live project links, target roles, job descriptions, generated skill graphs, proof badges, gaps, and roadmap outputs.",
  },
  {
    title: "Why we use it",
    body: "We use this information to generate proof profiles, compare skills against target roles, show recruiter-facing evidence summaries, improve scoring quality, and prevent unsupported or hallucinated claims.",
  },
  {
    title: "What we do not do",
    body: "We do not sell candidate data. We do not use private repo data unless a candidate explicitly authorizes it in a future version. We do not treat AI output as final hiring truth without evidence and human review.",
  },
  {
    title: "Recruiter access",
    body: "Recruiters should only see candidate proof reports for legitimate hiring evaluation. Future production versions will add consent gates, access logs, role-based access, and candidate controls.",
  },
  {
    title: "Retention and deletion",
    body: "The current hackathon MVP is a demo/prototype. Production versions will support deletion, export, correction, and purpose-specific consent aligned with India DPDP principles.",
  },
  {
    title: "Security posture",
    body: "Production secrets are stored in Vercel environment variables, not in Git. The public repository excludes private V-Office context, environment files, Vercel metadata, and generated build output.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <div className="chip mb-3">Beta policy</div>
          <h1 className="display text-4xl md:text-5xl">Privacy</h1>
          <p className="mt-3 text-ink-700 leading-relaxed">
            HireGEN is built around trust. Candidate evidence should be used to prove capability,
            not to create hidden data markets or unfair screening.
          </p>
        </div>

        <section className="glass-strong p-8 md:p-10">
          <div className="relative z-10 grid gap-6">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-white/40 pb-5 last:border-0 last:pb-0">
                <h2 className="font-semibold text-lg">{section.title}</h2>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
