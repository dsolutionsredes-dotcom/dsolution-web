'use client';

import { useEffect, useMemo, useState } from 'react';
import { Camera, Code2, Megaphone, Bot, Palette, ArrowRight, CheckCircle2, Mail, MapPin, Radio, Mic, Lightbulb } from 'lucide-react';
import Navbar, { type NavLink } from '@/components/Navbar';
import PromoPopup from '@/components/PromoPopup';
import { motion } from '@/components/Motion';

export type SiteData = {
  site: {
    site_name?: string;
    footer_text?: string;
    seo_title?: string;
    seo_description?: string;
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
  };
  home: {
    eyebrow?: string;
    hero_image?: string;
    hero_title?: string;
    hero_subtitle?: string;
    primary_button_text?: string;
    primary_button_url?: string;
    secondary_button_text?: string;
    secondary_button_url?: string;
    primary_button_action?: string;
    secondary_button_action?: string;
    trusted_logos?: string;
    hero_image_url?: string;
  };
  about: {
    eyebrow?: string;
    about_image?: string;
    title?: string;
    intro?: string;
    difference?: string;
    where_we_work?: string;
    mission?: string;
    years_experience?: number;
    projects_count?: number;
    image_url?: string;
  };
  contact: {
    email?: string;
    whatsapp?: string;
    city?: string;
    country?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    n8n_webhook_url?: string;
  };
  services: Array<{ title?: string; description?: string; icon?: string; image?: string; image_url?: string; button_text?: string; button_url?: string; button_action?: string }>;
  portfolio: Array<{ title?: string; category?: string; description?: string; project_url?: string; image?: string; image_url?: string }>;
  blog: Array<{ title?: string; excerpt?: string; category?: string; slug?: string; featured_image?: string; image_url?: string }>;
  flex: Array<{ title?: string; subtitle?: string; content?: string; section_type?: string; is_published?: boolean; link_text?: string; link_url?: string; button_text?: string; button_url?: string; image?: string; image_url?: string }>;
};

type Props = { data: SiteData };
type Locale = 'es' | 'en';

const SERVICE_ICONS = [Camera, Radio, Megaphone, Palette, Code2, Bot, Mic, Lightbulb];
const LOCALE_KEY = 'dsolution-language';

