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
  // Band colors: strong = lime, decent = cobalt, needs work = coral
  const color = pct >= 75 ? "#C6F24E" : pct >= 50 ? "#2D4CFF" : "#FF5B3A";
  const verdict = pct >= 75 ? "Strong" : pct >= 50 ? "Getting there" : "Needs work";

  const bars = [
    { key: "formatting", label: "Formatting", val: breakdown.formatting, fill: "#2D4CFF" },
    { key: "content", label: "Content", val: breakdown.content, fill: "#FF5B3A" },
    { key: "impact", label: "Impact", val: breakdown.impact, fill: "#B79CFF" },
    { key: "keywords", label: "Keywords", val: breakdown.keywords, fill: "#C6F24E" },
  ];

  return (
    <div className="nb-card p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-center gap-7">
      <div className="relative shrink-0" style={{ width: 138, height: 138 }}>
        <svg width="138" height="138" className="-rotate-90 overflow-visible">
          <circle cx="69" cy="69" r={radius} fill="#fff" stroke="#15130E" strokeWidth="3" />
          <circle cx="69" cy="69" r={radius} fill="none" stroke="rgba(21,19,14,0.10)" strokeWidth="13" />
          <circle
            cx="69"
            cy="69"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="13"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <circle cx="69" cy="69" r={radius + 6.5} fill="none" stroke="#15130E" strokeWidth="2.5" />
          <circle cx="69" cy="69" r={radius - 6.5} fill="none" stroke="#15130E" strokeWidth="2.5" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold text-ink leading-none pop">{pct}</span>
          <span className="nb-kicker text-ink/50 mt-1">/ 100</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="nb-kicker text-ink bg-lime nb-border rounded-md px-2.5 py-1">{label}</span>
          <span className="text-xs font-bold nb-border rounded-md px-2.5 py-1 bg-white text-ink">{verdict}</span>
        </div>
        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.key}>
              <div className="flex justify-between text-xs font-bold text-ink/80 mb-1">
                <span>{b.label}</span>
                <span className="font-mono">{b.val}</span>
              </div>
              <div className="h-3.5 rounded-md nb-border bg-white overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, b.val))}%`,
                    background: b.fill,
                    borderRight: "2.5px solid #15130E",
                    transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
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
