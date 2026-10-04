// Gold wax seal. Reward seals carry the root's letters; the app icon's seal carries وَزْن.

const EDGE = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  return [60 + Math.cos(a) * 50, 60 + Math.sin(a) * 50] as const;
});

export default function Seal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <svg viewBox="3 3 114 114" role="img" aria-label={`gold seal ${text}`} className={className}>
      <g fill="var(--color-gold)">
        <circle cx="60" cy="60" r="50" />
        {EDGE.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" />
        ))}
      </g>
      <circle cx="60" cy="60" r="40" fill="none" stroke="#f3dfae" strokeWidth="1.6" opacity="0.85" />
      <circle cx="60" cy="60" r="35.5" fill="none" stroke="#f3dfae" strokeWidth="1" strokeDasharray="1.6 3.2" opacity="0.85" />
      <text
        x="60"
        y={text.length > 4 ? 71 : 74}
        textAnchor="middle"
        direction="rtl"
        fontFamily="Amiri"
        fontWeight="700"
        fontSize={text.length > 4 ? 30 : 40}
        fill="#fbf1d8"
      >
        {text}
      </text>
    </svg>
  );
}
