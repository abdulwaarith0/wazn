---
doc: prd
status: approved
---

# Wazn: Product Requirements

A calm, manuscript-styled word game for non-native Arabic learners, down to teenagers: tap a root, pick a pattern, and watch the root's letters fly into the pattern to become a real word, then collect it.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. The first time someone opens Wazn, a 3-second **intro** plays: the root letters و-ز-ن fly into the pattern فَعْل and form the app's name, وَزْن. A tap skips it. It then settles onto the **Roots** screen. No welcome text and no question; it starts in Beginner mode.
2. The first root (ك-ت-ب) is unlocked; the other roots are visible but locked.
3. They tap ك-ت-ب and the **Root Workshop** opens: the three root letters at the top and the pattern tiles below. Patterns with no real word for this root are greyed out.
4. They tap a pattern (e.g. فاعِل). The root letters fly into the pattern's slots and the finished word كاتِب forms, keeping its Arabic letter-joining, with its English meaning ("writer").
5. The word is added to their collection with a small reward moment.
6. After 3 words from a root, the next root unlocks, with a visible unlock moment.
7. Once every real word of a root is collected, that root earns a **gold seal**.
8. They open the **Collection** at any time to browse their words, grouped by root.
9. (Phase 2) Once they have words, they can play the **Quiz** using only words they have collected.
10. They close Wazn and come back later; everything (unlocked roots, collection, seals, mode) is exactly as they left it.

## Screens and Layout
1. **Roots**: the home screen. Root tiles (unlocked, locked, sealed), the Beginner/Grammar switch visible, and ways into the Collection and (Phase 2) the Quiz.
2. **Root Workshop**: one root. Root letters at the top, a central stage where the word forms, the meaning beneath it, and the pattern tiles below.
3. **Collection**: word cards grouped by root.
4. **Quiz** (Phase 2): one question at a time.

Movement: Roots → Workshop → back to Roots; Collection and Quiz are reachable from Roots.

