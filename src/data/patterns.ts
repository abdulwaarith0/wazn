import type { Pattern } from "./types";

// Phase 1: verb Forms I-IV and four noun patterns, in Workshop order.
export const patterns: Pattern[] = [
  { id: "form1", kind: "verb", form: 1, phase: 1, template: "فَعَلَ", beginner: { name: "fa'ala", hint: "the basic verb" }, grammar: { name: "Form I", term: "base verb" } },
  { id: "form2", kind: "verb", form: 2, phase: 1, template: "فَعَّلَ", beginner: { name: "fa''ala", hint: "doing it to someone" }, grammar: { name: "Form II", term: "intensive or causative" } },
  { id: "form3", kind: "verb", form: 3, phase: 1, template: "فَاعَلَ", beginner: { name: "faa'ala", hint: "doing it with someone" }, grammar: { name: "Form III", term: "reciprocal" } },
  { id: "form4", kind: "verb", form: 4, phase: 1, template: "أَفْعَلَ", beginner: { name: "af'ala", hint: "making it happen" }, grammar: { name: "Form IV", term: "causative" } },
  { id: "faail", kind: "noun", phase: 1, template: "فَاعِل", beginner: { name: "faa'il", hint: "the doer" }, grammar: { name: "اسم الفاعل", term: "active participle" } },
  { id: "mafool", kind: "noun", phase: 1, template: "مَفْعُول", beginner: { name: "maf'uul", hint: "the thing done to" }, grammar: { name: "اسم المفعول", term: "passive participle" } },
  { id: "place", kind: "noun", phase: 1, template: "مَفْعَل", beginner: { name: "maf'al", hint: "the place" }, grammar: { name: "اسم المكان", term: "noun of place" } },
  { id: "fiaala", kind: "noun", phase: 1, template: "فِعَالَة", beginner: { name: "fi'aala", hint: "craft or activity" }, grammar: { name: "مصدر", term: "verbal noun" } },
];

export const patternById = (id: string) => patterns.find((p) => p.id === id);
