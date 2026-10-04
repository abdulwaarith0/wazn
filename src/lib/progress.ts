// Progress: what the player has collected, plus the rules derived from it.
// Only the collection, mode and flags are stored; unlocks and counts are always derived,
// so they can never drift out of sync with the collection.

import { roots } from "../data/roots";
import { words, wordsOfRoot } from "../data/words";
import type { Store } from "./storage";

export type Mode = "beginner" | "grammar";

export type Progress = {
  version: 1;
  collected: string[]; // word ids, in the order collected
  mode: Mode;
  introSeen: boolean;
  heard: string[]; // Phase 3: word ids whose audio has auto-played
};

export const STORAGE_KEY = "wazn:progress:v1";
export const UNLOCK_AT = 3;

export const freshProgress = (): Progress => ({
  version: 1,
  collected: [],
  mode: "beginner",
  introSeen: false,
  heard: [],
});

const knownWordIds = new Set(words.map((w) => w.id));
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");

/** Read saved progress. Anything corrupted, or from another version, starts fresh rather than crashing. */
export function parseProgress(raw: string | null): Progress {
  if (!raw) return freshProgress();
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return freshProgress();
    const p = data as Record<string, unknown>;
    if (p.version !== 1 || !isStringArray(p.collected)) return freshProgress();
    return {
      version: 1,
      // Drop duplicates and ids of words that no longer exist.
      collected: [...new Set(p.collected)].filter((id) => knownWordIds.has(id)),
      mode: p.mode === "grammar" ? "grammar" : "beginner",
      introSeen: p.introSeen === true,
      heard: isStringArray(p.heard) ? p.heard : [],
    };
  } catch {
    return freshProgress();
  }
}

export const loadProgress = (store: Store) => parseProgress(store.get(STORAGE_KEY));
export const saveProgress = (store: Store, p: Progress) => store.set(STORAGE_KEY, JSON.stringify(p));

/** Add a word to the collection; collecting it again changes nothing. */
export const collect = (p: Progress, wordId: string): Progress =>
  p.collected.includes(wordId) || !knownWordIds.has(wordId) ? p : { ...p, collected: [...p.collected, wordId] };

export const collectedCount = (p: Progress, rootId: string) =>
  wordsOfRoot(rootId).filter((w) => p.collected.includes(w.id)).length;

export const totalCount = (rootId: string) => wordsOfRoot(rootId).length;

/** The first root is always open; each next root opens once the one before has UNLOCK_AT words collected. */
export function unlockedRootIds(p: Progress): string[] {
  const open: string[] = [];
  for (const [i, root] of roots.entries()) {
    const prev = roots[i - 1];
    if (i > 0 && (!prev || collectedCount(p, prev.id) < UNLOCK_AT)) break;
    open.push(root.id);
  }
  return open;
}