## Look and Feel
Source: `scope.md > Inspiration & Identity`.
- **Looks like a manuscript:** calm and scholarly. Cream paper background, dark ink for text, gold for highlights, rewards and seals. Gentle ornament.
- **Logo (learner's choice during the build):** the wordmark وَزْن over a thin gold rule in the header and as the intro's final frame; the gold wax seal with وَزْن as the app icon (browser tab, home screen, video end card). Reward seals carry the root's letters so they stay distinct from the logo.
- **Arabic font: Amiri** (classic book-style Naskh, chosen by the learner after comparing four fonts).
- **Colour-coding:** in a formed word, letters from the root are dark ink and letters added by the pattern are gold, so the word itself shows what the root gave and what the pattern added.
- **Plays like a game:** clean and modern. Letters snap into place, satisfying feedback, small rewards.
- Easy enough for a teenager with no instructions.
- No external reference yet; the learner will flag one if they find something Wazn should echo.
- Avoid: generic "AI app" styling.

## Features and Behavior

### Intro
- [ ] On the first open only, و-ز-ن animates into فَعْل to form وَزْن (about 3 seconds), then the Roots screen appears.
- [ ] A tap anywhere skips it.
- [ ] Tapping the Wazn logo replays it.

### Roots Screen
- [ ] On first open, the app shows the Roots screen directly, in Beginner mode, with only ك-ت-ب unlocked.
- [ ] Locked roots are visible but cannot be opened; tapping one says how to unlock it (collect 3 words from the current root).
- [ ] Each unlocked root tile shows its progress (words collected out of its real words); sealed roots show a gold seal.

### Root Workshop (the kernel)
- [ ] Shows the root's three letters and every pattern in the current phase's set (Phase 1: Forms I-IV + فاعِل, مَفْعُول, مَفْعَل, فِعالة).
- [ ] Patterns with no real word for this root are greyed out.
- [ ] Tapping a real pattern animates the root letters into the pattern's slots and shows the finished word with full vowel marks and its English meaning.
- [ ] The finished word is correctly joined Arabic (not separated letters) once the animation ends.
- [ ] Before the animation, the pattern shows its ف ع ل placeholders in faint gold; each placeholder is pushed out as its root letter arrives.
- [ ] Each letter changes smoothly into its joined shape as it lands (no visible jump).
- [ ] The finished word is colour-coded: root letters in ink, pattern letters in gold.
- [ ] With the device's reduced-motion setting on, the word fades in calmly instead of flying.
- [ ] Re-tapping a collected pattern replays the animation; it is not collected twice.

### Greyed-Out Patterns
- [ ] Tapping a greyed-out pattern gives a gentle shake and a short note, e.g. "ك-ت-ب doesn't use this pattern in common Arabic." Nothing is collected.

### Collecting, Unlocking and Seals
- [ ] A newly formed word is added to the collection with a small reward moment.
- [ ] The third word collected from a root unlocks the next root, with a visible unlock moment.
- [ ] Collecting every real word of a root gives it a gold seal (on its tile and in the Collection).

### Collection
- [ ] Word cards grouped by root; each card shows the word, its English meaning and the pattern it came from.
- [ ] Sealed roots show their gold seal at the top of their group.

### Beginner / Grammar Switch
- [ ] Visible on the Roots screen and changeable in one tap.
- [ ] Beginner mode uses plain labels (e.g. "faa'il · the doer"); Grammar mode uses the Arabic terms and form numbers (e.g. "اسم الفاعل · فاعِل", "Form III").
- [ ] Switching changes labels and explanations only, never progress.

### Saved Progress
- [ ] Unlocked roots, collected words, seals and the chosen mode survive closing and reopening the app on the same device.

### Quiz (Phase 2)
- [ ] Two question types, mixed: **Find the root** (a collected word is shown; the player picks its three root letters from a tray) and **Build the word** (a root and pattern are shown; the player drags the letters into the slots).
- [ ] Questions use only words the player has collected.
- [ ] A correct answer plays the word-forming animation; a wrong answer shows the correct answer.

### Forms V-X (Phase 2)
- [ ] The Workshop pattern set grows to include verb Forms V-X, with the same greyed-out behaviour for patterns a root doesn't use.

### Audio (Phase 3)
Source of the sound: ready-made audio first, the learner's own recordings for anything that fails a listening check (see Product Decisions).
- [ ] The first time a word forms, its recording plays automatically; after that it plays only when its speaker icon is tapped.
- [ ] Patterns have their own speaker icon (one recording per pattern).
- [ ] Words or patterns without a recording show no speaker icon.

### Weak and Doubled Roots (Phase 3)
- [ ] Roots containing و, ي or a doubled letter are added; the animation shows letters changing or merging as they enter the pattern (e.g. ق-و-ل + فَعَلَ → قالَ).

## States and Boundaries
- **First use:** Roots screen, Beginner mode, only ك-ت-ب unlocked, empty collection.
- **Empty collection:** the Collection screen invites them to open a root and form their first word.
- **Quiz with too few words (Phase 2):** the Quiz is unavailable until they have collected at least 3 words, and says so. *(Assumption: the threshold of 3.)*
- **Returning:** everything restored as left.
- **All roots sealed:** a completion moment on the Roots screen. *(Assumption.)*
- **Saved data cleared or unavailable:** the app still works and starts fresh as first use.

## Product Decisions
- **Roots first, no welcome screen**: the root is the hero, and teenagers should be playing in one tap.
- **English meaning is the one essential extra** beside a formed word, so beginners understand what happened.
- **3 words unlocks the next root; every real word earns a gold seal**: quick progress for casual players, a completion goal for keen ones.
- **Collection as word cards grouped by root**: makes the root idea sink in and gives the gold seal a home.
- **Greyed-out patterns shake and explain**: they teach rather than just block.
- **Start in Beginner mode with a visible switch**: no question in the way; grammar students switch in one tap.
- **Quiz mixes "find the root" and "build the word", using collected words only**: reuses the kernel in reverse and by hand, and rewards the collection.
- **Audio auto-plays once per word, then on tap**: delightful the first time, not annoying in class or on a bus.
- **Cream paper, dark ink and gold**: the manuscript look.
- **First-launch intro (the logo builds itself)**: teaches the whole idea in 3 seconds and opens the demo video; skippable, first open only.
- **Amiri font, root/pattern colour-coding, and the improved landing animation**: chosen after reviewing the animation test pages.
- **Audio from an AI voice or existing recordings first**: the learner would rather not record everything; every clip must pass the learner's listening check, and anything that fails gets recorded by the learner.
- **Phased build** (from scope): the app is complete and submittable at the end of each phase.

## What We're Building
Source: `scope.md > The POC Boundary`.
- **Phase 1 (must ship):** Roots, Root Workshop, Collection; about 10 sound roots; Forms I-IV + 4 noun patterns; greyed-out behaviour; collecting, unlocking and seals; English meanings; the Beginner/Grammar switch; saved progress.
- **Phase 2:** Forms V-X; the Quiz.
- **Phase 3:** audio (pattern clips, then per word); weak and doubled roots.

## Deferred From the POC
- **Accounts and cross-device sync:** progress lives on one device for now.
- **Browser text-to-speech fallback:** only where no recording exists, after the hackathon.
- **Computer-generated words:** only with checking against a trusted source, after the hackathon.
- **The "letters try to fly in and fall away" effect for greyed-out patterns:** possible Phase 3 polish.

## Possible Later Enhancements
- Embedding Wazn as a "Patterns" section in Daaru-s-Seebawayh.
- More roots and noun patterns; plural patterns.

## Non-Goals
- **Not a dictionary:** only the curated, verified word list.
- **Not a full grammar course:** it teaches roots and patterns only.
- **No leaderboards or social features:** the motivation is personal collection and unlocking.

## Open Questions
- ~~The word list~~: resolved; see `devpost/word-list-draft.md` (reviewed by the learner).
- ~~Font and letter-joining~~: resolved; Amiri, and the joining technique was proven in a test page (details for `4-spec`).
- **Which audio source (Phase 3):** check Lingua Libre / Wikimedia Commons human recordings (CC BY-SA, credit the speakers) first, and trial a few AI voices on about 10 test words and let the learner choose by ear; learner records any failures. Can wait until Phase 3.
