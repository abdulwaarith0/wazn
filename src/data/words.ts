import type { Word } from "./types";

// Every real word in the app, hand-checked.
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

  // Phase 2: Forms V-X. Rare (◐) words and the irregular Form VIII cells (ص-ن-ع, ز-ر-ع, د-ر-س)
  // stay greyed out; the irregular ones return in Phase 3 with the weak roots.
  { id: "ktb-form6", rootId: "ktb", patternId: "form6", ar: "تَكَاتَبَ", roles: "prprr", translit: "takātaba", meaning: "they wrote to each other" },
  { id: "ktb-form8", rootId: "ktb", patternId: "form8", ar: "اِكْتَتَبَ", roles: "prprr", translit: "iktataba", meaning: "he subscribed" },
  { id: "ktb-form10", rootId: "ktb", patternId: "form10", ar: "اِسْتَكْتَبَ", roles: "ppprrr", translit: "istaktaba", meaning: "he asked (someone) to write" },
  { id: "drs-form6", rootId: "drs", patternId: "form6", ar: "تَدَارَسَ", roles: "prprr", translit: "tadārasa", meaning: "they studied together" },
  { id: "hkm-form5", rootId: "hkm", patternId: "form5", ar: "تَحَكَّمَ", roles: "prrr", translit: "taḥakkama", meaning: "he controlled" },
  { id: "hkm-form6", rootId: "hkm", patternId: "form6", ar: "تَحَاكَمَ", roles: "prprr", translit: "taḥākama", meaning: "they went to court" },
  { id: "hkm-form8", rootId: "hkm", patternId: "form8", ar: "اِحْتَكَمَ", roles: "prprr", translit: "iḥtakama", meaning: "he referred to arbitration" },
  { id: "hkm-form10", rootId: "hkm", patternId: "form10", ar: "اِسْتَحْكَمَ", roles: "ppprrr", translit: "istaḥkama", meaning: "it became firm" },
  { id: "elm-form5", rootId: "elm", patternId: "form5", ar: "تَعَلَّمَ", roles: "prrr", translit: "taʿallama", meaning: "he learned" },
  { id: "elm-form10", rootId: "elm", patternId: "form10", ar: "اِسْتَعْلَمَ", roles: "ppprrr", translit: "istaʿlama", meaning: "he inquired" },
  { id: "sne-form5", rootId: "sne", patternId: "form5", ar: "تَصَنَّعَ", roles: "prrr", translit: "taṣannaʿa", meaning: "he feigned, affected" },
  { id: "fth-form5", rootId: "fth", patternId: "form5", ar: "تَفَتَّحَ", roles: "prrr", translit: "tafattaḥa", meaning: "it blossomed" },
  { id: "fth-form7", rootId: "fth", patternId: "form7", ar: "اِنْفَتَحَ", roles: "pprrr", translit: "infataḥa", meaning: "it opened up" },
  { id: "fth-form8", rootId: "fth", patternId: "form8", ar: "اِفْتَتَحَ", roles: "prprr", translit: "iftataḥa", meaning: "he inaugurated" },
  { id: "fth-form10", rootId: "fth", patternId: "form10", ar: "اِسْتَفْتَحَ", roles: "ppprrr", translit: "istaftaḥa", meaning: "he began; sought an opening" },
  { id: "khrj-form5", rootId: "khrj", patternId: "form5", ar: "تَخَرَّجَ", roles: "prrr", translit: "takharraja", meaning: "he graduated" },
  { id: "khrj-form10", rootId: "khrj", patternId: "form10", ar: "اِسْتَخْرَجَ", roles: "ppprrr", translit: "istakhraja", meaning: "he extracted" },

  // Phase 3: weak and doubled roots. Words whose letters change carry
  // `change`: the regular form the pattern gives, and the rule. In the real word, a letter that came
  // from the root (changed or merged) is "r"; a letter only the pattern added is "p".
  { id: "sne-form8", rootId: "sne", patternId: "form8", ar: "اِصْطَنَعَ", roles: "prprr", translit: "iṣṭanaʿa", meaning: "he fabricated, contrived", change: { regular: "اِصْتَنَعَ", regularRoles: "prprr", rule: "ت next to ص becomes ط" } },

  // و-ص-ل: almost regular; only Form VIII changes
  { id: "wsl-form1", rootId: "wsl", patternId: "form1", ar: "وَصَلَ", roles: "rrr", translit: "waṣala", meaning: "he arrived" },
  { id: "wsl-form2", rootId: "wsl", patternId: "form2", ar: "وَصَّلَ", roles: "rrr", translit: "waṣṣala", meaning: "he connected, delivered" },
  { id: "wsl-form3", rootId: "wsl", patternId: "form3", ar: "وَاصَلَ", roles: "rprr", translit: "wāṣala", meaning: "he continued" },
  { id: "wsl-form4", rootId: "wsl", patternId: "form4", ar: "أَوْصَلَ", roles: "prrr", translit: "awṣala", meaning: "he delivered, took (someone) to" },
  { id: "wsl-faail", rootId: "wsl", patternId: "faail", ar: "وَاصِل", roles: "rprr", translit: "wāṣil", meaning: "arriving" },
  { id: "wsl-mafool", rootId: "wsl", patternId: "mafool", ar: "مَوْصُول", roles: "prrpr", translit: "mawṣūl", meaning: "connected; relative noun" },
  { id: "wsl-form5", rootId: "wsl", patternId: "form5", ar: "تَوَصَّلَ", roles: "prrr", translit: "tawaṣṣala", meaning: "he reached (a result)" },
  { id: "wsl-form6", rootId: "wsl", patternId: "form6", ar: "تَوَاصَلَ", roles: "prprr", translit: "tawāṣala", meaning: "they kept in touch" },
  { id: "wsl-form8", rootId: "wsl", patternId: "form8", ar: "اِتَّصَلَ", roles: "prrr", translit: "ittaṣala", meaning: "he got in touch, called", change: { regular: "اِوْتَصَلَ", regularRoles: "prprr", rule: "و becomes ت and merges with the pattern's ت" } },

  // ق-و-ل: middle و
  { id: "qwl-form1", rootId: "qwl", patternId: "form1", ar: "قَالَ", roles: "rrr", translit: "qāla", meaning: "he said", change: { regular: "قَوَلَ", regularRoles: "rrr", rule: "و between two vowels becomes ا" } },
  { id: "qwl-faail", rootId: "qwl", patternId: "faail", ar: "قَائِل", roles: "rprr", translit: "qāʾil", meaning: "speaker", change: { regular: "قَاوِل", regularRoles: "rprr", rule: "و after ا becomes ء" } },
  { id: "qwl-mafool", rootId: "qwl", patternId: "mafool", ar: "مَقُول", roles: "prrr", translit: "maqūl", meaning: "said", change: { regular: "مَقْوُول", regularRoles: "prrpr", rule: "the two و merge" } },
  { id: "qwl-place", rootId: "qwl", patternId: "place", ar: "مَقَال", roles: "prrr", translit: "maqāl", meaning: "article, saying", shape: "مَفْعَل", change: { regular: "مَقْوَل", regularRoles: "prrr", rule: "و passes its vowel back and becomes ا" } },

  // ب-ي-ع: middle ي
  { id: "bye-form1", rootId: "bye", patternId: "form1", ar: "بَاعَ", roles: "rrr", translit: "bāʿa", meaning: "he sold", change: { regular: "بَيَعَ", regularRoles: "rrr", rule: "ي between two vowels becomes ا" } },
  { id: "bye-form3", rootId: "bye", patternId: "form3", ar: "بَايَعَ", roles: "rprr", translit: "bāyaʿa", meaning: "he pledged allegiance to" },
  { id: "bye-faail", rootId: "bye", patternId: "faail", ar: "بَائِع", roles: "rprr", translit: "bāʾiʿ", meaning: "seller", change: { regular: "بَايِع", regularRoles: "rprr", rule: "ي after ا becomes ء" } },
  { id: "bye-mafool", rootId: "bye", patternId: "mafool", ar: "مَبِيع", roles: "prrr", translit: "mabīʿ", meaning: "sold; sale item", change: { regular: "مَبْيُوع", regularRoles: "prrpr", rule: "ي and و merge into ي" } },
  { id: "bye-form8", rootId: "bye", patternId: "form8", ar: "اِبْتَاعَ", roles: "prprr", translit: "ibtāʿa", meaning: "he bought", change: { regular: "اِبْتَيَعَ", regularRoles: "prprr", rule: "ي between two vowels becomes ا" } },

  // م-د-د: doubled
  { id: "mdd-form1", rootId: "mdd", patternId: "form1", ar: "مَدَّ", roles: "rr", translit: "madda", meaning: "he extended", change: { regular: "مَدَدَ", regularRoles: "rrr", rule: "the two د merge into دّ" } },
  { id: "mdd-form2", rootId: "mdd", patternId: "form2", ar: "مَدَّدَ", roles: "rrr", translit: "maddada", meaning: "he stretched out, extended" },
  { id: "mdd-form4", rootId: "mdd", patternId: "form4", ar: "أَمَدَّ", roles: "prr", translit: "amadda", meaning: "he supplied, reinforced", change: { regular: "أَمْدَدَ", regularRoles: "prrr", rule: "the two د merge" } },
  { id: "mdd-mafool", rootId: "mdd", patternId: "mafool", ar: "مَمْدُود", roles: "prrpr", translit: "mamdūd", meaning: "extended" },
  { id: "mdd-form5", rootId: "mdd", patternId: "form5", ar: "تَمَدَّدَ", roles: "prrr", translit: "tamaddada", meaning: "it stretched out, expanded" },
  { id: "mdd-form8", rootId: "mdd", patternId: "form8", ar: "اِمْتَدَّ", roles: "prpr", translit: "imtadda", meaning: "it extended", change: { regular: "اِمْتَدَدَ", regularRoles: "prprr", rule: "the two د merge" } },
  { id: "mdd-form10", rootId: "mdd", patternId: "form10", ar: "اِسْتَمَدَّ", roles: "ppprr", translit: "istamadda", meaning: "he drew, derived (from)", change: { regular: "اِسْتَمْدَدَ", regularRoles: "ppprrr", rule: "the two د merge" } },

  // د-ع-و: last و
  { id: "dew-form1", rootId: "dew", patternId: "form1", ar: "دَعَا", roles: "rrr", translit: "daʿā", meaning: "he called, invited", change: { regular: "دَعَوَ", regularRoles: "rrr", rule: "a final و becomes ا" } },
  { id: "dew-faail", rootId: "dew", patternId: "faail", ar: "دَاعِي", roles: "rprr", translit: "dāʿī", meaning: "one who calls, preacher", change: { regular: "دَاعِو", regularRoles: "rprr", rule: "a final و after kasra becomes ي" } },
  { id: "dew-mafool", rootId: "dew", patternId: "mafool", ar: "مَدْعُوّ", roles: "prrr", translit: "madʿuww", meaning: "invited, guest", change: { regular: "مَدْعُوو", regularRoles: "prrpr", rule: "the two و merge into وّ" } },
  { id: "dew-fiaala", rootId: "dew", patternId: "fiaala", ar: "دِعَايَة", roles: "rrprp", translit: "diʿāya", meaning: "advertising, propaganda", change: { regular: "دِعَاوَة", regularRoles: "rrprp", rule: "و after ا becomes ي" } },
  { id: "dew-form8", rootId: "dew", patternId: "form8", ar: "اِدَّعَى", roles: "prrr", translit: "iddaʿā", meaning: "he claimed", change: { regular: "اِدْتَعَوَ", regularRoles: "prprr", rule: "ت becomes د and merges; the final و becomes ى" } },
  { id: "dew-form10", rootId: "dew", patternId: "form10", ar: "اِسْتَدْعَى", roles: "ppprrr", translit: "istadʿā", meaning: "he summoned", change: { regular: "اِسْتَدْعَوَ", regularRoles: "ppprrr", rule: "a final و becomes ى" } },
];

/** The form a word is assembled from: the regular form for words whose letters change, else the word itself. */
export const assembledForm = (w: Word) => (w.change ? { ar: w.change.regular, roles: w.change.regularRoles } : { ar: w.ar, roles: w.roles });

export const wordsOfRoot = (rootId: string) => words.filter((w) => w.rootId === rootId);

export const wordFor = (rootId: string, patternId: string) =>
  words.find((w) => w.rootId === rootId && w.patternId === patternId);
