'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar, { type NavLink } from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ContactSection from '@/components/ContactSection';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  LineChart,
  Megaphone,
  Send,
  ShoppingCart,
  Store,
  Target,
} from 'lucide-react';

type Locale = 'es' | 'en';
const LOCALE_KEY = 'dsolution-language';

const navLinks = {
  es: [
    ['Inicio', '/'],
    ['Servicios', '/servicios'],
    ['Portafolio', '/#portafolio'],
    ['Proceso', '/#proceso'],
    ['Contacto', '#contacto'],
  ] as NavLink[],
  en: [
    ['Home', '/'],
    ['Services', '/servicios'],
    ['Portfolio', '/#portafolio'],
    ['Process', '/#proceso'],
    ['Contact', '#contacto'],
  ] as NavLink[],
};

const copy = {
  es: {
    cta: 'Hablemos de tu proyecto',
    eyebrow: 'Servicio',
    titleA: 'Marketing',
    titleB: 'digital',
    subtitle: 'Estrategias y campañas que se traducen en más clientes y mejores resultados.',
    heroButton: 'Quiero impulsar mi negocio',
    servicesLabel: 'Servicios que ofrecemos',
    serviceItems: [
      ['Google Ads', 'Búsqueda, display y remarketing.'],
      ['Meta Ads', 'Facebook e Instagram Ads.'],
      ['Google Analytics', 'Eventos y conversiones claras.'],
      ['Google Tag Manager', 'Tracking limpio y ordenado.'],
    ],
    processTitle: 'Cómo impulsamos tu negocio',
    process: [
      ['Estrategia', 'Definimos la mejor ruta.'],
      ['Ejecución', 'Lanzamos campañas efectivas.'],
      ['Optimización', 'Mejoramos con datos reales.'],
      ['Resultados', 'Medimos y reportamos claro.'],
    ],
    audienceTitle: '¿Para quién es?',
    audience: [
      ['Negocios locales', 'Más clientes cerca de tu zona.'],
      ['Empresas en crecimiento', 'Escalar con una estrategia clara.'],
      ['E-commerce', 'Convertir visitas en ventas.'],
    ],
  },
  en: {
    cta: 'Let’s talk about your project',
    eyebrow: 'Service',
    titleA: 'Digital',
    titleB: 'marketing',
    subtitle: 'Strategies and campaigns built to bring more customers and clearer results.',
    heroButton: 'I want to grow my business',
    servicesLabel: 'What we offer',
    serviceItems: [
      ['Google Ads', 'Search, display and remarketing.'],
      ['Meta Ads', 'Facebook and Instagram Ads.'],
      ['Google Analytics', 'Clear events and conversions.'],
      ['Google Tag Manager', 'Clean and organised tracking.'],
    ],
    processTitle: 'How we grow your business',
    process: [
      ['Strategy', 'We define the best route.'],
      ['Execution', 'We launch effective campaigns.'],
      ['Optimisation', 'We improve with real data.'],
      ['Results', 'We measure and report clearly.'],
    ],
    audienceTitle: 'Who is it for?',
    audience: [
      ['Local businesses', 'More customers near your area.'],
      ['Growing companies', 'Scale with a clear strategy.'],
      ['E-commerce', 'Turn visits into sales.'],
    ],
  },
} as const;

const processIcons = [Megaphone, Target, LineChart, BarChart3];
const audienceIcons = [Store, BriefcaseBusiness, ShoppingCart];
const audienceImages = ['/service-photography.jpg', '/service-marketing.jpg', '/service-web.jpg'];

function BrandMark({ label }: { label: string }) {
  const initials: Record<string, string> = {
    'Google Ads': 'A',
    'Meta Ads': '∞',
    'Google Analytics': 'GA',
    'Google Tag Manager': 'GTM',
  };
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-lg font-black text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,.1)]">
      {initials[label] || label.slice(0, 2)}
    </span>
  );
}

