// Arabic helpers for the assembly animation: split a word into letters (each with its
// vowel marks), work out which letters join, and add invisible joiners so a letter drawn
// on its own still takes its joined shape.

export const ZWJ = "‍";
export const PLACEHOLDERS = ["ف", "ع", "ل"] as const;

// Letters that never join to the letter after them.
const NO_JOIN_AFTER = new Set([..."اأإآدذرزوؤةءى"]);
// Letters that never join to the letter before them.
const NO_JOIN_BEFORE = new Set(["ء"]);

const MARK = /[ً-ْٰ]/;
export const isMark = (ch: string) => MARK.test(ch);

/** Split into letters, each carrying its vowel marks: "كَاتِب" → ["كَ", "ا", "تِ", "ب"]. */
export function letters(word: string): string[] {
  const out: string[] = [];
  for (const ch of word) {
    if (isMark(ch) && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

export const base = (letter: string) => [...letter][0] ?? "";
const marks = (letter: string) => [...letter].slice(1).join("");

export type JoinFlags = { prev: boolean; next: boolean };

/** Whether each letter joins to its neighbour before / after it. */
export function joinFlags(ls: string[]): JoinFlags[] {
  const joins = (a: string | undefined, b: string | undefined) =>
    !!a && !!b && !NO_JOIN_AFTER.has(base(a)) && !NO_JOIN_BEFORE.has(base(b));
  return ls.map((l, i) => ({ prev: joins(ls[i - 1], l), next: joins(l, ls[i + 1]) }));
}

/** A letter wrapped in joiners so it keeps its joined shape when drawn on its own. */
export const withJoiners = (letter: string, f: JoinFlags) =>
  (f.prev ? ZWJ : "") + letter + (f.next ? ZWJ : "");

/** The pattern a word came from: each root letter swapped for ف, ع, ل, vowels kept. كَاتِب + "rprr" → فَاعِل */
export function placeholder(word: string, roles: string): string {
  let r = 0;
  return letters(word)
    .map((l, i) => (roles[i] === "r" ? (PLACEHOLDERS[r++] ?? "") + marks(l) : l))
    .join("");
}

/** The root letters a word's roles point at, in order. */
export const rootLettersOf = (word: string, roles: string) =>
  letters(word).filter((_, i) => roles[i] === "r").map(base);

export type Piece = {
  letter: string; // the word's letter with its marks
  slot: string; // what the slot shows before the root letter arrives
  rootIndex: number; // 0-2 for root letters, -1 for pattern letters
  joins: JoinFlags;
};

/** Everything the animation needs to draw a word piece by piece. */
export function pieces(word: string, roles: string): Piece[] {
  const ls = letters(word);
  const flags = joinFlags(ls);
  let r = 0;
  return ls.map((letter, i) => {
    const rootIndex = roles[i] === "r" ? r++ : -1;
    const slot = rootIndex >= 0 ? (PLACEHOLDERS[rootIndex] ?? "") + marks(letter) : letter;
    return { letter, slot, rootIndex, joins: flags[i] ?? { prev: false, next: false } };
  });
}
