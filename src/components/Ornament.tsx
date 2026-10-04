// Thin gold rule with diamond corners, drawn inside a card (the parent must be `relative`).

const Diamond = ({ className }: { className: string }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={`absolute h-3 w-3 text-gold ${className}`}>
    <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" opacity="0.85" />
    <path d="M6 3 L9 6 L6 9 L3 6 Z" fill="var(--color-card)" />
  </svg>
);

export default function Ornament() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-xl border border-gold/35">
      <Diamond className="-top-1.5 -left-1.5" />
      <Diamond className="-top-1.5 -right-1.5" />
      <Diamond className="-bottom-1.5 -left-1.5" />
      <Diamond className="-right-1.5 -bottom-1.5" />
    </div>
  );
}
