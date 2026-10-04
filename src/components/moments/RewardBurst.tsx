import { motion, useReducedMotion } from "motion/react";

// A small gold burst over the stage when a new word is collected. Remount (via `key`) to replay.

const SPARKS = 10;

export default function RewardBurst() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {!reduced &&
        Array.from({ length: SPARKS }, (_, i) => {
          const a = (i / SPARKS) * Math.PI * 2;
          const r = 110 + (i % 3) * 22;
          return (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rotate-45 bg-gold"
              initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
              animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r * 0.55, scale: [0.4, 1.1, 0.6], opacity: [0, 1, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            />
          );
        })}
      <motion.span
        className="absolute bottom-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-card shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: reduced ? 0 : [8, 0, 0, -6] }}
        transition={{ duration: 2.2, times: [0, 0.15, 0.8, 1] }}
      >
        + Added to your collection
      </motion.span>
    </div>
  );
}
