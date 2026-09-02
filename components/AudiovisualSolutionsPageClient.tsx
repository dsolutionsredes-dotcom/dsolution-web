use client';

import { useEffect, useState } from 'react';
import Navbar, { type NavLink } from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ContactSection from '@/components/ContactSection';
import DirectusVisualEditing, { directusAttr, isDirectusVisualEditingFrame } from '@/components/DirectusVisualEditing';
import { elementText, pageElement, type PageElement } from '@/lib/page-elements';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Clapperboard,
  GraduationCap,
  Headphones,
  MonitorPlay,
  Mic2,
  Radio,
  Settings2,
  Sparkles,
  Tv,
  Video,
  WandSparkles,
  UsersRound,
  Presentation,
  School,
  Church,
  Building2,
} from 'lucide-react';

type Locale = 'es' | 'en';

type Copy = typeof copy.es;
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
    cta: 'Planificar mi evento',
    heroEyebrow: 'Servicio principal',
    heroTitle: 'Soluciones audiovisuales',
    heroKicker: 'Eventos, streaming y producción en vivo',
    heroText: 'Planificamos y operamos sistemas audiovisuales para eventos presenciales, transmisiones multicámara, podcasts y equipos que necesitan calidad profesional.',
    heroSecondary: 'Ver capacidades',
    trust: [
      ['Producción profesional', 'De la preproducción a la entrega final'],
      ['Eventos presenciales', 'Barcelona y proyectos en España'],
      ['Transmisión estable', 'Full HD como base y 4K bajo requerimiento'],
      ['Equipo técnico', 'Cámaras, audio, luces, switcher e intercom'],
    ],
    servicesEyebrow: 'Nuestros servicios',
    servicesTitle: 'Soluciones audiovisuales completas',
    services: [
      ['Streaming profesional', 'Eventos multicámara con gráficos, audio profesional y grabación simultánea.'],
      ['Dirección de TV y shows en vivo', 'Preproducción, guion técnico, escaleta, switcher e intercom.'],
      ['Producción de podcast', 'Video podcast, audio por canales, iluminación, gráficos y clips.'],
      ['Instalación audiovisual', 'Sistemas temporales o fijos para salas, empresas e instituciones.'],
      ['Postproducción de video', 'Edición multicámara, reels, subtítulos, audio, color y gráficos.'],
      ['Capacitación técnica', 'Formación para operar cámaras, audio, luces y streaming.'],
    ],
    streamingEyebrow: 'Streaming profesional',
    streamingTitle: 'Transmitimos tu evento a donde esté tu audiencia',
    streamingBullets: [
      'YouTube, Facebook, TikTok, Instagram y web propia',
      'Zoom, Teams y eventos cerrados',
      'Producción multicámara con gráficos y lower thirds',
      'Audio profesional desde consola',
      'Grabación limpia y versión con gráficos',
      'Subtítulos automáticos con IA bajo requerimiento',
      'Full HD 1080p y 4K bajo cotización',
    ],
    trainingEyebrow: 'Capacitación técnica',
    trainingTitle: 'Formamos a tu equipo para producir con confianza',
    trainingBullets: [
      'Cámaras DSLR, mirrorless, estudio, PTZ y configuración',
      'Audio profesional y consolas digitales',
      'Iluminación y control DMX',
      'Streaming y realización en vivo',
      'Flujos de trabajo y operación de eventos',
      'Capacitación personalizada en tu sala o estudio',
    ],
    trainingBoxTitle: 'Para empresas, colegios, universidades, iglesias y equipos internos.',
    trainingBoxText: 'Capacitaciones de 1 a 3 días según necesidad.',
    toolsEyebrow: 'Tecnología y software',
    toolsTitle: 'Herramientas que dominamos',
    equipmentTitle: 'Equipo profesional',
    tools: ['OBS', 'vMix', 'MimoLive', 'ATEM Software Control', 'Blackmagic Design', 'DaVinci Resolve', 'Premiere Pro', 'Final Cut Pro', 'After Effects', 'Audition', 'Logic Pro', 'FL Studio', 'Photoshop', 'Canva', 'CapCut'],
    equipment: ['Cámaras DSLR / Mirrorless', 'Cámaras de estudio con CCU', 'Cámaras PTZ', 'Switcher ATEM', 'Consolas Yamaha / DiGiCo', 'Micrófonos inalámbricos UHF', 'Luces LED y control DMX', 'Proyectores', 'Intercom', 'Luces LED y control DMX', 'Capturadoras HDMI / SDI', 'Mezcladores de video'],
    processEyebrow: 'Nuestro proceso',
    processTitle: 'Así trabajamos en tu proyecto',
    process: [
      ['Análisis y reunión', 'Conocemos tu evento, objetivos y requerimientos técnicos.'],
      ['Diseño y propuesta', 'Creamos la propuesta técnica, equipo y plan de producción.'],
      ['Montaje y pruebas', 'Instalamos, configuramos y realizamos pruebas técnicas.'],
      ['Producción en vivo', 'Operamos y dirigimos tu evento con máxima calidad.'],
      ['Entrega final', 'Entregamos streaming, grabación y material final editado.'],
    ],
    projectsEyebrow: 'Trabajos realizados',
    projectsTitle: 'Algunos de nuestros proyectos',
    projects: [
      ['Evento corporativo', 'Transmisión multicámara'],
      ['Conferencia internacional', 'Streaming en 4 plataformas'],
      ['Podcast profesional', 'Producción de video podcast'],
      ['Instalación audiovisual', 'Sistema audiovisual completo'],
      ['Show en vivo', 'Dirección y realización'],
    ],
  },
  en: {
    cta: 'Plan my event',
    heroEyebrow: 'Core service',
    heroTitle: 'Audiovisual solutions',
    heroKicker: 'Events, streaming and live production',
    heroText: 'We plan and operate audiovisual systems for in-person events, multicamera streaming, podcasts and teams that need professional quality.',
    heroSecondary: 'View capabilities',
    trust: [
      ['Professional production', 'From pre-production to final delivery'],
      ['In-person events', 'Barcelona and projects across Spain'],
      ['Stable broadcasting', 'Full HD as standard and 4K on request'],
      ['Technical setup', 'Cameras, audio, lights, switcher and intercom'],
    ],
    servicesEyebrow: 'Our services',
    servicesTitle: 'Complete audiovisual solutions',
    services: [
      ['Professional streaming', 'Multicamera events with graphics, professional audio and recording.'],
      ['TV direction and live shows', 'Pre-production, technical script, rundown, switcher and intercom.'],
      ['Podcast production', 'Video podcast, separated audio, lighting, graphics and clips.'],
      ['Audiovisual installation', 'Temporary or fixed systems for venues, companies and institutions.'],
      ['Video post-production', 'Multicamera editing, reels, subtitles, audio, color and graphics.'],
      ['Technical training', 'Training to operate cameras, audio, lighting and streaming.'],
    ],
    streamingEyebrow: 'Professional streaming',
    streamingTitle: 'We broadcast your event wherever your audience is',
    streamingBullets: [
      'YouTube, Facebook, TikTok, Instagram and own website',
      'Zoom, Teams and closed events',
      'Multicamera production with graphics and lower thirds',
      'Professional audio from console',
      'Clean recording and graphic version',
      'AI subtitles on request',
      'Full HD 1080p and 4K by quote',
    ],
    trainingEyebrow: 'Technical training',
    trainingTitle: 'We train your team to produce with confidence',
    trainingBullets: [
      'DSLR, mirrorless, studio, PTZ cameras and setup',
      'Professional audio and digital consoles',
      'Lighting and DMX control',
      'Streaming and live direction',
      'Event workflows and operation',
      'Custom training in your room or studio',
    ],
    trainingBoxTitle: 'For companies, schools, universities, churches and internal teams.',
    trainingBoxText: '1 to 3 day trainings depending on the need.',
    toolsEyebrow: 'Technology and software',
    toolsTitle: 'Tools we master',
    equipmentTitle: 'Professional equipment',
    tools: ['OBS', 'vMix', 'MimoLive', 'ATEM Software Control', 'Blackmagic Design', 'DaVinci Resolve', 'Premiere Pro', 'Final Cut Pro', 'After Effects', 'Audition', 'Logic Pro', 'FL Studio', 'Photoshop', 'Canva', 'CapCut'],
    equipment: ['DSLR / Mirrorless cameras', 'Studio cameras with CCU', 'PTZ cameras', 'ATEM switcher', 'Yamaha / DiGiCo consoles', 'Wireless UHF microphones', 'LED lights and DMX control', 'Projectors', 'Intercom', 'LED lights and DMX control', 'HDMI / SDI capture cards', 'Video mixers'],
    processEyebrow: 'Our process',
    processTitle: 'How we work on your project',
    process: [
      ['Analysis and meeting', 'We understand your event, goals and technical needs.'],
      ['Design and proposal', 'We create the technical proposal, equipment and production plan.'],
      ['Setup and testing', 'We install, configure and run technical tests.'],
      ['Live production', 'We operate and direct your event with maximum quality.'],
      ['Final delivery', 'We deliver streaming, recording and final edited material.'],
    ],
    projectsEyebrow: 'Selected work',
    projectsTitle: 'Some of our projects',
    projects: [
      ['Corporate event', 'Multicamera broadcast'],
      ['International conference', 'Streaming on 4 platforms'],
      ['Professional podcast', 'Video podcast production'],
      ['Audiovisual installation', 'Complete audiovisual system'],
      ['Live show', 'Direction and realization'],
    ],
  },
} as const;

