"use client";

import { useState } from "react";

export default function ResultCard({
  title,
  content,
  copyLabel,
  copiedLabel,
  numbered = false,
}: {
  title: string;
  content: string | string[];
  copyLabel: string;
  copiedLabel: string;
  numbered?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const plain = Array.isArray(content) ? content.join("\n") : content;

  function copy() {
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-5">
      <div className="flex justify-between items-center mb-4 gap-3">
        <h3 className="text-sm font-bold text-[var(--indigo-light)] uppercase tracking-wide font-mono">
          {title}
        </h3>
        <button
          onClick={copy}
          className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all ${
            copied
              ? "border-[var(--mint)]/40 bg-[var(--mint)]/15 text-[var(--mint-light)]"
              : "border-[var(--indigo)]/30 bg-[var(--indigo)]/10 text-[var(--indigo-light)] hover:bg-[var(--indigo)]/20"
          }`}
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>

      {Array.isArray(content) ? (
        <ul className="space-y-2.5">
          {content.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <span className="text-[var(--indigo-light)] font-mono shrink-0">
                {numbered ? `${i + 1}.` : "•"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}
