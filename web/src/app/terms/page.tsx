import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const terms = [
  {
    title: "Beta product",
    body: "HireGEN is currently a hackathon MVP. Outputs are for evaluation, feedback, and product validation, not final hiring decisions.",
  },
  {
    title: "Candidate responsibility",
    body: "Candidates should provide accurate resume, GitHub, project, certification, and role information. False, misleading, copied, or unauthorized evidence may reduce trust or invalidate a profile.",
  },
  {
    title: "Recruiter responsibility",
    body: "Recruiters and hiring teams should use HireGEN as a decision-support tool. Do not reject, hire, or rank candidates solely from an automated score without human review and fair process.",
  },
  {
    title: "AI limitations",
    body: "HireGEN uses AI to structure evidence and suggest gaps. AI can be incomplete or wrong. The product adds schema validation, evidence references, and fallbacks, but human review remains necessary.",
  },
  {
    title: "Validation and badges",
    body: "Proof badges are product signals, not legal certifications. Locked badges mean required evidence or validation is missing. Awarded badges can change as evidence quality improves or weakens.",
  },
  {
    title: "No guarantee",
    body: "HireGEN does not guarantee interviews, offers, hiring outcomes, salary outcomes, candidate availability, or role fit. It helps surface evidence and reduce screening noise.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <div className="chip mb-3">Beta terms</div>
          <h1 className="display text-4xl md:text-5xl">Terms</h1>
          <p className="mt-3 text-ink-700 leading-relaxed">
            These terms describe the current MVP behavior and intended responsible use.
            Formal production terms will be reviewed before commercial launch.
          </p>
        </div>

        <section className="glass-strong p-8 md:p-10">
          <div className="relative z-10 grid gap-6">
            {terms.map((term) => (
              <div key={term.title} className="border-b border-white/40 pb-5 last:border-0 last:pb-0">
                <h2 className="font-semibold text-lg">{term.title}</h2>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{term.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