const serviceIcons = [Radio, Tv, Mic2, Settings2, Clapperboard, GraduationCap];
const trustIcons = [BadgeCheck, Presentation, MonitorPlay, Camera];
const processIcons = [Sparkles, WandSparkles, Settings2, UsersRound, Check];
const audienceIcons = [Building2, School, Presentation, Church, UsersRound];
const equipmentIcons = [Camera, Video, Tv, MonitorPlay, Headphones, Mic2, Sparkles, Presentation, Headphones, Sparkles, Settings2, Clapperboard];

function PhotoSlot({ item, attr, title, text, className = '', dark = false }: { item?: PageElement; attr?: string; title: string; text: string; className?: string; dark?: boolean }) {
  if (item?.image_url) {
    return <div data-directus={attr} className={`relative overflow-hidden ${className}`}><img src={item.image_url} alt={title} className="h-full w-full object-cover" /></div>;
  }

  return (
    <div data-directus={attr} className={`flex items-center justify-center border-2 border-dashed p-6 text-center ${dark ? 'border-white/25 bg-white/[.05] text-white' : 'border-[#D4AF37]/35 bg-[#F7F3EA] text-[#061523]'} ${className}`}>
      <div>
        <Camera className="mx-auto text-[#D4AF37]" size={36} />
        <h3 className="mt-4 text-lg font-black">{title}</h3>
        <p className={`mx-auto mt-2 max-w-xs text-sm leading-6 ${dark ? 'text-white/65' : 'text-[#061523]/60'}`}>{text}</p>
      </div>
    </div>
  );
}

