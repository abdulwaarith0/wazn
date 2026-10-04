import { describe, expect, it } from "vitest";
import { patterns, patternById } from "../src/data/patterns";
import { wordFor } from "../src/data/words";
import { patternLabel, patternShape } from "../src/lib/labels";
import { collect, freshProgress, markIntroSeen, setMode } from "../src/lib/progress";

const cases = patterns.filter((p) => p.phase === 1).map((p) => [p.id, p] as const);

describe("labels", () => {
  it.each(cases)("%s has a label in both modes", (_, p) => {
    for (const mode of ["beginner", "grammar"] as const) {
      const label = patternLabel(p, mode);
      expect(label.name).not.toBe("");
      expect(label.hint).not.toBe("");
    }
  });

  it("uses plain names in Beginner mode and grammar terms in Grammar mode", () => {
    const faail = patternById("faail")!;
    expect(patternLabel(faail, "beginner")).toEqual({ name: "faa'il", nameIsArabic: false, hint: "the doer" });
    expect(patternLabel(faail, "grammar")).toEqual({ name: "اسم الفاعل", nameIsArabic: true, hint: "active participle" });
    expect(patternLabel(patternById("form3")!, "grammar").name).toBe("Form III");
  });

  it("shows a word's exact shape only in Grammar mode", () => {
    const place = patternById("place")!;
    const masjid = wordFor("sjd", "place");
    expect(patternShape(place, "beginner", masjid)).toBe("مَفْعَل");
    expect(patternShape(place, "grammar", masjid)).toBe("مَفْعِل");
    expect(patternShape(patternById("form1")!, "grammar", wordFor("elm", "form1"))).toBe("فَعِلَ");
  });
});

describe("switching mode", () => {
  it("never changes progress", () => {
    const p = markIntroSeen(collect(collect(freshProgress(), "ktb-faail"), "ktb-place"));
    const switched = setMode(setMode(p, "grammar"), "beginner");
    expect(setMode(p, "grammar")).toEqual({ ...p, mode: "grammar" });
    expect(switched).toEqual(p);
  });
});
