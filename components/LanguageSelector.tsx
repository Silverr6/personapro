"use client";

import { LANGUAGES, Lang } from "@/lib/i18n";

export default function LanguageSelector({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {(Object.keys(LANGUAGES) as Lang[]).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => onChange(code)}
            title={LANGUAGES[code].label}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
              active
                ? "border-[var(--indigo)] bg-[rgba(99,102,241,0.15)] text-[var(--indigo-light)]"
                : "border-white/10 bg-white/5 text-[var(--text-dim)] hover:text-[var(--text-muted)]"
            }`}
          >
            {LANGUAGES[code].flag}
          </button>
        );
      })}
    </div>
  );
}
