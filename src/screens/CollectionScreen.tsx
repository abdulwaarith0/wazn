import { roots } from "../data/roots";
import { patterns } from "../data/patterns";
import { words, wordsOfRoot } from "../data/words";
import Seal from "../components/Seal";
import WordCard from "../components/WordCard";
import { isSealed, type Progress } from "../lib/progress";

type Props = { progress: Progress; onBack: () => void };

export default function CollectionScreen({ progress, onBack }: Props) {
  // Grouped by root in unlock order; within a root, in Workshop pattern order.
  const groups = roots
    .map((root) => ({
      root,
      sealed: isSealed(progress, root.id),
      total: wordsOfRoot(root.id).length,
      items: patterns.flatMap((pattern) => {
        const word = words.find((w) => w.rootId === root.id && w.patternId === pattern.id);
        return word && progress.collected.includes(word.id) ? [{ word, pattern }] : [];
      }),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="rounded-lg py-1 pr-2 text-sm text-muted hover:text-ink">
          ← Roots
        </button>
        <span className="text-sm text-muted tabular-nums">
          <b className="font-semibold text-ink">{progress.collected.length}</b> / {words.length} words
        </span>
      </div>

      <div className="-mt-2 text-center">
        <h1 className="text-2xl font-semibold">Your collection</h1>
        <p className="text-sm text-muted">Every word you've formed, grouped by its root.</p>
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-12 text-center">
          <p className="text-muted">Nothing here yet.</p>
          <p>Open a root and form your first word.</p>
          <button type="button" onClick={onBack} className="mt-1 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Go to the roots
          </button>
        </div>
      ) : (
        groups.map(({ root, sealed, total, items }) => (
          <div key={root.id} className="flex flex-col gap-3">
            <div className={`flex items-center gap-3 border-b pb-2 ${sealed ? "border-gold/60" : "border-line"}`}>
              {sealed && <Seal text={root.letters.join("")} className="h-11 w-11 shrink-0" />}
              <span lang="ar" dir="rtl" className="font-arabic text-3xl leading-tight">
                {root.letters.join("-")}
              </span>
              <span className="text-sm text-muted">
                {root.translit} · {root.gist}
              </span>
              <span className={`ml-auto text-sm tabular-nums ${sealed ? "font-semibold text-gold" : "text-muted"}`}>
                {sealed ? "Sealed" : `${items.length} / ${total}`}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map(({ word, pattern }) => (
                <WordCard key={word.id} word={word} pattern={pattern} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
