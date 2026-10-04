import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { flushSync } from "react-dom";
import { animate, useReducedMotion } from "motion/react";
import type { Word } from "../data/types";
import { pieces, withJoiners, type Piece } from "../lib/arabic";
import ColouredWord from "./ColouredWord";

// The kernel animation (proven in devpost/research/animation-spike.html):
// 1. the pattern waits with faint gold ف ع ل placeholders, drawn as separate pieces with
//    invisible joiners so each piece keeps its joined shape;
// 2. each root letter flies from its tile into its slot along an arc (FLIP: measure both
//    ends, start the flyer at the slot, offset it back to the tile, animate the offset to 0);
// 3. the placeholder is knocked out, the letter lands with a squash, a ripple, and a
//    cross-fade from its standalone shape to its joined shape;
// 4. the pieces fade into the real, colour-coded word and the meaning rises in.
// Reduced motion skips 1-3 and fades the word in.

export type AssemblyHandle = {
  /** Form `word`, flying letters out of `rootTiles` (in root-letter order). Resolves when it has landed. */
  play: (word: Word, rootTiles: HTMLElement[]) => Promise<void>;
};

const STAGGER = 0.18; // seconds between root letters
const FLIGHT = 0.76; // seconds per flight
const SETTLE = 0.38; // seconds for the final fade

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));

