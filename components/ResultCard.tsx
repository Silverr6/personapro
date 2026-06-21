"use client";

import { useState } from "react";

const ACCENTS = ["bg-lime", "bg-coral-soft", "bg-cobalt-soft", "bg-lilac-soft", "bg-lime-soft"];

export default function ResultCard({
  title,
  content,
  copyLabel,
  copiedLabel,
  numbered = false,
  index = 0,
}: {
  title: string;
  content: string | string[];
  copyLabel: string;
  copiedLabel: string;
  numbered?: boolean;
  index?: number;
}) {
  const [copied, setCopied] = useState(false);
  const plain = Array.isArray(content) ? content.join("\n") : content;
  const accent = ACCENTS[index % ACCENTS.length];

  function copy() {
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="nb-card p-5 sm:p-6 mb-5">
      <div className="flex justify-between items-center mb-4 gap-3">
        <h3 className="inline-flex">
          <span className={`nb-kicker text-ink ${accent} nb-border rounded-md px-2.5 py-1`}>
            {title}
          </span>
        </h3>
        <button
          onClick={copy}
          aria-label={copied ? copiedLabel : `${copyLabel}: ${title}`}
          className={`cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold nb-border transition-colors duration-150 ${
            copied ? "bg-ink text-paper" : "bg-white text-ink hover:bg-lime"
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>

      {Array.isArray(content) ? (
        <ul className="space-y-2.5">
          {content.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span
                className={`shrink-0 mt-0.5 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-md nb-border text-[11px] font-bold ${
                  numbered ? "bg-cobalt text-paper" : "bg-lime text-ink"
                }`}
              >
                {numbered ? i + 1 : "★"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] leading-relaxed text-ink/85 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
