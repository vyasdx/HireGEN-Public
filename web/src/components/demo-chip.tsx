/**
 * DemoChip — required on every screen that shows fixture/demo data.
 * Enforces hackathon rule "no fake demos" (kickoff slide 15/20):
 * if a screen is a mock, it must say so clearly.
 */
export function DemoChip({ label = "Demo data" }: { label?: string }) {
  return (
    <span className="chip chip-demo">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      {label}
    </span>
  );
}
