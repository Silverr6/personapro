import { GoogleGenerativeAI } from "@google/generative-ai";

// The Gemini model to use. "gemini-flash-latest" is a stable alias that always
// points to Google's current free-tier Flash model, so it won't 404 when a
// specific dated model is retired. Pin to e.g. "gemini-2.5-flash" if you want a
// fixed version. See https://ai.google.dev/gemini-api/docs/models for the list.
const MODEL = "gemini-flash-latest";

const LANG_NAMES: Record<string, string> = {
  en: "English",
  tr: "Turkish",
  ar: "Arabic",
  fr: "French",
};

function buildPrompt(body: {
  name: string;
  goal: string;
  cv: string;
  linkedin?: string;
  extra?: string;
  lang: string;
}): string {
  const langName = LANG_NAMES[body.lang] || "English";

  return `You are PersonaPro, an elite career branding consultant and CV expert. Analyze the user's profile and produce a thorough, specific, personalized career optimization.

USER INFORMATION
Name: ${body.name}
Target role / career goal: ${body.goal}
CV text:
"""
${body.cv}
"""
${body.linkedin ? `Current LinkedIn "About" section:\n"""\n${body.linkedin}\n"""` : `The user has no LinkedIn "About" yet — write one from scratch.`}
${body.extra ? `Additional context: ${body.extra}` : ""}

INSTRUCTIONS
- Be specific and reference the user's actual experience, skills, and target role. Never be generic.
- The rewritten content must be clearly stronger than the original: quantified, achievement-focused, and tailored to the target role.
- Write ALL output text in ${langName}.
- Respond with ONLY a valid JSON object, no markdown fences, no commentary. Use exactly this schema:

{
  "score": <integer 0-100, honest overall CV score>,
  "scoreBreakdown": {
    "formatting": <integer 0-100>,
    "content": <integer 0-100>,
    "impact": <integer 0-100>,
    "keywords": <integer 0-100>
  },
  "cvCritique": [<5 to 7 strings, each a specific weakness or missed opportunity with a concrete fix>],
  "rewrittenSummary": "<a rewritten professional summary, 3-4 sentences, strong and specific>",
  "linkedinHeadline": "<a powerful LinkedIn headline under 220 characters, using the target role and key differentiators>",
  "linkedinAbout": "<a complete first-person LinkedIn About section, 3-4 short paragraphs>",
  "linkedinTips": [<4 to 5 strings, each a concrete tip for a specific LinkedIn section: Experience, Skills, Featured, Recommendations>],
  "brandStatement": "<a single-sentence personal brand positioning statement>",
  "brandingTips": [<exactly 5 strings, specific actionable personal-branding tips>],
  "postIdeas": [<exactly 3 strings, each a concrete LinkedIn post idea the user could publish this week>]
}`;
}

export async function generateAnalysis(body: {
  name: string;
  goal: string;
  cv: string;
  linkedin?: string;
  extra?: string;
  lang: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to your environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(buildPrompt(body));
  const text = result.response.text();

  // responseMimeType=json should give clean JSON, but strip fences just in case.
  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(clean);
}
