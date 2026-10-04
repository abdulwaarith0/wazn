import { motion, useReducedMotion } from "motion/react";
import type { Root } from "../../data/types";
import RootText from "../RootText";
import Seal from "../Seal";

type Props = { root: Root; onCollection: () => void; onClose: () => void };

// The root's gold seal stamps down: it drops in large and tilted, lands with a thud, and a ring spreads.
export default function SealMoment({ root, onCollection, onClose }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Root complete: ${root.translit}`}
      className="fixed inset-0 z-30 flex items-center justify-center bg-paper/75 px-4 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl border border-gold/50 bg-card px-6 pt-6 pb-5 text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Root complete</span>
        <div className="relative grid h-32 w-32 place-items-center">
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-2 rounded-full border-2 border-gold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.5], opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            />
          )}
          <motion.div
            className="h-full w-full"
            initial={reduced ? { opacity: 0 } : { scale: 2.4, rotate: -24, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            transition={reduced ? { duration: 0.4 } : { type: "spring", stiffness: 380, damping: 16, mass: 1.2, delay: 0.1 }}
          >
            <Seal text={root.letters.join("")} className="h-full w-full drop-shadow-md" />
          </motion.div>
        </div>
        <p className="text-sm">
          You've collected every word from <RootText root={root} />.
        </p>
        <div className="mt-1 flex w-full flex-col gap-2">
          <button type="button" onClick={onCollection} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
            See your collection
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-muted hover:text-ink">
            Keep exploring
          </button>
        </div>
      </div>
    </motion.div>
  );
}
