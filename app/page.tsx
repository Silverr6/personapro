"use client";

import { useState, useEffect } from "react";
import { LANGUAGES, UI, Lang } from "@/lib/i18n";
import { AnalysisResult } from "@/lib/types";
import { Wordmark } from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";
import UploadZone from "@/components/UploadZone";
import ResultCard from "@/components/ResultCard";
import ScoreRing from "@/components/ScoreRing";

type View = "hero" | "form" | "loading" | "results";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [view, setView] = useState<View>("hero");
  const [form, setForm] = useState({ name: "", goal: "", cv: "", linkedin: "", extra: "" });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const t = UI[lang];
  const dir = LANGUAGES[lang].dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const steps = [t.step_read, t.step_score, t.step_linkedin, t.step_brand];
  useEffect(() => {
    if (view !== "loading") return;
    const id = setInterval(() => setLoadingStep((s) => (s + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, [view, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  async function analyze() {
    if (!form.name.trim() || !form.goal.trim() || !form.cv.trim()) {
      setError(t.err_required);
      return;
    }
    setError(null);
    setView("loading");
    setLoadingStep(0);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error("api");
      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      setView("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.err_generic);
      setView("form");
    }
  }

  function restart() {
    setResult(null);
    setForm({ name: "", goal: "", cv: "", linkedin: "", extra: "" });
    setView("form");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const marqueeTags = [t.score_label, t.r_critique, t.r_summary, t.r_headline, t.r_about, t.r_brand, t.r_posts];

  return (
    <main dir={dir} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-5 pb-24">
        {/* NAV */}
        <nav className="flex justify-between items-center py-5 gap-3">
          <button onClick={() => setView("hero")} className="cursor-pointer" aria-label="PersonaPro home">
            <Wordmark size={38} />
          </button>
          <LanguageSelector lang={lang} onChange={setLang} />
        </nav>

        {/* HERO */}
        {view === "hero" && (
          <section className="fade-up pt-10 sm:pt-14">
            <div className="flex justify-center mb-6">
              <span className="nb-kicker text-ink bg-lime nb-border rounded-full px-3.5 py-1.5 nb-shadow-sm -rotate-1">
                {t.hero_badge}
              </span>
            </div>

            <h1 className="text-center font-display text-[2.6rem] leading-[1.04] sm:text-6xl font-bold text-ink max-w-2xl mx-auto">
              {t.hero_title}
            </h1>
            <div className="flex justify-center my-4" aria-hidden="true">
              <svg width="240" height="14" viewBox="0 0 240 14" fill="none">
                <path d="M3 9C50 4 120 3 168 5c30 1 50 2 69 4" stroke="#C6F24E" strokeWidth="8" strokeLinecap="round" />
                <path d="M6 8c46-3 118-4 165-2 28 1 49 2 64 3" stroke="#2D4CFF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-center text-base sm:text-lg text-ink/75 leading-relaxed max-w-xl mx-auto mb-8">
              {t.hero_sub}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setView("form")}
                className="cursor-pointer nb-press inline-flex items-center gap-2.5 px-8 py-4 rounded-nb bg-cobalt text-paper text-base font-bold nb-border nb-shadow"
              >
                {t.hero_cta}
                <ArrowIcon />
              </button>
            </div>
            <p className="nb-kicker text-center text-ink/55 mt-4">{t.hero_proof}</p>

            {/* Marquee strip — "what you get" */}
            <div className="relative overflow-hidden mt-14 py-3 nb-border bg-ink rounded-nb">
              <div className="marquee-track flex gap-3 w-max">
                {[...marqueeTags, ...marqueeTags].map((tag, i) => (
                  <span key={i} className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-bold text-paper text-sm whitespace-nowrap">{tag}</span>
                    <span className="text-lime font-bold">✦</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: <ScoreIcon />, bg: "bg-lime", title: t.feat1_title, desc: t.feat1_desc, rot: "-rotate-1" },
                { icon: <LinkedInIcon />, bg: "bg-coral-soft", title: t.feat2_title, desc: t.feat2_desc, rot: "rotate-1" },
                { icon: <SparkIcon />, bg: "bg-cobalt-soft", title: t.feat3_title, desc: t.feat3_desc, rot: "-rotate-1" },
              ].map((f, i) => (
                <div key={i} className={`nb-card p-5 text-start ${i === 1 ? "sm:translate-y-3" : ""}`}>
                  <span className={`inline-flex w-11 h-11 items-center justify-center rounded-xl nb-border ${f.bg} ${f.rot} mb-3`}>
                    {f.icon}
                  </span>
                  <div className="font-display font-bold text-ink mb-1.5">{f.title}</div>
                  <div className="text-sm text-ink/70 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FORM */}
        {view === "form" && (
          <section className="fade-up pt-2 max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-display text-3xl font-bold text-ink">{t.form_title}</h2>
            </div>
            <p className="nb-kicker text-ink/55 mb-7">
              {t.form_lang}: {LANGUAGES[lang].native}
            </p>

            {error && (
              <div className="nb-border bg-coral-soft rounded-nb px-4 py-3 mb-5 text-sm font-bold text-ink nb-shadow-sm">
                {error}
              </div>
            )}

            <Field label={`${t.name_label} *`}>
              <input className="nb-input" placeholder={t.name_ph} value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </Field>

            <Field label={`${t.goal_label} *`}>
              <input className="nb-input" placeholder={t.goal_ph} value={form.goal}
                onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))} />
            </Field>

            <Field label={`${t.upload_label} *`}>
              <UploadZone
                hint={t.upload_hint}
                onParsed={(text) => { setForm((p) => ({ ...p, cv: text })); setError(null); }}
                onError={(msg) => setError(msg)}
              />
              <p className="nb-kicker text-ink/45 text-center my-2.5">{t.upload_or}</p>
              <textarea className="nb-input min-h-[140px] resize-y" placeholder={t.cv_ph} value={form.cv}
                onChange={(e) => setForm((p) => ({ ...p, cv: e.target.value }))} />
            </Field>

            <Field label={t.linkedin_label}>
              <textarea className="nb-input min-h-[100px] resize-y" placeholder={t.linkedin_ph} value={form.linkedin}
                onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))} />
            </Field>

            <Field label={t.extra_label}>
              <textarea className="nb-input min-h-[72px] resize-y" placeholder={t.extra_ph} value={form.extra}
                onChange={(e) => setForm((p) => ({ ...p, extra: e.target.value }))} />
            </Field>

            <button onClick={analyze}
              className="cursor-pointer nb-press w-full py-4 rounded-nb bg-cobalt text-paper text-base font-bold nb-border nb-shadow mt-3 inline-flex items-center justify-center gap-2">
              <SparkIcon light /> {t.analyze_btn}
            </button>
          </section>
        )}

        {/* LOADING */}
        {view === "loading" && (
          <section className="fade-up flex flex-col items-center pt-28">
            <div className="nb-card p-8 flex flex-col items-center max-w-sm w-full">
              <div className="w-14 h-14 rounded-full spin mb-6"
                style={{ border: "5px solid var(--paper-2)", borderTopColor: "var(--cobalt)" }} />
              <p className="font-display text-xl font-bold text-ink text-center mb-2">{t.analyzing}</p>
              <p className="nb-kicker text-ink/60 text-center blink">{steps[loadingStep]}</p>
            </div>
          </section>
        )}

        {/* RESULTS */}
        {view === "results" && result && (
          <section className="fade-up pt-2">
            <div className="flex items-center gap-3 mb-7">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">{t.results_title}</span>
              <span className="text-2xl -rotate-12">🎉</span>
            </div>

            <ScoreRing score={result.score} label={t.score_label} breakdown={result.scoreBreakdown} />
            <ResultCard index={0} title={t.r_critique} content={result.cvCritique} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={1} title={t.r_summary} content={result.rewrittenSummary} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={2} title={t.r_headline} content={result.linkedinHeadline} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={3} title={t.r_about} content={result.linkedinAbout} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={4} title={t.r_linkedin_tips} content={result.linkedinTips} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={0} title={t.r_brand} content={result.brandStatement} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard index={1} title={t.r_tips} content={result.brandingTips} copyLabel={t.copy} copiedLabel={t.copied} numbered />
            <ResultCard index={2} title={t.r_posts} content={result.postIdeas} copyLabel={t.copy} copiedLabel={t.copied} numbered />

            <button onClick={restart}
              className="cursor-pointer nb-press inline-flex items-center gap-2 px-6 py-3 rounded-nb bg-white text-ink text-sm font-bold nb-border nb-shadow-sm mt-2">
              <ReloadIcon /> {t.restart}
            </button>
          </section>
        )}

        {/* FOOTER */}
        <footer className="mt-20 pt-6 border-t-2 border-dashed border-ink/20">
          <p className="nb-kicker text-ink/50 text-center">{t.footer}</p>
        </footer>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-[13px] font-bold text-ink mb-2">{label}</label>
      {children}
    </div>
  );
}

/* ---------- Icons (no emojis as UI icons) ---------- */
function ArrowIcon() {
  return (
    <svg className="rtl-flip" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}
function ReloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8" /><path d="M3 3v5h5" />
    </svg>
  );
}
function ScoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15130E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20v-6" /><path d="M6 20v-3" /><path d="M18 20v-9" /><circle cx="18" cy="6" r="2.4" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#15130E" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function SparkIcon({ light = false }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={light ? "#FBF7EC" : "#15130E"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />
    </svg>
  );
}
