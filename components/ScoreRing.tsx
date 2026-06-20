"use client";

export default function ScoreRing({
  score,
  label,
  breakdown,
}: {
  score: number;
  label: string;
  breakdown: { formatting: number; content: number; impact: number; keywords: number };
}) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, score));
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 75 ? "#34D399" : pct >= 50 ? "#FBBF24" : "#F87171";

  const bars = [
    { key: "formatting", label: "Formatting", val: breakdown.formatting },
    { key: "content", label: "Content", val: breakdown.content },
    { key: "impact", label: "Impact", val: breakdown.impact },
    { key: "keywords", label: "Keywords", val: breakdown.keywords },
  ];

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-5 flex flex-col sm:flex-row items-center gap-8">
      <div className="relative shrink-0" style={{ width: 130, height: 130 }}>
        <svg width="130" height="130" className="-rotate-90">
          <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {pct}
          </span>
          <span className="text-xs text-[var(--text-dim)] font-mono">/ 100</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-sm font-bold text-[var(--indigo-light)] uppercase tracking-wide font-mono mb-4">
          {label}
        </h3>
        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.key}>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                <span>{b.label}</span>
                <span className="font-mono">{b.val}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, b.val))}%`,
                    background: "linear-gradient(90deg, #6366F1, #34D399)",
                    transition: "width 1s ease-out",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