function ToolLogo({ name }: { name: string }) {
  const initials = name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  return <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/12 text-[.68rem] font-black text-[#D4AF37]">{initials}</span>;
}

export default function AudiovisualSolutionsPageClient({ pageElements = [] }: { pageElements?: PageElement[] }) {
  const [locale, setLocale] = useState<Locale>('es');
  const [visualEditingEnabled, setVisualEditingEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    if (stored === 'en' || stored === 'es') setLocale(stored);
    setVisualEditingEnabled(isDirectusVisualEditingFrame());
  }, []);

  const handleLocale = (value: Locale) => {
    setLocale(value);
    window.localStorage.setItem(LOCALE_KEY, value);
  };

  const page = 'service-audiovisual';
  const base: Copy = copy[locale];
  const item = (key: string) => pageElement(pageElements, page, locale, key);
  const globalItem = (key: string) => pageElement(pageElements, 'global', locale, key);
  const value = (key: string, fallback: string, field: 'text' | 'secondary_text' | 'tertiary_text' = 'text') => elementText(item(key), fallback, field);
  const attr = (key: string, field: 'text' | 'secondary_text' | 'tertiary_text' | 'image' = 'text') => directusAttr(visualEditingEnabled, 'page_elements', item(key)?.id, field);

  const keys = ['home', 'services', 'portfolio', 'process', 'contact'];
  const links = navLinks[locale].map(([label, href], index) => {
    const nav = globalItem(`nav.${keys[index]}`);
    return [elementText(nav, label), nav?.link || href] as NavLink;
  });

  const heroImage = item('hero.image');
  const streamingImage = item('streaming.image');
  const trainingImage = item('training.image');

  const trustItems = base.trust.map(([title, text], index) => [value(`trust.${index + 1}`, title), value(`trust.${index + 1}`, text, 'secondary_text')] as const);
  const services = base.services.map(([title, text], index) => [value(`services.${index + 1}`, title), value(`services.${index + 1}`, text, 'secondary_text')] as const);
  const streamingBullets = base.streamingBullets.map((text, index) => value(`streaming.bullet.${index + 1}`, text));
  const trainingBullets = base.trainingBullets.map((text, index) => value(`training.bullet.${index + 1}`, text));
  const tools = base.tools.map((text, index) => value(`tools.${index + 1}`, text));
  const equipment = base.equipment.map((text, index) => value(`equipment.${index + 1}`, text));
  const process = base.process.map(([title, text], index) => [value(`process.${index + 1}`, title), value(`process.${index + 1}`, text, 'secondary_text')] as const);
  const projects = base.projects.map(([title, text], index) => [value(`projects.${index + 1}`, title), value(`projects.${index + 1}`, text, 'secondary_text'), item(`projects.${index + 1}.image`)] as const);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#061523]">
      <DirectusVisualEditing enabled={visualEditingEnabled} refreshKey={`audiovisual:${locale}:${pageElements.length}`} />

      <Navbar
        links={links}
        ctaLabel={elementText(globalItem('nav.cta'), base.cta)}
        locale={locale}
        onLocaleChange={handleLocale}
        transparentOnTop
        editableLinks={keys.map(key => globalItem(`nav.${key}`))}
        ctaElement={globalItem('nav.cta')}
        visualEditingEnabled={visualEditingEnabled}
        pageElements={pageElements}
      />

      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#061523] pt-24 text-white md:pt-28">
        <div className="absolute inset-0">
          {heroImage?.image_url ? (
            <img src={heroImage.image_url} alt="" className="h-full w-full object-cover" data-directus={attr('hero.image', 'image')} />
          ) : (
            <div className="absolute inset-y-0 right-0 w-full md:w-[62%]">
              <PhotoSlot item={heroImage} attr={attr('hero.image', 'image')} title="Foto principal" text="Sube aquí una foto real de evento, streaming o backstage técnico." dark className="h-full border-0" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061523_0%,rgba(6,21,35,.98)_34%,rgba(6,21,35,.70)_56%,rgba(6,21,35,.15)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[64%] bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,.17),transparent_34%)]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 md:px-8">
          <div className="max-w-3xl py-8 md:py-10">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#D4AF37]" data-directus={attr('hero.eyebrow')}>{value('hero.eyebrow', base.heroEyebrow)}</p>
            <h1 className="mt-4 text-5xl font-black leading-[.93] tracking-[-.055em] md:text-7xl" data-directus={attr('hero.title')}>{value('hero.title', base.heroTitle)}</h1>
            <p className="mt-4 text-2xl font-black leading-tight tracking-[-.03em] text-[#D4AF37] md:text-4xl" data-directus={attr('hero.kicker')}>{value('hero.kicker', base.heroKicker)}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/76 md:text-lg" data-directus={attr('hero.text')}>{value('hero.text', base.heroText)}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#contacto" className="inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-5 py-3.5 font-black text-[#061523] shadow-[0_18px_45px_rgba(212,175,55,.25)] transition hover:-translate-y-1 hover:bg-white" data-directus={attr('hero.cta')}>{value('hero.cta', base.cta)} <ArrowRight size={18} /></a>
              <a href="#servicios" className="inline-flex items-center gap-3 rounded-xl border border-white/20 px-5 py-3.5 font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]" data-directus={attr('hero.secondary')}>{value('hero.secondary', base.heroSecondary)}</a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-3 border-t border-white/10 px-5 py-4 md:grid-cols-4 md:px-8">
          {trustItems.map(([title, text], index) => {
            const Icon = trustIcons[index];
            return <div key={title} className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/45 text-[#D4AF37]"><Icon size={18} /></span><div><h3 className="text-sm font-black" data-directus={attr(`trust.${index + 1}`)}>{title}</h3><p className="mt-1 text-xs leading-5 text-white/60" data-directus={attr(`trust.${index + 1}`, 'secondary_text')}>{text}</p></div></div>;
          })}
        </div>
      </section>

      <section id="servicios" className="flex min-h-[82svh] items-center bg-[#F7F3EA] px-5 py-14 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]" data-directus={attr('services.eyebrow')}>{value('services.eyebrow', base.servicesEyebrow)}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('services.title')}>{value('services.title', base.servicesTitle)}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {services.map(([title, text], index) => {
              const Icon = serviceIcons[index];
              return <article key={title} className="rounded-[1.35rem] border border-[#D4AF37]/18 bg-white p-5 text-center shadow-[0_20px_50px_rgba(0,33,71,.07)] transition hover:-translate-y-1 hover:border-[#D4AF37]/55"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F3EA] text-[#B88A1A] ring-1 ring-[#D4AF37]/25"><Icon size={26} /></span><h3 className="mt-5 min-h-[56px] text-lg font-black leading-tight tracking-[-.03em]" data-directus={attr(`services.${index + 1}`)}>{title}</h3><p className="mt-3 text-sm leading-6 text-[#061523]/62" data-directus={attr(`services.${index + 1}`, 'secondary_text')}>{text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-[#061523] px-5 py-14 text-white md:px-8">
        <div className="absolute inset-0">
          {streamingImage?.image_url ? <img src={streamingImage.image_url} alt="" className="h-full w-full object-cover" data-directus={attr('streaming.image', 'image')} /> : <div className="absolute inset-y-0 right-0 w-full md:w-[62%]"><PhotoSlot item={streamingImage} attr={attr('streaming.image', 'image')} title="Foto de streaming" text="Sube una foto real de switcher, multicámara, evento o transmisión." dark className="h-full border-0" /></div>}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061523_0%,rgba(6,21,35,.98)_36%,rgba(6,21,35,.72)_57%,rgba(6,21,35,.12)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#D4AF37]" data-directus={attr('streaming.eyebrow')}>{value('streaming.eyebrow', base.streamingEyebrow)}</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('streaming.title')}>{value('streaming.title', base.streamingTitle)}</h2>
            <div className="mt-7 grid gap-2.5">
              {streamingBullets.map((text, index) => <span key={text} className="flex items-start gap-3 text-sm leading-6 text-white/84 md:text-base"><Check className="mt-0.5 shrink-0 text-[#D4AF37]" size={17} /><span data-directus={attr(`streaming.bullet.${index + 1}`)}>{text}</span></span>)}
            </div>
            <a href="#contacto" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-5 py-3.5 font-black text-[#061523] transition hover:-translate-y-1 hover:bg-white" data-directus={attr('streaming.cta')}>{value('streaming.cta', locale === 'es' ? 'Planificar mi streaming' : 'Plan my stream')} <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="flex min-h-[78svh] items-center bg-[#F7F3EA] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.05fr_.95fr_.42fr]">
          <PhotoSlot item={trainingImage} attr={attr('training.image', 'image')} title={locale === 'es' ? 'Foto de capacitación' : 'Training photo'} text={locale === 'es' ? 'Sube una foto real de capacitación, setup técnico o sala.' : 'Upload a real training, setup or room photo.'} className="min-h-[360px] overflow-hidden rounded-[1.4rem]" />
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]" data-directus={attr('training.eyebrow')}>{value('training.eyebrow', base.trainingEyebrow)}</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('training.title')}>{value('training.title', base.trainingTitle)}</h2>
            <div className="mt-7 grid gap-2.5">
              {trainingBullets.map((text, index) => <span key={text} className="flex items-start gap-3 text-sm leading-6 text-[#061523]/82 md:text-base"><Check className="mt-0.5 shrink-0 text-[#B88A1A]" size={17} /><span data-directus={attr(`training.bullet.${index + 1}`)}>{text}</span></span>)}
            </div>
            <a href="#contacto" className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#D4AF37] px-5 py-3.5 font-black text-[#061523] transition hover:-translate-y-1 hover:bg-[#061523] hover:text-white">{locale === 'es' ? 'Saber más' : 'Learn more'} <ArrowRight size={18} /></a>
          </div>
          <div className="rounded-[1.3rem] bg-[#ECE9E2] p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.55)]">
            <UsersRound className="mx-auto text-[#B88A1A]" size={38} />
            <p className="mt-5 text-sm font-black leading-6 text-[#061523]/80" data-directus={attr('training.box.title')}>{value('training.box.title', base.trainingBoxTitle)}</p>
            <p className="mt-5 text-sm font-black leading-6 text-[#061523]" data-directus={attr('training.box.text')}>{value('training.box.text', base.trainingBoxText)}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#061523] px-5 py-24 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1px_1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#D4AF37]" data-directus={attr('tools.eyebrow')}>{value('tools.eyebrow', base.toolsEyebrow)}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('tools.title')}>{value('tools.title', base.toolsTitle)}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {tools.map((tool, index) => <span key={`${tool}-${index}`} className="flex items-center gap-3 text-sm font-black text-white/86" data-directus={attr(`tools.${index + 1}`)}><ToolLogo name={tool} />{tool}</span>)}
            </div>
          </div>
          <div className="hidden h-full w-px bg-white/16 lg:block" />
          <div>
            <h2 className="text-3xl font-black tracking-[-.04em] md:mt-[2.1rem] md:text-5xl" data-directus={attr('equipment.title')}>{value('equipment.title', base.equipmentTitle)}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {equipment.map((tool, index) => {
                const Icon = equipmentIcons[index % equipmentIcons.length];
                return <span key={`${tool}-${index}`} className="flex items-center gap-3 text-sm font-bold text-white/82"><Icon className="shrink-0 text-[#D4AF37]" size={21} /><span data-directus={attr(`equipment.${index + 1}`)}>{tool}</span></span>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA] px-5 py-18 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]" data-directus={attr('process.eyebrow')}>{value('process.eyebrow', base.processEyebrow)}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('process.title')}>{value('process.title', base.processTitle)}</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-5">
          {process.map(([title, text], index) => {
            const Icon = processIcons[index];
            return <article key={title} className="relative text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-white shadow-[0_16px_35px_rgba(212,175,55,.30)]"><Icon size={25} /></span>{index < process.length - 1 && <span className="absolute left-[62%] top-8 hidden w-[76%] border-t border-dashed border-[#D4AF37]/55 md:block"><span className="absolute -right-1 -top-[5px] text-[#D4AF37]">→</span></span>}<h3 className="mt-6 text-base font-black" data-directus={attr(`process.${index + 1}`)}>{index + 1}. {title}</h3><p className="mx-auto mt-3 max-w-[210px] text-sm leading-6 text-[#061523]/62" data-directus={attr(`process.${index + 1}`, 'secondary_text')}>{text}</p></article>;
          })}
        </div>
      </section>

      <section className="bg-[#061523] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#D4AF37]" data-directus={attr('projects.eyebrow')}>{value('projects.eyebrow', base.projectsEyebrow)}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] md:text-5xl" data-directus={attr('projects.title')}>{value('projects.title', base.projectsTitle)}</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {projects.map(([title, text, img], index) => <article key={title} className="overflow-hidden rounded-[1.2rem] bg-white/[.06]"><PhotoSlot item={img} attr={attr(`projects.${index + 1}.image`, 'image')} title={locale === 'es' ? 'Foto del proyecto' : 'Project photo'} text={locale === 'es' ? 'Sube una foto real aquí.' : 'Upload a real photo here.'} dark className="min-h-[170px] border-0" /><div className="p-4"><h3 className="font-black" data-directus={attr(`projects.${index + 1}`)}>{title}</h3><p className="mt-2 text-sm leading-5 text-white/58" data-directus={attr(`projects.${index + 1}`, 'secondary_text')}>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <ContactSection locale={locale} source="d-solution.org/tecnologia-audiovisual" visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />
      <SiteFooter locale={locale} links={links} pageElements={pageElements} visualEditingEnabled={visualEditingEnabled} />
    </main>
  );
}
