import { motion, useReducedMotion } from "motion/react";
import { roots } from "../../data/roots";
import { words } from "../../data/words";
import Seal from "../Seal";

// Shown on the Roots screen once every root is sealed: the ten seals pop in, one after another.
export default function CompletionMoment() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col items-center gap-3 rounded-2xl border border-gold/60 bg-card px-4 py-5 text-center"
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Every root sealed</span>
      <p className="text-sm">
        You've formed all {words.length} words. <span className="text-muted">That's the whole manuscript.</span>
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {roots.map((r, i) => (
          <motion.div
            key={r.id}
            initial={reduced ? { opacity: 0 } : { scale: 0, rotate: -30 }}
            animate={reduced ? { opacity: 1 } : { scale: 1, rotate: 0 }}
            transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 400, damping: 14, delay: 0.2 + i * 0.08 }}
          >
            <Seal text={r.letters.join("")} className="h-10 w-10" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
