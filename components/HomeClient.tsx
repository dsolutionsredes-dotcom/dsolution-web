'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, Bot, Braces, Camera, Clapperboard, Code2, Facebook, Folder, Globe2, MessageSquare, MonitorPlay, Palette, Rocket, Search, Target, Video } from 'lucide-react';
import Navbar, { type NavLink } from '@/components/Navbar';
import PromoPopup from '@/components/PromoPopup';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';
import { motion } from '@/components/Motion';
import { SERVICE_LINKS, serviceHrefFromTitle } from '@/lib/services';
import DirectusVisualEditing, { directusAttr, isDirectusVisualEditingFrame } from '@/components/DirectusVisualEditing';

type DirectusId = string | number;

export type SiteData = {
  site: { id?: DirectusId; site_name?: string; footer_text?: string; seo_title?: string; seo_description?: string; primary_color?: string; secondary_color?: string; background_color?: string; popup_delay_seconds?: number | string };
  home: { id?: DirectusId; eyebrow?: string; hero_image?: string; hero_video?: string; hero_video_poster?: string; hero_title?: string; hero_subtitle?: string; primary_button_text?: string; primary_button_url?: string; secondary_button_text?: string; secondary_button_url?: string; primary_button_action?: string; secondary_button_action?: string; trusted_logos?: string; hero_image_url?: string; hero_video_url?: string; hero_video_poster_url?: string };
  about: { id?: DirectusId; eyebrow?: string; about_image?: string; title?: string; intro?: string; difference?: string; where_we_work?: string; mission?: string; years_experience?: number; projects_count?: number; image_url?: string };
  contact: { id?: DirectusId; email?: string; whatsapp?: string; city?: string; country?: string; instagram?: string; facebook?: string; tiktok?: string; n8n_webhook_url?: string };
  services: Array<{ id?: DirectusId; title?: string; description?: string; icon?: string; image?: string; image_url?: string; button_text?: string; button_url?: string; button_action?: string }>;
  portfolio: Array<{ id?: DirectusId; title?: string; category?: string; description?: string; project_url?: string; image?: string; image_url?: string }>;
  blog: Array<{ id?: DirectusId; title?: string; excerpt?: string; category?: string; slug?: string; featured_image?: string; image_url?: string }>;
  flex: Array<{ id?: DirectusId; title?: string; subtitle?: string; content?: string; section_type?: string; is_published?: boolean; link_text?: string; link_url?: string; button_text?: string; button_url?: string; image?: string; image_url?: string }>;
  process_steps?: Array<{ id?: DirectusId; title?: string; description?: string; icon?: string; sort?: number; is_published?: boolean; image?: string | { id?: string }; image_url?: string; Image?: string; process_image?: string; background_image?: string }>;
};

type Locale = 'es' | 'en';
type Props = { data: SiteData };
type DirectusProcessStep = NonNullable<SiteData['process_steps']>[number];
const LOCALE_KEY = 'dsolution-language';

const serviceMedia: Record<string, string> = {
  audiovisual: '/service-audiovisual.jpg',
  marketing: '/service-marketing.jpg',
  web: '/service-web.jpg',
  automation: '/service-automation.jpg',
  branding: '/service-branding.jpg',
  photography: '/service-photography.jpg',
};

const DIRECTUS_PUBLIC_URL = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');

function normalizeDirectusAsset(file: unknown): string | undefined {
  if (!file) return undefined;
  if (typeof file === 'string') {
    return file.startsWith('http') || file.startsWith('/') ? file : `${DIRECTUS_PUBLIC_URL}/assets/${file}`;
  }
  if (Array.isArray(file)) return normalizeDirectusAsset(file[0]);
  if (typeof file === 'object') {
    const obj = file as {
      id?: string;
      uuid?: string;
      filename_disk?: string;
      data?: unknown;
      image?: unknown;
      Image?: unknown;
      file?: unknown;
      files?: unknown;
      directus_files_id?: unknown;
      process_image?: unknown;
      background_image?: unknown;
    };
    const id = obj.id || obj.uuid || obj.filename_disk;
    if (id) return `${DIRECTUS_PUBLIC_URL}/assets/${id}`;
    return normalizeDirectusAsset(obj.data || obj.image || obj.Image || obj.file || obj.files || obj.directus_files_id || obj.process_image || obj.background_image);
  }
  return undefined;
}

