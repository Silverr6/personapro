import { NextRequest, NextResponse } from "next/server";
import { generateAnalysis } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.name?.trim() || !body?.goal?.trim() || !body?.cv?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: name, goal, and cv are required." },
        { status: 400 }
      );
    }

    // Guard against oversized payloads abusing the free tier.
    if (String(body.cv).length > 20000) {
      body.cv = String(body.cv).slice(0, 20000);
    }

    const analysis = await generateAnalysis({
      name: String(body.name).trim(),
      goal: String(body.goal).trim(),
      cv: String(body.cv).trim(),
      linkedin: body.linkedin ? String(body.linkedin).trim() : undefined,
      extra: body.extra ? String(body.extra).trim() : undefined,
      lang: ["en", "tr", "ar", "fr"].includes(body.lang) ? body.lang : "en",
    });

    return NextResponse.json(analysis);
  } catch (err: any) {
    console.error("Analyze error:", err?.message || err);
    return NextResponse.json(
      { error: "Failed to generate analysis. Please try again." },
      { status: 500 }
    );
  }
}
