"use client";

import { useState, useEffect } from "react";
import { LANGUAGES, UI, Lang } from "@/lib/i18n";
import { AnalysisResult } from "@/lib/types";
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

  return (
    <main dir={dir} className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="pointer-events-none fixed -top-40 -right-32 w-[600px] h-[600px] rounded-full float-orb"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-40 -left-32 w-[500px] h-[500px] rounded-full float-orb"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)", animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {/* NAV */}
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-mono font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}>
              P
            </div>
            <span className="text-xl font-bold tracking-tight"
              style={{ background: "linear-gradient(135deg, #c7d2fe, #6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PersonaPro
            </span>
          </div>
          <LanguageSelector lang={lang} onChange={setLang} />
        </nav>

        {/* HERO */}
        {view === "hero" && (
          <section className="fade-up text-center pt-16">
            <div className="inline-block px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase font-mono"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
              {t.nav_tagline}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-5"
              style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #6ee7b7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.hero_title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto mb-8">
              {t.hero_sub}
            </p>
            <button
              onClick={() => setView("form")}
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-[14px] text-white text-base font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 40px rgba(99,102,241,0.3)" }}>
              {t.hero_cta} →
            </button>

            <div className="grid sm:grid-cols-3 gap-4 mt-16 text-left">
              {[
                { icon: "📄", title: t.feat1_title, desc: t.feat1_desc },
                { icon: "💼", title: t.feat2_title, desc: t.feat2_desc },
                { icon: "🚀", title: t.feat3_title, desc: t.feat3_desc },
              ].map((f, i) => (
                <div key={i} className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <div className="text-sm font-semibold mb-1.5">{f.title}</div>
                  <div className="text-xs text-[var(--text-dim)] leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-dim)] mt-10 font-mono">{t.hero_proof}</p>
          </section>
        )}

        {/* FORM */}
        {view === "form" && (
          <section className="fade-up pt-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-1">{t.form_title}</h2>
            <p className="text-sm text-[var(--text-dim)] mb-8">
              {t.form_lang}: {LANGUAGES[lang].flag} {LANGUAGES[lang].native}
            </p>

            {error && <p className="text-red-400 text-sm mb-5">{error}</p>}

            <Field label={`${t.name_label} *`}>
              <input className={inputCls} placeholder={t.name_ph} value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </Field>

            <Field label={`${t.goal_label} *`}>
              <input className={inputCls} placeholder={t.goal_ph} value={form.goal}
                onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))} />
            </Field>

            <Field label={`${t.upload_label} *`}>
              <UploadZone
                hint={t.upload_hint}
                onParsed={(text) => { setForm((p) => ({ ...p, cv: text })); setError(null); }}
                onError={(msg) => setError(msg)}
              />
              <p className="text-xs text-[var(--text-dim)] text-center my-2">{t.upload_or}</p>
              <textarea className={`${inputCls} min-h-[140px] resize-y`} placeholder={t.cv_ph} value={form.cv}
                onChange={(e) => setForm((p) => ({ ...p, cv: e.target.value }))} />
            </Field>

            <Field label={t.linkedin_label}>
              <textarea className={`${inputCls} min-h-[100px] resize-y`} placeholder={t.linkedin_ph} value={form.linkedin}
                onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))} />
            </Field>

            <Field label={t.extra_label}>
              <textarea className={`${inputCls} min-h-[72px] resize-y`} placeholder={t.extra_ph} value={form.extra}
                onChange={(e) => setForm((p) => ({ ...p, extra: e.target.value }))} />
            </Field>

            <button onClick={analyze}
              className="w-full py-4 rounded-[14px] text-white text-base font-semibold transition-all hover:-translate-y-0.5 mt-3"
              style={{ background: "linear-gradient(135deg, #6366f1, #10b981)", boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}>
              ✦ {t.analyze_btn}
            </button>
          </section>
        )}

        {/* LOADING */}
        {view === "loading" && (
          <section className="fade-up text-center pt-32">
            <div className="w-16 h-16 mx-auto mb-8 rounded-full spin"
              style={{ border: "3px solid rgba(99,102,241,0.15)", borderTopColor: "#6366f1" }} />
            <p className="text-xl font-semibold mb-3">{t.analyzing}</p>
            <p className="text-sm text-[var(--mint-light)] font-mono" style={{ animation: "pulse 2s infinite" }}>
              {steps[loadingStep]}
            </p>
          </section>
        )}

        {/* RESULTS */}
        {view === "results" && result && (
          <section className="fade-up pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8"
              style={{ background: "linear-gradient(135deg, #f1f5f9, #6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ✦ {t.results_title}
            </h2>

            <ScoreRing score={result.score} label={t.score_label} breakdown={result.scoreBreakdown} />
            <ResultCard title={t.r_critique} content={result.cvCritique} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_summary} content={result.rewrittenSummary} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_headline} content={result.linkedinHeadline} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_about} content={result.linkedinAbout} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_linkedin_tips} content={result.linkedinTips} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_brand} content={result.brandStatement} copyLabel={t.copy} copiedLabel={t.copied} />
            <ResultCard title={t.r_tips} content={result.brandingTips} copyLabel={t.copy} copiedLabel={t.copied} numbered />
            <ResultCard title={t.r_posts} content={result.postIdeas} copyLabel={t.copy} copiedLabel={t.copied} numbered />

            <button onClick={restart}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all mt-2 border border-[var(--indigo)]/30 text-[var(--indigo-light)] hover:bg-[var(--indigo)]/10">
              ← {t.restart}
            </button>
          </section>
        )}

        {/* FOOTER */}
        <footer className="text-center text-xs text-[var(--text-dim)] mt-20 pt-8 border-t border-white/5">
          {t.footer}
        </footer>
      </div>
    </main>
  );
}

const inputCls =
  "w-full px-4 py-3.5 rounded-xl border-[1.5px] border-white/10 bg-white/[0.03] text-[var(--text)] text-[15px] transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <label className="block text-[13px] font-semibold text-[var(--text-muted)] mb-2">{label}</label>
      {children}
    </div>
  );
}
