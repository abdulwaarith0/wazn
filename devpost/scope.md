---
doc: scope
status: approved
---

# Wazn (وَزْن)

A calm, manuscript-styled word game where you watch an Arabic root pour into a pattern and become a real word, then collect it.

## The Unique Kernel
You **see** morphology happen. Pick a root like ك-ت-ب and a pattern like فاعِل, and the three root letters fly into the pattern's slots to form كاتِب ("writer"). Roots and patterns stop being a table to memorise and become something you watch, so people understand them instantly.

## Who It's For
Non-native learners of Arabic, like the learner, who learned it as a second language through madrasah or similar classes, down to teenagers. Today they meet roots and patterns as tables in a grammar book or as rote memorisation, and many never see the system behind the words. Both complete beginners and students who already know some grammar should be able to use it.

## The Core Loop
Open Wazn, pick an unlocked root, try it in each pattern, and watch each real word assemble with its English meaning. Every word built goes into your collection. Collecting words from a root unlocks the next root. They come back to unlock new roots and grow their collection.

## Inspiration & Identity
- **Look:** calm and scholarly, like a manuscript: ink on warm paper, calligraphic letters, gentle ornament.
- **Feel:** playful and game-like, clean and modern: letters snapping into place, satisfying feedback, small rewards.
- Easy enough for a teenager to pick up without instructions, and engaging enough to keep them going.

## Why This Matters to the Learner
"So people would understand roots and patterns instantly if they could see it, and also for non-native speakers like I who had to learn the language as a second language through madrasah or other means, and to make the learning easier for more people."

## What "Working" Looks Like
Someone opens Wazn, picks the root ك-ت-ب, chooses the فاعِل pattern, and watches the letters fly into the slots to form كاتِب with its meaning "writer". It lands in their collection with a small reward. A few words later a new root unlocks. A pattern that doesn't exist for that root shows as greyed out.

**The "oh, that's cool" beat:** the letters animating from the root into the pattern while keeping Arabic letter-joining intact.

## The POC Boundary
The learner chose to bring everything from the earlier "later" list into this build. It is built in three phases, so the app is complete and submittable at the end of each phase and the deadline (2026-10-26) is never at risk.

**Phase 1: the kernel (must ship)**
- About 10 regular (sound) three-letter roots.
- Verb Forms I-IV plus four noun patterns (فاعِل, مَفْعُول, مَفْعَل, فِعالة).
- Only real words, hand-checked by the learner; non-existent combinations shown greyed out.
- Explore mode: root + pattern, then the animated word with its English meaning.
- Collection and root unlocking.
- A Beginner / Grammar switch that changes labels and explanations only.
- Progress saved on the device.

**Phase 2: depth**
- Verb Forms V-X.
- Quiz mode.

**Phase 3: sound and harder roots**
- Audio: learner-recorded clips, one per pattern first, then per word.
- More roots, including weak and doubled roots, where letters change or merge as they enter the pattern (e.g. ق-و-ل into فَعَلَ gives قالَ).

## Later
Revisit after the hackathon build is done:
- **Accounts or a backend:** on-device progress is enough until then.
- **Browser text-to-speech:** only as a fallback where no recording exists; Arabic voices are often missing and ignore vowel marks, so it can mispronounce what the app teaches.
- **Computer-generated words:** only if every generated word is checked against a trusted source before it is shown; a wrong form costs credibility.

## Explicitly Cut
Nothing for now: the learner moved the earlier cuts to "Later" above, each with its condition.