type LocaleCopy = {
  nav: NavLink[];
  ctaHeader: string;
  steps: string[];
  highlights: string[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
  };
  trusted: string;
  services: {
    eyebrow: string;
    title: string;
    button: string;
    defaults: Array<{ title: string; description: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    difference: string;
    where: string;
    years: string;
    projects: string;
  };
  process: {
    eyebrow: string;
    title: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    viewAll: string;
    defaults: Array<{ title: string; category: string; description: string }>;
  };
  blog: {
    eyebrow: string;
    title: string;
    defaults: Array<{ title: string; category: string; excerpt: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    companyPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    submit: string;
    success: string;
    error: string;
    validation: string;
  };
  footer: {
    navigation: string;
    services: string;
    rights: string;
    description: string;
  };
};

const LOCALES: Record<Locale, LocaleCopy> = {
  es: {
    nav: [
      ['Inicio', '#inicio'],
      ['Servicios', '#servicios'],
      ['Portafolio', '#portafolio'],
      ['Nosotros', '#nosotros'],
      ['Blog', '#blog'],
      ['Contacto', '#contacto'],
    ],
    ctaHeader: 'Hablemos de tu proyecto',
    steps: ['Diagnóstico claro', 'Estrategia personalizada', 'Producción y desarrollo', 'Optimización continua'],
    highlights: ['Estrategia personalizada', 'Resultados medibles', 'Acompañamiento cercano'],
    hero: {
      eyebrow: 'AGENCIA DIGITAL EN BARCELONA',
      title: 'Transformamos ideas en experiencias digitales',
      subtitle: 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.',
      primaryButton: 'Solicitar propuesta',
      secondaryButton: 'Ver servicios',
    },
    trusted: 'Confían en nosotros',
    services: {
      eyebrow: 'Servicios',
      title: 'Soluciones creativas para impulsar tu negocio',
      button: 'Saber más',
      defaults: [
        { title: 'Tecnología audiovisual', description: 'Audio, video, luces, streaming y soporte técnico para producciones, eventos y experiencias en vivo.' },
        { title: 'Marketing digital', description: 'Google Ads, Analytics, Tag Manager y campañas diseñadas para resultados medibles.' },
        { title: 'Desarrollo web', description: 'Sitios web corporativos, landings y experiencias digitales rápidas, elegantes y optimizadas.' },
        { title: 'Automatización e IA', description: 'Procesos automáticos, agentes, integraciones y soluciones inteligentes para escalar mejor.' },
        { title: 'Branding y diseño', description: 'Identidad visual, creatividades y piezas visuales para campañas, contenidos y lanzamientos.' },
        { title: 'Fotografía profesional', description: 'Fotografía comercial, de producto y de marca para comunicar con una imagen sólida.' },
      ],
    },
    about: {
      eyebrow: 'Sobre nosotros',
      title: 'De un proyecto en pareja a una agencia digital en crecimiento',
      intro: 'D-Solution nació como un proyecto pequeño creado en pareja y evolucionó hasta convertirse en una propuesta digital centrada en resultados, cercanía y ejecución profesional.',
      difference: 'Nuestro enfoque combina tecnología audiovisual, marketing digital y desarrollo web para construir experiencias coherentes y efectivas.',
      where: 'Trabajamos desde Barcelona y sus alrededores, acompañando a marcas, negocios y emprendedores que quieren destacar con una presencia digital más sólida.',
      years: 'años de experiencia',
      projects: 'proyectos realizados',
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Una forma clara de llevar tus ideas a resultados',
    },
    portfolio: {
      eyebrow: 'Portafolio',
      title: 'Proyectos que inspiran',
      viewAll: 'Ver todos los proyectos →',
      defaults: [
        { title: 'Sitio web corporativo', category: 'Desarrollo Web', description: 'Diseño, estructura y presencia digital para una marca en crecimiento.' },
        { title: 'Producción audiovisual', category: 'Audiovisual', description: 'Contenido visual y soporte técnico para comunicar con más impacto.' },
        { title: 'Campaña digital', category: 'Marketing Digital', description: 'Estrategia, analítica y optimización para generar oportunidades reales.' },
      ],
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Ideas que generan impacto',
      defaults: [
        { title: 'Tendencias de marketing digital', category: 'Marketing', excerpt: 'Próximamente.' },
        { title: 'Cómo un buen video multiplica resultados', category: 'Audiovisual', excerpt: 'Próximamente.' },
        { title: 'IA y automatización para negocios', category: 'IA', excerpt: 'Próximamente.' },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Hablemos de tu próximo proyecto',
      namePlaceholder: 'Nombre completo',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Teléfono / WhatsApp',
      companyPlaceholder: 'Empresa / Proyecto',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto',
      sending: 'Enviando...',
      submit: 'Enviar mensaje',
      success: 'Gracias por escribirnos. Hemos recibido tu mensaje y te contactaremos pronto.',
      error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
      validation: 'Completa nombre, email y mensaje.',
    },
    footer: {
      navigation: 'Navegación',
      services: 'Servicios',
      rights: '© 2026 D-Solution. Todos los derechos reservados.',
      description: 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.',
    },
  },
  en: {
    nav: [
      ['Home', '#inicio'],
      ['Services', '#servicios'],
      ['Portfolio', '#portafolio'],
      ['About', '#nosotros'],
      ['Blog', '#blog'],
      ['Contact', '#contacto'],
    ],
    ctaHeader: 'Let’s talk about your project',
    steps: ['Clear audit', 'Tailored strategy', 'Production and development', 'Continuous optimisation'],
    highlights: ['Tailored strategy', 'Measurable results', 'Close support'],
    hero: {
      eyebrow: 'DIGITAL AGENCY IN BARCELONA',
      title: 'We transform ideas into digital experiences',
      subtitle: 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear and professional execution.',
      primaryButton: 'Request proposal',
      secondaryButton: 'View services',
    },
    trusted: 'Trusted by our clients',
    services: {
      eyebrow: 'Services',
      title: 'Creative solutions to move your business forward',
      button: 'Learn more',
      defaults: [
        { title: 'Audiovisual technology', description: 'Audio, video, lighting, streaming and technical support for productions, events and live experiences.' },
        { title: 'Digital marketing', description: 'Google Ads, Analytics, Tag Manager and campaigns built around measurable results.' },
        { title: 'Web development', description: 'Elegant, fast and conversion-focused websites and landing pages.' },
        { title: 'Automation & AI', description: 'Automated processes and intelligent solutions to save time and scale better.' },
        { title: 'Branding & Design', description: 'Visual identity, digital assets and design with a strategic mindset.' },
        { title: 'Professional photography', description: 'Commercial, product and brand photography to communicate with a stronger visual image.' },
      ],
    },
    about: {
      eyebrow: 'About us',
      title: 'From a couple’s side project to a growing digital agency',
      intro: 'D-Solution started as a small project built by a couple and evolved into a digital proposal focused on results, proximity and professional execution.',
      difference: 'Our approach combines audiovisual technology, digital marketing and web development to build consistent and effective experiences.',
      where: 'We work from Barcelona and nearby areas, helping brands, businesses and entrepreneurs build a stronger digital presence.',
      years: 'years of experience',
      projects: 'completed projects',
    },
    process: {
      eyebrow: 'Process',
      title: 'A clear way to turn ideas into results',
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Projects that inspire',
      viewAll: 'View all projects →',
      defaults: [
        { title: 'Corporate website', category: 'Web Development', description: 'Structure, design and digital presence for a growing brand.' },
        { title: 'Audiovisual production', category: 'Audiovisual', description: 'Visual content and technical support for stronger brand communication.' },
        { title: 'Digital campaign', category: 'Digital Marketing', description: 'Strategy, analytics and optimisation to generate real opportunities.' },
      ],
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Ideas that create impact',
      defaults: [
        { title: 'Digital marketing trends', category: 'Marketing', excerpt: 'Coming soon.' },
        { title: 'How strong video multiplies results', category: 'Audiovisual', excerpt: 'Coming soon.' },
        { title: 'AI and automation for businesses', category: 'AI', excerpt: 'Coming soon.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your next project',
      namePlaceholder: 'Full name',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Phone / WhatsApp',
      companyPlaceholder: 'Company / Project',
      messagePlaceholder: 'Tell us about your project',
      sending: 'Sending...',
      submit: 'Send message',
      success: 'Thanks for reaching out. We have received your message and will contact you soon.',
      error: 'We could not send your message. Please try again or contact us via WhatsApp.',
      validation: 'Please complete name, email and message.',
    },
    footer: {
      navigation: 'Navigation',
      services: 'Services',
      rights: '© 2026 D-Solution. All rights reserved.',
      description: 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear and professional execution.',
    },
  },
};

function normalizeList(value?: string) {
  return (value || '').split(',').map((v) => v.trim()).filter(Boolean);
}

function isExternal(url?: string) {
  return !!url && /^https?:\/\//.test(url);
}

function openChatwoot() {
  const w = window as unknown as { $chatwoot?: { toggle?: (state?: string) => void } };
  if (w.$chatwoot?.toggle) w.$chatwoot.toggle('open');
}

function normalizeServiceTitle(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getServiceHref(title?: string, locale: Locale = 'es') {
  const normalized = normalizeServiceTitle(title || '');
  const serviceMap: Record<string, string> = {
    'tecnologia-audiovisual': '/servicios/tecnologia-audiovisual',
    'marketing-digital': '/servicios/marketing-digital',
    'desarrollo-web': '/servicios/desarrollo-web',
    'automatizacion-e-ia': '/servicios/automatizacion-ia',
    'branding-y-diseno': '/servicios/branding-diseno',
    'fotografia-profesional': '/servicios/fotografia-profesional',
    'audiovisual-technology': '/servicios/tecnologia-audiovisual',
    'digital-marketing': '/servicios/marketing-digital',
    'web-development': '/servicios/desarrollo-web',
    'automation-and-ai': '/servicios/automatizacion-ia',
    'branding-and-design': '/servicios/branding-diseno',
    'professional-photography': '/servicios/fotografia-profesional',
  };

  return serviceMap[normalized] || (locale === 'en' ? '/#services' : '/#servicios');
}

function getWhatsappHref(phone?: string, message?: string) {
  const cleanedPhone = (phone || '').replace(/[^0-9]/g, '');
  const base = cleanedPhone ? `https://wa.me/${cleanedPhone}` : '#contacto';
  if (!cleanedPhone || !message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

function getActionUrl(action?: string, url?: string, fallback = '#contacto', whatsapp?: string) {
  const normalized = (action || '').trim().toLowerCase();
  if (normalized === 'whatsapp') {
    const phone = (whatsapp || '').replace(/[^0-9]/g, '');
    return phone ? `https://wa.me/${phone}` : fallback;
  }
  if (normalized === 'chat') return '#chatwoot';
  if (normalized === 'form') return '#contacto';
  if (!url) return fallback;
  return url;
}

function handleActionClick(action?: string) {
  if ((action || '').trim().toLowerCase() === 'chat') openChatwoot();
}

function ImageBox({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (src) return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.35),transparent_30%),linear-gradient(135deg,#09233d,#061523)] ${className}`}>
      <div className="flex h-full items-center justify-center p-10 text-center text-white/80">
        <div>
          <img src="/logo.png" alt="D-Solution" className="mx-auto mb-5 h-20 w-20 rounded-full object-cover" />
          <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#D4AF37]">D-Solution</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({ data }: Props) {
  const { site, home, about, contact } = data;
  const primaryColor = site.primary_color || '#002147';
  const secondaryColor = site.secondary_color || '#D4AF37';
  const backgroundColor = site.background_color || '#F7F3EA';
  const trustedLogos = normalizeList(home.trusted_logos);
  const promoPopup = data.flex.find((item) => item.is_published !== false && item.section_type === 'promo_popup');
  const webhookUrl = contact.n8n_webhook_url || process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || 'https://n8n.d-solution.org/webhook/dsolution-contact';
  const [locale, setLocale] = useState<Locale>('es');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(LOCALE_KEY) : null;
    const browser = typeof window !== 'undefined' ? window.navigator.language.toLowerCase() : 'es';
    const nextLocale: Locale = saved === 'en' || browser.startsWith('en') ? 'en' : 'es';
    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'es-ES';
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const copy = LOCALES[locale];

  const localizedServices = useMemo<Props['data']['services']>(
    () =>
      copy.services.defaults.map((item, index) => {
        const source = data.services[index] || {};
        return {
          ...source,
          title: item.title,
          description: locale === 'en' ? item.description : source.description || item.description,
          image_url: source.image_url,
          button_text: copy.services.button,
          button_url: getServiceHref(item.title, locale),
          button_action: undefined,
        };
      }),
    [copy.services.button, copy.services.defaults, data.services, locale],
  );

  const localizedPortfolio = useMemo<Props['data']['portfolio']>(
    () => (data.portfolio.length ? data.portfolio : copy.portfolio.defaults.map((item) => ({ ...item, project_url: undefined, image_url: undefined }))),
    [copy.portfolio.defaults, data.portfolio],
  );

  const localizedBlog = useMemo<Props['data']['blog']>(
    () => (data.blog.length ? data.blog : copy.blog.defaults.map((item) => ({ ...item, slug: undefined, image_url: undefined, featured_image: undefined }))),
    [copy.blog.defaults, data.blog],
  );

  const heroEyebrow = locale === 'en' ? copy.hero.eyebrow : home.eyebrow || copy.hero.eyebrow;
  const heroTitle = locale === 'en' ? copy.hero.title : home.hero_title || copy.hero.title;
  const heroSubtitle = locale === 'en' ? copy.hero.subtitle : home.hero_subtitle || copy.hero.subtitle;
  const aboutEyebrow = locale === 'en' ? copy.about.eyebrow : about.eyebrow || copy.about.eyebrow;
  const aboutTitle = locale === 'en' ? copy.about.title : about.title || copy.about.title;
  const aboutIntro = locale === 'en' ? copy.about.intro : about.intro || copy.about.intro;
  const aboutDifference = locale === 'en' ? copy.about.difference : about.difference || copy.about.difference;
  const aboutWhere = locale === 'en' ? copy.about.where : about.where_we_work || copy.about.where;

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      source: 'd-solution.org',
      page: typeof window !== 'undefined' ? window.location.href : 'https://d-solution.org',
    };

    if (!payload.name || !payload.email || !payload.message) {
      setFormStatus('error');
      setFormMessage(copy.contact.validation);
      return;
    }

    try {
      setFormStatus('sending');
      setFormMessage(copy.contact.sending);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Webhook error');
      setFormStatus('success');
      setFormMessage(copy.contact.success);
      form.reset();
    } catch {
      setFormStatus('error');
      setFormMessage(copy.contact.error);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden text-slate-950" style={{ ['--brand' as string]: primaryColor, ['--gold' as string]: secondaryColor, backgroundColor }}>
      <Navbar links={copy.nav} ctaLabel={copy.ctaHeader} locale={locale} onLocaleChange={setLocale} />

      <section id="inicio" className="relative border-b border-slate-200/70 bg-[#002147] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,.17),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,.12),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-32 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-24 md:pt-36">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[.24em] text-[#D4AF37]">{heroEyebrow}</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[.95] tracking-tight md:text-7xl">{heroTitle}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/78">{heroSubtitle}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href={getActionUrl(home.primary_button_action, home.primary_button_url, '#contacto', contact.whatsapp)} onClick={() => handleActionClick(home.primary_button_action)} target={isExternal(getActionUrl(home.primary_button_action, home.primary_button_url, '#contacto', contact.whatsapp)) ? '_blank' : undefined} rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-6 py-4 text-sm font-bold text-[#002147] shadow-[0_18px_40px_rgba(0,0,0,.22)] transition hover:-translate-y-1">{locale === 'en' ? copy.hero.primaryButton : home.primary_button_text || copy.hero.primaryButton} <ArrowRight size={17} /></a>
              <a href={getActionUrl(home.secondary_button_action, home.secondary_button_url, '#servicios', contact.whatsapp)} onClick={() => handleActionClick(home.secondary_button_action)} target={isExternal(getActionUrl(home.secondary_button_action, home.secondary_button_url, '#servicios', contact.whatsapp)) ? '_blank' : undefined} rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10">{locale === 'en' ? copy.hero.secondaryButton : home.secondary_button_text || copy.hero.secondaryButton} <ArrowRight size={17} /></a>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
              {copy.highlights.map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-[#D4AF37]" /> {item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative">
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#D4AF37]/40" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-[#D4AF37]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-[0_35px_80px_rgba(0,0,0,.35)] backdrop-blur">
              <div className="h-[340px] overflow-hidden rounded-[1.5rem] md:h-[430px]">
                <ImageBox src={home.hero_image_url} alt="D-Solution hero" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {trustedLogos.length > 0 && (
        <div className="border-b border-slate-200/70 bg-white/75">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-5 py-5 text-sm font-semibold text-slate-500 md:justify-between md:px-8">
            <span className="text-slate-700">{copy.trusted}</span>
            {trustedLogos.map((logo) => <span key={logo}>{logo}</span>)}
          </div>
        </div>
      )}

      <section id="servicios" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.services.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#002147] md:text-5xl">{copy.services.title}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {localizedServices.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <motion.article key={`${s.title}-${i}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.04 }} whileHover={{ y: -6 }} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(0,33,71,.08)]">
                  {s.image_url ? <div className="mb-6 h-36 overflow-hidden rounded-2xl"><ImageBox src={s.image_url} alt={s.title || 'Servicio'} /></div> : <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#002147] text-[#D4AF37]"><Icon size={27} /></div>}
                  <h3 className="text-xl font-semibold text-[#002147]">{s.title}</h3>
                  <p className="mt-3 min-h-[84px] leading-7 text-slate-600">{s.description}</p>
                  <a href={getActionUrl(s.button_action, s.button_url, '#contacto', contact.whatsapp)} onClick={() => handleActionClick(s.button_action)} target={isExternal(getActionUrl(s.button_action, s.button_url, '#contacto', contact.whatsapp)) ? '_blank' : undefined} rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#002147] group-hover:text-[#D4AF37]">{locale === 'en' ? copy.services.button : s.button_text || copy.services.button} <ArrowRight size={15} /></a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="nosotros" className="border-y border-slate-200 bg-white/70 px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_18px_45px_rgba(0,33,71,.10)]">
            <div className="h-[360px] overflow-hidden rounded-[1.45rem]"><ImageBox src={about.image_url} alt="Sobre D-Solution" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{aboutEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#002147] md:text-5xl">{aboutTitle}</h2>
            <div className="mt-6 space-y-4 leading-8 text-slate-600">
              <p>{aboutIntro}</p>
              <p>{aboutDifference}</p>
              <p>{aboutWhere}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#002147] p-5 text-white"><strong className="text-3xl text-[#D4AF37]">+{about.years_experience || 5}</strong><p className="mt-1 text-sm text-white/70">{copy.about.years}</p></div>
              <div className="rounded-2xl bg-[#002147] p-5 text-white"><strong className="text-3xl text-[#D4AF37]">+{about.projects_count || 50}</strong><p className="mt-1 text-sm text-white/70">{copy.about.projects}</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.process.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">{copy.process.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {copy.steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(0,33,71,.07)]">
                <span className="text-4xl font-semibold text-[#D4AF37]">0{i + 1}</span>
                <h3 className="mt-7 font-semibold text-[#002147]">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="portafolio" className="border-y border-slate-200 bg-white/70 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.portfolio.eyebrow}</p><h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">{copy.portfolio.title}</h2></div>
            <a href="#contacto" className="font-bold text-[#002147]">{copy.portfolio.viewAll}</a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {localizedPortfolio.map((p, i) => (
              <motion.article key={`${p.title}-${i}`} whileHover={{ y: -5 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(0,33,71,.08)]">
                <div className="h-44"><ImageBox src={p.image_url} alt={p.title || 'Proyecto'} /></div>
                <div className="p-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#D4AF37]">{p.category}</p><h3 className="mt-2 text-lg font-semibold text-[#002147]">{p.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.blog.eyebrow}</p><h2 className="mt-3 text-3xl font-semibold text-[#002147] md:text-5xl">{copy.blog.title}</h2></div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {localizedBlog.map((post, i) => (
              <article key={`${post.title}-${i}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(0,33,71,.07)]">
                {post.image_url && <div className="h-40"><ImageBox src={post.image_url} alt={post.title || 'Blog'} /></div>}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#D4AF37]">{post.category}</p><h3 className="mt-3 text-xl font-semibold text-[#002147]">{post.title}</h3><p className="mt-3 leading-7 text-slate-600">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-5 pb-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#002147] p-7 text-white shadow-[0_30px_70px_rgba(0,33,71,.22)] md:grid-cols-[.85fr_1.15fr] md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#D4AF37]">{copy.contact.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{copy.contact.title}</h2>
            <div className="mt-8 space-y-4 text-white/82">
              <a href={contact.email ? `mailto:${contact.email}` : '#contacto'} className="flex items-center gap-3 transition hover:text-white">
                <Mail size={18} className="text-[#D4AF37]" />
                <span>{contact.email}</span>
              </a>
              <a
                href={getWhatsappHref(contact.whatsapp, locale === 'en' ? 'Hello, I would like more information about your services.' : 'Hola, quiero información sobre sus servicios.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <img
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  className="h-[18px] w-[18px] object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(76%) sepia(58%) saturate(547%) hue-rotate(357deg) brightness(90%) contrast(92%)' }}
                />
                <span>{contact.whatsapp}</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([contact.city, contact.country].filter(Boolean).join(', '))}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MapPin size={18} className="text-[#D4AF37]" />
                <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
              </a>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.contact.namePlaceholder} />
              <input name="email" type="email" required className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.contact.emailPlaceholder} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input name="phone" className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.contact.phonePlaceholder} />
              <input name="company" className="rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.contact.companyPlaceholder} />
            </div>
            <textarea name="message" required className="h-32 rounded-xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder={copy.contact.messagePlaceholder} />
            <button type="submit" disabled={formStatus === 'sending'} className="rounded-xl bg-[#D4AF37] px-6 py-4 font-bold text-[#002147] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60">{formStatus === 'sending' ? copy.contact.sending : copy.contact.submit}</button>
            {formMessage && <p className={`text-sm font-semibold ${formStatus === 'success' ? 'text-emerald-300' : formStatus === 'error' ? 'text-red-200' : 'text-white/75'}`}>{formMessage}</p>}
          </form>
        </div>
      </section>

      <a
        href={getWhatsappHref(contact.whatsapp, locale === 'en' ? 'Hello, I would like more information about your services.' : 'Hola, quiero información sobre sus servicios.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_18px_40px_rgba(0,33,71,.25)] transition hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(0,33,71,.32)]"
      >
        <img src="/whatsapp-icon.png" alt="WhatsApp" className="h-8 w-8 object-contain" />
      </a>

      <footer className="bg-[#002147] px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><img src="/logo.png" alt="D-Solution" className="mb-4 h-16 w-16 rounded-full object-cover" /><h3 className="text-2xl font-semibold">{site.site_name || 'D-Solution'}</h3><p className="mt-3 max-w-sm text-white/65">{locale === 'en' ? copy.footer.description : site.footer_text || copy.footer.description}</p></div>
          <div><h4 className="font-semibold text-[#D4AF37]">{copy.footer.navigation}</h4><div className="mt-4 grid gap-2 text-sm text-white/70">{copy.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></div>
          <div><h4 className="font-semibold text-[#D4AF37]">{copy.footer.services}</h4><div className="mt-4 grid gap-2 text-sm text-white/70">{localizedServices.slice(0, 5).map((s) => <span key={s.title}>{s.title}</span>)}</div></div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/45">{copy.footer.rights}</div>
      </footer>
      <PromoPopup promo={promoPopup} />
    </main>
  );
}