export default function WordAssembly({ ref }: { ref?: Ref<AssemblyHandle> }) {
  const [shown, setShown] = useState<{ word: Word; run: number } | null>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);
  const meaningRef = useRef<HTMLParagraphElement>(null);
  const runs = useRef(0);
  const overlay = useRef(new Set<HTMLElement>());
  const reduced = useReducedMotion();

  // Flyers live on document.body, outside React; clear any left behind.
  useEffect(() => {
    const els = overlay.current;
    return () => els.forEach((el) => el.remove());
  }, []);

  useImperativeHandle(ref, () => {
    // A fixed-position layer over a slot's box, for flyers, ghosts and ripples.
    const layer = (rect: DOMRect, fontSize: number) => {
      const el = document.createElement("div");
      el.dir = "rtl";
      Object.assign(el.style, {
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        fontSize: `${fontSize}px`,
        lineHeight: `${rect.height}px`,
        fontFamily: "var(--font-arabic)",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: "20",
      });
      document.body.append(el);
      overlay.current.add(el);
      return el;
    };
    const drop = (el: HTMLElement) => {
      el.remove();
      overlay.current.delete(el);
    };

    async function fly(piece: Piece, slot: HTMLElement, tile: HTMLElement, rootLetter: string, fontSize: number) {
      const from = tile.getBoundingClientRect();
      const to = slot.getBoundingClientRect();
      const delay = piece.rootIndex * STAGGER;

      // The flyer sits on the slot; x/y offset it back to the tile at the start.
      const flyer = layer(to, fontSize);
      flyer.style.color = "var(--color-ink)";
      const standalone = document.createElement("span");
      const joined = document.createElement("span");
      standalone.textContent = rootLetter;
      joined.textContent = withJoiners(piece.letter, piece.joins);
      joined.style.opacity = "0";
      for (const s of [standalone, joined]) Object.assign(s.style, { position: "absolute", inset: "0" });
      flyer.append(standalone, joined);

      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const s0 = parseFloat(getComputedStyle(tile).fontSize) / fontSize;
      const tilt = piece.rootIndex % 2 ? 6 : -6;
      flyer.style.transform = `translateX(${dx}px) translateY(${dy}px) scale(${s0})`;
      // Hidden until its turn, so a waiting flyer doesn't double up on its tile.
      flyer.style.opacity = "0";
      animate(flyer, { opacity: 1 }, { duration: 0.05, delay });

      // The tile lifts as its letter leaves.
      animate(tile, { scale: [1, 1.12, 1], y: [0, -4, 0], opacity: [1, 1, 0.25] }, { duration: 0.26, delay, ease: "easeOut" });
      // Up along an arc, down into the slot, squash on landing, settle.
      animate(
        flyer,
        {
          x: [dx, dx * 0.45, 0, 0, 0],
          y: [dy, dy * 0.45 - 46, 0, -4, 0],
          scaleX: [s0, s0 * 1.35, 1.06, 0.98, 1],
          scaleY: [s0, s0 * 1.35, 0.9, 1.04, 1],
          rotate: [0, tilt, 0, 0, 0],
        },
        { duration: FLIGHT, delay, times: [0, 0.5, 0.86, 0.94, 1], ease: ["easeOut", "easeIn", "easeOut", "easeOut"] },
      );
      // Standalone shape → joined shape, timed to the landing.
      animate(standalone, { opacity: [1, 1, 0] }, { duration: FLIGHT, delay, times: [0, 0.72, 1] });
      animate(joined, { opacity: [0, 0, 1] }, { duration: FLIGHT, delay, times: [0, 0.72, 1] });

      // The placeholder is knocked down and out just before the letter arrives.
      await sleep(delay + FLIGHT * 0.58);
      const ghost = layer(to, fontSize);
      ghost.style.color = "var(--color-gold-soft)";
      ghost.textContent = slot.textContent;
      slot.style.visibility = "hidden";
      animate(ghost, { y: [0, 36], scale: [1, 0.7], rotate: [0, -10], opacity: [0.9, 0] }, { duration: 0.42, ease: "easeIn" }).then(() =>
        drop(ghost),
      );

      // A gold ink ripple where it lands.
      await sleep(FLIGHT * 0.28);
      const cx = to.left + to.width / 2;
      const cy = to.top + to.height * 0.62;
      const ripple = layer(new DOMRect(cx - 10, cy - 10, 20, 20), fontSize);
      Object.assign(ripple.style, { border: "2px solid var(--color-gold)", borderRadius: "50%", zIndex: "19" });
      animate(ripple, { scale: [0.4, 4], opacity: [0.9, 0] }, { duration: 0.52, ease: "easeOut" }).then(() => drop(ripple));

      // Landed: the slot now holds the real letter, in ink.
      await sleep(FLIGHT * 0.14);
      slot.textContent = withJoiners(piece.letter, piece.joins);
      slot.classList.replace("text-gold-soft", "text-ink");
      slot.style.visibility = "visible";
      drop(flyer);
    }

    async function settle(slots: HTMLElement, real: HTMLElement, meaning: HTMLElement, calm: boolean) {
      animate(slots, { opacity: 0 }, { duration: SETTLE });
      animate(
        real,
        calm ? { opacity: [0, 1] } : { opacity: [0, 1, 1], scale: [1, 1.04, 1] },
        { duration: SETTLE * 2, times: calm ? undefined : [0, 0.6, 1], ease: "easeOut" },
      );
      await sleep(SETTLE);
      await animate(meaning, { opacity: [0, 1], y: [6, 0] }, { duration: SETTLE, ease: "easeOut" });
    }

    return {
      async play(word, rootTiles) {
        // Render the new word's pieces synchronously so they can be measured right away.
        flushSync(() => setShown({ word, run: ++runs.current }));
        await document.fonts.ready;
        await nextFrame();
        const slots = slotsRef.current;
        const real = realRef.current;
        const meaning = meaningRef.current;
        if (!slots || !real || !meaning) return;

        if (reduced) return settle(slots, real, meaning, true);

        const fontSize = parseFloat(getComputedStyle(slots).fontSize);
        const slotEls = [...slots.children] as HTMLElement[];
        const flights = pieces(word.ar, word.roles).flatMap((piece, i) => {
          const slot = slotEls[i];
          const tile = rootTiles[piece.rootIndex];
          const letter = tile?.textContent;
          return piece.rootIndex >= 0 && slot && tile && letter ? [fly(piece, slot, tile, letter, fontSize)] : [];
        });
        await Promise.all(flights);
        rootTiles.forEach((t) => animate(t, { opacity: 1 }, { duration: 0.4 }));
        await settle(slots, real, meaning, false);
      },
    };
  }, [reduced]);

  const ps = shown ? pieces(shown.word.ar, shown.word.roles) : [];

  return (
    <div>
      <div lang="ar" dir="rtl" className="word-stage relative">
        {shown ? (
          <div key={shown.run}>
            <div ref={slotsRef} aria-hidden="true" className="absolute inset-0 text-center whitespace-nowrap">
              {ps.map((p, i) => (
                <span key={i} className={`inline-block ${p.rootIndex >= 0 ? "text-gold-soft" : "text-gold"}`}>
                  {withJoiners(p.slot, p.joins)}
                </span>
              ))}
            </div>
            <div ref={realRef} style={{ opacity: 0 }} className="absolute inset-0 text-center whitespace-nowrap">
              <ColouredWord word={shown.word} />
            </div>
          </div>
        ) : (
          <p className="absolute inset-0 flex items-center justify-center font-sans text-base leading-normal text-muted" dir="ltr">
            Tap a pattern below to pour the root into it.
          </p>
        )}
      </div>
      <p
        key={shown?.run ?? 0}
        ref={meaningRef}
        aria-live="polite"
        style={{ opacity: 0 }}
        className="min-h-6 text-center text-muted"
      >
        {shown && (
          <>
            <span className="italic">{shown.word.translit}</span> · <span className="text-ink">{shown.word.meaning}</span>
          </>
        )}
      </p>
    </div>
  );
}
