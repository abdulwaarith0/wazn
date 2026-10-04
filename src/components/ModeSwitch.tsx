import { motion } from "motion/react";
import type { Mode } from "../lib/progress";

const OPTIONS: { mode: Mode; label: string }[] = [
  { mode: "beginner", label: "Beginner" },
  { mode: "grammar", label: "Grammar" },
];

// One-tap Beginner / Grammar switch. The gold pill slides between options (Motion layoutId).
export default function ModeSwitch({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div role="radiogroup" aria-label="Labels" className="flex rounded-lg border border-line bg-card p-0.5 text-sm">
      {OPTIONS.map((o) => {
        const on = o.mode === mode;
        return (
          <button
            key={o.mode}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.mode)}
            className={`relative rounded-md px-3 py-1 transition-colors ${on ? "text-card" : "text-muted hover:text-ink"}`}
          >
            {on && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-md bg-gold"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative font-medium">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
