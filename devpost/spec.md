---
doc: spec
status: approved
---

# Wazn: Technical Spec

## How This Works, In Plain Language
Wazn is a **static website**: a bundle of HTML, JavaScript, fonts and (later) audio files that runs entirely in the visitor's browser. There is no server and no database.

- **The word list ships inside the app.** The roots, patterns and words you checked live in a few TypeScript data files in the code. When the app loads, it already knows every word.
- **Progress is saved in the browser** using `localStorage`, a small note the browser keeps for one website. Every time you collect a word, the app updates that note; when you come back, it reads it and restores your roots, collection, seals and mode.
- **The screens are React components.** React redraws the screen whenever the data behind it changes (for example, a new word collected means a new card in the Collection).
- **The animation is the heart of it.** When you tap a pattern, the app works out, from the word itself, which letters came from the root and which came from the pattern. It draws the pattern with ف ع ل placeholders, then flies each root letter from its tile into its slot using the **Motion** animation library. The invisible-joiner trick from the test page keeps the letters joined. When the last letter lands, the real word replaces the moving pieces, colour-coded root in ink, pattern in gold.
- **Why this shape:** nothing in the PRD needs a server. A static site is the fastest to build, can't go down, costs nothing to host, and works offline once loaded. All the effort goes into the animation and the feel, which is what the judges score.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **First open.** The browser downloads the app from Vercel. `App` reads progress from `localStorage`: nothing there, so it starts fresh (Beginner mode, only ك-ت-ب unlocked) and shows the `Intro`.
2. **Intro.** `Intro` hands the word وَزْن (root و-ز-ن) to the `WordAssembly` animation; the letters fly into فَعْل. When it ends (or on a tap), progress records `introSeen: true` and `App` switches to the `RootsScreen`.
3. **Roots.** `RootsScreen` asks the progress logic which roots are unlocked and sealed, and how many words each has collected, then draws a `RootTile` for each.
4. **Workshop.** Tapping ك-ت-ب switches `App` to the `Workshop` for that root. It looks up every pattern in the current phase and, for each, whether a word exists for this root. Missing ones are drawn greyed out.
5. **Word forms.** Tapping فاعِل sends the word كَاتِب to `WordAssembly`. The Arabic helpers split it into letters, mark which are root letters (ink) and which are pattern letters (gold), and build the placeholder فَاعِل. Motion flies each root letter in; on landing, the real word appears with its meaning.
6. **Collect.** The word's id is added to `progress.collected` and saved to `localStorage` immediately. The progress logic recalculates: if this was the third word from ك-ت-ب, the next root (د-ر-س) unlocks and `UnlockMoment` plays; if it was the last real word of the root, `SealMoment` plays.
7. **Collection.** `CollectionScreen` groups the collected word ids by root and draws a `WordCard` for each.
8. **Return.** Next visit, `App` reads `localStorage` and everything is restored. The intro is skipped because `introSeen` is true.
9. **(Phase 2) Quiz.** `QuizScreen` picks questions from `progress.collected` only.

```
browser ── loads ──> static app (Vercel)
                       │
   data/*.ts (roots, patterns, words) ──> lib/arabic.ts (split, roles, joiners)
                       │                         │
                 lib/progress.ts <──> localStorage ("wazn:progress:v1")
                       │
          App ── screens ── WordAssembly (Motion)
```

## Stack
Versions checked with `npm view` on 2026-10-04.

