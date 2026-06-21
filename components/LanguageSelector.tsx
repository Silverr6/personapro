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
    <div className="flex items-center gap-1 nb-border bg-white rounded-nb p-1 nb-shadow-sm">
      {(Object.keys(LANGUAGES) as Lang[]).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => onChange(code)}
            title={LANGUAGES[code].label}
            aria-label={LANGUAGES[code].label}
            aria-pressed={active}
            className={`cursor-pointer px-2.5 py-1 rounded-[9px] text-xs font-bold uppercase tracking-wide transition-colors duration-150 ${
              active
                ? "bg-ink text-paper"
                : "text-ink/55 hover:text-ink hover:bg-paper-2"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
