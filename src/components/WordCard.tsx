import type { Pattern, Word } from "../data/types";
import ColouredWord from "./ColouredWord";
import { patternLabel, patternShape } from "../lib/labels";
import type { Mode } from "../lib/progress";

export default function WordCard({ word, pattern, mode }: { word: Word; pattern: Pattern; mode: Mode }) {
  const label = patternLabel(pattern, mode);
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
          {patternShape(pattern, mode, word)}
        </span>
        {label.nameIsArabic ? (
          <span lang="ar" dir="rtl" className="font-arabic text-sm">
            {label.name}
          </span>
        ) : (
          label.name
        )}{" "}
        · {label.hint}
      </span>
    </article>
  );
}
