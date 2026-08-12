'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar, { type NavLink } from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ContactSection from '@/components/ContactSection';
import type { ServiceKey } from '@/lib/services';
import type { LucideIcon } from 'lucide-react';
import DirectusVisualEditing, { directusAttr, isDirectusVisualEditingFrame } from '@/components/DirectusVisualEditing';
import { elementText, pageElement, type PageElement } from '@/lib/page-elements';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot as BotIcon,
  Camera,
  CheckCircle2,
  CircleDot,
  Layers3,
  LineChart,
  Megaphone,
  MonitorPlay,
  Radio,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from 'lucide-react';

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
  serviceKey: ServiceKey;
  localeContent: Record<Locale, Content>;
  variant: 'immersive' | 'editorial';
  pageElements?: PageElement[];
};

const LOCALE_KEY = 'dsolution-language';

const iconSet: Record<ServiceKey, readonly LucideIcon[]> = {
  audiovisual: [Radio, Camera, MonitorPlay, Layers3],
  marketing: [Megaphone, Target, LineChart, Workflow],
  web: [MonitorPlay, Layers3, Workflow, Zap],
  automation: [Workflow, Zap, BotIcon, LineChart],
  branding: [Sparkles, Target, Layers3, Camera],
  photography: [Camera, Sparkles, Target, MonitorPlay],
};

const serviceMicrocopy: Record<ServiceKey, Record<Locale, readonly string[]>> = {
  audiovisual: { es: ['Audio', 'Video', 'Luces', 'Streaming'], en: ['Audio', 'Video', 'Lighting', 'Streaming'] },
  marketing: { es: ['Ads', 'Analytics', 'Tracking', 'Reporting'], en: ['Ads', 'Analytics', 'Tracking', 'Reporting'] },
  web: { es: ['UX', 'Web', 'SEO', 'Conversión'], en: ['UX', 'Web', 'SEO', 'Conversion'] },
  automation: { es: ['Flujos', 'IA', 'Integraciones', 'Escala'], en: ['Flows', 'AI', 'Integrations', 'Scale'] },
  branding: { es: ['Identidad', 'Diseño', 'Campañas', 'Sistema'], en: ['Identity', 'Design', 'Campaigns', 'System'] },
  photography: { es: ['Producto', 'Marca', 'Eventos', 'Edición'], en: ['Product', 'Brand', 'Events', 'Editing'] },
};

