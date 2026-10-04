import { useCallback, useRef, useState } from "react";
import { collect, loadProgress, saveProgress, unlockedRootIds, type Progress } from "../lib/progress";
import { createStore } from "../lib/storage";

const store = createStore();

export type CollectResult = { added: boolean; unlocked?: string };

/** React access to progress. Every change is saved immediately. */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress(store));
  // Mirrors the latest progress, so actions called after an animation never see a stale copy.
  const latest = useRef(progress);

  const update = useCallback((next: Progress) => {
    latest.current = next;
    saveProgress(store, next);
    setProgress(next);
  }, []);

  const collectWord = useCallback(
    (wordId: string): CollectResult => {
      const before = latest.current;
      const after = collect(before, wordId);
      if (after === before) return { added: false };
      update(after);
      const wasOpen = unlockedRootIds(before);
      return { added: true, unlocked: unlockedRootIds(after).find((id) => !wasOpen.includes(id)) };
    },
    [update],
  );

  return { progress, collectWord };
}
