// The Wazn wordmark (logo option 1): وَزْن in Amiri over a thin gold rule with a diamond.
// It is also the intro's final frame. The wax seal (option 2) is the app icon: public/*.png.

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <span lang="ar" dir="rtl" className="font-arabic text-[34px] leading-[1.25] font-bold">
        وَزْن
      </span>
      <svg viewBox="0 0 60 8" aria-hidden="true" className="-mt-0.5 h-2 w-12 text-gold">
        <path d="M2 4 H58" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M30 1 L33 4 L30 7 L27 4 Z" fill="currentColor" />
      </svg>
    </span>
  );
}