function AbstractServiceVisual({
  serviceKey,
  locale,
  pageElements,
  visualEditingEnabled,
}: {
  serviceKey: Props['serviceKey'];
  locale: Locale;
  pageElements: PageElement[];
  visualEditingEnabled: boolean;
}) {
  const page = servicePageKey[serviceKey];
  const editable = (key: string) => pageElement(pageElements, page, locale, key);
  const text = (key: string, fallback: string) => elementText(editable(key), fallback);
  const attrs = (key: string) => directusAttr(visualEditingEnabled, 'page_elements', editable(key)?.id, 'text');
  const labels = serviceMicrocopy[serviceKey][locale].map((label, index) => text(`visual.label.${index + 1}`, label));
  const Icons = iconSet[serviceKey];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(248,249,250,.72))] p-5 shadow-[0_28px_70px_rgba(0,33,71,.16)]">
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#D4AF37]/24 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#00A6A6]/18 blur-2xl" />

      <div className="relative rounded-[1.5rem] bg-[#002147] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#D4AF37]" data-directus={attrs('micro.brand')}>{text('micro.brand', 'D-Solution')}</p>
            <p className="mt-1 text-sm text-white/65" data-directus={attrs('micro.subtitle')}>{text('micro.subtitle', serviceKey === 'audiovisual' ? 'Live setup' : 'Growth system')}</p>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#D4AF37]">
            {serviceKey === 'audiovisual' ? <MonitorPlay size={23} /> : <BarChart3 size={23} />}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {labels.map((label, index) => {
            const Icon = Icons[index];
            return (
              <div key={label} className="group rounded-2xl border border-white/10 bg-white/[.07] p-4 transition hover:-translate-y-1 hover:bg-white/[.11]">
                <Icon size={21} className="text-[#D4AF37]" />
                <p className="mt-4 text-sm font-semibold text-white" data-directus={attrs(`visual.label.${index + 1}`)}>{label}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#D4AF37,#00A6A6)]" style={{ width: `${55 + index * 12}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-[#D4AF37]/25 bg-[#061523]/80 p-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00A6A6] opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00A6A6]" />
            </span>
            <p className="text-sm font-semibold text-white" data-directus={attrs('micro.ready')}>{text('micro.ready', locale === 'es' ? 'Sistema preparado para ejecución' : 'System ready for execution')}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-white/68">
            <span className="rounded-xl bg-white/5 px-2 py-2" data-directus={attrs('micro.plan')}>{text('micro.plan', 'Plan')}</span>
            <span className="rounded-xl bg-white/5 px-2 py-2" data-directus={attrs('micro.setup')}>{text('micro.setup', 'Setup')}</span>
            <span className="rounded-xl bg-white/5 px-2 py-2" data-directus={attrs('micro.result')}>{text('micro.result', 'Result')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const servicePageKey: Record<ServiceKey, string> = {
  audiovisual: 'service-audiovisual', marketing: 'service-marketing', web: 'service-web',
  automation: 'service-automation', branding: 'service-branding', photography: 'service-photography',
};

export default function ServicePageClient({ serviceKey, localeContent, variant, pageElements = [] }: Props) {
  const [locale, setLocale] = useState<Locale>('es');
  const [visualEditingEnabled, setVisualEditingEnabled] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(LOCALE_KEY) : null;
    if (stored === 'en' || stored === 'es') setLocale(stored);
    setVisualEditingEnabled(isDirectusVisualEditingFrame());
  }, []);

  const handleLocale = (value: Locale) => {
    setLocale(value);
    window.localStorage.setItem(LOCALE_KEY, value);
  };

  const page = servicePageKey[serviceKey];
  const baseCopy = localeContent[locale];
  const item = (key: string) => pageElement(pageElements, page, locale, key);
  const text = (key: string, fallback: string, field: 'text' | 'secondary_text' | 'tertiary_text' = 'text') => elementText(item(key), fallback, field);
  const attr = (key: string, field: 'text' | 'secondary_text' | 'tertiary_text' | 'link' | 'image' = 'text') => directusAttr(visualEditingEnabled, 'page_elements', item(key)?.id, field);
  const copy: Content = {
    ...baseCopy,
    heroEyebrow: text('heroEyebrow', baseCopy.heroEyebrow),
    heroTitle: text('heroTitle', baseCopy.heroTitle),
    heroSubtitle: text('heroSubtitle', baseCopy.heroSubtitle),
    primaryCta: text('primaryCta', baseCopy.primaryCta),
    secondaryCta: text('secondaryCta', baseCopy.secondaryCta),
    includesTitle: text('includesTitle', baseCopy.includesTitle),
    includes: baseCopy.includes.map((value, index) => text(`includes.${index + 1}`, value)),
    audienceTitle: text('audienceTitle', baseCopy.audienceTitle),
    audience: baseCopy.audience.map((value, index) => text(`audience.${index + 1}`, value)),
    examplesTitle: text('examplesTitle', baseCopy.examplesTitle),
    examples: baseCopy.examples.map((value, index) => ({
      title: text(`examples.${index + 1}`, value.title),
      summary: text(`examples.${index + 1}`, value.summary, 'secondary_text'),
      result: text(`examples.${index + 1}`, value.result, 'tertiary_text'),
    })),
    resultsTitle: text('resultsTitle', baseCopy.resultsTitle),
    results: baseCopy.results.map((value, index) => text(`results.${index + 1}`, value)),
    finalTitle: text('finalTitle', baseCopy.finalTitle),
    finalText: text('finalText', baseCopy.finalText),
  };
  const Icons = useMemo(() => iconSet[serviceKey], [serviceKey]);
  const MainIcon = Icons[0];
  const navKeys = ['home', 'services', 'portfolio', 'process', 'contact'];
  const fallbackNav = (locale === 'es' ? [['Inicio', '/'], ['Servicios', '/servicios'], ['Portafolio', '/#portafolio'], ['Proceso', '/#proceso'], ['Contacto', '#contacto']] : [['Home', '/'], ['Services', '/servicios'], ['Portfolio', '/#portafolio'], ['Process', '/#proceso'], ['Contact', '#contacto']]) as NavLink[];
  const globalItem = (key: string) => pageElement(pageElements, 'global', locale, key);
  const nav = fallbackNav.map(([label, href], index) => {
    const content = globalItem(`nav.${navKeys[index]}`);
    return [elementText(content, label), content?.link || href] as NavLink;
  });
  const navItems = navKeys.map(key => globalItem(`nav.${key}`));

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#F8F9FA] text-[#002147]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 10% 6%, rgba(212,175,55,.18), transparent 26%), radial-gradient(circle at 92% 20%, rgba(0,166,166,.12), transparent 28%), linear-gradient(180deg,#F8F9FA 0%,#F4EFE4 52%,#FFFFFF 100%)',
      }}
    >
      <DirectusVisualEditing enabled={visualEditingEnabled} refreshKey={`${page}:${locale}:${pageElements.length}`} />
      <Navbar
        links={nav}
        ctaLabel={copy.primaryCta}
        locale={locale}
        onLocaleChange={handleLocale}
        editableLinks={navItems}
        ctaElement={item('primaryCta')}
        visualEditingEnabled={visualEditingEnabled}
        pageElements={pageElements}
      />

      <section className="relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute left-[-7rem] top-20 h-72 w-72 rounded-full border-[48px] border-[#D4AF37]/10" />
        <div className="pointer-events-none absolute right-[-8rem] top-44 h-80 w-80 rounded-full border-[54px] border-[#00A6A6]/10" />

        <div className="relative mx-auto max-w-6xl">
          <Link href="/servicios" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B58F18] transition hover:text-[#002147]" data-directus={attr('micro.back')}>
            <ArrowLeft size={16} />
            {text('micro.back', locale === 'es' ? 'Volver a servicios' : 'Back to services')}
          </Link>

          <div data-variant={variant} className="mt-8 grid gap-8 rounded-[2.2rem] border border-white/70 bg-white/[.86] p-7 shadow-[0_28px_80px_rgba(0,33,71,.12)] backdrop-blur-xl md:grid-cols-[1fr_.94fr] md:p-10">
            <div className="relative">
              <div className="absolute -left-4 top-4 h-24 w-24 rounded-full bg-[#D4AF37]/16 blur-xl" />
              <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/18 text-[#002147] ring-1 ring-[#D4AF37]/22">
                <MainIcon size={28} />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]" data-directus={attr('heroEyebrow')}>{copy.heroEyebrow}</p>
              <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[#002147] md:text-6xl" data-directus={attr('heroTitle')}>{copy.heroTitle}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#212529]/78" data-directus={attr('heroSubtitle')}>{copy.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#contacto" className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 font-bold text-[#002147] shadow-[0_14px_28px_rgba(212,175,55,.28)] transition hover:-translate-y-1" data-directus={attr('primaryCta')}>{copy.primaryCta} <ArrowRight size={17} /></Link>
                <Link href="/#portafolio" className="inline-flex items-center gap-2 rounded-xl border border-[#002147]/15 bg-white/70 px-6 py-3.5 font-semibold text-[#002147] transition hover:-translate-y-1 hover:border-[#D4AF37]" data-directus={attr('secondaryCta')}>{copy.secondaryCta}</Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                {copy.results.slice(0, 3).map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#002147]/10 bg-[#F8F9FA] px-4 py-2 text-sm font-semibold text-[#002147]/76">
                    <CheckCircle2 size={16} className="text-[#D4AF37]" />
                    <span data-directus={attr(`results.${copy.results.indexOf(item) + 1}`)}>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <AbstractServiceVisual serviceKey={serviceKey} locale={locale} pageElements={pageElements} visualEditingEnabled={visualEditingEnabled} />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white p-7 shadow-[0_22px_60px_rgba(0,33,71,.10)] md:p-8">
              <div className="absolute right-[-3rem] top-[-3rem] h-32 w-32 rounded-full bg-[#D4AF37]/12" />
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#B58F18]" data-directus={attr('includesTitle')}>{copy.includesTitle}</p>
              <div className="mt-6 grid gap-4">
                {copy.includes.map((item, index) => {
                  const Icon = Icons[index] || CheckCircle2;
                  return (
                    <div key={item} className="group flex items-start gap-4 rounded-2xl border border-slate-200/75 bg-[#F8F9FA] p-4 transition hover:-translate-y-1 hover:border-[#D4AF37]/55 hover:bg-white hover:shadow-[0_16px_35px_rgba(0,33,71,.08)]">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002147] text-[#D4AF37]">
                        <Icon size={19} />
                      </span>
                      <p className="leading-7 text-[#212529]/78" data-directus={attr(`includes.${index + 1}`)}>{item}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[#002147]/10 bg-[#002147] p-7 text-white shadow-[0_26px_70px_rgba(0,33,71,.22)] md:p-8">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00A6A6]/18 blur-2xl" />
              <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-[#D4AF37]/15 blur-2xl" />
              <p className="relative text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]" data-directus={attr('audienceTitle')}>{copy.audienceTitle}</p>
              <div className="relative mt-6 grid gap-4">
                {copy.audience.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[.07] p-5 transition hover:-translate-y-1 hover:bg-white/[.11]">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#002147]">
                      <CircleDot size={16} />
                    </span>
                    <p className="leading-7 text-white/82" data-directus={attr(`audience.${index + 1}`)}>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#B58F18]" data-directus={attr('examplesTitle')}>{copy.examplesTitle}</p>
              <div className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(212,175,55,.8),transparent)] md:block" />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {copy.examples.map((item, index) => (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[2rem] p-7 transition hover:-translate-y-1 ${
                    index === 1
                      ? 'border border-[#002147]/10 bg-[#002147] text-white shadow-[0_26px_70px_rgba(0,33,71,.20)]'
                      : 'border border-white/75 bg-white text-[#002147] shadow-[0_22px_60px_rgba(0,33,71,.10)]'
                  }`}
                >
                  <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${index === 1 ? 'bg-[#00A6A6]/20' : 'bg-[#D4AF37]/12'} transition group-hover:scale-125`} />
                  <div className="relative">
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? 'bg-white/10 text-[#D4AF37]' : 'bg-[#F8F9FA] text-[#002147]'}`}>
                      {index === 0 ? <MonitorPlay size={22} /> : index === 1 ? <Sparkles size={22} /> : <Zap size={22} />}
                    </span>
                    <p className={`mt-5 text-xs font-bold uppercase tracking-[.22em] ${index === 1 ? 'text-[#D4AF37]' : 'text-[#B58F18]'}`} data-directus={attr('micro.example')}>{text('micro.example', locale === 'es' ? 'Ejemplo ilustrativo' : 'Illustrative example')}</p>
                    <h2 className={`mt-4 text-2xl font-semibold ${index === 1 ? 'text-white' : 'text-[#002147]'}`} data-directus={attr(`examples.${index + 1}`)}>{item.title}</h2>
                    <p className={`mt-4 leading-7 ${index === 1 ? 'text-white/76' : 'text-[#212529]/76'}`} data-directus={attr(`examples.${index + 1}`, 'secondary_text')}>{item.summary}</p>
                    <div className={`mt-6 rounded-2xl p-5 ${index === 1 ? 'border border-white/10 bg-[#061523]' : 'bg-[#F4EFE4]'}`}>
                      <p className={`text-sm font-semibold ${index === 1 ? 'text-[#D4AF37]' : 'text-[#002147]'}`} data-directus={attr('micro.expected')}>{text('micro.expected', locale === 'es' ? 'Resultado esperado' : 'Expected outcome')}</p>
                      <p className={`mt-2 leading-7 ${index === 1 ? 'text-white/80' : 'text-[#212529]/76'}`} data-directus={attr(`examples.${index + 1}`, 'tertiary_text')}>{item.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-14 -mx-5 md:-mx-8">
            <ContactSection locale={locale} source={`d-solution.org/${serviceKey}`} visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} links={nav} visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />
    </main>
  );
}
