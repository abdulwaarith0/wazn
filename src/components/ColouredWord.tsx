import type { Word } from "../data/types";
import { changedLetters, pieces } from "../lib/arabic";

type Props = {
  word: Word;
  /** "regular": a weak or doubled word's regular form (قَوَلَ) instead of the real word (قالَ). */
  form?: "real" | "regular";
  /** Mark letters that change between the two forms with data-changed, for the animation to find. */
  markChanges?: boolean;
};

// A word as normal (joined) text, colour-coded: root letters in ink, pattern letters in gold.
export default function ColouredWord({ word, form = "real", markChanges = false }: Props) {
  const regular = form === "regular" && word.change;
  const ar = regular ? word.change!.regular : word.ar;
  const roles = regular ? word.change!.regularRoles : word.roles;
  const changes = markChanges && word.change ? changedLetters(word.change.regular, word.ar)[regular ? "regular" : "real"] : [];

  return pieces(ar, roles).map((p, i) => (
    <span key={i} data-changed={changes[i] || undefined} className={p.rootIndex >= 0 ? "text-ink" : "text-gold"}>
      {p.letter}
    </span>
  ));
}
