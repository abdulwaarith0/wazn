import type { ReactNode } from "react";

type Props = { label: string; onPlay: () => void; children?: ReactNode };

// A speaker icon. Only rendered where a recording exists.
export default function AudioButton({ label, onPlay, children }: Props) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-sm text-muted hover:border-gold/60 hover:text-ink"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-gold">
        <path d="M3 7.5h3l4-3.5v12l-4-3.5H3z" fill="currentColor" />
        <path d="M13 7a4 4 0 0 1 0 6M15.5 4.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {children}
    </button>
  );
}