| Tool | Version | Why | Docs |
|---|---|---|---|
| **Vite** | 8.3.x | Dev server and build tool for a plain static React app. Learner's choice (recommended): same React/TS/Tailwind they use daily, no server layer. Needs Node 20.19+ or 22.12+ (machine has 22.23). | https://vite.dev/guide/ |
| **React** + React DOM | 19.3.x | Screens as components. | https://react.dev/ |
| **TypeScript** | **6.0.x (pinned)** | Types for the word data and progress. **Pinned to 6.0** because typescript-eslint 8.71 only supports TypeScript below 6.1; TypeScript 7 would break linting. | https://www.typescriptlang.org/docs/ |
| **Tailwind CSS** + `@tailwindcss/vite` | 4.3.x | Styling with the manuscript colours as theme tokens. | https://tailwindcss.com/docs |
| **Motion** | 14.x | Animation. Learner's choice (recommended) for their animation learning goal: springs, sequences, layout animations, drag (for the Phase 2 quiz) and reduced-motion support. Supports React 19. | https://motion.dev/docs/react |
| **@fontsource/amiri** | 5.3.x | Amiri served from the app itself (no Google Fonts request), so it works offline and the letters can be measured reliably. | https://fontsource.org/fonts/amiri |
| **@fontsource-variable/inter** | latest | English interface text. | https://fontsource.org/fonts/inter |
| **Vitest** | 5.0.x | Tests for the Arabic helpers, the word data and the unlock/seal rules. Needs Node 22.12+ and `@types/node` 22. | https://vitest.dev/guide/ |
| **ESLint** + typescript-eslint | 10.x / 8.71.x | Linting. | https://typescript-eslint.io/getting-started |

**To verify early in the build:** `npm create vite@latest` (create-vite 9.2) may scaffold TypeScript 7; downgrade to 6.0 if so. Vitest 5 hit a dependency conflict in Daaru-s-Seebawayh in September; if `npm install` fails, pin `@types/node@22`.

