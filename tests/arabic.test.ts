import { describe, expect, it } from "vitest";
import { changedLetters, joinFlags, letters, pieces, placeholder, rootLettersOf, withJoiners, ZWJ } from "../src/lib/arabic";

describe("letters", () => {
  it("keeps vowel marks with their letter", () => {
    expect(letters("كَاتِب")).toEqual(["كَ", "ا", "تِ", "ب"]);
  });
  it("keeps shadda and its vowel together", () => {
    expect(letters("كَتَّبَ")).toEqual(["كَ", "تَّ", "بَ"]);
  });
});

describe("joinFlags", () => {
  it("alif joins to the letter before it but not after", () => {
    expect(joinFlags(letters("كَاتِب"))).toEqual([
      { prev: false, next: true },
      { prev: true, next: false },
      { prev: false, next: true },
      { prev: true, next: false },
    ]);
  });
  it("taa marbuta ends a word joined", () => {
    expect(joinFlags(letters("كِتَابَة"))[4]).toEqual({ prev: true, next: false });
  });
  it("hamza joins on neither side", () => {
    expect(joinFlags(letters("بءب"))).toEqual([
      { prev: false, next: false },
      { prev: false, next: false },
      { prev: false, next: false },
    ]);
  });
  it("adds joiners only where the letter joins", () => {
    expect(withJoiners("تِ", { prev: false, next: true })).toBe("تِ" + ZWJ);
    expect(withJoiners("ا", { prev: true, next: false })).toBe(ZWJ + "ا");
  });
});

describe("placeholder", () => {
  it("derives the pattern from the word", () => {
    expect(placeholder("كَاتِب", "rprr")).toBe("فَاعِل");
    expect(placeholder("مَكْتُوب", "prrpr")).toBe("مَفْعُول");
    expect(placeholder("كِتَابَة", "rrprp")).toBe("فِعَالَة");
    expect(placeholder("كَتَبَ", "rrr")).toBe("فَعَلَ");
  });
  it("finds the root letters", () => {
    expect(rootLettersOf("مَكْتَب", "prrr")).toEqual(["ك", "ت", "ب"]);
  });
});

describe("changedLetters", () => {
  it("finds a weak letter that changes", () => {
    expect(changedLetters("قَوَلَ", "قَالَ")).toEqual({ regular: [false, true, false], real: [false, true, false] });
  });
  it("finds a merge: one letter disappears, the other gains a shadda", () => {
    expect(changedLetters("مَدَدَ", "مَدَّ")).toEqual({ regular: [false, true, true], real: [false, true] });
  });
  it("finds a pattern letter that changes", () => {
    expect(changedLetters("اِصْتَنَعَ", "اِصْطَنَعَ").real).toEqual([false, false, true, false, false]);
  });
  it("finds nothing when nothing changes", () => {
    expect(changedLetters("كَاتِب", "كَاتِب").real.some(Boolean)).toBe(false);
  });
});

describe("pieces", () => {
  it("marks root and pattern letters with their slots", () => {
    const ps = pieces("كَاتِب", "rprr");
    expect(ps.map((p) => p.rootIndex)).toEqual([0, -1, 1, 2]);
    expect(ps.map((p) => p.slot).join("")).toBe("فَاعِل");
  });
});
