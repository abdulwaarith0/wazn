import { describe, expect, it } from "vitest";
import { words } from "../src/data/words";
import { roots } from "../src/data/roots";
import { patterns } from "../src/data/patterns";
import { letters, placeholder, rootLettersOf } from "../src/lib/arabic";

const cases = words.map((w) => [w.id, w] as const);

describe("word data", () => {
  it.each(cases)("%s: roles spell its root", (_, w) => {
    const root = roots.find((r) => r.id === w.rootId);
    expect(root).toBeDefined();
    expect(letters(w.ar)).toHaveLength(w.roles.length);
    expect(w.roles.replace(/p/g, "")).toBe("rrr");
    expect(rootLettersOf(w.ar, w.roles)).toEqual(root?.letters);
  });

  it.each(cases)("%s: fits its pattern", (_, w) => {
    const pattern = patterns.find((p) => p.id === w.patternId);
    expect(pattern).toBeDefined();
    // Place nouns vary (مَفْعَل / مَفْعِل / مَفْعَلة), so they carry their exact shape.
    expect(placeholder(w.ar, w.roles)).toBe(w.shape ?? pattern?.template);
  });

  it("has no duplicate root + pattern pairs or ids", () => {
    expect(new Set(words.map((w) => `${w.rootId}/${w.patternId}`)).size).toBe(words.length);
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
  });
});
