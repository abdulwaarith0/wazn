import { useState } from "react";
import { rootById } from "./data/roots";
import Logo from "./components/Logo";
import SealMoment from "./components/moments/SealMoment";
import UnlockMoment from "./components/moments/UnlockMoment";
import { useProgress } from "./hooks/useProgress";
import CollectionScreen from "./screens/CollectionScreen";
import RootsScreen from "./screens/RootsScreen";
import Workshop from "./screens/Workshop";

type Screen = { name: "roots" } | { name: "collection" } | { name: "workshop"; rootId: string };
type Moment = { kind: "seal" | "unlock"; rootId: string };

export default function App() {
  const { progress, collectWord } = useProgress();
  const [screen, setScreen] = useState<Screen>({ name: "roots" });
  // Moments waiting to be shown, one at a time: a seal first, then an unlock.
  const [moments, setMoments] = useState<Moment[]>([]);

  const go = (next: Screen) => {
    setMoments([]);
    setScreen(next);
    window.scrollTo({ top: 0 });
  };

  const collect = (wordId: string) => {
    const { added, sealed, unlocked } = collectWord(wordId);
    const queued: Moment[] = [
      ...(sealed ? [{ kind: "seal" as const, rootId: sealed }] : []),
      ...(unlocked ? [{ kind: "unlock" as const, rootId: unlocked }] : []),
    ];
    // Let the reward burst play before a moment arrives.
    if (queued.length) setTimeout(() => setMoments((m) => [...m, ...queued]), 700);
    return added;
  };

  const next = () => setMoments((m) => m.slice(1));
  const moment = moments[0];
  const momentRoot = moment && rootById(moment.rootId);
  const root = screen.name === "workshop" ? rootById(screen.rootId) : undefined;

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-16">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-sm font-semibold tracking-[0.2em] text-muted uppercase">Wazn</span>
        </div>
      </header>
      <main className="flex-1">
        {root ? (
          <Workshop
            key={root.id}
            root={root}
            collected={progress.collected}
            onCollect={collect}
            onBack={() => go({ name: "roots" })}
          />
        ) : screen.name === "collection" ? (
          <CollectionScreen progress={progress} onBack={() => go({ name: "roots" })} />
        ) : (
          <RootsScreen
            progress={progress}
            onOpenRoot={(rootId) => go({ name: "workshop", rootId })}
            onOpenCollection={() => go({ name: "collection" })}
          />
        )}
      </main>
      {moment?.kind === "seal" && momentRoot && (
        <SealMoment key={`seal-${momentRoot.id}`} root={momentRoot} onCollection={() => go({ name: "collection" })} onClose={next} />
      )}
      {moment?.kind === "unlock" && momentRoot && (
        <UnlockMoment
          key={`unlock-${momentRoot.id}`}
          root={momentRoot}
          onOpen={() => go({ name: "workshop", rootId: momentRoot.id })}
          onClose={next}
        />
      )}
    </div>
  );
}
