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
  grammar: { name: string };
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
};
