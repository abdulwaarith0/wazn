---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn (learner may switch to fast later)

Commits (learner's standing rule, `spec.md > Decisions and Open Issues`): one file per commit, each with its own message, no AI attribution lines. Each slice's `Commit:` line is the theme its per-file commit messages follow.

## Slices

- [x] **1. Tap a pattern on ك-ت-ب and watch the word assemble**
  Becomes usable: A running Wazn page showing the ك-ت-ب Workshop: root letters at the top, the eight Phase 1 pattern tiles below. Tapping a real pattern flies the root letters into the ف ع ل slots and settles into the correctly joined, colour-coded word (root in ink, pattern in gold) with its English meaning. Greyed-out tiles shake and explain. Reduced motion fades the word in. No saving yet.
  Why now: This is the unique kernel and the riskiest piece (measuring letter positions, keeping Arabic joining, Amiri loading). Proving it first means every later slice wraps around something that already works, and its feel can shape the rest of the build. Bootstrapping lives here.
  PRD ref: `prd.md > The Core Journey` (steps 3-4), `prd.md > Root Workshop (the kernel)`, `prd.md > Greyed-Out Patterns`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > Components` (Workshop, PatternTile; WordAssembly), `spec.md > Data Model` (Content), `spec.md > File Structure`, `spec.md > Important Failure Modes`
  Build: Scaffold Vite + React + TypeScript 6.0 (pinned) + Tailwind 4 + Motion + Fontsource Amiri/Inter + Vitest + ESLint; manuscript theme tokens in `styles.css`. `data/roots.ts`, `data/patterns.ts` (Phase 1 patterns) and `data/words.ts` with ك-ت-ب's words from the reviewed word list. `lib/arabic.ts` (split into letters with marks, join flags, invisible joiners, placeholder derivation from `roles`). `Workshop`, `PatternTile`, `WordAssembly` (flyers on an arc, placeholder pushed out, landing squash and cross-fade to the joined shape, final real word, reduced-motion fade, taps ignored mid-animation, waits for `document.fonts.ready`), using `devpost/research/animation-spike.html` as the proven reference. `App` shows the Workshop directly for now.
  Verify (mechanical): `npm test` passes (`arabic.test.ts`: splitting, join flags, كَاتِب + "rprr" → فَاعِل; `words.test.ts`: every word's `r` letters spell its root, no duplicate pairs); `npm run lint` and `npm run build` succeed; dev server starts with no console errors; in the browser, tapping فاعِل ends with كَاتِب rendered as one joined word with "writer", and a greyed-out tile shows the note.
  Learner check: Run `npm run dev`, open http://localhost:5173, tap each pattern on ك-ت-ب and watch the letters fly in; tap a greyed-out one. Then open it on your iPhone/Safari (`npm run dev -- --host`, use the Network URL) and check the colour-coded word is still joined.
  Commit: `Scaffold Wazn and form the first word`

- [x] **2. Ten roots to unlock, words collected, progress saved**
  Becomes usable: The app opens on the Roots screen with all ten roots (only ك-ت-ب open). Forming a new word collects it with a gold burst; the third word from a root unlocks the next with an unlock moment; locked tiles explain how to unlock; each tile shows "collected / total". Close and reopen the browser: everything is still there.
  Why now: Collecting and unlocking turns the kernel into the game loop, and saved progress is where the data model can be wrong, so it gets tested while it's small.
  PRD ref: `prd.md > The Core Journey` (steps 2, 5-6, 10), `prd.md > Roots Screen`, `prd.md > Collecting, Unlocking and Seals`, `prd.md > Saved Progress`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components` (App; RootsScreen, RootTile, ModeSwitch; UnlockMoment, SealMoment, RewardBurst), `spec.md > Data Model` (Progress), `spec.md > Important Failure Modes`
  Build: All ten roots' Phase 1 ✓ words in `data/words.ts`. `lib/storage.ts` (safe localStorage, memory fallback), `lib/progress.ts` (load/save, derived unlocks and counts, ignore corrupted/old data), `hooks/useProgress.ts`. `RootsScreen` + `RootTile` (locked/unlocked + progress), screen switching in `App` (Roots → Workshop → back). Collect on first form only (re-tap replays, no double count). `RewardBurst` and `UnlockMoment`.
  Verify (mechanical): `npm test` passes, including `progress.test.ts` (unlock after exactly 3, no double collect, restore from saved JSON, corrupted storage starts fresh, blocked storage falls back to memory) and `words.test.ts` over all ten roots (each has at least 3 words); lint and build succeed; in the browser, collect 3 ك-ت-ب words, see د-ر-س unlock, reload, and confirm it is still unlocked.
  Learner check: Open the app, collect three words from ك-ت-ب and watch د-ر-س unlock; tap a still-locked root; then close the tab, reopen it and check your words and unlocks are still there.
  Commit: `Add roots, collecting, unlocking and saved progress`

- [x] **3. Your Collection and gold seals**
  Becomes usable: A Collection screen of word cards grouped by root (word colour-coded, meaning, source pattern), with an empty-state invitation. Collecting every real word of a root stamps a gold wax seal, shown on its tile and its Collection group; sealing all ten gives a completion moment.
  Why now: Needs the collection from slice 2; it's the reward that makes collecting worth doing.
  PRD ref: `prd.md > The Core Journey` (steps 7-8), `prd.md > Collection`, `prd.md > Collecting, Unlocking and Seals`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components` (CollectionScreen, WordCard; UnlockMoment, SealMoment, RewardBurst), `spec.md > Data Model` (Progress: derived seals), `spec.md > Look and Feel` (Ornament)
  Build: `CollectionScreen`, `WordCard`, `Seal.tsx`, `Ornament.tsx`, `SealMoment`, `CompletionMoment`; derived seals in `lib/progress.ts`; Collection button on Roots.
  Verify (mechanical): `npm test` passes with seal tests (seal only when every available word is collected; adding a word to a sealed root removes the seal; all-sealed detection); lint and build succeed; in the browser, collect all of ك-ت-ب's words and see the seal moment, the sealed tile and the sealed Collection group.
  Learner check: Collect every word of ك-ت-ب, watch the seal stamp, then open the Collection and browse your cards.
  Commit: `Add the Collection and gold seals`

- [x] **4. Beginner/Grammar switch and the logo intro (Phase 1 complete)**
  Becomes usable: A one-tap Beginner/Grammar switch on the Roots screen that changes only labels (e.g. "faa'il · the doer" ↔ "اسم الفاعل · فاعِل", "Form III", the exact place-noun shape). On first open, و-ز-ن flies into فَعْل to form وَزْن, a tap skips it, the logo replays it. Phase 1 is complete and submittable.
  Why now: Both reuse finished pieces (labels on tiles and cards; the intro is `WordAssembly` with a different word), so they come after the loop works. Ends Phase 1, the must-ship line.
  PRD ref: `prd.md > Intro`, `prd.md > Beginner / Grammar Switch`, `prd.md > The Core Journey` (step 1)
  Spec ref: `spec.md > Components` (Intro; Labels; RootsScreen, RootTile, ModeSwitch), `spec.md > Data Model` (Progress: mode, introSeen)
  Build: `lib/labels.ts`, `ModeSwitch`, labels wired into `PatternTile` and `WordCard`; `Intro` screen with وَزْن, skip on tap, `introSeen` saved, logo replay in the header.
  Verify (mechanical): `npm test` passes with label tests (both modes for every Phase 1 pattern; switching leaves progress unchanged); lint and build succeed; in the browser with cleared storage, the intro plays once, is skipped on reload, and replays from the logo.
  Learner check: Clear site data (or use a private window), open the app and watch the intro; flip the switch and compare the labels in the Workshop and Collection; tap the logo to replay.
  Commit: `Add the mode switch and logo intro`

- [ ] **5. Forms V-X in the Workshop**
  Becomes usable: Every root's Workshop also shows Forms V, VI, VII, VIII and X (Form IX hidden, with a Grammar-mode note that it's for colours and defects), with the reviewed words and greyed-out tiles for the rest, including the irregular Form VIII cells.
  Why now: Pure data on top of the finished kernel; low risk, and it starts Phase 2. Seals must re-derive correctly when roots gain words.
  PRD ref: `prd.md > Forms V-X (Phase 2)`
  Spec ref: `spec.md > Data Model` (Content; Progress: seals and new content), `spec.md > Components` (Labels)
  Build: Phase 2 patterns and ✓ words from the reviewed list (Form VIII irregular cells and ◐ words left out), labels for Forms V-X, Form IX note.
  Verify (mechanical): `npm test` passes (`words.test.ts` covers the new words, e.g. اِكْتَتَبَ's roles still spell ك-ت-ب; labels for Forms V-X); lint and build succeed; in the browser, اِسْتَخْرَجَ assembles and joins correctly.
  Learner check: Open خ-ر-ج and ف-ت-ح and try the new forms; check the words and meanings are what you approved.
  Commit: `Add verb Forms V-X`

- [ ] **6. The Quiz: find the root and build the word**
  Becomes usable: A Quiz reachable from Roots once 3 words are collected (and says so before then), mixing "Find the root" (tap the three root letters, in order, from a tray of 6) and "Build the word" (drag root letters into the placeholder slots), using only collected words. Right answers play the assembly; wrong ones show the correct answer.
  Why now: Needs collected words and the Phase 2 pattern set; drag is the new technique, isolated in one slice.
  PRD ref: `prd.md > Quiz (Phase 2)`, `prd.md > States and Boundaries` (Quiz with too few words), `prd.md > The Core Journey` (step 9)
  Spec ref: `spec.md > Components` (QuizScreen)
  Build: `QuizScreen` with question generation from `progress.collected`, letter tray with distractors, Motion `drag` with slot snapping, reuse of `WordAssembly` for answers.
  Verify (mechanical): `npm test` passes with quiz generation tests (only collected words, tray contains the right letters plus distinct distractors, unavailable below 3); lint and build succeed; in the browser, answer one of each question type right and one wrong.
  Learner check: With a few words collected, play ten quiz questions; try a wrong answer and a drag you drop in the wrong slot.
  Commit: `Add the quiz`

- [ ] **7. Weak and doubled roots, where letters change as they enter**
  Becomes usable: New roots containing و, ي or a doubled letter (and the irregular Form VIII cells such as اِصْطَنَعَ), whose letters visibly change or merge on the way into the pattern (e.g. ق-و-ل + فَعَلَ → قالَ).
  Why now: It extends the kernel animation and the data model, so it comes after everything it builds on is stable; Phase 3, with the app already submittable.
  PRD ref: `prd.md > Weak and Doubled Roots (Phase 3)`
  Spec ref: `spec.md > Data Model` (Content), `spec.md > Components` (WordAssembly)
  Build: Draft the weak/doubled root word list for learner review (nothing ships unchecked); extend the word data to mark changed and merged letters; teach `WordAssembly` the change/merge animation; restore the irregular Form VIII cells.
  Verify (mechanical): `npm test` passes with tests for the extended roles (every word still accounts for its root letters, changed or merged); lint and build succeed; in the browser, ق-و-ل into فَعَلَ ends as joined قالَ.
  Learner check: Review the draft word list first; then open the new roots and watch the letters change on the way in.
  Commit: `Add weak and doubled roots`

- [ ] **8. Audio for patterns and words**
  Becomes usable: Pattern tiles and formed words get a speaker icon where a recording exists; a word's recording auto-plays the first time it forms, then only on tap. Recordings credited in `public/audio/CREDITS.md`.
  Why now: Depends on outside sourcing and the learner's listening check, so it goes last and can't block anything else.
  PRD ref: `prd.md > Audio (Phase 3)`, `prd.md > Open Questions`
  Spec ref: `spec.md > Components` (AudioButton and useAudio), `spec.md > External Services and Dependencies`, `spec.md > Data Model` (Progress: heard)
  Build: Choose the source by ear (Lingua Libre/Commons first, AI voice trial on ~10 words, learner records failures); convert/trim clips into `public/audio/`; audio manifest; `useAudio`, `AudioButton`; `progress.heard`.
  Verify (mechanical): `npm test` passes (manifest lists only files that exist; auto-play only once per word); lint and build succeed; in the browser, a word plays once on first form and again on tap, and an item without a clip has no icon.
  Learner check: Form a new word with sound on and listen; replay it from the icon; check a pattern clip.
  Commit: `Add pattern and word audio`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1: the assembly animation's feel, timing and joining (including Safari/iPhone), while it can still shape everything built around it. Done on Android Chrome: animation "feels good"; learner asked for a logo (added). Safari/iPhone joining check not done yet (tested on Android); still open per `spec.md > Decisions and Open Issues`.
- [x] Phase 1 core journey explored — after slice 4: the full must-ship journey (intro → unlock → collect → seal → Collection, both modes), the submittable checkpoint before Phases 2-3. Learner tried it and reported "works well"; no changes requested.
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
- Added the logo in slice 1: wordmark (header, intro's final frame) and wax-seal app icons (`public/*.png`, `manifest.webmanifest`, source `devpost/research/seal-icon.html`) — the learner asked for a logo at the first checkpoint and chose samples 1 + 2 from `devpost/research/logo-samples.html`; recorded in `prd.md > Look and Feel`.
