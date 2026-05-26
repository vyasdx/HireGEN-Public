type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

const sizes = {
  sm: { box: "h-8 w-8", text: "text-lg", check: "h-3.5 w-3.5" },
  md: { box: "h-10 w-10", text: "text-xl", check: "h-4 w-4" },
  lg: { box: "h-14 w-14", text: "text-4xl", check: "h-5 w-5" },
};

export function BrandMark({ size = "sm", showText = true }: BrandMarkProps) {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} relative rounded-2xl bg-ink-900 shadow-md flex items-center justify-center shrink-0`}>
        <span className="text-white font-black tracking-tight">H</span>
        <span className={`${s.check} absolute -right-1 -top-1 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 border-2 border-white flex items-center justify-center`}>
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" aria-hidden="true">
            <path d="M2.5 6.2 4.8 8.4 9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {showText ? (
        <span className={`display ${s.text} leading-none`}>
          Hire<span className="gradient-text">GEN</span>
        </span>
      ) : null}
    </div>
  );
}