## Where It Runs and How Someone Tries It
- **Locally:** `npm install`, then `npm run dev`, then open http://localhost:5173. That's what the demo video is recorded from (or from the live link).
- **Tests:** `npm test`. **Production build:** `npm run build` writes the static site to `dist/`.
- **No API keys, no accounts, no environment variables.**
- **Live link (learner's choice):** deployed to **Vercel** as a static Vite site. In `6-ship`: push the public GitHub repo, import it in Vercel (framework preset "Vite", build `npm run build`, output `dist`), and every push to `main` redeploys. Free.
- **Submission:** a 1-3 minute demo video plus the public GitHub repo (required); the Vercel link is an extra.

## Look and Feel
Carried from `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

- **Palette** (Tailwind theme tokens): paper `#f6efe1` (page), card `#fbf7ee`, ink `#2a2118` (text and root letters), muted `#6d5f4e`, line `#dccfb6`, gold `#a8792a` (pattern letters, rewards, seals), gold-soft `#d9b877` (placeholders). Light theme only: the cream manuscript is the identity. *(Agent derivation; the PRD didn't ask for dark mode.)*
- **Type:** Amiri for all Arabic, large (around 84px for the forming word, 40-48px for root tiles). Inter for English interface text. *(Inter is an agent choice; easy to swap.)*
- **Energy:** calm and spacious layout; motion is where the playfulness lives. Springs with a little overshoot for landings and unlocks, short gentle fades elsewhere.
- **Ornament:** thin gold rules and a simple geometric border around the Workshop stage; gold wax-seal badge for sealed roots. Drawn as inline SVG, no image files.
- **Copy tone:** warm, short, encouraging; no grammar jargon in Beginner mode.
- **Reduced motion:** with the device setting on, every animation becomes a short fade.

## Components

### App
Holds which screen is showing (`intro`, `roots`, `workshop`, `collection`, `quiz`) and the selected root, loads progress on start, and passes it down. No router: a small app with four screens doesn't need one. The browser Back button is not wired up in Phase 1 *(simplification)*.
PRD ref: `prd.md > Screens and Layout`.

### Intro
Plays `WordAssembly` with وَزْن on first open; a tap anywhere skips; sets `introSeen`. The logo in the header replays it.
PRD ref: `prd.md > Intro`.

### RootsScreen, RootTile, ModeSwitch
Grid of `RootTile`s showing the root's letters and one of three looks: locked (dimmed, tapping explains "collect 3 words from د-ر-س to unlock"), unlocked (progress such as "4 / 8"), sealed (gold seal). `ModeSwitch` toggles Beginner/Grammar. Buttons into the Collection and (Phase 2) the Quiz.
PRD ref: `prd.md > Roots Screen`, `prd.md > Beginner / Grammar Switch`.

### Workshop, PatternTile
Shows the root letters at the top, the `WordAssembly` stage in the middle with the meaning underneath, and a `PatternTile` per pattern in the current phase. A tile is greyed out when no word exists for this root; tapping it shakes it (Motion keyframes) and shows "ك-ت-ب doesn't use this pattern in common Arabic." Tapping a real one plays `WordAssembly`, then collects the word if it's new. Taps are ignored while a word is forming.
PRD ref: `prd.md > Root Workshop (the kernel)`, `prd.md > Greyed-Out Patterns`.

### WordAssembly (the kernel animation)
Input: a word, its root, and whether to animate. Steps, as proven in the test page:
1. Draw the placeholder (from `lib/arabic.ts`) as separate letter pieces with invisible joiners: pattern letters gold, ف ع ل placeholders gold-soft.
2. For each root letter, in order with a stagger: measure the root tile and the target slot, create a "flyer" in an overlay, and animate it along an arc with Motion's `animate()`. At about 60% of the flight, the placeholder is pushed down and out; on landing, a small squash and a gold ink ripple, and the flyer cross-fades from the standalone letter shape to its joined shape.
3. When all have landed, fade the pieces out and the real word in as normal text, colour-coded, with a slight settle; the meaning rises in.
4. Reduced motion: skip steps 1-2 and fade the real word in.

Waits for `document.fonts.ready` before measuring. Returns a promise so callers know when it's done (to collect, unlock, or end the intro).
PRD ref: `prd.md > Root Workshop (the kernel)`, `prd.md > Intro`.

### UnlockMoment, SealMoment, RewardBurst
Small overlays: a gold burst when a word is collected, a "د-ر-س unlocked" card with the new root's tile sliding in, and a wax-seal stamp when a root is sealed. A completion moment when every root is sealed.
PRD ref: `prd.md > Collecting, Unlocking and Seals`, `prd.md > States and Boundaries`.

### CollectionScreen, WordCard
Collected words grouped by root (in unlock order), sealed roots with their seal in the group header. Each `WordCard`: the word (colour-coded), English meaning and source pattern (label depends on mode). Empty state: "Open a root and form your first word."
PRD ref: `prd.md > Collection`.

### Labels (Beginner/Grammar)
One helper that returns a pattern's label for the current mode, e.g. Beginner "faa'il · the doer", Grammar "اسم الفاعل · فاعِل"; verb forms "Form III" in Grammar mode; the place-noun column shows the word's exact shape (مَفْعِل) in Grammar mode. Changes labels only.
PRD ref: `prd.md > Beginner / Grammar Switch`.

### QuizScreen (Phase 2)
Available once 3 words are collected. Alternates **Find the root** (a collected word; tap its three root letters from a tray of 6, in order) and **Build the word** (root + pattern shown; drag the root letters into the placeholder slots with Motion's `drag`). Correct: `WordAssembly` plays. Wrong: the correct answer animates in.
PRD ref: `prd.md > Quiz (Phase 2)`.

### AudioButton and useAudio (Phase 3)
Plays `/audio/words/<file>.mp3` or `/audio/patterns/<file>.mp3` with a plain `HTMLAudioElement`. Auto-plays only the first time a word forms (tracked in `progress.heard`); no icon when the file isn't in the manifest.
PRD ref: `prd.md > Audio (Phase 3)`.

## Data Model

### Content (shipped in the code, read-only)
```ts
type Root = { id: string; letters: [string, string, string]; translit: string; gist: string };
// order of the array = unlock order; id like "ktb"

type Pattern = {
  id: string;            // "form1".."form10", "faail", "mafool", "place", "fiaala"
  kind: "verb" | "noun";
  form?: number;         // 1..10 for verbs
  phase: 1 | 2;
  template: string;      // vowelled pattern with ف ع ل, e.g. "فَاعِل" (labels + audio)
  beginner: { name: string; hint: string };   // "faa'il", "the doer"
  grammar: { name: string };                  // "اسم الفاعل"
};

type Word = {
  id: string;            // "ktb-faail"
  rootId: string;
  patternId: string;
  ar: string;            // fully vowelled: "كَاتِب"
  roles: string;         // one char per letter: r = root, p = pattern, e.g. "rprr"
  translit: string;      // "kātib"
  meaning: string;       // "writer"
  shape?: string;        // exact pattern shape when it varies, e.g. "مَفْعِل"
  audio?: string;        // Phase 3 file name
};
```
- A missing (rootId, patternId) pair means "no common word": the tile is greyed out. Rare (◐) words from the word list are simply left out.
- Content comes from `devpost/word-list-draft.md` (learner-reviewed). Phase 2 words are added to the same files with Phase 2 patterns.
- **The placeholder is derived, not stored:** replace each `r` letter, in order, with ف, ع, ل and keep its vowel marks. So كَاتِب + "rprr" gives فَاعِل.
- **A test guards every word:** exactly three `r` letters, and they spell the root letters in order.

### Progress (in the browser, read-write)
```ts
type Progress = {
  version: 1;
  collected: string[];   // word ids, in the order collected
  mode: "beginner" | "grammar";
  introSeen: boolean;
  heard: string[];       // Phase 3: word ids whose audio has auto-played
};
```
- **Where it lives:** `localStorage["wazn:progress:v1"]` as JSON.
- **How it updates:** every change (collect, mode switch, intro seen) writes immediately.
- **When they leave and come back:** read on start; restored exactly.
- **Derived, never stored:** unlocked roots (the first root, plus each next root once the previous one has 3 collected words), sealed roots (every available word of the root collected), and counts. Because they're derived, the rules can't drift out of sync with the collection.
- **Seals and new content:** a seal counts the words in the current build. If Phase 2 adds words to a sealed root, the seal goes until the new words are collected *(agent decision: keeps the seal meaning "complete")*.

## File Structure
```
wazn/
├── index.html                  # page shell; lang="en", Arabic set per element with dir="rtl"
├── package.json                # scripts: dev, build, preview, test, lint
├── vite.config.ts              # React + Tailwind plugins
├── tsconfig.json
├── eslint.config.js
├── public/
│   └── audio/                  # Phase 3: patterns/*.mp3, words/*.mp3, CREDITS.md
├── src/
│   ├── main.tsx                # mounts <App/>, imports fonts and styles
│   ├── App.tsx                 # screen switching + progress provider
│   ├── styles.css              # Tailwind import + theme tokens (palette, fonts)
│   ├── data/
│   │   ├── roots.ts            # the ten roots in unlock order
│   │   ├── patterns.ts         # pattern list with labels and phase
│   │   └── words.ts            # every real word from the word list
│   ├── lib/
│   │   ├── arabic.ts           # split into letters, join flags, joiners, placeholder
│   │   ├── progress.ts         # load/save, unlock + seal rules, counts
│   │   ├── labels.ts           # Beginner/Grammar labels
│   │   └── storage.ts          # safe localStorage wrapper (falls back to memory)
│   ├── components/
│   │   ├── WordAssembly.tsx    # the kernel animation
│   │   ├── RootTile.tsx
│   │   ├── PatternTile.tsx
│   │   ├── WordCard.tsx
│   │   ├── ModeSwitch.tsx
│   │   ├── Seal.tsx            # SVG wax seal
│   │   ├── Ornament.tsx        # SVG border and rules
│   │   └── moments/            # RewardBurst, UnlockMoment, SealMoment, CompletionMoment
│   ├── screens/
│   │   ├── Intro.tsx
│   │   ├── RootsScreen.tsx
│   │   ├── Workshop.tsx
│   │   ├── CollectionScreen.tsx
│   │   └── QuizScreen.tsx      # Phase 2
│   └── hooks/
│       ├── useProgress.ts      # React access to progress + actions (collect, setMode)
│       └── useAudio.ts         # Phase 3
├── tests/
│   ├── arabic.test.ts          # splitting, join flags, placeholder derivation
│   ├── words.test.ts           # every word's roles spell its root; no duplicate pairs
│   └── progress.test.ts        # unlock after 3, seals, restore, corrupted storage
├── devpost/                    # learning workspace (planning docs)
└── README.md
```

## External Services and Dependencies
- **Vercel** (hosting, optional live link): free Hobby plan, connects to the GitHub repo, no keys in the app. Docs: https://vercel.com/docs/frameworks/frontend/vite
- **GitHub** (required public repo).
- **No runtime APIs.** Fonts are bundled.
- **Phase 3 audio sources (used once, offline, to make files; not called by the app):** Lingua Libre / Wikimedia Commons recordings (CC BY-SA: credit each speaker in `public/audio/CREDITS.md`), and AI voices to trial (Microsoft Azure Speech, Google Cloud Text-to-Speech, ElevenLabs). Their accounts, free-tier limits and exact output settings are **unverified here** and get checked when Phase 3 starts.

## Important Failure Modes
- **The font hasn't loaded when the animation measures letter positions** → letters fly to the wrong spots. `WordAssembly` waits for `document.fonts.ready`; Amiri is bundled, so it loads fast.
- **`localStorage` is blocked or full** (private browsing, some school devices) → the app keeps progress in memory for that visit and still works; it just won't remember next time.
- **Saved progress is corrupted or from an older version** → ignore it and start fresh rather than crash.
- **Rapid tapping during an animation** → taps on patterns are ignored until the current word has landed.
- **Joining differs in Safari** (colour-coded letters inside a joined word were checked in Chrome only) → test on Safari/iPhone early in the build. Fallback: show the final word in one colour on Safari.

## What Was Simplified and Why
- **Static site with browser storage** instead of a backend with accounts: the PRD has one user per device. Accounts would add login, a database and hosting; they're on the post-hackathon list.
- **No router** (screen state in `App`) instead of URL routes: four screens. The fuller version would add React Router so Back and links work.
- **Hand-checked content in code files** instead of a content database or generator: about 100 words, verified by the learner.
- **Audio files made once, offline** instead of speech generated live: no running cost, no keys in the app, every clip checked by ear.

## Decisions and Open Issues

### Learner decisions
- **Vite + React + TypeScript + Tailwind** (recommended, accepted): familiar tools without an unused server layer.
- **Motion** for animation (recommended, accepted): serves the learning goal of getting better at animation, and the skill transfers to their other React apps.
- **Deploy to Vercel** for a live link, in addition to the required video and repo.
- Carried from the PRD: Amiri; root/pattern colour-coding; the improved landing animation; intro; phases; audio sourcing.

### Implementation details derived by the agent
- TypeScript pinned to 6.0 (lint compatibility); fonts bundled via Fontsource; Inter for English text; light theme only; progress key and shape; seals follow the current word set; taps ignored mid-animation; no Back-button support in Phase 1.

### Commits
The learner's standing rule: **one file per commit, each with its own message, and no AI attribution lines** (no Co-Authored-By, no "Generated with"). `5-build` follows this when it commits each step.

### The useful unknown
The learner's learning goal is animation, and the genuine question is **how a letter can fly from one place on the page to a completely different one** (from its root tile into a slot inside a word). Clarified so far: the test pages showed the FLIP technique (measure where it starts and ends, then animate the difference) and the joining trick. **To investigate during the build:** whether Motion's shared-layout feature (`layoutId`, which moves "the same" element between two places automatically) can replace the hand-measured flyers, or whether the flyers stay. Evidence: try `layoutId` on one letter in `WordAssembly` and compare smoothness and joining against the measured version.

### Still open
- **Safari joining check** (see Important Failure Modes): early in the build.
- **Phase 3 audio source**: decided by ear when Phase 3 starts (`prd.md > Open Questions`).
