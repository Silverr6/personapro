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
        onError("Could not read enough text from that file. Try pasting the text instead.");
        setFileName(null);
      } else {
        onParsed(text, file.name);
      }
    } catch (e: any) {
      onError(e?.message || "Could not read that file.");
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
      className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
        dragging
          ? "border-[var(--indigo)] bg-[rgba(99,102,241,0.08)]"
          : "border-white/15 bg-white/[0.02] hover:border-white/30"
      }`}
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
        <p className="text-sm text-[var(--text-muted)]">Reading {fileName}...</p>
      ) : fileName ? (
        <p className="text-sm text-[var(--mint-light)]">✓ {fileName} loaded</p>
      ) : (
        <>
          <div className="text-2xl mb-2">📄</div>
          <p className="text-sm text-[var(--text-muted)]">{hint}</p>
          <p className="text-xs text-[var(--text-dim)] mt-1">PDF · DOCX · TXT</p>
        </>
      )}
    </div>
  );
}
