// A weak-letter rule such as "و between two vowels becomes ا": the Arabic letters are set in Amiri
// and isolated, so they don't reorder the English around them.
export default function ChangeRule({ rule }: { rule: string }) {
  return rule.split(/([؀-ۿ]+)/).map((part, i) =>
    /[؀-ۿ]/.test(part) ? (
      <bdi key={i} lang="ar" dir="rtl" className="font-arabic text-base not-italic">
        {part}
      </bdi>
    ) : (
      part
    ),
  );
}
