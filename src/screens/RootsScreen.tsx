import { useState } from "react";
import { roots } from "../data/roots";
import RootTile from "../components/RootTile";
import { collectedCount, totalCount, UNLOCK_AT, unlockedRootIds, type Progress } from "../lib/progress";

type Props = { progress: Progress; onOpenRoot: (rootId: string) => void };

export default function RootsScreen({ progress, onOpenRoot }: Props) {
  const [note, setNote] = useState<{ prev: string; next: string } | null>(null);
  const open = unlockedRootIds(progress);

  return (
    <section className="flex flex-col gap-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Roots</h1>
        <p className="text-sm text-muted">Pick a root and pour it into patterns to make real words.</p>
      </div>

      <p aria-live="polite" className="min-h-6 text-center text-sm text-muted">
        {note && (
          <>
            Collect {UNLOCK_AT} words from{" "}
            <span lang="ar" dir="rtl" className="font-arabic text-base text-ink">
              {note.prev}
            </span>{" "}
            to unlock{" "}
            <span lang="ar" dir="rtl" className="font-arabic text-base text-ink">
              {note.next}
            </span>
            .
          </>
        )}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {roots.map((root, i) => {
          const locked = !open.includes(root.id);
          const prev = roots[i - 1];
          return (
            <RootTile
              key={root.id}
              root={root}
              locked={locked}
              count={collectedCount(progress, root.id)}
              total={totalCount(root.id)}
              onOpen={() => onOpenRoot(root.id)}
              onLocked={() => prev && setNote({ prev: prev.letters.join("-"), next: root.letters.join("-") })}
            />
          );
        })}
      </div>
    </section>
  );
}
