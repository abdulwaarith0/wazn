// Audio clips, found automatically: drop a file into src/audio and it gets a speaker icon.
//   src/audio/words/<word id>.mp3        e.g. ktb-faail.mp3 for كَاتِب
//   src/audio/patterns/<pattern id>.mp3  e.g. faail.mp3 for فَاعِل
// Anything without a file simply has no icon. Credits for recordings: src/audio/CREDITS.md.

const files = import.meta.glob("../audio/{words,patterns}/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function index(folder: "words" | "patterns") {
  const out = new Map<string, string>();
  for (const [path, url] of Object.entries(files)) {
    const m = path.match(new RegExp(`/${folder}/([^/]+)\\.\\w+$`));
    if (m?.[1]) out.set(m[1], url);
  }
  return out;
}

export const wordAudio = index("words");
export const patternAudio = index("patterns");
