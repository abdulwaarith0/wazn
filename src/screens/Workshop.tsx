import { useRef, useState } from "react";
import type { Pattern, Root } from "../data/types";
import { patterns } from "../data/patterns";
import { wordFor, wordsOfRoot } from "../data/words";
import Ornament from "../components/Ornament";
import PatternTile from "../components/PatternTile";
import RootText from "../components/RootText";
import WordAssembly, { type AssemblyHandle } from "../components/WordAssembly";
import RewardBurst from "../components/moments/RewardBurst";
import type { Mode } from "../lib/progress";

const PHASE = 2;
const GROUPS = [
  { kind: "verb", title: "Verbs" },
  { kind: "noun", title: "Nouns" },
] as const;

type Props = {
  root: Root;
  mode: Mode;
  collected: string[];
  onCollect: (wordId: string) => boolean;
  onBack: () => void;
};

export default function Workshop({ root, mode, collected, onCollect, onBack }: Props) {
  const tiles = useRef<HTMLDivElement[]>([]);
  const assembly = useRef<AssemblyHandle>(null);
  const forming = useRef(false);
  const [active, setActive] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [bursts, setBursts] = useState(0);
  const rootText = root.letters.join("-");
  const rootWords = wordsOfRoot(root.id);
  const count = rootWords.filter((w) => collected.includes(w.id)).length;

  const pick = async (pattern: Pattern) => {
    const word = wordFor(root.id, pattern.id);
    // Taps are ignored while a word is still forming.
    if (!word || forming.current || !assembly.current) return;
    forming.current = true;
    setNote(null);
    setActive(pattern.id);
    try {
      await assembly.current.play(word, tiles.current);
      // A new word is collected once it has landed; re-forming a collected word just replays it.
      if (onCollect(word.id)) setBursts((n) => n + 1);
    } finally {
      forming.current = false;
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="rounded-lg py-1 pr-2 text-sm text-muted hover:text-ink">
          ← Roots
        </button>
        <span className="text-sm text-muted tabular-nums">
          <b className="font-semibold text-ink">{count}</b> / {rootWords.length} collected
        </span>
      </div>

      <div className="-mt-2 text-center">
        <h1 lang="ar" dir="rtl" className="font-arabic text-4xl leading-tight">
          {rootText}
        </h1>
        <p className="text-sm text-muted">
          {root.translit} · {root.gist}
        </p>
      </div>

      <div dir="rtl" className="flex justify-center gap-4">
        {root.letters.map((l, i) => (
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

      <div className="relative overflow-hidden rounded-2xl border border-line bg-card px-4 pt-4 pb-6">
        <Ornament />
        <WordAssembly ref={assembly} />
        <div className="mt-1 flex justify-center gap-5 text-xs text-muted">
          <span>
            <b className="text-ink">■</b> from the root
          </span>
          <span>
            <b className="text-gold">■</b> from the pattern
          </span>
        </div>
        {bursts > 0 && <RewardBurst key={bursts} />}
      </div>

      <p aria-live="polite" className="min-h-6 text-center text-sm text-muted">
        {note && (
          <>
            <RootText root={root} /> {note}
          </>
        )}
      </p>

      {GROUPS.map(({ kind, title }) => (
        <div key={kind} className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">{title}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {patterns
              .filter((p) => p.phase <= PHASE && p.kind === kind)
              .map((p) => {
                const word = wordFor(root.id, p.id);
                return (
                  <PatternTile
                    key={p.id}
                    pattern={p}
                    word={word}
                    mode={mode}
                    available={!!word}
                    collected={!!word && collected.includes(word.id)}
                    active={active === p.id}
                    onPick={() => void pick(p)}
                    onBlocked={() => setNote("doesn't use this pattern in common Arabic.")}
                  />
                );
              })}
          </div>
          {kind === "verb" && mode === "grammar" && (
            <p className="text-xs text-muted">
              Form IX{" "}
              <bdi lang="ar" dir="rtl" className="font-arabic text-sm">
                اِفْعَلَّ
              </bdi>{" "}
              isn't shown: it's used for colours and physical defects, so none of these roots take it.
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
