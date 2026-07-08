'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, Clapperboard, MessageSquare, Target } from 'lucide-react';
import Navbar, { type NavLink } from '@/components/Navbar';
import PromoPopup from '@/components/PromoPopup';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';
import { motion } from '@/components/Motion';
import { SERVICE_LINKS, serviceHrefFromTitle } from '@/lib/services';

export type SiteData = {
  site: { site_name?: string; footer_text?: string; seo_title?: string; seo_description?: string; primary_color?: string; secondary_color?: string; background_color?: string };
  home: { eyebrow?: string; hero_image?: string; hero_video?: string; hero_video_poster?: string; hero_title?: string; hero_subtitle?: string; primary_button_text?: string; primary_button_url?: string; secondary_button_text?: string; secondary_button_url?: string; primary_button_action?: string; secondary_button_action?: string; trusted_logos?: string; hero_image_url?: string; hero_video_url?: string; hero_video_poster_url?: string };
  about: { eyebrow?: string; about_image?: string; title?: string; intro?: string; difference?: string; where_we_work?: string; mission?: string; years_experience?: number; projects_count?: number; image_url?: string };
  contact: { email?: string; whatsapp?: string; city?: string; country?: string; instagram?: string; facebook?: string; tiktok?: string; n8n_webhook_url?: string };
  services: Array<{ title?: string; description?: string; icon?: string; image?: string; image_url?: string; button_text?: string; button_url?: string; button_action?: string }>;
  portfolio: Array<{ title?: string; category?: string; description?: string; project_url?: string; image?: string; image_url?: string }>;
  blog: Array<{ title?: string; excerpt?: string; category?: string; slug?: string; featured_image?: string; image_url?: string }>;
  flex: Array<{ title?: string; subtitle?: string; content?: string; section_type?: string; is_published?: boolean; link_text?: string; link_url?: string; button_text?: string; button_url?: string; image?: string; image_url?: string }>;
};

type Locale = 'es' | 'en';
type Props = { data: SiteData };
const LOCALE_KEY = 'dsolution-language';

const serviceMedia: Record<string, string> = {
  audiovisual: '/service-audiovisual.jpg',
  marketing: '/service-marketing.jpg',
  web: '/service-web.jpg',
  automation: '/service-automation.jpg',
  branding: '/service-branding.jpg',
  photography: '/service-photography.jpg',
};

