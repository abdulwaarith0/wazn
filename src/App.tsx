import { useState } from "react";
import { rootById } from "./data/roots";
import Logo from "./components/Logo";
import UnlockMoment from "./components/moments/UnlockMoment";
import { useProgress } from "./hooks/useProgress";
import RootsScreen from "./screens/RootsScreen";
import Workshop from "./screens/Workshop";

type Screen = { name: "roots" } | { name: "workshop"; rootId: string };

export default function App() {
  const { progress, collectWord } = useProgress();
  const [screen, setScreen] = useState<Screen>({ name: "roots" });
  const [unlocked, setUnlocked] = useState<string | null>(null);

  const openRoot = (rootId: string) => {
    setUnlocked(null);
    setScreen({ name: "workshop", rootId });
    window.scrollTo({ top: 0 });
  };

  const collect = (wordId: string) => {
    const result = collectWord(wordId);
    // Let the reward burst play before the unlock card arrives.
    if (result.unlocked) {
      const id = result.unlocked;
      setTimeout(() => setUnlocked(id), 700);
    }
    return result.added;
  };

  const root = screen.name === "workshop" ? rootById(screen.rootId) : undefined;
  const newRoot = unlocked ? rootById(unlocked) : undefined;

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
            onBack={() => setScreen({ name: "roots" })}
          />
        ) : (
          <RootsScreen progress={progress} onOpenRoot={openRoot} />
        )}
      </main>
      {newRoot && <UnlockMoment root={newRoot} onOpen={() => openRoot(newRoot.id)} onClose={() => setUnlocked(null)} />}
    </div>
  );
}
