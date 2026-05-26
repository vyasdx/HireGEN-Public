import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 pb-6 mt-24">
      <div className="max-w-7xl mx-auto glass p-8 md:p-10">
        <div className="relative z-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 via-pink-500 to-accent-500 flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="display text-lg">HireGEN</span>
            </div>
            <p className="mt-3 text-ink-500 max-w-xs">
              Proof-of-capability hiring for India. AI-parsed skill graphs that recruiters trust.
            </p>
            <p className="mt-2 text-[10px] text-ink-500/70 italic">
              OpenAI × Outskill Hackathon · May 2026
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Product</div>
            <ul className="mt-3 space-y-2 text-ink-500">
              <li><Link href="/builder" className="hover:text-ink-900">Builder</Link></li>
              <li><Link href="/profile/demo" className="hover:text-ink-900">Sample Profile</Link></li>
              <li><Link href="/recruiter" className="hover:text-ink-900">Recruiter View</Link></li>
              <li><Link href="/brief" className="hover:text-ink-900">Investor Pitch</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Built with</div>
            <ul className="mt-3 space-y-2 text-ink-500">
              <li>Next.js 16 · TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>OpenAI API</li>
              <li>Codex + Claude Code</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Legal</div>
            <ul className="mt-3 space-y-2 text-ink-500">
              <li><Link href="/brief#privacy" className="hover:text-ink-900">Privacy (DPDP-aligned)</Link></li>
              <li><Link href="/brief" className="hover:text-ink-900">Terms (beta)</Link></li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 mt-8 pt-6 border-t border-white/40 flex flex-col md:flex-row items-center justify-between text-xs text-ink-500">
          <div>© 2026 HireGEN. Made in India.</div>
          <div className="mt-2 md:mt-0">Hackathon MVP · v0.1</div>
        </div>
      </div>
    </footer>
  );
}
