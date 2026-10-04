import { useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import type { Pattern, Word } from "../data/types";
import { base, letters, PLACEHOLDERS } from "../lib/arabic";
import { patternLabel, patternShape } from "../lib/labels";
import type { Mode } from "../lib/progress";

type Props = {
  pattern: Pattern;
  word: Word | undefined;
  mode: Mode;
  available: boolean;
  collected: boolean;
  active: boolean;
  onPick: () => void;
  onBlocked: () => void;
};

const isPlaceholder = (l: string) => (PLACEHOLDERS as readonly string[]).includes(base(l));

export default function PatternTile({ pattern, word, mode, available, collected, active, onPick, onBlocked }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const label = patternLabel(pattern, mode);

  const tap = () => {
    if (available) return onPick();
    // A gentle "no": the tile shakes and the Workshop explains.
    if (ref.current && !reduced) {
      animate(ref.current, { x: [0, -7, 7, -5, 5, 0] }, { duration: 0.4, ease: "easeInOut" });
    }
    onBlocked();
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={tap}
      aria-disabled={!available}
      aria-pressed={active}
      className={[
        "relative flex flex-col items-center gap-1 rounded-xl border px-2 pt-2 pb-3 transition-colors",
        available
          ? "border-line bg-card hover:border-gold/60"
          : "border-dashed border-line/80 bg-transparent opacity-45",
        active ? "border-gold! bg-gold/8" : "",
      ].join(" ")}
    >
      {collected && (
        <svg viewBox="0 0 12 12" aria-label="collected" className="absolute top-2 right-2 h-3 w-3 text-gold">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
        </svg>
      )}
      <span lang="ar" dir="rtl" className="font-arabic text-[30px] leading-[1.6]">
        {letters(patternShape(pattern, mode, word)).map((l, i) => (
          <span key={i} className={isPlaceholder(l) ? "text-ink" : "text-gold"}>
            {l}
          </span>
        ))}
      </span>
      {label.nameIsArabic ? (
        <span lang="ar" dir="rtl" className="font-arabic text-[15px] leading-tight font-bold">
          {label.name}
        </span>
      ) : (
        <span className="text-[13px] leading-tight font-semibold">{label.name}</span>
      )}
      <span className="text-xs leading-tight text-muted">{label.hint}</span>
    </button>
  );
}
