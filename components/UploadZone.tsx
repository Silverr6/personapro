"use client";

import { useState, useRef, DragEvent } from "react";
import { parseFile } from "@/lib/fileParser";

export default function UploadZone({
  hint,
  onParsed,
  onError,
}: {
  hint: string;
  onParsed: (text: string, fileName: string) => void;
  onError: (msg: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setLoading(true);
    setFileName(file.name);
    try {
      const text = await parseFile(file);
      if (!text || text.length < 20) {
        onError("Couldn't pull enough text from that file — try pasting it below instead.");
        setFileName(null);
      } else {
        onParsed(text, file.name);
      }
    } catch (e: any) {
      onError(e?.message || "Couldn't read that file.");
      setFileName(null);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`cursor-pointer rounded-nb nb-border p-6 text-center transition-colors duration-150 ${
        dragging ? "bg-lime" : fileName && !loading ? "bg-lime-soft" : "bg-white hover:bg-paper-2"
      }`}
      style={{ borderStyle: fileName ? "solid" : "dashed" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {loading ? (
        <p className="text-sm font-medium text-ink">Reading {fileName}…</p>
      ) : fileName ? (
        <p className="text-sm font-bold text-ink flex items-center justify-center gap-2">
          <CheckIcon /> {fileName} — locked in
        </p>
      ) : (
        <>
          <div className="flex justify-center mb-2.5">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cobalt nb-border nb-shadow-sm">
              <UploadIcon />
            </span>
          </div>
          <p className="text-sm font-bold text-ink">{hint}</p>
          <p className="nb-kicker text-ink/50 mt-1.5">PDF · DOCX · TXT</p>
        </>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBF7EC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4" />
      <path d="m6 10 6-6 6 6" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15130E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
