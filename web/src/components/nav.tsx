import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function Nav() {
  return (
    <header className="sticky top-3 z-40 px-3">
      <div className="mx-auto mb-2 flex max-w-7xl justify-center">
        <div className="chip !text-[11px]">
          ❤️ Made in Namma Bengaluru | 💪 Made for Vikasit Bharat
        </div>
      </div>
      <div className="max-w-7xl mx-auto glass !rounded-2xl h-14 px-4 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <BrandMark />
          <span className="chip !py-0.5 !px-2 !text-[10px] ml-1">India · Beta</span>
        </Link>

        <nav className="relative z-10 hidden md:flex items-center gap-7 text-sm text-ink-700">
          <Link href="/samples" className="hover:text-ink-900">Samples</Link>
          <Link href="/recruiter" className="hover:text-ink-900">Recruiter</Link>
          <Link href="/brief" className="hover:text-ink-900">Pitch</Link>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link href="/builder" className="btn-primary !py-2 !px-4 !text-sm">
            Build proof profile
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
