import { describe, expect, it } from "vitest";
import {
  collect,
  collectedCount,
  freshProgress,
  loadProgress,
  parseProgress,
  saveProgress,
  STORAGE_KEY,
  unlockedRootIds,
} from "../src/lib/progress";
import { createStore } from "../src/lib/storage";

const withWords = (...ids: string[]) => ids.reduce(collect, freshProgress());

describe("unlocking", () => {
  it("starts with only the first root open", () => {
    expect(unlockedRootIds(freshProgress())).toEqual(["ktb"]);
  });

  it("opens the next root on exactly the third word", () => {
    expect(unlockedRootIds(withWords("ktb-form1", "ktb-faail"))).toEqual(["ktb"]);
    expect(unlockedRootIds(withWords("ktb-form1", "ktb-faail", "ktb-place"))).toEqual(["ktb", "drs"]);
  });

  it("opens roots one at a time, in order", () => {
    const p = withWords("ktb-form1", "ktb-faail", "ktb-place", "drs-form1", "drs-form2", "drs-place");
    expect(unlockedRootIds(p)).toEqual(["ktb", "drs", "hkm"]);
  });
});

describe("collecting", () => {
  it("never collects the same word twice", () => {
    const p = withWords("ktb-faail", "ktb-faail");
    expect(p.collected).toEqual(["ktb-faail"]);
    expect(collectedCount(p, "ktb")).toBe(1);
  });

  it("ignores words that don't exist", () => {
    expect(withWords("ktb-form2").collected).toEqual([]);
  });
});

describe("saving and restoring", () => {
  it("restores exactly what was saved", () => {
    const store = createStore(undefined);
    const p = { ...withWords("ktb-form1", "ktb-faail", "ktb-place"), mode: "grammar" as const, introSeen: true };
    saveProgress(store, p);
    expect(loadProgress(store)).toEqual(p);
  });

  it.each([
    ["missing", null],
    ["not JSON", "{oops"],
    ["wrong version", JSON.stringify({ version: 2, collected: ["ktb-faail"] })],
    ["wrong shape", JSON.stringify({ version: 1, collected: "ktb-faail" })],
    ["not an object", "42"],
  ])("starts fresh when saved data is %s", (_, raw) => {
    expect(parseProgress(raw)).toEqual(freshProgress());
  });

  it("drops duplicate and unknown word ids from saved data", () => {
    const raw = JSON.stringify({ version: 1, collected: ["ktb-faail", "ktb-faail", "gone-word"], mode: "beginner" });
    expect(parseProgress(raw).collected).toEqual(["ktb-faail"]);
  });

  it("keeps working in memory when storage is blocked", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    } as unknown as Storage;
    const store = createStore(blocked);
    const p = withWords("ktb-faail");
    expect(() => saveProgress(store, p)).not.toThrow();
    expect(loadProgress(store)).toEqual(p);
    expect(store.get(STORAGE_KEY)).not.toBeNull();
  });
});
