import { describe, expect, it } from "vitest";
import { assembledForm, words } from "../src/data/words";
import { roots } from "../src/data/roots";
import { patterns } from "../src/data/patterns";
import { changedLetters, letters, placeholder, rootLettersOf } from "../src/lib/arabic";

const cases = words.map((w) => [w.id, w] as const);
const changing = words.filter((w) => w.change).map((w) => [w.id, w] as const);

describe("word data", () => {
  // Words with weak or doubled letters are checked through their regular form.
  it.each(cases)("%s: roles spell its root", (_, w) => {
    const root = roots.find((r) => r.id === w.rootId);
    const form = assembledForm(w);
    expect(root).toBeDefined();
    expect(letters(form.ar)).toHaveLength(form.roles.length);
    expect(form.roles.replace(/p/g, "")).toBe("rrr");
    expect(rootLettersOf(form.ar, form.roles)).toEqual(root?.letters);
  });

  it.each(cases)("%s: fits its pattern", (_, w) => {
    const pattern = patterns.find((p) => p.id === w.patternId);
    const form = assembledForm(w);
    expect(pattern).toBeDefined();
    // Some patterns vary (place nouns مَفْعَل / مَفْعِل / مَفْعَلة; Form I فَعَلَ / فَعِلَ), so those words carry their exact shape.
    expect(placeholder(form.ar, form.roles)).toBe(w.shape ?? pattern?.template);
  });

  it.each(changing)("%s: the real word has a role per letter, and something changes", (_, w) => {
    expect(w.roles).toMatch(/^[rp]+$/);
    expect(letters(w.ar)).toHaveLength(w.roles.length);
    expect(w.ar).not.toBe(w.change?.regular);
    expect(changedLetters(w.change!.regular, w.ar).real.some(Boolean) || letters(w.ar).length < letters(w.change!.regular).length).toBe(true);
  });

  it.each(roots.map((r) => [r.id] as const))("%s has at least 3 words, so it can unlock the next root", (id) => {
    expect(words.filter((w) => w.rootId === id).length).toBeGreaterThanOrEqual(3);
  });

  it("has no duplicate root + pattern pairs or ids", () => {
    expect(new Set(words.map((w) => `${w.rootId}/${w.patternId}`)).size).toBe(words.length);
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
  });
});
