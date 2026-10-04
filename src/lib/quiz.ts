// Quiz questions, built only from words the player has collected.
// "root": see a word, pick its three root letters (in order) from a tray of six.
// "build": see a root and a pattern, put the root letters into the pattern's slots.

import { roots, rootById } from "../data/roots";
import { words } from "../data/words";
import type { Root, Word } from "../data/types";
import type { Progress } from "./progress";

export const QUIZ_MIN_WORDS = 3;
export const TRAY_SIZE = 6;

export type QuestionKind = "root" | "build";
export type Question = { kind: QuestionKind; word: Word; root: Root; tray: string[] };

type Rng = () => number;

export const quizAvailable = (p: Progress) => p.collected.length >= QUIZ_MIN_WORDS;

const shuffle = <T>(items: T[], rng: Rng) => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

/** The root's letters plus distinct letters from other roots, shuffled. */
export function makeTray(root: Root, rng: Rng): string[] {
  const others = [...new Set(roots.flatMap((r) => r.letters))].filter((l) => !root.letters.includes(l));
  return shuffle([...root.letters, ...shuffle(others, rng).slice(0, TRAY_SIZE - root.letters.length)], rng);
}

/** The next question: kinds alternate, and the same word never comes up twice in a row. */
export function makeQuestion(p: Progress, kind: QuestionKind, rng: Rng = Math.random, previous?: Word): Question | null {
  if (!quizAvailable(p)) return null;
  const pool = words.filter((w) => p.collected.includes(w.id));
  const choices = pool.length > 1 && previous ? pool.filter((w) => w.id !== previous.id) : pool;
  const word = choices[Math.floor(rng() * choices.length)];
  const root = word && rootById(word.rootId);
  if (!word || !root) return null;
  return { kind, word, root, tray: makeTray(root, rng) };
}

/** Whether the letters picked (in root order) are the word's root. */
export const isRightRoot = (q: Question, picked: string[]) =>
  picked.length === q.root.letters.length && picked.every((l, i) => l === q.root.letters[i]);