const copy = {
  es: {
    nav: [['Inicio', '#inicio'], ['Servicios', '/servicios'], ['Portafolio', '#portafolio'], ['Proceso', '#proceso'], ['Contacto', '#contacto']] as NavLink[],
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
    whyHeadline: 'Resultados que hablan por nosotros',
    toolsTitle: 'Herramientas que usamos para crear, medir y optimizar proyectos.',
    portfolioEyebrow: 'Portafolio',
    portfolioTitle: 'Proyectos que inspiran nuevas ideas',
    portfolioIntro: 'Una selección de trabajos que combinan estrategia, creatividad y tecnología.',
    portfolioButton: 'Ver proyecto',
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
    nav: [['Home', '#inicio'], ['Services', '/servicios'], ['Portfolio', '#portafolio'], ['Process', '#proceso'], ['Contact', '#contacto']] as NavLink[],
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
    whyHeadline: 'Results that speak for us',
    toolsTitle: 'Tools we use to create, measure, and optimize projects.',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle: 'Projects that inspire new ideas',
    portfolioIntro: 'A selection of work combining strategy, creativity and technology.',
    portfolioButton: 'View project',
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
  { name: 'Canva', mark: 'C', tone: '#7C5CFF' },
  { name: 'Facebook Ads', mark: 'Meta', tone: '#1877F2' },
  { name: 'Google Ads', mark: 'Ads', tone: '#34A853' },
  { name: 'Google Analytics', mark: 'GA', tone: '#F9AB00' },
  { name: 'Google Tag Manager', mark: 'GTM', tone: '#4285F4' },
  { name: 'Photoshop', mark: 'Ps', tone: '#31A8FF' },
  { name: 'Codex', mark: '◎', tone: '#FFFFFF' },
  { name: 'Claude Code', mark: 'AI', tone: '#D97745' },
  { name: 'n8n', mark: 'n8n', tone: '#EA4B71' },
  { name: 'WordPress', mark: 'W', tone: '#FFFFFF' },
  { name: 'Next.js', mark: 'N', tone: '#FFFFFF' },
  { name: 'Wix', mark: 'Wix', tone: '#FFFFFF' },
  { name: 'vMix', mark: 'vM', tone: '#2196F3' },
  { name: 'Mimolive', mark: '▶', tone: '#FF5A5F' },
  { name: 'ATEM Blackmagic', mark: 'BM', tone: '#F4B400' },
  { name: 'OBS', mark: '○', tone: '#FFFFFF' },
  { name: 'TikTok Ads', mark: '♪', tone: '#25F4EE' },
  { name: 'Automatización IA', mark: 'AI', tone: '#D4AF37' },
];

const processIcons = [MessageSquare, Target, Clapperboard, BarChart3];
const processImages = ['/service-branding.jpg', '/service-marketing.jpg', '/service-audiovisual.jpg', '/service-web.jpg'];
const processIconMap: Record<string, typeof MessageSquare> = {
  message: MessageSquare,
  chat: MessageSquare,
  target: Target,
  strategy: Target,
  clapperboard: Clapperboard,
  video: Clapperboard,
  chart: BarChart3,
  analytics: BarChart3,
};

function normalizeList(value?: string) { return (value || '').split(',').map(v => v.trim()).filter(Boolean); }
function splitHeroTitle(value: string): [string, string] {
  const explicitLines = value.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (explicitLines.length > 1) return [explicitLines[0], explicitLines.slice(1).join(' ')];

  const connective = value.match(/\s+(en|into)\s+/i);
  if (connective?.index) {
    return [value.slice(0, connective.index).trim(), value.slice(connective.index).trim()];
  }

  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length < 4) return [value.trim(), ''];

  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')];
}
function MediaFallback({ className = '' }: { className?: string }) {
  return <div className={`h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_30%),linear-gradient(135deg,#09233d,#061523)] ${className}`} />;
}
function ImageBox({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  return <MediaFallback className={className} />;
}

function SectionHeader({ eyebrow, title, subtitle, theme = 'light', className = '' }: { eyebrow: string; title: string; subtitle?: string; theme?: 'light' | 'dark'; className?: string }) {
  const dark = theme === 'dark';
  return (
    <div className={`section-heading ${className}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className={`section-title ${dark ? 'text-white' : 'text-[#002147]'}`}>{title}</h2>
      {subtitle && <p className={`section-subtitle ${dark ? 'text-white/72' : 'text-[#212529]/70'}`}>{subtitle}</p>}
      <span className="section-divider" aria-hidden="true" />
    </div>
  );
}

function ToolLogo({ tool }: { tool: { name: string; mark: string; tone: string } }) {
  return (
    <span className="tool-logo">
      <span className="tool-mark" style={{ color: tool.tone, borderColor: `${tool.tone}66` }}>{tool.mark}</span>
      <span>{tool.name}</span>
    </span>
  );
}

function resolveDirectusImage(item: { image_url?: string; image?: unknown; Image?: unknown; process_image?: unknown; background_image?: unknown; files?: unknown } | undefined) {
  if (!item) return undefined;
  return item.image_url || normalizeDirectusAsset(item.image || item.Image || item.process_image || item.background_image || item.files);
}


export default function HomeClient({ data }: Props) {
  const { home, contact } = data;
  const trustedLogos = normalizeList(home.trusted_logos);
  const promoPopup = data.flex.find(item => item.is_published !== false && item.section_type === 'promo_popup');
  const [locale, setLocale] = useState<Locale>('es');
  const [clientProcessSteps, setClientProcessSteps] = useState<DirectusProcessStep[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [visualEditingEnabled, setVisualEditingEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    const browser = navigator.language.toLowerCase();
    const nextLocale: Locale = saved === 'en' || browser.startsWith('en') ? 'en' : 'es';
    setLocale(nextLocale);
  }, []);
  useEffect(() => { document.documentElement.lang = locale === 'en' ? 'en' : 'es-ES'; localStorage.setItem(LOCALE_KEY, locale); }, [locale]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsPreviewMode(params.get('preview') === 'true');
    setVisualEditingEnabled(isDirectusVisualEditingFrame());
  }, []);
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadProcessStepsFromDirectus() {
      try {
        // Se lee mediante una API route propia para evitar CORS y cache del navegador.
        // Esta ruta consulta Directus en servidor y devuelve image_url listo para usar.
        const response = await fetch(`/api/process-steps?t=${Date.now()}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;
        const json = await response.json() as { data?: DirectusProcessStep[] };
        if (!cancelled && Array.isArray(json.data) && json.data.length > 0) {
          setClientProcessSteps(json.data);
        }
      } catch {
        // Si Directus no responde, se mantienen los datos del servidor/fallback.
      }
    }

    loadProcessStepsFromDirectus();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const t = copy[locale];
  const heroTitle = locale === 'es' ? (home.hero_title || `${t.heroLine1} ${t.heroLine2}`) : `${t.heroLine1} ${t.heroLine2}`;
  const [heroLine1, heroLine2] = splitHeroTitle(heroTitle);
  const localizedServices = useMemo(() => SERVICE_LINKS.map((service, index) => {
    const directus = data.services.find(item => serviceHrefFromTitle(item.title) === service.href) || data.services[index] || {};
    return {
      ...service,
      directusId: directus.id,
      title: locale === 'es' ? (directus.title || service.es) : service.en,
      description: locale === 'es' ? (directus.description || t.serviceDescriptions[index]) : t.serviceDescriptions[index],
      image: directus.image_url || serviceMedia[service.key],
    };
  }), [data.services, t.serviceDescriptions]);
  const portfolio = data.portfolio.length ? data.portfolio : [
    { title: locale === 'es' ? 'Producción audiovisual' : 'Audiovisual production', category: 'Audiovisual', description: locale === 'es' ? 'Contenido visual y soporte técnico para comunicar con más impacto.' : 'Visual content and technical support for stronger communication.', image_url: '/service-audiovisual.jpg' },
    { title: locale === 'es' ? 'Campaña digital' : 'Digital campaign', category: 'Marketing', description: locale === 'es' ? 'Estrategia, medición y optimización para generar oportunidades reales.' : 'Strategy, measurement and optimisation to generate real opportunities.', image_url: '/service-marketing.jpg' },
    { title: locale === 'es' ? 'Sitio web corporativo' : 'Corporate website', category: 'Web', description: locale === 'es' ? 'Diseño y estructura para una presencia digital clara y premium.' : 'Design and structure for a clear premium digital presence.', image_url: '/service-web.jpg' },
  ];

  const directusProcess = (clientProcessSteps.length ? clientProcessSteps : (data.process_steps || []))
    .filter(item => item.is_published !== false)
    .sort((a, b) => Number(a.sort ?? 9999) - Number(b.sort ?? 9999));
  const processMedia = data.flex.filter(item => item.is_published !== false && ['process_step', 'proceso', 'process'].includes(String(item.section_type || '').toLowerCase()));
  const baseProcessItems = t.workSteps.map(([title, text], index) => ({
    directusId: undefined as DirectusId | undefined,
    title,
    text,
    image: processMedia[index]?.image_url || processImages[index],
    icon: ['message', 'target', 'clapperboard', 'chart'][index] || 'message',
  }));
  const processItems = baseProcessItems.map((base, index) => {
    const directus = directusProcess.find(item => Number(item.sort) === index + 1) || directusProcess[index];
    if (!directus) return base;
    return {
      directusId: directus.id,
      title: directus.title || base.title,
      text: directus.description || base.text,
      // Imagen editable desde Directus. Si no hay imagen, se mantiene el fallback visual.
      image: resolveDirectusImage(directus) || base.image,
      icon: directus.icon || base.icon,
    };
  });

  const visualEditingRefreshKey = [
    locale,
    ...localizedServices.map(item => item.directusId || ''),
    ...processItems.map(item => item.directusId || ''),
    ...portfolio.map(item => item.id || ''),
  ].join(':');

  return <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
    <DirectusVisualEditing enabled={visualEditingEnabled} refreshKey={visualEditingRefreshKey} />
    <Navbar links={t.nav} ctaLabel={t.cta} locale={locale} onLocaleChange={setLocale} transparentOnTop />
    {isPreviewMode && <div className="fixed bottom-5 left-5 z-[120] rounded-full border border-[#D4AF37]/40 bg-[#002147]/90 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white shadow-[0_18px_45px_rgba(0,0,0,.22)] backdrop-blur-xl">Vista previa Directus <a href="/api/preview/disable" className="ml-3 text-[#D4AF37] underline-offset-4 hover:underline">Salir</a></div>}

    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#002147] text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={home.hero_video_poster_url || home.hero_image_url || '/seo-image.jpg'}
        data-directus={directusAttr(visualEditingEnabled, 'home_page', home.id, ['hero_video', 'hero_video_poster'])}
      >
        <source src={home.hero_video_url || '/hero-dsolution-loop.mp4'} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.56),rgba(0,0,0,.38)_45%,rgba(0,0,0,.56)),linear-gradient(90deg,rgba(0,33,71,.38),rgba(0,33,71,.12),rgba(0,33,71,.38))]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 pb-20 pt-28 text-center md:px-8">
        <motion.div initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }} className="mx-auto max-w-5xl">
          <h1
            className="mx-auto max-w-[980px] text-[clamp(2.45rem,5vw,5.25rem)] leading-[1.04] tracking-[-0.045em] text-white drop-shadow-[0_18px_45px_rgba(0,0,0,.34)]"
            data-directus={locale === 'es' ? directusAttr(visualEditingEnabled, 'home_page', home.id, 'hero_title') : undefined}
          >
            <span className="block font-extrabold">{heroLine1}</span>
            {heroLine2 && <span className="block font-normal tracking-[-0.035em] text-white/95">{heroLine2}</span>}
          </h1>
        </motion.div>
      </div>
    </section>

    {trustedLogos.length > 0 && <div className="border-b border-[#002147]/10 bg-white/70"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-5 py-5 text-sm font-semibold text-[#002147]/55 md:justify-between md:px-8" data-directus={directusAttr(visualEditingEnabled, 'home_page', home.id, 'trusted_logos')}>{trustedLogos.map(logo => <span key={logo}>{logo}</span>)}</div></div>}

    <section id="servicios" className="relative px-5 py-12 md:px-8 md:py-14">
      <div className="absolute left-0 top-8 h-48 w-32 rounded-r-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="mb-7 max-w-4xl">
          <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} subtitle={t.servicesIntro} />
        </motion.div>
        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/60 bg-[#002147] shadow-[0_24px_70px_rgba(0,33,71,.16)] md:grid-cols-3">
          {localizedServices.map((service, index) => <motion.a key={service.key} href={service.href} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .48, delay: index * .035 }} className="group service-tile relative min-h-[190px] overflow-hidden border-white/10 md:border-r md:border-b lg:min-h-[205px]">
            <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus:scale-105 group-focus:grayscale-0" data-directus={directusAttr(visualEditingEnabled, 'services', service.directusId, 'image')} />
            <div className="service-tile-overlay absolute inset-0 transition duration-500" />
            <div className="service-tile-content absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">0{index + 1}</p><h3 className="mt-2 text-xl font-bold tracking-wide md:text-2xl" data-directus={locale === 'es' ? directusAttr(visualEditingEnabled, 'services', service.directusId, 'title') : undefined}>{service.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/92 transition duration-500 group-hover:text-[#D4AF37]">{t.servicesButton}<ArrowRight size={16}/></span></div>
          </motion.a>)}
        </div>
      </div>
    </section>

    <section id="proceso" className="bg-[#123D5F] px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.72fr_1.62fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}>
          <SectionHeader eyebrow="Proceso" title={t.workTitle} subtitle={t.workText} theme="dark" />
          <a href="#contacto" className="mt-7 inline-flex h-[50px] items-center gap-3 rounded-full border border-[#D4AF37] px-6 text-sm font-bold text-[#D4AF37] transition hover:-translate-y-1 hover:bg-[#D4AF37] hover:text-[#002147]">{t.workCta}<ArrowRight size={16}/></a>
        </motion.div>
        <div className="grid gap-3 md:grid-cols-4">
          {processItems.map((step, i) => {
            const Icon = processIconMap[String(step.icon || '').toLowerCase()] || processIcons[i % processIcons.length] || MessageSquare;
            return <motion.article key={step.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * .06 }} className="group relative min-h-[370px] overflow-hidden rounded-[1.35rem] border border-white/14 bg-white/[.045] shadow-[0_20px_70px_rgba(0,0,0,.20)]">
              <img
                key={step.image || processImages[i % processImages.length]}
                src={step.image || processImages[i % processImages.length]}
                alt={step.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                onError={(event) => { event.currentTarget.src = processImages[i % processImages.length]; }}
                data-directus={directusAttr(visualEditingEnabled, 'process_steps', step.directusId, 'image')}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,35,61,.30),rgba(9,35,61,.62)_42%,rgba(3,11,21,.90))]" />
              {i < 3 && <div className="absolute right-[-.85rem] top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#0B2F4D] text-[#D4AF37] md:flex"><ArrowRight size={16}/></div>}
              <div className="relative z-10 flex h-full min-h-[370px] flex-col justify-end p-5">
                <p className="text-3xl font-bold leading-none text-[#D4AF37]">0{i + 1}</p>
                <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-black/30 text-[#D4AF37]"><Icon size={19}/></div>
                <h3 className="mt-4 min-h-[2.85rem] text-lg font-bold leading-tight" data-directus={locale === 'es' ? directusAttr(visualEditingEnabled, 'process_steps', step.directusId, 'title') : undefined}>{step.title}</h3>
                <p className="mt-2 min-h-[6rem] text-sm leading-6 text-white/78" data-directus={locale === 'es' ? directusAttr(visualEditingEnabled, 'process_steps', step.directusId, 'description') : undefined}>{step.text}</p>
              </div>
            </motion.article>;
          })}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#F7F3EA] px-5 py-10 text-[#002147] md:px-8 md:py-12">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/55 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader eyebrow={t.whyTitle} title={t.whyHeadline} />
        <div className="mt-7 grid gap-5 md:grid-cols-4 md:divide-x md:divide-[#002147]/14">
          {t.stats.map(([number, label], i) => {
            const StatIcon = [Rocket, Folder, Globe2, BarChart3][i];
            return <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ duration: .45, delay: i * .04 }} className="stat-item px-4 py-2">
              <div className="stat-row flex min-h-[3rem] items-center gap-4">
                <StatIcon size={34} strokeWidth={1.8} className="shrink-0 text-[#D4AF37]" />
                <strong className="block text-4xl font-semibold leading-none text-[#002147] md:text-[2.55rem]">{number}</strong>
              </div>
              <p className="mt-3 max-w-[12rem] text-sm leading-5 text-[#002147]/78">{label}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>

    <section className="overflow-hidden bg-[#082642] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Ecosistema" title={t.toolsTitle} theme="dark" />
      </div>
      <div className="-mx-5 mt-9 space-y-5 md:-mx-8">
        <div className="tools-marquee tools-marquee-panel"><div className="tools-track tools-left">{[...tools.slice(0, 9), ...tools.slice(0, 9), ...tools.slice(0, 9)].map((tool, index) => <ToolLogo key={`${tool.name}-${index}`} tool={tool} />)}</div></div>
        <div className="tools-marquee tools-marquee-panel"><div className="tools-track tools-right">{[...tools.slice(9), ...tools.slice(9), ...tools.slice(9)].map((tool, index) => <ToolLogo key={`${tool.name}-${index}`} tool={tool} />)}</div></div>
      </div>
    </section>

    <section id="portafolio" className="border-y border-[#002147]/10 bg-white/60 px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-4xl">
          <SectionHeader eyebrow={t.portfolioEyebrow} title={t.portfolioTitle} subtitle={t.portfolioIntro} />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {portfolio.slice(0,3).map((p, i) => <motion.article key={`${p.title}-${i}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="group overflow-hidden rounded-[1.6rem] border border-[#002147]/10 bg-white shadow-[0_16px_45px_rgba(0,33,71,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,33,71,.13)]">
            <div className="relative h-52 overflow-hidden" data-directus={directusAttr(visualEditingEnabled, 'portfolio', p.id, 'image')}><ImageBox src={p.image_url} alt={p.title || 'Proyecto'} className="transition duration-700 group-hover:scale-105" /></div>
            <div className="p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#B58F18]" data-directus={directusAttr(visualEditingEnabled, 'portfolio', p.id, 'category')}>{p.category}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-.02em]" data-directus={directusAttr(visualEditingEnabled, 'portfolio', p.id, 'title')}>{p.title}</h3><p className="mt-3 leading-7 text-[#212529]/68" data-directus={directusAttr(visualEditingEnabled, 'portfolio', p.id, 'description')}>{p.description}</p><a href={p.project_url || '#contacto'} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#002147] transition hover:text-[#B58F18]" data-directus={directusAttr(visualEditingEnabled, 'portfolio', p.id, 'project_url')}>{t.portfolioButton}<ArrowRight size={16}/></a></div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <ContactSection locale={locale} contact={contact} source="d-solution.org" visualEditingEnabled={visualEditingEnabled} />
    <SiteFooter locale={locale} links={t.nav} siteId={data.site.id} siteName={data.site.site_name} description={data.site.footer_text} visualEditingEnabled={visualEditingEnabled} />
    <PromoPopup promo={promoPopup} delaySeconds={data.site.popup_delay_seconds} visualEditingEnabled={visualEditingEnabled} />
  </main>;
}