const copy = {
  es: {
    nav: [['Inicio', '#inicio'], ['Servicios', '/servicios'], ['Portafolio', '#portafolio'], ['Nosotros', '#nosotros'], ['Contacto', '#contacto']] as NavLink[],
    cta: 'Hablemos de tu proyecto',
    heroLine1: 'Transformamos ideas',
    heroLine2: 'en experiencias digitales',
    servicesEyebrow: 'Servicios',
    servicesTitle: 'Soluciones creativas para impulsar tu negocio',
    servicesIntro: 'Servicios independientes o integrados en una estrategia completa para tu marca.',
    servicesButton: 'Explorar servicio',
    workTitle: 'Cómo trabajamos contigo',
    workText: 'Un proceso ágil y colaborativo para convertir ideas en resultados reales.',
    workCta: 'Hablemos de tu proyecto',
    whyTitle: '¿Por qué elegirnos?',
    toolsTitle: 'Herramientas que usamos para crear, medir y optimizar proyectos.',
    portfolioEyebrow: 'Portafolio',
    portfolioTitle: 'Proyectos que inspiran nuevas ideas',
    stats: [
      ['+10', 'años de experiencia'],
      ['+50', 'proyectos gestionados'],
      ['6', 'tipos de servicios que dominamos'],
      ['+10', 'plataformas utilizadas a nivel avanzado'],
    ],
    workSteps: [
      ['Entendemos', 'Escuchamos tu idea, analizamos tu negocio y definimos objetivos claros.'],
      ['Estrategia', 'Diseñamos un plan digital con canales, contenido y acciones clave.'],
      ['Creamos y ejecutamos', 'Producimos contenido, lanzamos campañas, webs o automatizaciones.'],
      ['Medimos y optimizamos', 'Analizamos resultados y ajustamos para mejorar el impacto.'],
    ],
    serviceDescriptions: [
      'Audio, video, luces, streaming y soporte técnico para experiencias profesionales.',
      'Google Ads, Analytics, Tag Manager y campañas enfocadas en resultados medibles.',
      'Sitios corporativos, landings y experiencias web rápidas, claras y optimizadas.',
      'Flujos inteligentes, agentes e integraciones que reducen tareas repetitivas.',
      'Identidad visual, piezas creativas y diseño coherente para tu marca.',
      'Fotografía comercial, de producto, retrato y eventos con imagen profesional.',
    ],
  },
  en: {
    nav: [['Home', '#inicio'], ['Services', '/servicios'], ['Portfolio', '#portafolio'], ['About', '#nosotros'], ['Contact', '#contacto']] as NavLink[],
    cta: 'Let’s talk about your project',
    heroLine1: 'We transform ideas',
    heroLine2: 'into digital experiences',
    servicesEyebrow: 'Services',
    servicesTitle: 'Creative solutions to move your business forward',
    servicesIntro: 'Independent services or integrated into a complete strategy for your brand.',
    servicesButton: 'Explore service',
    workTitle: 'How we work with you',
    workText: 'An agile and collaborative process to turn ideas into real results.',
    workCta: 'Let’s talk about your project',
    whyTitle: 'Why choose us?',
    toolsTitle: 'Tools we use to create, measure, and optimize projects.',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle: 'Projects that inspire new ideas',
    stats: [
      ['+10', 'years of experience'],
      ['+50', 'managed projects'],
      ['6', 'types of services we master'],
      ['+10', 'advanced platforms used'],
    ],
    workSteps: [
      ['We understand', 'We listen to your idea, analyse your business and define clear goals.'],
      ['Strategy', 'We design a digital plan with channels, content and key actions.'],
      ['We create and execute', 'We produce content, launch campaigns, websites or automations.'],
      ['We measure and optimize', 'We analyse results and adjust to improve impact.'],
    ],
    serviceDescriptions: [
      'Audio, video, lighting, streaming and technical support for professional experiences.',
      'Google Ads, Analytics, Tag Manager and campaigns focused on measurable results.',
      'Corporate websites, landing pages and fast, clear, optimised digital experiences.',
      'Smart workflows, agents and integrations that reduce repetitive work.',
      'Visual identity, creative assets and coherent design for your brand.',
      'Commercial, product, portrait and event photography with a professional image.',
    ],
  },
} as const;

const tools = [
  'Google Ads', 'Google Analytics', 'Google Tag Manager', 'Photoshop', 'Codex', 'Claude Code', 'Canva', 'n8n', 'Facebook Ads',
  'TikTok Ads', 'Automatización IA', 'WordPress', 'Next.js', 'Wix', 'vMix', 'Mimolive', 'ATEM Blackmagic', 'OBS'
];

const processIcons = [MessageSquare, Target, Clapperboard, BarChart3];
const processImages = ['/service-branding.jpg', '/service-marketing.jpg', '/service-audiovisual.jpg', '/service-web.jpg'];

