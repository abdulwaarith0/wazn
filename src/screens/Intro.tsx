import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Word } from "../data/types";
import WordAssembly, { type AssemblyHandle } from "../components/WordAssembly";

// The logo builds itself: و-ز-ن fly into فَعْل to form وَزْن, then the wordmark's gold rule
// draws in beneath it. About three seconds; a tap anywhere skips it.

const LETTERS = ["و", "ز", "ن"];
const INTRO_WORD: Word = {
  id: "intro",
  rootId: "wzn",
  patternId: "intro",
  ar: "وَزْن",
  roles: "rrr",
  translit: "wazn",
  meaning: "weight, pattern",
};

export default function Intro({ onDone }: { onDone: () => void }) {
  const tiles = useRef<HTMLDivElement[]>([]);
  const assembly = useRef<AssemblyHandle>(null);
  const finished = useRef(false);
  const [landed, setLanded] = useState(false);
  const reduced = useReducedMotion();

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    let alive = true;
    // Started from a timeout so React's development double-mount doesn't play it twice.
    const start = setTimeout(async () => {
      await assembly.current?.play(INTRO_WORD, tiles.current);
      if (!alive) return;
      setLanded(true);
      setTimeout(() => alive && finish(), 1100);
    }, 250);
    return () => {
      alive = false;
      clearTimeout(start);
    };
  }, [finish]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Wazn intro. Tap to skip."
      onClick={finish}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " || e.key === "Escape") && finish()}
      className="fixed inset-0 z-40 flex cursor-pointer flex-col items-center justify-center bg-paper px-4"
    >
      <div dir="rtl" className="flex justify-center gap-4">
        {LETTERS.map((l, i) => (
          <div
            key={l}
            ref={(el) => {
              if (el) tiles.current[i] = el;
            }}
            lang="ar"
            className="grid size-17 place-items-center rounded-xl bg-ink font-arabic text-[44px] text-paper shadow-sm"
          >
            {l}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-md">
        <WordAssembly ref={assembly} />
      </div>

      {/* The wordmark's rule and diamond draw in once the word has formed. */}
      <svg viewBox="0 0 120 12" aria-hidden="true" className="mt-2 h-3 w-40 text-gold">
        <motion.path
          d="M2 6 H118"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={landed ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M60 1 L65 6 L60 11 L55 6 Z"
          fill="currentColor"
          style={{ originX: "50%", originY: "50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={landed ? { scale: 1, opacity: 1 } : {}}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 15, delay: 0.3 }}
        />
      </svg>
      <motion.span
        className="mt-3 text-sm font-semibold tracking-[0.35em] text-muted uppercase"
        initial={{ opacity: 0 }}
        animate={landed ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        Wazn
      </motion.span>

      <span className="absolute bottom-8 text-xs text-muted/70">Tap to skip</span>
    </div>
  );
}
