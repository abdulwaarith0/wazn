import { describe, expect, it } from "vitest";
import { patternAudio, wordAudio } from "../src/lib/audio";
import { words } from "../src/data/words";
import { patterns } from "../src/data/patterns";
import { freshProgress, markHeard, shouldAutoPlay } from "../src/lib/progress";

describe("audio files", () => {
  // A misnamed file would never play; catch it here.
  it("are named after a real word", () => {
    const ids = new Set(words.map((w) => w.id));
    expect([...wordAudio.keys()].filter((id) => !ids.has(id))).toEqual([]);
  });

  it("are named after a real pattern", () => {
    const ids = new Set(patterns.map((p) => p.id));
    expect([...patternAudio.keys()].filter((id) => !ids.has(id))).toEqual([]);
  });
});

describe("auto-play", () => {
  it("plays a word by itself only the first time", () => {
    const p = freshProgress();
    expect(shouldAutoPlay(p.heard, "ktb-faail", true)).toBe(true);
    expect(shouldAutoPlay(markHeard(p, "ktb-faail").heard, "ktb-faail", true)).toBe(false);
  });

  it("never plays a word without a recording", () => {
    expect(shouldAutoPlay(freshProgress().heard, "ktb-faail", false)).toBe(false);
  });

  it("records each word once", () => {
    const p = markHeard(markHeard(freshProgress(), "ktb-faail"), "ktb-faail");
    expect(p.heard).toEqual(["ktb-faail"]);
  });
});
