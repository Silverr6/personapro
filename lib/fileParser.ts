"use client";

// Extracts plain text from an uploaded CV file (PDF, DOCX, or TXT), entirely in the browser.
// No file ever leaves the user's device for parsing — only the extracted text is sent to the API.

export async function parseFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    return parsePdf(file);
  }
  if (name.endsWith(".docx")) {
    return parseDocx(file);
  }
  if (name.endsWith(".txt") || file.type === "text/plain") {
    return file.text();
  }
  throw new Error("Unsupported file type. Please upload a PDF, DOCX, or TXT file.");
}

async function parsePdf(file: File): Promise<string> {
  // Dynamic import keeps pdfjs out of the initial bundle.
  const pdfjs = await import("pdfjs-dist");
  // Point the worker at the CDN build matching the installed version.
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ");
    text += pageText + "\n";
  }
  return text.trim();
}

async function parseDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value.trim();
}
