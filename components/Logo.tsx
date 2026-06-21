// PersonaPro "PP" monogram — two overlapping geometric P's on a cobalt tile.
// Drawn as paths (not text) so it stays crisp at any size and works as a favicon.

// One P glyph in a 28x36 box, with the bowl counter punched out via evenodd.
const P_OUTER = "M5 3 H15 C20.5 3 25 7.5 25 13 C25 18.5 20.5 23 15 23 H11 V34 H5 Z";
const P_HOLE = "M11 9 H15 C17.2 9 19 10.8 19 13 C19 15.2 17.2 17 15 17 H11 Z";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="PersonaPro logo"
      style={{ display: "block" }}
    >
      {/* tile */}
      <rect x="3" y="3" width="58" height="58" rx="15" fill="#2D4CFF" stroke="#15130E" strokeWidth="3" />
      {/* back P (lime) */}
      <g transform="translate(8 14) scale(0.92)">
        <path d={`${P_OUTER} ${P_HOLE}`} fill="#C6F24E" fillRule="evenodd" />
      </g>
      {/* front P (paper) */}
      <g transform="translate(24 14) scale(0.92)">
        <path d={`${P_OUTER} ${P_HOLE}`} fill="#FBF7EC" fillRule="evenodd" stroke="#15130E" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function Wordmark({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="nb-shadow-sm" style={{ borderRadius: 15, lineHeight: 0 }}>
        <LogoMark size={size} />
      </div>
      <span
        className="font-display font-bold tracking-tight text-ink"
        style={{ fontSize: size * 0.52 }}
      >
        Persona<span style={{ color: "var(--cobalt)" }}>Pro</span>
      </span>
    </div>
  );
}
