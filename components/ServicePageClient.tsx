
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, BarChart3, Radio, Camera, Megaphone, Target, Layers3, Workflow } from 'lucide-react';

type Locale = 'es' | 'en';

type SectionList = readonly string[];
type CaseItem = Readonly<{ title: string; summary: string; result: string }>;

type Content = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  includesTitle: string;
  includes: SectionList;
  audienceTitle: string;
  audience: SectionList;
  examplesTitle: string;
  examples: readonly CaseItem[];
  resultsTitle: string;
  results: SectionList;
  finalTitle: string;
  finalText: string;
};

type Props = {
  serviceKey: 'audiovisual' | 'marketing';
  localeContent: Record<Locale, Content>;
  variant: 'immersive' | 'editorial';
};

const LOCALE_KEY = 'dsolution-language';

const variantClasses = {
  immersive: {
    page: 'bg-[radial-gradient(circle_at_top,rgba(212,175,55,.18),transparent_20%),linear-gradient(180deg,#061523 0%,#0B2340 35%,#F7F3EA 100%)]',
    card: 'border border-white/10 bg-white/6 text-white shadow-[0_20px_45px_rgba(0,0,0,.25)] backdrop-blur-sm',
    heading: 'text-white',
    muted: 'text-white/72',
    accent: 'text-[#D4AF37]',
    panel: 'border border-slate-200 bg-white text-slate-800 shadow-[0_18px_40px_rgba(0,33,71,.08)]',
  },
  editorial: {
    page: 'bg-[linear-gradient(180deg,#F7F3EA 0%,#FFFFFF 28%,#F8FBFF 100%)]',
    card: 'border border-slate-200 bg-white text-slate-800 shadow-[0_18px_40px_rgba(0,33,71,.08)]',
    heading: 'text-[#002147]',
    muted: 'text-slate-600',
    accent: 'text-[#D4AF37]',
    panel: 'border border-slate-200 bg-[#002147] text-white shadow-[0_20px_50px_rgba(0,33,71,.18)]',
  },
} as const;

