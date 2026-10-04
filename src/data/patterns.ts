import type { Pattern } from "./types";

// Phase 1: verb Forms I-IV and four noun patterns. Phase 2: Forms V-X.
// Form IX (اِفْعَلَّ) is left out: it's for colours and physical defects, so none of the roots take it.
// Array order is Workshop order.
export const patterns: Pattern[] = [
  { id: "form1", kind: "verb", form: 1, phase: 1, template: "فَعَلَ", beginner: { name: "fa'ala", hint: "the basic verb" }, grammar: { name: "Form I", term: "base verb" } },
  { id: "form2", kind: "verb", form: 2, phase: 1, template: "فَعَّلَ", beginner: { name: "fa''ala", hint: "doing it to someone" }, grammar: { name: "Form II", term: "intensive or causative" } },
  { id: "form3", kind: "verb", form: 3, phase: 1, template: "فَاعَلَ", beginner: { name: "faa'ala", hint: "doing it with someone" }, grammar: { name: "Form III", term: "reciprocal" } },
  { id: "form4", kind: "verb", form: 4, phase: 1, template: "أَفْعَلَ", beginner: { name: "af'ala", hint: "making it happen" }, grammar: { name: "Form IV", term: "causative" } },
  { id: "form5", kind: "verb", form: 5, phase: 2, template: "تَفَعَّلَ", beginner: { name: "tafa''ala", hint: "doing it to yourself" }, grammar: { name: "Form V", term: "reflexive of Form II" } },
  { id: "form6", kind: "verb", form: 6, phase: 2, template: "تَفَاعَلَ", beginner: { name: "tafaa'ala", hint: "doing it together" }, grammar: { name: "Form VI", term: "reciprocal of Form III" } },
  { id: "form7", kind: "verb", form: 7, phase: 2, template: "اِنْفَعَلَ", beginner: { name: "infa'ala", hint: "it happens by itself" }, grammar: { name: "Form VII", term: "passive or reflexive" } },
  { id: "form8", kind: "verb", form: 8, phase: 2, template: "اِفْتَعَلَ", beginner: { name: "ifta'ala", hint: "doing it for yourself" }, grammar: { name: "Form VIII", term: "reflexive" } },
  { id: "form10", kind: "verb", form: 10, phase: 2, template: "اِسْتَفْعَلَ", beginner: { name: "istaf'ala", hint: "asking for it" }, grammar: { name: "Form X", term: "seeking or considering" } },
  { id: "faail", kind: "noun", phase: 1, template: "فَاعِل", beginner: { name: "faa'il", hint: "the doer" }, grammar: { name: "اسم الفاعل", term: "active participle" } },
  { id: "mafool", kind: "noun", phase: 1, template: "مَفْعُول", beginner: { name: "maf'uul", hint: "the thing done to" }, grammar: { name: "اسم المفعول", term: "passive participle" } },
  { id: "place", kind: "noun", phase: 1, template: "مَفْعَل", beginner: { name: "maf'al", hint: "the place" }, grammar: { name: "اسم المكان", term: "noun of place" } },
  { id: "fiaala", kind: "noun", phase: 1, template: "فِعَالَة", beginner: { name: "fi'aala", hint: "craft or activity" }, grammar: { name: "مصدر", term: "verbal noun" } },
];

export const patternById = (id: string) => patterns.find((p) => p.id === id);
