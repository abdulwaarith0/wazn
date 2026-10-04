import { describe, expect, it } from "vitest";
import { collect, freshProgress } from "../src/lib/progress";
import { isRightRoot, makeQuestion, makeTray, quizAvailable, TRAY_SIZE } from "../src/lib/quiz";
import { rootById } from "../src/data/roots";

const withWords = (...ids: string[]) => ids.reduce(collect, freshProgress());

// A small seeded random number generator, so the tests are repeatable.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

describe("quiz", () => {
  it("is unavailable until 3 words are collected", () => {
    expect(quizAvailable(withWords("ktb-faail", "ktb-place"))).toBe(false);
    expect(makeQuestion(withWords("ktb-faail", "ktb-place"), "root")).toBeNull();
    expect(quizAvailable(withWords("ktb-faail", "ktb-place", "ktb-form1"))).toBe(true);
  });

  it("only asks about collected words", () => {
    const p = withWords("ktb-faail", "drs-place", "hkm-form4");
    const rng = seeded(7);
    for (let i = 0; i < 50; i++) {
      expect(p.collected).toContain(makeQuestion(p, i % 2 ? "build" : "root", rng)!.word.id);
    }
  });

  it("never repeats the previous word", () => {
    const p = withWords("ktb-faail", "drs-place", "hkm-form4");
    const rng = seeded(3);
    let prev = makeQuestion(p, "root", rng)!.word;
    for (let i = 0; i < 50; i++) {
      const next = makeQuestion(p, "root", rng, prev)!.word;
      expect(next.id).not.toBe(prev.id);
      prev = next;
    }
  });

  it("builds a tray of six different letters: the root's three plus three from other roots", () => {
    const ktb = rootById("ktb")!;
    const rng = seeded(11);
    for (let i = 0; i < 50; i++) {
      const tray = makeTray(ktb, rng);
      expect(tray).toHaveLength(TRAY_SIZE);
      expect(new Set(tray).size).toBe(TRAY_SIZE);
      expect(tray.filter((l) => ktb.letters.includes(l))).toHaveLength(3);
    }
  });

  it("checks the root letters in order", () => {
    const q = makeQuestion(withWords("ktb-faail", "ktb-place", "ktb-form1"), "root", seeded(1))!;
    expect(isRightRoot(q, ["ك", "ت", "ب"])).toBe(true);
    expect(isRightRoot(q, ["ب", "ت", "ك"])).toBe(false);
    expect(isRightRoot(q, ["ك", "ت"])).toBe(false);
  });
});
