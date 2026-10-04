import { motion, useReducedMotion } from "motion/react";
import type { Root } from "../../data/types";

type Props = { root: Root; onOpen: () => void; onClose: () => void };

// "د-ر-س unlocked": the new root's tile springs in over a soft paper veil.
export default function UnlockMoment({ root, onOpen, onClose }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`New root unlocked: ${root.translit}`}
      className="fixed inset-0 z-30 flex items-center justify-center bg-paper/75 px-4 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl border border-gold/50 bg-card px-6 pt-6 pb-5 shadow-lg"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 260, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">New root unlocked</span>
        <motion.span
          lang="ar"
          dir="rtl"
          className="rounded-xl bg-ink px-5 font-arabic text-[44px] leading-[1.5] text-paper"
          initial={reduced ? {} : { scale: 0.4, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 12, delay: 0.15 }}
        >
          {root.letters.join("-")}
        </motion.span>
        <span className="text-sm text-muted">
          {root.translit} · {root.gist}
        </span>
        <div className="mt-2 flex w-full flex-col gap-2">
          <button type="button" onClick={onOpen} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Open it
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-muted hover:text-ink">
            Keep exploring
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
