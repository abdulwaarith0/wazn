import { useCallback, useEffect, useRef } from "react";

/** One shared audio player: starting a clip stops the one before. */
export function useAudio() {
  const player = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => player.current?.pause(), []);

  return useCallback((url: string) => {
    player.current?.pause();
    const audio = new Audio(url);
    player.current = audio;
    // Browsers may refuse playback (e.g. autoplay rules); the speaker icon still works on tap.
    audio.play().catch(() => {});
  }, []);
}
