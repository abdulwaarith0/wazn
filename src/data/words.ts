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

  // د-ر-س (Form III rare; no Form IV)
  { id: "drs-form1", rootId: "drs", patternId: "form1", ar: "دَرَسَ", roles: "rrr", translit: "darasa", meaning: "he studied" },
  { id: "drs-form2", rootId: "drs", patternId: "form2", ar: "دَرَّسَ", roles: "rrr", translit: "darrasa", meaning: "he taught" },
  { id: "drs-faail", rootId: "drs", patternId: "faail", ar: "دَارِس", roles: "rprr", translit: "dāris", meaning: "student, scholar" },
  { id: "drs-mafool", rootId: "drs", patternId: "mafool", ar: "مَدْرُوس", roles: "prrpr", translit: "madrūs", meaning: "studied" },
  { id: "drs-place", rootId: "drs", patternId: "place", ar: "مَدْرَسَة", roles: "prrrp", translit: "madrasa", meaning: "school", shape: "مَفْعَلَة" },
  { id: "drs-fiaala", rootId: "drs", patternId: "fiaala", ar: "دِرَاسَة", roles: "rrprp", translit: "dirāsa", meaning: "study" },

  // ح-ك-م (no فِعالة)
  { id: "hkm-form1", rootId: "hkm", patternId: "form1", ar: "حَكَمَ", roles: "rrr", translit: "ḥakama", meaning: "he judged, ruled" },
  { id: "hkm-form2", rootId: "hkm", patternId: "form2", ar: "حَكَّمَ", roles: "rrr", translit: "ḥakkama", meaning: "he appointed as arbiter" },
  { id: "hkm-form3", rootId: "hkm", patternId: "form3", ar: "حَاكَمَ", roles: "rprr", translit: "ḥākama", meaning: "he put on trial" },
  { id: "hkm-form4", rootId: "hkm", patternId: "form4", ar: "أَحْكَمَ", roles: "prrr", translit: "aḥkama", meaning: "he perfected" },
  { id: "hkm-faail", rootId: "hkm", patternId: "faail", ar: "حَاكِم", roles: "rprr", translit: "ḥākim", meaning: "ruler" },
  { id: "hkm-mafool", rootId: "hkm", patternId: "mafool", ar: "مَحْكُوم", roles: "prrpr", translit: "maḥkūm", meaning: "ruled; sentenced" },
  { id: "hkm-place", rootId: "hkm", patternId: "place", ar: "مَحْكَمَة", roles: "prrrp", translit: "maḥkama", meaning: "court", shape: "مَفْعَلَة" },

  // ع-ل-م (no Form III, no فِعالة)
  { id: "elm-form1", rootId: "elm", patternId: "form1", ar: "عَلِمَ", roles: "rrr", translit: "ʿalima", meaning: "he knew", shape: "فَعِلَ" },
  { id: "elm-form2", rootId: "elm", patternId: "form2", ar: "عَلَّمَ", roles: "rrr", translit: "ʿallama", meaning: "he taught" },
  { id: "elm-form4", rootId: "elm", patternId: "form4", ar: "أَعْلَمَ", roles: "prrr", translit: "aʿlama", meaning: "he informed" },
  { id: "elm-faail", rootId: "elm", patternId: "faail", ar: "عَالِم", roles: "rprr", translit: "ʿālim", meaning: "scholar" },
  { id: "elm-mafool", rootId: "elm", patternId: "mafool", ar: "مَعْلُوم", roles: "prrpr", translit: "maʿlūm", meaning: "known" },
  { id: "elm-place", rootId: "elm", patternId: "place", ar: "مَعْلَم", roles: "prrr", translit: "maʿlam", meaning: "landmark", shape: "مَفْعَل" },

  // ص-ن-ع (Form III rare; no Form IV)
  { id: "sne-form1", rootId: "sne", patternId: "form1", ar: "صَنَعَ", roles: "rrr", translit: "ṣanaʿa", meaning: "he made" },
  { id: "sne-form2", rootId: "sne", patternId: "form2", ar: "صَنَّعَ", roles: "rrr", translit: "ṣannaʿa", meaning: "he industrialised" },
  { id: "sne-faail", rootId: "sne", patternId: "faail", ar: "صَانِع", roles: "rprr", translit: "ṣāniʿ", meaning: "maker" },
  { id: "sne-mafool", rootId: "sne", patternId: "mafool", ar: "مَصْنُوع", roles: "prrpr", translit: "maṣnūʿ", meaning: "made, manufactured" },
  { id: "sne-place", rootId: "sne", patternId: "place", ar: "مَصْنَع", roles: "prrr", translit: "maṣnaʿ", meaning: "factory", shape: "مَفْعَل" },
  { id: "sne-fiaala", rootId: "sne", patternId: "fiaala", ar: "صِنَاعَة", roles: "rrprp", translit: "ṣināʿa", meaning: "industry" },

  // ج-ل-س (no Form II, no مَفْعُول, no فِعالة)
  { id: "jls-form1", rootId: "jls", patternId: "form1", ar: "جَلَسَ", roles: "rrr", translit: "jalasa", meaning: "he sat" },
  { id: "jls-form3", rootId: "jls", patternId: "form3", ar: "جَالَسَ", roles: "rprr", translit: "jālasa", meaning: "he sat with" },
  { id: "jls-form4", rootId: "jls", patternId: "form4", ar: "أَجْلَسَ", roles: "prrr", translit: "ajlasa", meaning: "he seated (someone)" },
  { id: "jls-faail", rootId: "jls", patternId: "faail", ar: "جَالِس", roles: "rprr", translit: "jālis", meaning: "sitting" },
  { id: "jls-place", rootId: "jls", patternId: "place", ar: "مَجْلِس", roles: "prrr", translit: "majlis", meaning: "council, sitting-place", shape: "مَفْعِل" },

  // ف-ت-ح (no Form IV, no place noun, no فِعالة)
  { id: "fth-form1", rootId: "fth", patternId: "form1", ar: "فَتَحَ", roles: "rrr", translit: "fataḥa", meaning: "he opened" },
  { id: "fth-form2", rootId: "fth", patternId: "form2", ar: "فَتَّحَ", roles: "rrr", translit: "fattaḥa", meaning: "he opened wide" },
  { id: "fth-form3", rootId: "fth", patternId: "form3", ar: "فَاتَحَ", roles: "rprr", translit: "fātaḥa", meaning: "he broached (a subject)" },
  { id: "fth-faail", rootId: "fth", patternId: "faail", ar: "فَاتِح", roles: "rprr", translit: "fātiḥ", meaning: "opener, conqueror" },
  { id: "fth-mafool", rootId: "fth", patternId: "mafool", ar: "مَفْتُوح", roles: "prrpr", translit: "maftūḥ", meaning: "open" },

  // خ-ر-ج (no Form III, no مَفْعُول, no فِعالة)
  { id: "khrj-form1", rootId: "khrj", patternId: "form1", ar: "خَرَجَ", roles: "rrr", translit: "kharaja", meaning: "he went out" },
  { id: "khrj-form2", rootId: "khrj", patternId: "form2", ar: "خَرَّجَ", roles: "rrr", translit: "kharraja", meaning: "he graduated (someone)" },
  { id: "khrj-form4", rootId: "khrj", patternId: "form4", ar: "أَخْرَجَ", roles: "prrr", translit: "akhraja", meaning: "he took out" },
  { id: "khrj-faail", rootId: "khrj", patternId: "faail", ar: "خَارِج", roles: "rprr", translit: "khārij", meaning: "outside; one going out" },
  { id: "khrj-place", rootId: "khrj", patternId: "place", ar: "مَخْرَج", roles: "prrr", translit: "makhraj", meaning: "exit", shape: "مَفْعَل" },

  // ز-ر-ع (no Form II or IV; Form III rare)
  { id: "zre-form1", rootId: "zre", patternId: "form1", ar: "زَرَعَ", roles: "rrr", translit: "zaraʿa", meaning: "he planted" },
  { id: "zre-faail", rootId: "zre", patternId: "faail", ar: "زَارِع", roles: "rprr", translit: "zāriʿ", meaning: "planter" },
  { id: "zre-mafool", rootId: "zre", patternId: "mafool", ar: "مَزْرُوع", roles: "prrpr", translit: "mazrūʿ", meaning: "planted" },
  { id: "zre-place", rootId: "zre", patternId: "place", ar: "مَزْرَعَة", roles: "prrrp", translit: "mazraʿa", meaning: "farm", shape: "مَفْعَلَة" },
  { id: "zre-fiaala", rootId: "zre", patternId: "fiaala", ar: "زِرَاعَة", roles: "rrprp", translit: "zirāʿa", meaning: "agriculture" },

  // س-ج-د (only Form I, the doer and the place)
  { id: "sjd-form1", rootId: "sjd", patternId: "form1", ar: "سَجَدَ", roles: "rrr", translit: "sajada", meaning: "he prostrated" },
  { id: "sjd-faail", rootId: "sjd", patternId: "faail", ar: "سَاجِد", roles: "rprr", translit: "sājid", meaning: "one prostrating" },
  { id: "sjd-place", rootId: "sjd", patternId: "place", ar: "مَسْجِد", roles: "prrr", translit: "masjid", meaning: "mosque", shape: "مَفْعِل" },
];

export const wordsOfRoot = (rootId: string) => words.filter((w) => w.rootId === rootId);

export const wordFor = (rootId: string, patternId: string) =>
  words.find((w) => w.rootId === rootId && w.patternId === patternId);
