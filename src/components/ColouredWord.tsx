import type { Word } from "../data/types";
import { pieces } from "../lib/arabic";

// A word as normal (joined) text, colour-coded: root letters in ink, pattern letters in gold.
export default function ColouredWord({ word }: { word: Word }) {
  return pieces(word.ar, word.roles).map((p, i) => (
    <span key={i} className={p.rootIndex >= 0 ? "text-ink" : "text-gold"}>
      {p.letter}
    </span>
  ));
}
