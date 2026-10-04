import { useState } from "react";
import { roots } from "../data/roots";
import type { Root } from "../data/types";
import RootText from "../components/RootText";
import RootTile from "../components/RootTile";
import ModeSwitch from "../components/ModeSwitch";
import CompletionMoment from "../components/moments/CompletionMoment";
import { allSealed, collectedCount, isSealed, totalCount, UNLOCK_AT, unlockedRootIds, type Mode, type Progress } from "../lib/progress";

type Props = {
  progress: Progress;
  onOpenRoot: (rootId: string) => void;
  onOpenCollection: () => void;
  onModeChange: (mode: Mode) => void;
};

export default function RootsScreen({ progress, onOpenRoot, onOpenCollection, onModeChange }: Props) {
  const [note, setNote] = useState<{ prev: Root; next: Root } | null>(null);
  const open = unlockedRootIds(progress);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ModeSwitch mode={progress.mode} onChange={onModeChange} />
        <button
          type="button"
          onClick={onOpenCollection}
          className="flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-1.5 text-sm hover:border-gold/60"
        >
          Your collection
          <span className="rounded-full bg-gold px-2 text-xs font-semibold text-card tabular-nums">{progress.collected.length}</span>
        </button>
      </div>

      <div className="-mt-2 text-center">
        <h1 className="text-2xl font-semibold">Roots</h1>
        <p className="text-sm text-muted">Pick a root and pour it into patterns to make real words.</p>
      </div>

      {allSealed(progress) && <CompletionMoment />}

      <p aria-live="polite" className="min-h-6 text-center text-sm text-muted">
        {note && (
          <>
            Collect {UNLOCK_AT} words from <RootText root={note.prev} /> to unlock <RootText root={note.next} />.
          </>
        )}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {roots.map((root, i) => {
          const prev = roots[i - 1];
          return (
            <RootTile
              key={root.id}
              root={root}
              locked={!open.includes(root.id)}
              sealed={isSealed(progress, root.id)}
              count={collectedCount(progress, root.id)}
              total={totalCount(root.id)}
              onOpen={() => onOpenRoot(root.id)}
              onLocked={() => prev && setNote({ prev, next: root })}
            />
          );
        })}
      </div>
    </section>
  );
}
