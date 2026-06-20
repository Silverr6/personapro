# PersonaPro — AI Career Makeover

An AI-powered career optimization tool. Upload your CV and get a full career makeover in seconds: a CV critique with a score out of 100, a rewritten professional summary, a complete LinkedIn profile overhaul, and a personal branding strategy — in **4 languages** (English, Turkish, Arabic with RTL, French).

**Live demo:** _add your deployed URL here_
**Built by:** Anass Elhamdi

---

## ✨ Features

- **CV analysis & scoring** — a 0–100 score with a breakdown (formatting, content, impact, keywords) plus 5–7 specific, actionable weaknesses
- **Rewritten resume summary** — a stronger, quantified professional summary tailored to your target role
- **Full LinkedIn overhaul** — optimized headline, rewritten About section, and section-by-section tips (Experience, Skills, Featured, Recommendations)
- **Personal branding** — a brand statement, 5 actionable tips, and 3 ready-to-publish LinkedIn post ideas
- **Real AI** — powered by Google Gemini, generating fresh, personalized output every time
- **Privacy-first file handling** — PDF/DOCX parsing happens entirely in your browser; only the extracted text is sent to the server
- **4 languages** with full right-to-left support for Arabic

## 🛠 Tech Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for the dark, premium UI
- **Google Gemini API** (`@google/generative-ai`) for the AI engine, called from a secure server-side API route
- **pdfjs-dist** and **mammoth** for client-side CV parsing
- Deployable free on **Vercel** or **Netlify**

The Gemini API key lives only in a server environment variable and is never exposed to the browser — all AI calls go through the `/api/analyze` route.

---

## 🚀 Run it locally

**1. Install dependencies**
```bash
npm install
```

**2. Get a free Gemini API key**
Go to https://aistudio.google.com/apikey and create a key (free, no credit card). Gemini's free tier is generous — plenty for personal use and demos.

**3. Add your key**
```bash
cp .env.local.example .env.local
```
Open `.env.local` and paste your key:
```
GEMINI_API_KEY=your_actual_key_here
```

**4. Start the dev server**
```bash
npm run dev
```
Open http://localhost:3000.

---

## ☁️ Deploy for free (Vercel — recommended)

1. Push this project to a GitHub repo.
2. Go to https://vercel.com, sign in with GitHub, and click **Add New → Project**.
3. Import your repo. Vercel auto-detects Next.js — no config needed.
4. Before deploying, open **Environment Variables** and add:
   - Name: `GEMINI_API_KEY`
   - Value: your Gemini key
5. Click **Deploy**. You'll get a live URL like `personapro.vercel.app` in about a minute.

### Deploy on Netlify instead
Netlify also works. Add the same `GEMINI_API_KEY` under **Site settings → Environment variables**, and install the official Next.js plugin (Netlify usually detects it automatically).

---

## ⚙️ Configuration notes

- **Model:** the Gemini model is set in `lib/gemini.ts` (`gemini-1.5-flash`). If Google renames models and you get a "model not found" error, change that one constant to a current free model (e.g. `gemini-2.0-flash`). See https://ai.google.dev/gemini-api/docs/models.
- **Rate limits:** the free tier allows a limited number of requests per minute/day. For a portfolio project this is plenty. If you ever exceed it, the app shows a friendly error and the user can retry.

---

## 📁 Project structure

```
personapro/
├── app/
│   ├── api/analyze/route.ts   # Secure server route → calls Gemini
│   ├── page.tsx               # Hero → Form → Loading → Results state machine
│   ├── layout.tsx
│   └── globals.css            # Design tokens + animations
├── components/
│   ├── LanguageSelector.tsx
│   ├── UploadZone.tsx         # Drag-drop PDF/DOCX/TXT parsing
│   ├── ScoreRing.tsx          # Animated CV score ring + breakdown bars
│   └── ResultCard.tsx         # Copyable result section
├── lib/
│   ├── gemini.ts              # Prompt + Gemini call
│   ├── fileParser.ts          # Client-side PDF/DOCX text extraction
│   ├── i18n.ts                # 4-language translation table
│   └── types.ts               # Shared TypeScript types
└── README.md
```

---

## 📝 License

Personal project — free to use and adapt.
