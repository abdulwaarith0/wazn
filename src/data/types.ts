export type Root = {
  id: string;
  letters: [string, string, string];
  translit: string;
  gist: string;
};

export type Pattern = {
  id: string;
  kind: "verb" | "noun";
  form?: number;
  phase: 1 | 2;
  template: string;
  beginner: { name: string; hint: string };
  grammar: { name: string; term: string };
};

export type Word = {
  id: string;
  rootId: string;
  patternId: string;
  ar: string;
  roles: string;
  translit: string;
  meaning: string;
  shape?: string;
  audio?: string;
  /**
   * Weak and doubled roots: the regular form the pattern gives (the root poured in unchanged),
   * its roles, and the rule that turns it into the real word. قالَ: { regular: "قَوَلَ", regularRoles: "rrr", rule: "و between two vowels becomes ا" }
   */
  change?: { regular: string; regularRoles: string; rule: string };
};