export default function MarketingDigitalPageClient() {
  const [locale, setLocale] = useState<Locale>('es');

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    if (stored === 'en' || stored === 'es') setLocale(stored);
  }, []);

  const handleLocale = (value: Locale) => {
    setLocale(value);
    window.localStorage.setItem(LOCALE_KEY, value);
  };

  const t = copy[locale];
  const links = navLinks[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
      <Navbar links={links} ctaLabel={t.cta} locale={locale} onLocaleChange={handleLocale} transparentOnTop />

      <section className="relative min-h-[760px] overflow-hidden bg-[#020912] px-5 pb-10 pt-28 text-white md:px-8 md:pt-32">
        <div className="absolute inset-0">
          <Image src="/service-marketing.jpg" alt="Marketing digital" fill priority className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(212,175,55,.16),transparent_30%),linear-gradient(90deg,rgba(2,9,18,.94)_0%,rgba(2,9,18,.76)_42%,rgba(2,9,18,.44)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-[.25em] text-[#D4AF37]">{t.eyebrow}</p>
              <h1 className="mt-5 text-5xl font-black leading-[.95] tracking-[-.055em] md:text-7xl">
                {t.titleA}
                <span className="block text-[#D4AF37]">{t.titleB}</span>
              </h1>
              <span className="mt-6 block h-0.5 w-16 bg-[#D4AF37]" />
              <p className="mt-6 max-w-md text-xl leading-8 text-white/86">{t.subtitle}</p>
              <a href="#contacto" className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-6 py-4 font-black text-[#002147] shadow-[0_22px_45px_rgba(212,175,55,.28)] transition hover:-translate-y-1 hover:bg-white">
                {t.heroButton}
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="hidden lg:block">
              <div className="relative ml-auto aspect-[1.35] max-w-2xl overflow-hidden rounded-[2rem] border border-white/18 bg-white/8 p-3 shadow-[0_40px_90px_rgba(0,0,0,.42)] backdrop-blur-sm">
                <div className="h-full rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(248,249,250,.72))] p-6 text-[#002147]">
                  <div className="grid grid-cols-4 gap-3">
                    {['Clicks', 'Leads', 'CPL', 'ROAS'].map((item, index) => (
                      <div key={item} className={`rounded-xl p-4 text-white ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-red-600' : index === 2 ? 'bg-green-600' : 'bg-indigo-700'}`}>
                        <p className="text-xs font-semibold opacity-80">{item}</p>
                        <p className="mt-1 text-xl font-black">{index === 0 ? '4.35K' : index === 1 ? '248' : index === 2 ? '€10.7' : '4.21'}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-[1.2fr_.8fr] gap-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="mb-5 h-2 w-32 rounded bg-slate-200" />
                      <div className="flex h-40 items-end gap-3">
                        {[44, 62, 46, 76, 54, 82, 68, 88].map((h, i) => <span key={i} className="flex-1 rounded-t bg-[#D4AF37]/75" style={{ height: `${h}%` }} />)}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="mx-auto h-28 w-28 rounded-full border-[18px] border-[#D4AF37] border-r-blue-600 border-t-green-600" />
                      <div className="mt-5 space-y-2">
                        <div className="h-2 rounded bg-slate-200" />
                        <div className="h-2 w-3/4 rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 -mb-24 mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#05121f]/92 p-7 shadow-[0_35px_80px_rgba(0,0,0,.34)] backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[.2em] text-[#D4AF37]">{t.servicesLabel}</p>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(212,175,55,.55),transparent)]" />
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {t.serviceItems.map(([title, text], index) => (
                <div key={title} className="flex gap-4 border-white/15 md:border-r md:pr-6 last:border-r-0">
                  <BrandMark label={title} />
                  <div>
                    <h3 className="font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-16 pt-36 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black uppercase tracking-[-.03em] text-[#061523]">{t.processTitle}</h2>
          <span className="mx-auto mt-4 block h-0.5 w-12 bg-[#D4AF37]" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {t.process.map(([title, text], index) => {
              const Icon = processIcons[index];
              return (
                <article key={title} className="relative text-left md:text-center">
                  {index < t.process.length - 1 && <div className="absolute left-[62%] top-11 hidden h-px w-[76%] bg-[#002147]/10 md:block" />}
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F3EA] text-[#002147] shadow-[inset_0_0_0_1px_rgba(0,33,71,.06)]">
                    <Icon size={28} />
                    <span className="absolute -right-3 -top-1 text-lg font-black text-[#D4AF37]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[#061523]">{title}</h3>
                  <p className="mx-auto mt-3 max-w-[13rem] text-sm leading-6 text-[#212529]/70">{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#020912] px-5 py-14 text-white md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.14),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(0,166,166,.12),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-[-.03em]">{t.audienceTitle}</h2>
            <span className="mx-auto mt-4 block h-0.5 w-12 bg-[#D4AF37]" />
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {t.audience.map(([title, text], index) => {
              const Icon = audienceIcons[index];
              return (
                <article key={title} className="group relative min-h-[250px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,.25)]">
                  <Image src={audienceImages[index]} alt={title} fill className="object-cover opacity-54 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-72 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,9,18,.90),rgba(2,9,18,.44))]" />
                  <div className="relative z-10 flex h-full min-h-[250px] items-end gap-5 p-7">
                    <span className="text-5xl font-black text-[#D4AF37]">0{index + 1}</span>
                    <div>
                      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#002147]">
                        <Icon size={25} />
                      </span>
                      <h3 className="text-2xl font-black text-white">{title}</h3>
                      <span className="mt-3 block h-0.5 w-10 bg-[#D4AF37]" />
                      <p className="mt-4 max-w-[13rem] text-sm leading-6 text-white/78">{text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#F7F3EA] pt-14">
        <ContactSection locale={locale} source="d-solution.org/marketing-digital" />
      </div>

      <SiteFooter locale={locale} links={links} />
    </main>
  );
}
