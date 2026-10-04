import type { Root } from "./types";

// Array order is unlock order (devpost/word-list-draft.md, learner-reviewed).
export const roots: Root[] = [
  { id: "ktb", letters: ["ك", "ت", "ب"], translit: "k-t-b", gist: "writing" },
  { id: "drs", letters: ["د", "ر", "س"], translit: "d-r-s", gist: "studying" },
  { id: "hkm", letters: ["ح", "ك", "م"], translit: "ḥ-k-m", gist: "judging" },
  { id: "elm", letters: ["ع", "ل", "م"], translit: "ʿ-l-m", gist: "knowing" },
  { id: "sne", letters: ["ص", "ن", "ع"], translit: "ṣ-n-ʿ", gist: "making" },
  { id: "jls", letters: ["ج", "ل", "س"], translit: "j-l-s", gist: "sitting" },
  { id: "fth", letters: ["ف", "ت", "ح"], translit: "f-t-ḥ", gist: "opening" },
  { id: "khrj", letters: ["خ", "ر", "ج"], translit: "kh-r-j", gist: "going out" },
  { id: "zre", letters: ["ز", "ر", "ع"], translit: "z-r-ʿ", gist: "planting" },
  { id: "sjd", letters: ["س", "ج", "د"], translit: "s-j-d", gist: "prostrating" },
  // Phase 3: weak and doubled roots (devpost/word-list-phase3-draft.md, learner-reviewed), easiest change first.
  { id: "wsl", letters: ["و", "ص", "ل"], translit: "w-ṣ-l", gist: "arriving" },
  { id: "qwl", letters: ["ق", "و", "ل"], translit: "q-w-l", gist: "saying" },
  { id: "bye", letters: ["ب", "ي", "ع"], translit: "b-y-ʿ", gist: "selling" },
  { id: "mdd", letters: ["م", "د", "د"], translit: "m-d-d", gist: "stretching" },
  { id: "dew", letters: ["د", "ع", "و"], translit: "d-ʿ-w", gist: "calling" },
];

export const rootById = (id: string) => roots.find((r) => r.id === id);