function LocaleToggle({ locale, onChange }: { locale: Locale; onChange: (value: Locale) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 p-1 text-sm font-semibold text-[#0B2340] shadow-sm">
      <button type="button" onClick={() => onChange('es')} className={`rounded-full px-3 py-1.5 transition ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>ES</button>
      <button type="button" onClick={() => onChange('en')} className={`rounded-full px-3 py-1.5 transition ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>EN</button>
    </div>
  );
}

export default function ServicePageClient({ serviceKey, localeContent, variant }: Props) {
  const [locale, setLocale] = useState<Locale>('es');
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(LOCALE_KEY) : null;
    if (stored === 'en' || stored === 'es') setLocale(stored);
  }, []);
  const handleLocale = (value: Locale) => {
    setLocale(value);
    window.localStorage.setItem(LOCALE_KEY, value);
  };

  const copy = localeContent[locale];
  const theme = variantClasses[variant];
  const topIcon = serviceKey === 'audiovisual' ? Radio : BarChart3;

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[rgba(247,243,234,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="D-Solution" className="h-11 w-11 rounded-sm object-contain" />
            <span className="text-lg font-semibold text-[#0B2340]">D-Solution</span>
          </Link>
          <div className="flex items-center gap-3">
            <LocaleToggle locale={locale} onChange={handleLocale} />
            <Link href="/#contacto" className="hidden rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] md:inline-flex">{copy.primaryCta}</Link>
          </div>
        </div>
      </header>

      <section className="px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link href="/#servicios" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:opacity-80">
            <ArrowLeft size={16} />
            {locale === 'es' ? 'Volver a servicios' : 'Back to services'}
          </Link>

          <div className={`mt-8 grid gap-8 rounded-[2rem] p-7 md:grid-cols-[1.05fr_.95fr] md:p-10 ${theme.card}`}>
            <div>
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/15 ${theme.accent}`}>
                {serviceKey === 'audiovisual' ? <Radio size={28} /> : <BarChart3 size={28} />}
              </div>
              <p className={`mt-6 text-xs font-bold uppercase tracking-[.28em] ${theme.accent}`}>{copy.heroEyebrow}</p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight md:text-6xl ${theme.heading}`}>{copy.heroTitle}</h1>
              <p className={`mt-5 max-w-2xl text-lg leading-8 ${theme.muted}`}>{copy.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/#contacto" className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 font-bold text-[#002147]">{copy.primaryCta} <ArrowRight size={17} /></Link>
                <Link href="/#portafolio" className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 font-semibold ${variant === 'immersive' ? 'border-white/15 text-white' : 'border-slate-300 text-[#002147]'}`}>{copy.secondaryCta}</Link>
              </div>
            </div>

            <div className={`grid gap-4 rounded-[1.75rem] p-6 ${theme.panel}`}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[serviceKey === 'audiovisual' ? Radio : Megaphone, serviceKey === 'audiovisual' ? Camera : Target, serviceKey === 'audiovisual' ? Sparkles : Workflow, serviceKey === 'audiovisual' ? Layers3 : CheckCircle2].map((Icon, index) => (
                  <div key={index} className={`rounded-2xl p-5 ${variant === 'immersive' ? 'bg-[#061523]' : 'bg-white/10'}`}>
                    <Icon size={22} className="text-[#D4AF37]" />
                    <p className={`mt-4 text-sm ${variant === 'immersive' ? 'text-white/78' : 'text-white/82'}`}>
                      {copy.includes[index] || copy.results[index] || ''}
                    </p>
                  </div>
                ))}
              </div>
              <div className={`rounded-2xl p-5 ${variant === 'immersive' ? 'bg-[#061523]' : 'bg-white/10'}`}>
                <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#D4AF37]">{copy.resultsTitle}</p>
                <div className="mt-4 grid gap-3">
                  {copy.results.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 text-[#D4AF37]" />
                      <span className="text-sm text-white/82">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
            <section className={`rounded-[2rem] p-7 md:p-8 ${theme.card}`}>
              <p className={`text-xs font-bold uppercase tracking-[.25em] ${theme.accent}`}>{copy.includesTitle}</p>
              <div className="mt-6 grid gap-4">
                {copy.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[#D4AF37]" />
                    <p className={theme.muted}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-[2rem] p-7 md:p-8 ${theme.card}`}>
              <p className={`text-xs font-bold uppercase tracking-[.25em] ${theme.accent}`}>{copy.audienceTitle}</p>
              <div className="mt-6 grid gap-4">
                {copy.audience.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200/20 bg-white/5 p-5">
                    <p className={theme.muted}>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-12">
            <div className="mb-6">
              <p className={`text-xs font-bold uppercase tracking-[.25em] ${theme.accent}`}>{copy.examplesTitle}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {copy.examples.map((item, index) => (
                <article key={item.title} className={`rounded-[2rem] p-7 ${index === 1 ? theme.panel : theme.card}`}>
                  <p className={`text-xs font-bold uppercase tracking-[.22em] ${index === 1 ? 'text-[#D4AF37]' : theme.accent}`}>{locale === 'es' ? 'Ejemplo imaginario' : 'Illustrative example'}</p>
                  <h2 className={`mt-4 text-2xl font-semibold ${index === 1 ? 'text-white' : theme.heading}`}>{item.title}</h2>
                  <p className={`mt-4 leading-7 ${index === 1 ? 'text-white/78' : theme.muted}`}>{item.summary}</p>
                  <div className={`mt-6 rounded-2xl p-5 ${index === 1 ? 'bg-[#061523]' : 'bg-[#002147]/5'}`}>
                    <p className={`text-sm font-semibold ${index === 1 ? 'text-[#D4AF37]' : 'text-[#002147]'}`}>{locale === 'es' ? 'Resultado esperado' : 'Expected outcome'}</p>
                    <p className={`mt-2 ${index === 1 ? 'text-white/82' : theme.muted}`}>{item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`mt-12 rounded-[2rem] p-8 md:p-10 ${theme.panel}`}>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.finalTitle}</p>
            <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p className="max-w-3xl text-lg leading-8 text-white/82">{copy.finalText}</p>
              <Link href="/#contacto" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 font-bold text-[#002147]">
                {copy.primaryCta}
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
