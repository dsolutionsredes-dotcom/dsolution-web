'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Film, Layers3, Sparkles, TrendingUp } from 'lucide-react';
import Navbar, { type NavLink } from '@/components/Navbar';
import PromoPopup from '@/components/PromoPopup';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';
import { motion } from '@/components/Motion';
import { SERVICE_LINKS, serviceHrefFromTitle } from '@/lib/services';

export type SiteData = {
  site: { site_name?: string; footer_text?: string; seo_title?: string; seo_description?: string; primary_color?: string; secondary_color?: string; background_color?: string };
  home: { eyebrow?: string; hero_image?: string; hero_title?: string; hero_subtitle?: string; primary_button_text?: string; primary_button_url?: string; secondary_button_text?: string; secondary_button_url?: string; primary_button_action?: string; secondary_button_action?: string; trusted_logos?: string; hero_image_url?: string };
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
    nav: [['Inicio', '#inicio'], ['Servicios', '/servicios'], ['Portafolio', '#portafolio'], ['Nosotros', '#nosotros'], ['Blog', '#blog'], ['Contacto', '#contacto']] as NavLink[],
    cta: 'Hablemos de tu proyecto',
    heroEyebrow: 'AGENCIA DIGITAL EN BARCELONA',
    heroTitle: 'Transformamos ideas en experiencias digitales, audiovisuales y automatizadas.',
    heroSubtitle: 'Creamos soluciones para marcas que necesitan comunicar mejor, vender con estrategia y trabajar con procesos más inteligentes.',
    primary: 'Solicitar propuesta',
    secondary: 'Ver servicios',
    servicesEyebrow: 'Servicios',
    servicesTitle: 'Soluciones creativas para impulsar tu negocio',
    servicesIntro: 'Cada servicio puede funcionar de forma independiente o como parte de una estrategia completa para tu marca.',
    servicesButton: 'Explorar servicio',
    statsEyebrow: 'Experiencia aplicada',
    statsTitle: 'Una estructura pensada para pasar de la idea a la ejecución',
    collageEyebrow: 'Ecosistema visual',
    collageTitle: 'Contenido, tecnología y estrategia trabajando en una misma dirección',
    collageText: 'Unimos producción audiovisual, diseño, web, medición y automatización para construir experiencias más claras, modernas y medibles.',
    collageButton: 'Quiero saber más',
    portfolioEyebrow: 'Portafolio',
    portfolioTitle: 'Proyectos que inspiran nuevas ideas',
    blogEyebrow: 'Blog',
    blogTitle: 'Ideas que generan impacto',
    aboutEyebrow: 'Sobre nosotros',
    aboutTitle: 'De un proyecto en pareja a una agencia digital en crecimiento',
    aboutText: 'D-Solution nació como un mini proyecto en pareja y evolucionó hasta convertirse en una agencia digital en Barcelona y alrededores. Combinamos criterio técnico, creatividad y ejecución cercana para acompañar a marcas que quieren crecer.',
    stats: [
      ['+10', 'años de experiencia'],
      ['+50', 'proyectos gestionados'],
      ['6', 'tipos de servicios que dominamos'],
      ['+10', 'plataformas utilizadas a nivel avanzado'],
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
    nav: [['Home', '#inicio'], ['Services', '/servicios'], ['Portfolio', '#portafolio'], ['About', '#nosotros'], ['Blog', '#blog'], ['Contact', '#contacto']] as NavLink[],
    cta: 'Let’s talk about your project',
    heroEyebrow: 'DIGITAL AGENCY IN BARCELONA',
    heroTitle: 'We transform ideas into digital, audiovisual and automated experiences.',
    heroSubtitle: 'We create solutions for brands that need clearer communication, smarter strategy and more efficient processes.',
    primary: 'Request proposal',
    secondary: 'View services',
    servicesEyebrow: 'Services',
    servicesTitle: 'Creative solutions to move your business forward',
    servicesIntro: 'Each service can work independently or as part of a complete strategy for your brand.',
    servicesButton: 'Explore service',
    statsEyebrow: 'Applied experience',
    statsTitle: 'A structure designed to move from idea to execution',
    collageEyebrow: 'Visual ecosystem',
    collageTitle: 'Content, technology and strategy moving in the same direction',
    collageText: 'We connect audiovisual production, design, web, measurement and automation to build clearer, modern and measurable experiences.',
    collageButton: 'I want to know more',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle: 'Projects that inspire new ideas',
    blogEyebrow: 'Blog',
    blogTitle: 'Ideas that create impact',
    aboutEyebrow: 'About us',
    aboutTitle: 'From a couple’s small project to a growing digital agency',
    aboutText: 'D-Solution started as a small project created by a couple and evolved into a digital agency in Barcelona and nearby areas. We combine technical criteria, creativity and close execution to support brands that want to grow.',
    stats: [
      ['+10', 'years of experience'],
      ['+50', 'managed projects'],
      ['6', 'types of services we master'],
      ['+10', 'advanced platforms used'],
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

function normalizeList(value?: string) { return (value || '').split(',').map(v => v.trim()).filter(Boolean); }
function isExternal(url?: string) { return !!url && /^https?:\/\//.test(url); }
function openChatwoot() { const w = window as unknown as { $chatwoot?: { toggle?: (state?: string) => void } }; if (w.$chatwoot?.toggle) w.$chatwoot.toggle('open'); }
function getActionUrl(action?: string, url?: string, fallback = '#contacto', whatsapp?: string) {
  const normalized = (action || '').trim().toLowerCase();
  if (normalized === 'whatsapp') { const phone = (whatsapp || '').replace(/[^0-9]/g, ''); return phone ? `https://wa.me/${phone}` : fallback; }
  if (normalized === 'chat') return '#chatwoot';
  if (normalized === 'form') return '#contacto';
  return url || fallback;
}
function handleActionClick(action?: string) { if ((action || '').trim().toLowerCase() === 'chat') openChatwoot(); }

function MediaFallback({ className = '' }: { className?: string }) {
  return <div className={`h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_30%),linear-gradient(135deg,#09233d,#061523)] ${className}`} />;
}
function ImageBox({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  return <MediaFallback className={className} />;
}

export default function HomeClient({ data }: Props) {
  const { home, about, contact } = data;
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
    return { ...service, description: t.serviceDescriptions[index], image: directus.image_url || serviceMedia[service.key], directusTitle: directus.title };
  }), [data.services, t.serviceDescriptions]);
  const portfolio = data.portfolio.length ? data.portfolio : [
    { title: locale === 'es' ? 'Producción audiovisual' : 'Audiovisual production', category: 'Audiovisual', description: locale === 'es' ? 'Contenido visual y soporte técnico para comunicar con más impacto.' : 'Visual content and technical support for stronger communication.', image_url: '/service-audiovisual.jpg' },
    { title: locale === 'es' ? 'Campaña digital' : 'Digital campaign', category: 'Marketing', description: locale === 'es' ? 'Estrategia, medición y optimización para generar oportunidades reales.' : 'Strategy, measurement and optimisation to generate real opportunities.', image_url: '/service-marketing.jpg' },
    { title: locale === 'es' ? 'Sitio web corporativo' : 'Corporate website', category: 'Web', description: locale === 'es' ? 'Diseño y estructura para una presencia digital clara y premium.' : 'Design and structure for a clear premium digital presence.', image_url: '/service-web.jpg' },
  ];
  const blog = data.blog.length ? data.blog : [
    { title: locale === 'es' ? 'Marketing digital con medición real' : 'Digital marketing with real measurement', category: 'Marketing', excerpt: locale === 'es' ? 'Cómo ordenar campañas, datos y decisiones para vender mejor.' : 'How to organise campaigns, data and decisions to sell better.' },
    { title: locale === 'es' ? 'Video y streaming para marcas' : 'Video and streaming for brands', category: 'Audiovisual', excerpt: locale === 'es' ? 'Formatos visuales que ayudan a comunicar confianza.' : 'Visual formats that help communicate trust.' },
    { title: locale === 'es' ? 'Automatización e IA en negocios' : 'Automation and AI in business', category: 'AI', excerpt: locale === 'es' ? 'Procesos simples que ahorran tiempo y mejoran seguimiento.' : 'Simple processes that save time and improve follow-up.' },
  ];

  return <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
    <Navbar links={t.nav} ctaLabel={t.cta} locale={locale} onLocaleChange={setLocale} />

    <section id="inicio" className="relative min-h-[92vh] overflow-hidden bg-[#002147] text-white">
      <video className="absolute inset-0 h-full w-full object-cover opacity-75" autoPlay muted loop playsInline poster={home.hero_image_url || '/seo-image.jpg'}>
        <source src="/hero-dsolution-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,33,71,.96),rgba(0,33,71,.72)_42%,rgba(0,33,71,.34)),radial-gradient(circle_at_78%_38%,rgba(212,175,55,.18),transparent_24%)]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full border-[42px] border-[#D4AF37]/16" />
      <div className="pointer-events-none absolute bottom-[-5rem] left-[-4rem] h-72 w-72 rounded-full border-[38px] border-[#00A6A6]/16" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl items-center px-5 pb-20 pt-36 md:px-8">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="max-w-4xl">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[.28em] text-[#D4AF37] backdrop-blur">{home.eyebrow && locale === 'es' ? home.eyebrow : t.heroEyebrow}</p>
          <h1 className="mt-8 text-5xl font-semibold leading-[.98] tracking-tight md:text-7xl">{t.heroTitle}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">{t.heroSubtitle}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-7 py-4 text-sm font-bold text-[#002147] shadow-[0_18px_45px_rgba(212,175,55,.22)] transition hover:-translate-y-1">{locale === 'es' ? home.primary_button_text || t.primary : t.primary}<ArrowRight size={18}/></a>
            <a href="#servicios" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/22 bg-white/8 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/14">{locale === 'es' ? home.secondary_button_text || t.secondary : t.secondary}<ArrowRight size={18}/></a>
          </div>
          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[t.servicesEyebrow, t.statsEyebrow, t.collageEyebrow].map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-3 text-sm text-white/78 backdrop-blur"><CheckCircle2 size={16} className="text-[#D4AF37]" />{item}</span>)}
          </div>
        </motion.div>
      </div>
    </section>

    {trustedLogos.length > 0 && <div className="border-b border-[#002147]/10 bg-white/70"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-5 py-5 text-sm font-semibold text-[#002147]/55 md:justify-between md:px-8">{trustedLogos.map(logo => <span key={logo}>{logo}</span>)}</div></div>}

    <section id="servicios" className="relative px-5 py-20 md:px-8">
      <div className="absolute left-0 top-10 h-72 w-36 rounded-r-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="mb-12 grid gap-6 md:grid-cols-[.7fr_1.3fr] md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.servicesEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{t.servicesTitle}</h2></div>
          <p className="max-w-2xl text-lg leading-8 text-[#212529]/70">{t.servicesIntro}</p>
        </motion.div>
        <div className="grid overflow-hidden rounded-[2rem] border border-white/60 bg-[#002147] shadow-[0_30px_80px_rgba(0,33,71,.18)] md:grid-cols-3">
          {localizedServices.map((service, index) => <motion.a key={service.key} href={service.href} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .55, delay: index * .04 }} className="group relative min-h-[255px] overflow-hidden border-white/10 md:border-r md:border-b">
            <img src={service.image} alt={locale === 'es' ? service.es : service.en} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus:scale-105 group-focus:grayscale-0" />
            <div className="absolute inset-0 bg-black/56 transition duration-500 group-hover:bg-black/28" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">0{index + 1}</p><h3 className="mt-2 text-2xl font-bold tracking-wide">{locale === 'es' ? service.es : service.en}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/0 transition duration-500 group-hover:text-white/82">{service.description}</p><span className="mt-5 inline-flex translate-y-3 items-center gap-2 text-sm font-bold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{t.servicesButton}<ArrowRight size={16}/></span></div>
          </motion.a>)}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#002147] px-5 py-20 text-white md:px-8">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(120deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:70px_70px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -38 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.28em] text-[#D4AF37]">{t.statsEyebrow}</p><h2 className="mt-4 text-3xl font-semibold md:text-5xl">{t.statsTitle}</h2></motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map(([number, label], i) => <motion.div key={label} initial={{ opacity: 0, y: 55, rotate: i % 2 ? 1.8 : -1.8 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: .58, delay: i * .07 }} className="rounded-[1.5rem] border border-white/10 bg-white/[.07] p-7 backdrop-blur"><strong className="text-5xl font-semibold text-[#D4AF37]">{number}</strong><p className="mt-5 leading-7 text-white/75">{label}</p></motion.div>)}
        </div>
      </div>
    </section>

    <section id="nosotros" className="relative px-5 py-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.95fr_1.05fr] md:items-center">
        <motion.div initial={{ opacity: 0, x: -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="relative h-[520px]">
          <div className="absolute left-0 top-0 h-[58%] w-[64%] overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(0,33,71,.18)]"><ImageBox src="/service-audiovisual.jpg" alt="Audiovisual" className="grayscale-[.2]" /></div>
          <div className="absolute right-0 top-20 h-[48%] w-[54%] overflow-hidden rounded-[2rem] border-8 border-[#F7F3EA] shadow-[0_28px_70px_rgba(0,33,71,.18)]"><ImageBox src="/service-web.jpg" alt="Web" /></div>
          <div className="absolute bottom-0 left-24 h-[42%] w-[58%] overflow-hidden rounded-[2rem] border-8 border-[#F7F3EA] shadow-[0_28px_70px_rgba(0,33,71,.18)]"><ImageBox src={about.image_url || '/service-branding.jpg'} alt="D-Solution" /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.aboutEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{t.aboutTitle}</h2><p className="mt-6 text-lg leading-8 text-[#212529]/72">{t.aboutText}</p><div className="mt-8 flex flex-wrap gap-3">{['Audiovisual', 'Marketing', 'Web', 'IA'].map(item => <span key={item} className="rounded-full border border-[#002147]/10 bg-white px-4 py-2 text-sm font-bold text-[#002147]/75">{item}</span>)}</div></motion.div>
      </div>
    </section>

    <section className="px-5 pb-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.4rem] bg-white p-7 shadow-[0_28px_75px_rgba(0,33,71,.11)] md:grid-cols-[.85fr_1.15fr] md:p-10">
        <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.collageEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{t.collageTitle}</h2><p className="mt-5 text-lg leading-8 text-[#212529]/72">{t.collageText}</p><a href="#contacto" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-7 py-4 text-sm font-bold text-[#002147] transition hover:-translate-y-1">{t.collageButton}<ArrowRight size={17}/></a></motion.div>
        <motion.div initial={{ opacity: 0, y: 54 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4"><div className="h-44 overflow-hidden rounded-[1.5rem]"><ImageBox src="/service-marketing.jpg" alt="Marketing" /></div><div className="row-span-2 h-full min-h-[22rem] overflow-hidden rounded-[1.5rem]"><ImageBox src="/service-photography.jpg" alt="Fotografía" /></div><div className="h-44 overflow-hidden rounded-[1.5rem]"><ImageBox src="/service-automation.jpg" alt="Automatización" /></div></motion.div>
      </div>
    </section>

    <section id="portafolio" className="border-y border-[#002147]/10 bg-white/60 px-5 py-20 md:px-8"><div className="mx-auto max-w-6xl"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.portfolioEyebrow}</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">{t.portfolioTitle}</h2></div><div className="grid gap-5 md:grid-cols-3">{portfolio.slice(0,3).map((p, i) => <motion.article key={`${p.title}-${i}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="overflow-hidden rounded-[1.6rem] border border-[#002147]/10 bg-white shadow-[0_16px_45px_rgba(0,33,71,.09)]"><div className="h-48"><ImageBox src={p.image_url} alt={p.title || 'Proyecto'} /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#B58F18]">{p.category}</p><h3 className="mt-3 text-xl font-semibold">{p.title}</h3><p className="mt-3 leading-7 text-[#212529]/68">{p.description}</p></div></motion.article>)}</div></div></section>

    <section id="blog" className="px-5 py-20 md:px-8"><div className="mx-auto max-w-6xl"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.blogEyebrow}</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">{t.blogTitle}</h2></div><div className="grid gap-5 md:grid-cols-3">{blog.slice(0,3).map((post, i) => <article key={`${post.title}-${i}`} className="rounded-[1.6rem] border border-[#002147]/10 bg-white p-6 shadow-[0_16px_45px_rgba(0,33,71,.07)]"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#B58F18]">{post.category}</p><h3 className="mt-3 text-xl font-semibold">{post.title}</h3><p className="mt-3 leading-7 text-[#212529]/68">{post.excerpt}</p></article>)}</div></div></section>

    <ContactSection locale={locale} contact={contact} source="d-solution.org" />
    <SiteFooter locale={locale} links={t.nav} />
    <PromoPopup promo={promoPopup} />
  </main>;
}
