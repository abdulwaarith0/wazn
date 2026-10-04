import type { Word } from "./types";

// Every real word, from devpost/word-list-draft.md (learner-reviewed).
// roles: one char per letter (a letter plus its vowel marks): r = root letter, p = pattern letter.
// A missing (rootId, patternId) pair means no common word: the tile is greyed out.
export const words: Word[] = [
  // ك-ت-ب (Forms II and IV are rare, so greyed out)
  { id: "ktb-form1", rootId: "ktb", patternId: "form1", ar: "كَتَبَ", roles: "rrr", translit: "kataba", meaning: "he wrote" },
  { id: "ktb-form3", rootId: "ktb", patternId: "form3", ar: "كَاتَبَ", roles: "rprr", translit: "kātaba", meaning: "he corresponded with" },
  { id: "ktb-faail", rootId: "ktb", patternId: "faail", ar: "كَاتِب", roles: "rprr", translit: "kātib", meaning: "writer" },
  { id: "ktb-mafool", rootId: "ktb", patternId: "mafool", ar: "مَكْتُوب", roles: "prrpr", translit: "maktūb", meaning: "written; a letter" },
  { id: "ktb-place", rootId: "ktb", patternId: "place", ar: "مَكْتَب", roles: "prrr", translit: "maktab", meaning: "office, desk", shape: "مَفْعَل" },
  { id: "ktb-fiaala", rootId: "ktb", patternId: "fiaala", ar: "كِتَابَة", roles: "rrprp", translit: "kitāba", meaning: "writing" },
];

export const wordFor = (rootId: string, patternId: string) =>
  words.find((w) => w.rootId === rootId && w.patternId === patternId);
