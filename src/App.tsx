import { roots } from "./data/roots";
import Logo from "./components/Logo";
import Workshop from "./screens/Workshop";

export default function App() {
  // Slice 1: straight into the first root's Workshop. Screen switching arrives with the Roots screen.
  const root = roots[0]!;

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-16">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-sm font-semibold tracking-[0.2em] text-muted uppercase">Wazn</span>
        </div>
      </header>
      <main className="flex-1">
        <Workshop root={root} />
      </main>
    </div>
  );
}
