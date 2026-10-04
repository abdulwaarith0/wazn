import { useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import type { Root } from "../data/types";

type Props = {
  root: Root;
  locked: boolean;
  count: number;
  total: number;
  onOpen: () => void;
  onLocked: () => void;
};

const Lock = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
    <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function RootTile({ root, locked, count, total, onOpen, onLocked }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const tap = () => {
    if (!locked) return onOpen();
    if (ref.current && !reduced) animate(ref.current, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.4 });
    onLocked();
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={tap}
      aria-disabled={locked}
      aria-label={`${root.translit}, ${root.gist}${locked ? ", locked" : `, ${count} of ${total} words collected`}`}
      className={[
        "relative flex flex-col items-center gap-1 rounded-2xl border px-3 pt-3 pb-3.5 transition-colors",
        locked ? "border-dashed border-line bg-transparent text-muted" : "border-line bg-card hover:border-gold/60",
      ].join(" ")}
    >
      <span lang="ar" dir="rtl" className={`font-arabic text-[40px] leading-[1.35] ${locked ? "opacity-40" : ""}`}>
        {root.letters.join("-")}
      </span>
      <span className="text-xs text-muted">
        {root.translit} · {root.gist}
      </span>
      {locked ? (
        <span className="mt-1 flex items-center gap-1 text-xs text-muted/80">
          <Lock /> Locked
        </span>
      ) : (
        <span className="mt-1 flex w-full flex-col items-center gap-1">
          <span className="text-xs font-semibold tabular-nums">
            {count} / {total}
          </span>
          <span className="h-1 w-3/4 overflow-hidden rounded-full bg-line">
            <span className="block h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${(count / total) * 100}%` }} />
          </span>
        </span>
      )}
    </button>
  );
}
