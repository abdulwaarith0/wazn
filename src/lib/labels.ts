// Beginner / Grammar labels. Switching mode changes only what these return, never progress.

import type { Pattern, Word } from "../data/types";
import type { Mode } from "./progress";

export type PatternLabel = {
  name: string; // "faa'il" · "اسم الفاعل" · "Form III"
  nameIsArabic: boolean;
  hint: string; // "the doer" · "active participle"
};

export function patternLabel(pattern: Pattern, mode: Mode): PatternLabel {
  if (mode === "beginner") return { name: pattern.beginner.name, nameIsArabic: false, hint: pattern.beginner.hint };
  return { name: pattern.grammar.name, nameIsArabic: /[؀-ۿ]/.test(pattern.grammar.name), hint: pattern.grammar.term };
}

/**
 * The pattern shape to show. Grammar mode shows a word's exact shape where the pattern varies
 * (place nouns مَفْعَل / مَفْعِل / مَفْعَلة; Form I فَعِلَ); Beginner mode keeps the one family shape.
 */
export const patternShape = (pattern: Pattern, mode: Mode, word?: Word) =>
  mode === "grammar" ? (word?.shape ?? pattern.template) : pattern.template;
