import type { Root } from "../data/types";

// A root like ك-ت-ب inside an English sentence: isolated (so the browser doesn't reorder it
// with the surrounding text) and kept on one line.
export default function RootText({ root, className = "text-ink" }: { root: Root; className?: string }) {
  return (
    <bdi lang="ar" dir="rtl" className={`inline-block font-arabic text-base whitespace-nowrap ${className}`}>
      {root.letters.join("-")}
    </bdi>
  );
}
