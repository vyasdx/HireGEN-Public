type ProofBadgeIconProps = {
  id: string;
  awarded?: boolean;
  label?: string;
};

const badgeStyles: Record<string, { bg: string; path: string }> = {
  "git-verified": {
    bg: "from-ink-900 to-brand-700",
    path: "M5 12.5 9 16.5 19 6.5",
  },
  "skill-graph": {
    bg: "from-brand-600 to-cyan-500",
    path: "M6 15V9m6 9V6m6 7V8M5 15h2m4 3h2m4-5h2",
  },
  "project-builder": {
    bg: "from-cyan-500 to-brand-600",
    path: "M5 7h14v10H5z M8 10h4 M8 13h8",
  },
  "lab-proof": {
    bg: "from-accent-500 to-pink-500",
    path: "M9 4v5l-4 7h14l-4-7V4 M8 4h8",
  },
  "ai-ready": {
    bg: "from-pink-500 to-brand-600",
    path: "M12 4v16M4 12h16M7 7l10 10M17 7 7 17",
  },
  "career-bridge": {
    bg: "from-brand-600 to-accent-500",
    path: "M5 14c3-4 6-4 9 0s5 4 5-5M5 14v-3m0 3h3",
  },
};

export function ProofBadgeIcon({ id, awarded = true, label }: ProofBadgeIconProps) {
  const style = badgeStyles[id] ?? badgeStyles["skill-graph"];

  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-gradient-to-br ${style.bg} shadow-sm ${awarded ? "" : "grayscale opacity-40"}`}
      title={label}
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" aria-hidden="true">
        <path d={style.path} stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