function normalizeList(value?: string) { return (value || '').split(',').map(v => v.trim()).filter(Boolean); }
function MediaFallback({ className = '' }: { className?: string }) {
  return <div className={`h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_30%),linear-gradient(135deg,#09233d,#061523)] ${className}`} />;
}
function ImageBox({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  return <MediaFallback className={className} />;
}

export default function HomeClient({ data }: Props) {
  const { home, contact } = data;
  const trustedLogos = normalizeList(home.trusted_logos);
  const promoPopup = data.flex.find(item => item.is_published !== false && item.section_type === 'promo_popup');
  const [locale, setLocale] = useState<Locale>('es');

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    const browser = navigator.language.toLowerCase();
    const nextLocale: Locale = saved === 'en' || browser.startsWith('en') ? 'en' : 'es';
    setLocale(nextLocale);
  }, []);
  useEffect(() => { document.documentElement.lang = locale === 'en' ? 'en' : 'es-ES'; localStorage.setItem(LOCALE_KEY, locale); }, [locale]);

  const t = copy[locale];
  const localizedServices = useMemo(() => SERVICE_LINKS.map((service, index) => {
    const directus = data.services.find(item => serviceHrefFromTitle(item.title) === service.href) || data.services[index] || {};
    return { ...service, description: t.serviceDescriptions[index], image: directus.image_url || serviceMedia[service.key] };
  }), [data.services, t.serviceDescriptions]);
  const portfolio = data.portfolio.length ? data.portfolio : [
    { title: locale === 'es' ? 'Producción audiovisual' : 'Audiovisual production', category: 'Audiovisual', description: locale === 'es' ? 'Contenido visual y soporte técnico para comunicar con más impacto.' : 'Visual content and technical support for stronger communication.', image_url: '/service-audiovisual.jpg' },
    { title: locale === 'es' ? 'Campaña digital' : 'Digital campaign', category: 'Marketing', description: locale === 'es' ? 'Estrategia, medición y optimización para generar oportunidades reales.' : 'Strategy, measurement and optimisation to generate real opportunities.', image_url: '/service-marketing.jpg' },
    { title: locale === 'es' ? 'Sitio web corporativo' : 'Corporate website', category: 'Web', description: locale === 'es' ? 'Diseño y estructura para una presencia digital clara y premium.' : 'Design and structure for a clear premium digital presence.', image_url: '/service-web.jpg' },
  ];

  return <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
    <Navbar links={t.nav} ctaLabel={t.cta} locale={locale} onLocaleChange={setLocale} transparentOnTop />

    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#002147] text-white">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={home.hero_video_poster_url || home.hero_image_url || '/seo-image.jpg'}>
        <source src={home.hero_video_url || '/hero-dsolution-loop.mp4'} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.56),rgba(0,0,0,.38)_45%,rgba(0,0,0,.56)),linear-gradient(90deg,rgba(0,33,71,.38),rgba(0,33,71,.12),rgba(0,33,71,.38))]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 pb-20 pt-28 text-center md:px-8">
        <motion.div initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }} className="mx-auto max-w-5xl">
          <h1 className="text-[clamp(3.2rem,7vw,6.9rem)] leading-[.98] tracking-[-0.055em] text-white drop-shadow-[0_18px_45px_rgba(0,0,0,.38)]">
            <span className="block font-extrabold">{t.heroLine1}</span>
            <span className="block font-normal tracking-[-0.045em] text-white/95">{t.heroLine2}</span>
          </h1>
        </motion.div>
      </div>
    </section>

    {trustedLogos.length > 0 && <div className="border-b border-[#002147]/10 bg-white/70"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-5 py-5 text-sm font-semibold text-[#002147]/55 md:justify-between md:px-8">{trustedLogos.map(logo => <span key={logo}>{logo}</span>)}</div></div>}

    <section id="servicios" className="relative px-5 py-12 md:px-8 md:py-14">
      <div className="absolute left-0 top-8 h-48 w-32 rounded-r-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="mb-7 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.servicesEyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">{t.servicesTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#212529]/70 md:text-lg">{t.servicesIntro}</p>
        </motion.div>
        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/60 bg-[#002147] shadow-[0_24px_70px_rgba(0,33,71,.16)] md:grid-cols-3">
          {localizedServices.map((service, index) => <motion.a key={service.key} href={service.href} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .48, delay: index * .035 }} className="group relative min-h-[190px] overflow-hidden border-white/10 md:border-r md:border-b lg:min-h-[205px]">
            <img src={service.image} alt={locale === 'es' ? service.es : service.en} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus:scale-105 group-focus:grayscale-0" />
            <div className="absolute inset-0 bg-black/58 transition duration-500 group-hover:bg-black/32" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">0{index + 1}</p><h3 className="mt-2 text-xl font-bold tracking-wide md:text-2xl">{locale === 'es' ? service.es : service.en}</h3><p className="mt-2 max-w-sm text-sm leading-5 text-white/0 transition duration-500 group-hover:text-white/82">{service.description}</p><span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-sm font-bold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{t.servicesButton}<ArrowRight size={16}/></span></div>
          </motion.a>)}
        </div>
      </div>
    </section>

    <section id="nosotros" className="bg-[#050B14] px-5 py-16 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.78fr_1.72fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}>
          <p className="text-xs font-bold uppercase tracking-[.28em] text-[#D4AF37]">D-Solution</p>
          <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight md:text-5xl">{t.workTitle}</h2>
          <p className="mt-5 max-w-sm leading-7 text-white/72">{t.workText}</p>
          <a href="#contacto" className="mt-8 inline-flex h-[50px] items-center gap-3 rounded-full border border-[#D4AF37] px-6 text-sm font-bold text-[#D4AF37] transition hover:-translate-y-1 hover:bg-[#D4AF37] hover:text-[#002147]">{t.workCta}<ArrowRight size={16}/></a>
        </motion.div>
        <div className="grid gap-3 md:grid-cols-4">
          {t.workSteps.map(([title, text], i) => {
            const Icon = processIcons[i];
            return <motion.article key={title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * .06 }} className="group relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[.04] shadow-[0_20px_70px_rgba(0,0,0,.28)]">
              <img src={processImages[i]} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.76)_62%,rgba(0,0,0,.86))]" />
              {i < 3 && <div className="absolute right-[-.85rem] top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#050B14] text-[#D4AF37] md:flex"><ArrowRight size={16}/></div>}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-3xl font-bold text-[#D4AF37]">0{i + 1}</p>
                <div className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-black/35 text-[#D4AF37]"><Icon size={20}/></div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
              </div>
            </motion.article>;
          })}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#002147] px-5 py-12 text-white md:px-8">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(120deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:70px_70px]" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-7 text-center text-3xl font-semibold tracking-tight md:text-5xl">{t.whyTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map(([number, label], i) => <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: .5, delay: i * .05 }} className="rounded-[1.25rem] border border-white/10 bg-white/[.07] px-6 py-6 backdrop-blur"><strong className="text-4xl font-semibold text-[#D4AF37]">{number}</strong><p className="mt-4 text-sm leading-6 text-white/75">{label}</p></motion.div>)}
        </div>
      </div>
    </section>

    <section className="overflow-hidden bg-[#050B14] py-12 text-white">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-[#D4AF37]">Ecosistema</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold md:text-4xl">{t.toolsTitle}</h2>
      </div>
      <div className="mt-10 space-y-5">
        <div className="tools-marquee"><div className="tools-track tools-left">{[...tools.slice(0, 9), ...tools.slice(0, 9)].map((tool, index) => <span key={`${tool}-${index}`} className="tool-pill">{tool}</span>)}</div></div>
        <div className="tools-marquee"><div className="tools-track tools-right">{[...tools.slice(9), ...tools.slice(9)].map((tool, index) => <span key={`${tool}-${index}`} className="tool-pill">{tool}</span>)}</div></div>
      </div>
    </section>

    <section id="portafolio" className="border-y border-[#002147]/10 bg-white/60 px-5 py-16 md:px-8"><div className="mx-auto max-w-6xl"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.portfolioEyebrow}</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">{t.portfolioTitle}</h2></div><div className="grid gap-5 md:grid-cols-3">{portfolio.slice(0,3).map((p, i) => <motion.article key={`${p.title}-${i}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="overflow-hidden rounded-[1.6rem] border border-[#002147]/10 bg-white shadow-[0_16px_45px_rgba(0,33,71,.09)]"><div className="h-48"><ImageBox src={p.image_url} alt={p.title || 'Proyecto'} /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#B58F18]">{p.category}</p><h3 className="mt-3 text-xl font-semibold">{p.title}</h3><p className="mt-3 leading-7 text-[#212529]/68">{p.description}</p></div></motion.article>)}</div></div></section>

    <ContactSection locale={locale} contact={contact} source="d-solution.org" />
    <SiteFooter locale={locale} links={t.nav} />
    <PromoPopup promo={promoPopup} />
  </main>;
}
