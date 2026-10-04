import { useRef, useState } from "react";
import { animate, motion, useReducedMotion, type PanInfo } from "motion/react";
import { patternById } from "../data/patterns";
import { assembledForm } from "../data/words";
import Ornament from "../components/Ornament";
import WordAssembly, { type AssemblyHandle } from "../components/WordAssembly";
import { pieces, withJoiners } from "../lib/arabic";
import { patternLabel } from "../lib/labels";
import type { Mode, Progress } from "../lib/progress";
import { isRightRoot, makeQuestion, type Question } from "../lib/quiz";

// The Quiz alternates two question types, using only collected words. Either way, the answer
// ends with the word-forming animation: from your letters if right, from the correct ones if not.

type Answer = (correct: boolean, rootTiles: HTMLElement[]) => void;

const tileClass = "grid size-14 place-items-center rounded-xl font-arabic text-[34px] leading-none select-none";

export default function QuizScreen({ progress, onBack }: { progress: Progress; onBack: () => void }) {
  const [question, setQuestion] = useState<Question | null>(() => makeQuestion(progress, "root"));
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [forming, setForming] = useState(false);
  const assembly = useRef<AssemblyHandle>(null);

  if (!question) {
    return (
      <section className="flex flex-col items-center gap-3 py-16 text-center">
        <p>Collect 3 words to unlock the quiz.</p>
        <button type="button" onClick={onBack} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
          Go to the roots
        </button>
      </section>
    );
  }

  const answer: Answer = async (correct, rootTiles) => {
    setResult(correct ? "right" : "wrong");
    if (correct) setScore((s) => s + 1);
    setForming(true);
    await assembly.current?.play(question.word, rootTiles);
    setForming(false);
  };

  const next = () => {
    setResult(null);
    setCount((n) => n + 1);
    setQuestion(makeQuestion(progress, question.kind === "root" ? "build" : "root", Math.random, question.word));
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="rounded-lg py-1 pr-2 text-sm text-muted hover:text-ink">
          ← Roots
        </button>
        <span className="text-sm text-muted tabular-nums">
          <b className="font-semibold text-ink">{score}</b> right · question {count}
        </span>
      </div>

      <div className="-mt-2 text-center">
        <h1 className="text-2xl font-semibold">{question.kind === "root" ? "Find the root" : "Build the word"}</h1>
        <p className="text-sm text-muted">
          {question.kind === "root"
            ? "Tap its three root letters, in order (right to left)."
            : "Drag each root letter into its slot, or tap a letter to place it."}
        </p>
      </div>

      {question.kind === "root" ? (
        <FindRoot key={count} question={question} locked={result !== null} onAnswer={answer} />
      ) : (
        <BuildWord key={count} question={question} mode={progress.mode} locked={result !== null} onAnswer={answer} />
      )}

      <div className="relative overflow-hidden rounded-2xl border border-line bg-card px-4 pt-4 pb-5">
        <Ornament />
        <WordAssembly key={count} ref={assembly} emptyText="Your answer forms here." />
      </div>

      <div className="flex min-h-11 items-center justify-center gap-4">
        {result && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-semibold ${result === "right" ? "text-gold" : "text-muted"}`}
          >
            {result === "right" ? "Right!" : "Not quite. Here's how it goes."}
          </motion.p>
        )}
        {result && !forming && (
          <button type="button" onClick={next} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Next question
          </button>
        )}
      </div>
    </section>
  );
}

/** "Find the root": the word is shown uncoloured (colour would give the answer away). */
function FindRoot({ question, locked, onAnswer }: { question: Question; locked: boolean; onAnswer: Answer }) {
  const [picked, setPicked] = useState<number[]>([]); // tray indices, in tap order
  const [reveal, setReveal] = useState(false);
  const boxes = useRef<HTMLDivElement[]>([]);
  // The latest picks and whether an answer was given, readable before React re-renders.
  const pickedNow = useRef<number[]>([]);
  const answered = useRef(false);
  const reduced = useReducedMotion();

  const setPicks = (next: number[]) => {
    pickedNow.current = next;
    setPicked(next);
  };

  const check = (chosen: number[]) => {
    const letters = chosen.map((i) => question.tray[i] ?? "");
    if (isRightRoot(question, letters)) return onAnswer(true, boxes.current);
    // Wrong: a shake, then the right letters appear in the boxes and form the word.
    if (!reduced) boxes.current.forEach((b) => animate(b, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.4 }));
    setTimeout(() => {
      setReveal(true);
      setTimeout(() => onAnswer(false, boxes.current), 450);
    }, 450);
  };

  const pick = (i: number) => {
    const current = pickedNow.current;
    if (locked || answered.current || current.includes(i) || current.length >= 3) return;
    const chosen = [...current, i];
    setPicks(chosen);
    if (chosen.length === 3) {
      answered.current = true;
      setTimeout(() => check(chosen), 250);
    }
  };

  const unpick = (slot: number) => {
    if (!locked && !answered.current && slot < pickedNow.current.length) setPicks(pickedNow.current.slice(0, slot));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p lang="ar" dir="rtl" className="font-arabic text-[64px] leading-[1.4]">
          {question.word.ar}
        </p>
        <p className="text-sm text-muted">
          <span className="italic">{question.word.translit}</span> · {question.word.meaning}
        </p>
      </div>

      <div dir="rtl" className="flex gap-3">
        {[0, 1, 2].map((slot) => {
          const trayIndex = picked[slot];
          const letter = reveal ? question.root.letters[slot] : trayIndex !== undefined ? question.tray[trayIndex] : "";
          return (
            <div
              key={slot}
              ref={(el) => {
                if (el) boxes.current[slot] = el;
              }}
              lang="ar"
              onClick={() => unpick(slot)}
              className={`${tileClass} ${letter ? (reveal ? "bg-gold text-card" : "bg-ink text-paper") : "border-2 border-dashed border-line"}`}
            >
              {letter}
            </div>
          );
        })}
      </div>

      <div dir="rtl" className="grid grid-cols-6 gap-2">
        {question.tray.map((l, i) => (
          <button
            key={i}
            type="button"
            lang="ar"
            onClick={() => pick(i)}
            disabled={locked}
            className={`${tileClass} border border-line bg-card transition-opacity ${picked.includes(i) ? "opacity-25" : "hover:border-gold"}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/** "Build the word": root letters (shuffled) are dragged into the pattern's slots. */
function BuildWord({ question, mode, locked, onAnswer }: { question: Question; mode: Mode; locked: boolean; onAnswer: Answer }) {
  const { root, word } = question;
  // Tile order is shuffled so the answer isn't simply "left to right".
  const [order] = useState(() => {
    const o = [0, 1, 2].sort(() => Math.random() - 0.5);
    return o.every((v, i) => v === i) ? [2, 0, 1] : o;
  });
  const [placed, setPlaced] = useState<(number | null)[]>([null, null, null]); // slot → root letter index
  const tiles = useRef<HTMLDivElement[]>([]);
  const slots = useRef<HTMLDivElement[]>([]);
  // The latest placements, an answered flag, and whether a drag just ended (its closing click
  // must not count as a tap), all readable before React re-renders.
  const placedNow = useRef<(number | null)[]>([null, null, null]);
  const answered = useRef(false);
  const justDragged = useRef(false);
  const pattern = patternById(word.patternId);
  const label = pattern && patternLabel(pattern, mode);

  const setPlacements = (next: (number | null)[]) => {
    placedNow.current = next;
    setPlaced(next);
  };

  const place = (letter: number, slot: number) => {
    if (locked || answered.current) return;
    const next = placedNow.current.map((v) => (v === letter ? null : v));
    next[slot] = letter;
    setPlacements(next);
    if (next.every((v) => v !== null)) {
      answered.current = true;
      // Compare letters, not tiles: in a doubled root (م-د-د) either د fits either slot.
      const correct = next.every((v, s) => v !== null && root.letters[v] === root.letters[s]);
      if (!correct) slots.current.forEach((el, s) => root.letters[next[s]!] !== root.letters[s] && animate(el, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.4 }));
      setTimeout(() => onAnswer(correct, tiles.current), correct ? 250 : 650);
    }
  };

  const tapTile = (letter: number) => {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    const current = placedNow.current;
    const empty = current.indexOf(null);
    if (!current.includes(letter) && empty >= 0) place(letter, empty);
  };

  const clearSlot = (slot: number) => {
    if (!locked && !answered.current) setPlacements(placedNow.current.map((v, s) => (s === slot ? null : v)));
  };

  const dropped = (letter: number, info: PanInfo) => {
    // The click that ends a drag fires straight after this; later taps count again.
    setTimeout(() => (justDragged.current = false), 0);
    const hit = document
      .elementsFromPoint(info.point.x - window.scrollX, info.point.y - window.scrollY)
      .find((el): el is HTMLElement => el instanceof HTMLElement && el.dataset.slot !== undefined);
    if (hit) place(letter, Number(hit.dataset.slot));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div dir="rtl" className="flex gap-3">
        {order.map((letter) => (
          <motion.div
            key={letter}
            ref={(el: HTMLDivElement | null) => {
              if (el) tiles.current[letter] = el;
            }}
            lang="ar"
            drag={!locked && !placed.includes(letter)}
            dragSnapToOrigin
            whileDrag={{ scale: 1.15, zIndex: 10, boxShadow: "0 8px 20px rgba(42,33,24,.25)" }}
            onDragStart={() => (justDragged.current = true)}
            onDragEnd={(_, info) => dropped(letter, info)}
            onClick={() => tapTile(letter)}
            className={`${tileClass} cursor-grab touch-none bg-ink text-paper ${placed.includes(letter) && !locked ? "opacity-25" : ""}`}
          >
            {root.letters[letter]}
          </motion.div>
        ))}
      </div>

      <div dir="rtl" className="flex items-center justify-center gap-1">
        {/* Weak and doubled words are built in their regular form; the answer then shows the change. */}
        {pieces(assembledForm(word).ar, assembledForm(word).roles).map((p, i) =>
          p.rootIndex < 0 ? (
            <span key={i} lang="ar" className="font-arabic text-[44px] leading-none text-gold">
              {withJoiners(p.letter, p.joins)}
            </span>
          ) : (
            <div
              key={i}
              data-slot={p.rootIndex}
              ref={(el) => {
                if (el) slots.current[p.rootIndex] = el;
              }}
              lang="ar"
              onClick={() => clearSlot(p.rootIndex)}
              className={`${tileClass} ${
                placed[p.rootIndex] != null ? "bg-ink/90 text-paper" : "border-2 border-dashed border-gold-soft text-gold-soft"
              }`}
            >
              {placed[p.rootIndex] != null ? root.letters[placed[p.rootIndex]!] : p.slot}
            </div>
          ),
        )}
      </div>

      <p className="text-center text-sm text-muted">
        <bdi lang="ar" dir="rtl" className="font-arabic text-base text-gold">
          {word.shape ?? pattern?.template}
        </bdi>{" "}
        {label && (label.nameIsArabic ? <bdi className="font-arabic text-base">{label.name}</bdi> : label.name)} · means “
        {word.meaning}”
      </p>
    </div>
  );
}
