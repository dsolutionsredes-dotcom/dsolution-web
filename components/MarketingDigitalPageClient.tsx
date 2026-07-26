'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar, { type NavLink } from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ContactSection from '@/components/ContactSection';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LineChart,
  Megaphone,
  Settings2,
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
    subtitle: 'Creamos campañas digitales claras, bien segmentadas y medibles para atraer a las personas correctas hacia tu negocio.',
    heroButton: 'Quiero impulsar mi negocio',
    servicesLabel: 'Servicios que ofrecemos',
    serviceItems: [
      ['Google Ads', 'Aparece justo cuando tus clientes buscan lo que ofreces, con campañas precisas que atraen contactos de calidad.'],
      ['Meta Ads', 'Creamos anuncios para Facebook e Instagram que captan atención y conectan con tu audiencia.'],
      ['Google Analytics', 'Configuramos métricas, eventos y conversiones para saber qué funciona y qué mejorar.'],
      ['Google Tag Manager', 'Instalamos etiquetas y tracking ordenado para tener datos claros desde el inicio.'],
    ],
    processTitle: 'Qué incluye nuestro servicio',
    process: [
      ['Configuración de campañas', 'Estructuramos campañas desde el inicio para atraer a tu cliente ideal.'],
      ['Creación de anuncios', 'Diseñamos anuncios con mensajes claros que captan atención rápido.'],
      ['Tracking y conversiones', 'Medimos lo importante para saber qué funciona y qué no.'],
      ['Optimización continua', 'Probamos, analizamos y ajustamos para mejorar cada campaña.'],
      ['Reporte claro', 'Te entregamos datos simples, insights y próximos pasos.'],
    ],
    audienceTitle: '¿Para quién es?',
    audience: [
      ['Negocios locales', 'Para negocios que quieren aparecer frente a personas cercanas y listas para contactarlos.'],
      ['Empresas en crecimiento', 'Para marcas que necesitan ordenar su marketing y dejar de improvisar.'],
      ['E-commerce', 'Para tiendas online que quieren campañas más claras, medibles y mejor dirigidas.'],
    ],
  },
  en: {
    cta: 'Let’s talk about your project',
    eyebrow: 'Service',
    titleA: 'Digital',
    titleB: 'marketing',
    subtitle: 'We build clear, well-targeted and measurable campaigns to attract the right people to your business.',
    heroButton: 'I want to grow my business',
    servicesLabel: 'What we offer',
    serviceItems: [
      ['Google Ads', 'Appear right when customers search for what you offer, with precise campaigns that attract quality enquiries.'],
      ['Meta Ads', 'We create Facebook and Instagram ads that grab attention and connect with your audience.'],
      ['Google Analytics', 'We configure metrics, events and conversions to know what works and what to improve.'],
      ['Google Tag Manager', 'We set up organised tags and tracking so your data is clear from day one.'],
    ],
    processTitle: 'What our service includes',
    process: [
      ['Campaign setup', 'We structure campaigns from the start to attract your ideal customer.'],
      ['Ad creation', 'We design ads with clear messages that quickly capture attention.'],
      ['Tracking & conversions', 'We measure what matters to know what works and what does not.'],
      ['Continuous optimisation', 'We test, analyse and adjust to improve every campaign.'],
      ['Clear reporting', 'We deliver simple data, insights and next steps.'],
    ],
    audienceTitle: 'Who is it for?',
    audience: [
      ['Local businesses', 'For businesses that want to appear in front of nearby people ready to contact them.'],
      ['Growing companies', 'For brands that need to organise their marketing and stop improvising.'],
      ['E-commerce', 'For online stores that need clearer, measurable and better-targeted campaigns.'],
    ],
  },
} as const;

const processIcons = [Target, Megaphone, LineChart, Settings2, FileText];
const audienceIcons = [Store, BriefcaseBusiness, ShoppingCart];
const audienceImages = ['/service-photography.jpg', '/service-marketing.jpg', '/service-web.jpg'];

function BrandMark({ label }: { label: string }) {
  if (label === 'Google Ads') {
    return (
      <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
        <span className="absolute h-9 w-3 -rotate-32 rounded-full bg-[#34A853]" />
        <span className="absolute h-9 w-3 rotate-32 rounded-full bg-[#4285F4]" />
        <span className="absolute bottom-3.5 right-3 h-3.5 w-3.5 rounded-full bg-[#FBBC05]" />
      </span>
    );
  }

  if (label === 'Meta Ads') {
    return (
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7 text-4xl font-black leading-none text-[#1877F2] shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
        ∞
      </span>
    );
  }

  if (label === 'Google Analytics') {
    return (
      <span className="inline-flex h-14 w-14 shrink-0 items-end justify-center gap-1 rounded-2xl border border-white/10 bg-white/7 px-3 pb-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
        <span className="h-3 w-2.5 rounded-full bg-[#F9AB00]" />
        <span className="h-6 w-2.5 rounded-full bg-[#E8710A]" />
        <span className="h-9 w-2.5 rounded-full bg-[#F9AB00]" />
      </span>
    );
  }

  return (
    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7 text-sm font-black text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
      GTM
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

            <div className="hidden lg:block" aria-hidden="true" />
          </div>

          <div className="relative z-10 mt-8 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#05121f]/94 p-7 shadow-[0_35px_80px_rgba(0,0,0,.34)] backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center gap-4">
              <p className="shrink-0 text-xs font-black uppercase tracking-[.2em] text-[#D4AF37]">{t.servicesLabel}</p>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(212,175,55,.55),transparent)]" />
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {t.serviceItems.map(([title, text]) => (
                <div key={title} className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-1 hover:bg-white/[0.07] md:border-r md:border-y-0 md:border-l-0 md:rounded-none md:bg-transparent md:p-0 md:pr-6 last:border-r-0">
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

      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-[-.03em] text-[#061523] md:text-4xl">{t.processTitle}</h2>
            <span className="mx-auto mt-4 block h-0.5 w-12 bg-[#D4AF37]" />
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#002147]/8 bg-[#F7F3EA] p-6 shadow-[0_28px_75px_rgba(0,33,71,.08)] md:p-8">
            <div className="grid gap-5 md:grid-cols-5">
              {t.process.map(([title, text], index) => {
                const Icon = processIcons[index];
                return (
                  <article key={title} className="relative rounded-[1.5rem] bg-white p-6 shadow-[0_18px_45px_rgba(0,33,71,.07)]">
                    {false && index < t.process.length - 1 && (
                      <span className="absolute -right-4 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-white text-[#D4AF37] shadow-lg md:flex">
                        <ArrowRight size={18} />
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F3EA] text-[#002147] shadow-[inset_0_0_0_1px_rgba(0,33,71,.06)]">
                        <Icon size={27} />
                      </span>
                      <span className="text-2xl font-black text-[#D4AF37]">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-[#061523]">{title}</h3>
                    <span className="mt-3 block h-0.5 w-10 bg-[#D4AF37]" />
                    <p className="mt-4 text-base leading-7 text-[#212529]/70">{text}</p>
                  </article>
                );
              })}
            </div>
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
