import type { Pattern, Word } from "../data/types";
import ColouredWord from "./ColouredWord";

export default function WordCard({ word, pattern }: { word: Word; pattern: Pattern }) {
  return (
    <article className="flex flex-col items-center gap-0.5 rounded-xl border border-line bg-card px-3 pt-2 pb-3 text-center">
      <span lang="ar" dir="rtl" className="font-arabic text-[38px] leading-[1.6]">
        <ColouredWord word={word} />
      </span>
      <span className="text-sm">
        <span className="text-muted italic">{word.translit}</span> · {word.meaning}
      </span>
      <span className="mt-1 flex items-center gap-1.5 text-xs text-muted">
        <span lang="ar" dir="rtl" className="font-arabic text-sm text-gold">
          {word.shape ?? pattern.template}
        </span>
        {pattern.beginner.name} · {pattern.beginner.hint}
      </span>
    </article>
  );
}
