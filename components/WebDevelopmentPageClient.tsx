'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar, { type NavLink } from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ContactSection from '@/components/ContactSection';
import DirectusVisualEditing, { isDirectusVisualEditingFrame } from '@/components/DirectusVisualEditing';
import { elementText, pageElement, type PageElement } from '@/lib/page-elements';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  DatabaseZap,
  FileCheck2,
  Layers3,
  LockKeyhole,
  MessageCircle,
  MonitorSmartphone,
  PanelTop,
  Rocket,
  ScrollText,
  ServerCog,
  ShoppingCart,
  Smartphone,
  TabletSmartphone,
  Target,
  Workflow,
} from 'lucide-react';

type Locale = 'es' | 'en';

type WebType = {
  id: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
};

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
    heroEyebrow: 'Desarrollo web',
    heroTitle: 'Elige el tipo de web que necesitas',
    heroText: 'Explora ejemplos visuales y descubre qué estructura se adapta mejor a tu negocio.',
    selectedCta: 'Quiero una web',
    helpText: 'También puedes escribirnos por WhatsApp o completar el formulario.',
    extraEyebrow: 'Funciones extra',
    extraTitleA: 'También podemos',
    extraTitleB: 'integrar',
    extraText: 'Funciones extra para que tu web venda más, automatice más y mida mejor.',
    receiveTitle: 'Qué recibe tu proyecto',
    contactEyebrow: 'Hablemos de tu proyecto',
    types: [
      {
        id: 'corporativa',
        title: 'Web corporativa',
        short: 'Presencia profesional',
        description: 'Proyecta una imagen profesional y genera confianza con un sitio web que comunica quién eres, qué haces y por qué deberían elegirte.',
        benefits: ['Refuerza tu marca y credibilidad', 'Presenta tus servicios con claridad', 'Diseñada para atraer, informar y convertir'],
      },
      {
        id: 'landing',
        title: 'Landing page',
        short: 'Campañas y leads',
        description: 'Una página enfocada en una sola acción: presentar una oferta, captar contactos o acompañar una campaña publicitaria.',
        benefits: ['Mensaje directo y persuasivo', 'Formulario o WhatsApp visibles', 'Ideal para campañas de Ads'],
      },
      {
        id: 'ecommerce',
        title: 'Tienda online',
        short: 'Venta digital',
        description: 'Una experiencia clara para mostrar productos, facilitar compras y gestionar consultas o pedidos desde la web.',
        benefits: ['Catálogo organizado', 'Carrito y métodos de pago', 'Preparada para crecer'],
      },
      {
        id: 'catalogo',
        title: 'Catálogo online',
        short: 'Productos y consultas',
        description: 'Muestra productos o servicios de forma ordenada y dirige cada consulta hacia WhatsApp o formulario.',
        benefits: ['Categorías claras', 'Fichas visuales', 'Consulta rápida por WhatsApp'],
      },
      {
        id: 'reservas',
        title: 'Web con reservas',
        short: 'Agenda y citas',
        description: 'Permite que tus clientes reserven citas, reuniones o servicios desde la propia web, sin mensajes repetitivos.',
        benefits: ['Calendario integrado', 'Menos coordinación manual', 'Mejor experiencia para el cliente'],
      },
      {
        id: 'plataforma',
        title: 'Plataforma web',
        short: 'Sistema a medida',
        description: 'Creamos sistemas web con usuarios, paneles, automatizaciones y flujos internos adaptados a tu operación.',
        benefits: ['Panel privado', 'Procesos conectados', 'Escalable para tu negocio'],
      },
    ] as WebType[],
    extras: [
      ['Conexión con CRM', 'Envía tus leads automáticamente a tu CRM y ordena mejor tu seguimiento.'],
      ['WhatsApp integrado', 'Capta consultas rápidas y conecta al cliente directo con tu equipo.'],
      ['Chatbot web', 'Responde preguntas frecuentes y genera contactos incluso fuera de horario.'],
      ['Pagos online', 'Facilita compras y cobros desde la web con métodos de pago integrados.'],
      ['Automatizaciones con n8n', 'Conecta tu web con procesos, avisos y tareas automáticas.'],
      ['Analytics y conversiones', 'Mide visitas, formularios y acciones clave para tomar mejores decisiones.'],
      ['Reservas y citas', 'Permite agendar reuniones o servicios desde la propia web.'],
      ['Formularios inteligentes', 'Recoge datos útiles y clasifica mejor cada oportunidad.'],
    ],
    deliverables: [
      ['Diseño estratégico', 'Diseños únicos y enfocados en la experiencia de usuario y los objetivos de tu negocio.'],
      ['Rendimiento superior', 'Sitios rápidos y optimizados para SEO que mejoran tu posicionamiento.'],
      ['Seguridad y confianza', 'Implementamos buenas prácticas para proteger tu web y los datos de tus usuarios.'],
      ['Escalable y medible', 'Sitios preparados para crecer y medir resultados con métricas detalladas.'],
    ],
  },
  en: {
    cta: 'Let’s talk about your project',
    heroEyebrow: 'Web development',
    heroTitle: 'Choose the type of website you need',
    heroText: 'Explore visual examples and discover the structure that fits your business best.',
    selectedCta: 'I want this website',
    helpText: 'You can also message us on WhatsApp or complete the form.',
    extraEyebrow: 'Extra features',
    extraTitleA: 'We can also',
    extraTitleB: 'integrate',
    extraText: 'Extra features so your website sells more, automates more and measures better.',
    receiveTitle: 'What your project receives',
    contactEyebrow: 'Let’s talk about your project',
    types: [
      { id: 'corporativa', title: 'Corporate website', short: 'Professional presence', description: 'Build trust with a website that explains who you are, what you do and why people should choose you.', benefits: ['Strengthens brand credibility', 'Presents services clearly', 'Built to attract and convert'] },
      { id: 'landing', title: 'Landing page', short: 'Campaigns and leads', description: 'A focused page for one action: promote an offer, capture leads or support an ad campaign.', benefits: ['Clear persuasive message', 'Visible form or WhatsApp', 'Ideal for ad campaigns'] },
      { id: 'ecommerce', title: 'Online store', short: 'Digital sales', description: 'A clear experience to show products, enable purchases and manage enquiries or orders.', benefits: ['Organised catalogue', 'Cart and payments', 'Ready to scale'] },
      { id: 'catalogo', title: 'Online catalogue', short: 'Products and enquiries', description: 'Show products or services in an organised way and drive each enquiry to WhatsApp or a form.', benefits: ['Clear categories', 'Visual product pages', 'Fast WhatsApp enquiry'] },
      { id: 'reservas', title: 'Booking website', short: 'Appointments', description: 'Let clients book meetings, visits or services from your website without repeated messages.', benefits: ['Integrated calendar', 'Less manual coordination', 'Better client experience'] },
      { id: 'plataforma', title: 'Web platform', short: 'Custom system', description: 'Custom web systems with users, dashboards, automations and workflows adapted to your operation.', benefits: ['Private dashboard', 'Connected processes', 'Scalable for your business'] },
    ] as WebType[],
    extras: [
      ['CRM connection', 'Send leads automatically to your CRM and organise follow-up.'],
      ['Integrated WhatsApp', 'Capture quick enquiries and connect customers to your team.'],
      ['Web chatbot', 'Answer FAQs and generate contacts even after hours.'],
      ['Online payments', 'Enable purchases and payments directly from the website.'],
      ['n8n automations', 'Connect your website with processes, alerts and automatic tasks.'],
      ['Analytics and conversions', 'Measure visits, forms and key actions to make better decisions.'],
      ['Bookings and appointments', 'Let users schedule meetings or services from the website.'],
      ['Smart forms', 'Collect useful data and classify each opportunity better.'],
    ],
    deliverables: [
      ['Strategic design', 'Unique designs focused on user experience and business goals.'],
      ['Superior performance', 'Fast SEO-optimised sites that improve positioning.'],
      ['Security and trust', 'We apply good practices to protect your website and user data.'],
      ['Scalable and measurable', 'Websites ready to grow and measure results with detailed metrics.'],
    ],
  },
} as const;

const typeIcons = [PanelTop, Rocket, ShoppingCart, ScrollText, CalendarDays, Layers3];
const extraIcons = [DatabaseZap, MessageCircle, Bot, CreditCard, Workflow, BarChart3, CalendarDays, FileCheck2];
const deliverableIcons = [Target, Rocket, LockKeyhole, BarChart3];

function DevicePreview({ selected }: { selected: WebType }) {
  const rows = useMemo(() => selected.benefits, [selected]);
  return (
    <div className="relative min-h-[470px] w-full">
      <div className="absolute left-[5%] top-8 w-[70%] rounded-[1.7rem] border border-white/30 bg-[#131922] p-3 shadow-[0_35px_90px_rgba(0,0,0,.35)]">
        <div className="h-[360px] overflow-hidden rounded-[1.2rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-slow min-h-[680px] bg-[#f6f2ea] text-[#061523]">
            <div className="bg-[#061523] px-8 py-5 text-white">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.16em]">
                <span>Nexora</span><span>Inicio · Servicios · Contacto</span>
              </div>
              <div className="grid grid-cols-[1fr_.85fr] items-center gap-8 py-10">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-[#D4AF37]">{selected.title}</p>
                  <h3 className="mt-3 text-4xl font-black leading-tight">Soluciones digitales que <span className="text-[#D4AF37]">impulsan</span> tu negocio</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/72">{selected.description}</p>
                  <span className="mt-6 inline-flex rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-black text-[#061523]">Conversemos</span>
                </div>
                <div className="h-44 rounded-2xl bg-[linear-gradient(135deg,#dfe7ef,#ffffff)] shadow-inner" />
              </div>
            </div>
            <div className="px-8 py-8">
              <p className="text-center text-xs font-black uppercase tracking-[.18em] text-[#B88A1A]">Confían en nosotros</p>
              <div className="mt-5 grid grid-cols-4 gap-3 text-center text-xs font-bold text-[#061523]/50">
                <span>ALMARA</span><span>ZENTRO</span><span>VERDEX</span><span>LUMEN</span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {rows.map((row) => <div key={row} className="rounded-xl bg-white p-4 shadow"><Check size={18} className="text-[#D4AF37]"/><p className="mt-3 text-sm font-bold">{row}</p></div>)}
              </div>
              <div className="mt-8 h-36 rounded-2xl bg-[#061523]" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] top-24 w-[22%] min-w-[150px] rounded-[1.5rem] border border-white/40 bg-[#0f1620] p-2 shadow-[0_25px_70px_rgba(0,0,0,.38)]">
        <div className="h-[305px] overflow-hidden rounded-[1rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-medium min-h-[560px] bg-[#f6f2ea] text-[#061523]">
            <div className="bg-[#061523] p-4 text-white"><p className="text-xs font-black">NEXORA</p><h4 className="mt-8 text-xl font-black">{selected.title}</h4><p className="mt-3 text-xs leading-5 text-white/70">{selected.short}</p><span className="mt-5 inline-flex rounded-md bg-[#D4AF37] px-3 py-2 text-[10px] font-black text-[#061523]">Ver servicios</span></div>
            <div className="space-y-3 p-4">{rows.map(row => <div key={row} className="rounded-lg bg-white p-3 text-xs font-bold shadow">{row}</div>)}</div>
          </div>
        </div>
      </div>
      <div className="absolute right-[1%] top-36 w-[13%] min-w-[92px] rounded-[1.25rem] border border-white/40 bg-[#0f1620] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,.42)]">
        <div className="h-[240px] overflow-hidden rounded-[.9rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-fast min-h-[460px] bg-[#f6f2ea] text-[#061523]">
            <div className="bg-[#061523] p-3 text-white"><p className="text-[9px] font-black">NEXORA</p><h4 className="mt-8 text-sm font-black leading-tight">{selected.title}</h4><span className="mt-4 inline-flex rounded bg-[#D4AF37] px-2 py-1 text-[8px] font-black text-[#061523]">Contactar</span></div>
            <div className="space-y-2 p-2">{rows.map(row => <div key={row} className="rounded bg-white p-2 text-[8px] font-bold shadow">{row}</div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebDevelopmentPageClient({ pageElements = [] }: { pageElements?: PageElement[] }) {
  const [locale, setLocale] = useState<Locale>('es');
  const [active, setActive] = useState(0);
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

  const base = copy[locale];
  const selected = base.types[active];
  const globalItem = (key: string) => pageElement(pageElements, 'global', locale, key);
  const keys = ['home', 'services', 'portfolio', 'process', 'contact'];
  const links = navLinks[locale].map(([label, href], index) => {
    const nav = globalItem(`nav.${keys[index]}`);
    return [elementText(nav, label), nav?.link || href] as NavLink;
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
      <style jsx global>{`
        @keyframes webPreviewScroll {
          0%, 12% { transform: translateY(0); }
          82%, 100% { transform: translateY(calc(-100% + var(--preview-height, 360px))); }
        }
        .web-scroll-demo { animation-name: webPreviewScroll; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; will-change: transform; }
        .web-scroll-demo-slow { --preview-height: 360px; animation-duration: 13s; }
        .web-scroll-demo-medium { --preview-height: 305px; animation-duration: 11s; }
        .web-scroll-demo-fast { --preview-height: 240px; animation-duration: 10s; }
        @media (prefers-reduced-motion: reduce) { .web-scroll-demo { animation: none; } }
      `}</style>
      <DirectusVisualEditing enabled={visualEditingEnabled} refreshKey={`web-development:${locale}:${pageElements.length}`} />
      <Navbar links={links} ctaLabel={base.cta} locale={locale} onLocaleChange={handleLocale} transparentOnTop editableLinks={keys.map(key => globalItem(`nav.${key}`))} ctaElement={globalItem('cta')} visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />

      <section className="relative overflow-hidden bg-[#07315C] px-5 pb-20 pt-28 text-white md:px-8 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_15%,rgba(212,175,55,.20),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(0,166,166,.18),transparent_30%),linear-gradient(180deg,#052744_0%,#07315C_48%,#08213A_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(115deg,transparent_0%,transparent_48%,rgba(255,255,255,.16)_49%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mx-auto mb-5 flex w-fit items-center gap-4 text-[#D4AF37]"><span className="h-px w-24 bg-[#D4AF37]/65"/><MonitorSmartphone/><span className="h-px w-24 bg-[#D4AF37]/65"/></div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#D4AF37]">{base.heroEyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-6xl">{base.heroTitle.split('tipo de web')[0]}<span className="text-[#D4AF37]">tipo de web</span>{base.heroTitle.split('tipo de web')[1]}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/78">{base.heroText}</p>
          </div>

          <div className="mt-12 grid items-center gap-9 lg:grid-cols-[330px_1fr]">
            <div className="grid gap-3">
              {base.types.map((type, index) => {
                const Icon = typeIcons[index];
                const isActive = index === active;
                return (
                  <button key={type.id} onClick={() => setActive(index)} className={`group flex min-h-[74px] items-center justify-between rounded-2xl border px-5 text-left transition ${isActive ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_18px_45px_rgba(212,175,55,.15)]' : 'border-white/12 bg-white/[.04] hover:border-[#D4AF37]/55 hover:bg-white/[.07]'}`}>
                    <span className="flex items-center gap-4"><Icon className="text-[#D4AF37]" size={26}/><span><span className="block font-black text-white">{type.title}</span><span className="mt-1 block text-xs text-white/55">{type.short}</span></span></span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${isActive ? 'bg-[#D4AF37] text-[#061523]' : 'text-white/70'}`}>{isActive ? <Check size={18}/> : <ChevronRight size={18}/>}</span>
                  </button>
                );
              })}
            </div>

            <DevicePreview selected={selected} />
          </div>

          <div className="mt-10 grid gap-8 rounded-[2rem] border border-white/12 bg-[#061523]/55 p-7 backdrop-blur-xl lg:grid-cols-[1fr_360px]">
            <div className="flex gap-5">
              {(() => { const Icon = typeIcons[active]; return <span className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/60 text-[#D4AF37] md:flex"><Icon size={34}/></span>; })()}
              <div>
                <h2 className="text-4xl font-black tracking-[-.04em]">{selected.title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">{selected.description}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {selected.benefits.map((benefit) => <span key={benefit} className="flex items-center gap-2 text-sm font-bold text-white/82"><Check size={18} className="text-[#D4AF37]"/>{benefit}</span>)}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center border-[#D4AF37]/30 lg:border-l lg:pl-9">
              <a href="#contacto" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-6 py-4 font-black text-[#061523] shadow-[0_22px_45px_rgba(212,175,55,.28)] transition hover:-translate-y-1 hover:bg-white">{base.selectedCta} <ArrowRight size={18}/></a>
              <p className="mt-5 text-sm leading-6 text-white/68"><MessageCircle className="mr-2 inline text-[#25D366]" size={18}/>{base.helpText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]">{base.extraEyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#061523] md:text-6xl">{base.extraTitleA} <span className="text-[#B88A1A]">{base.extraTitleB}</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#061523]/65">{base.extraText}</p>
          <span className="mx-auto mt-6 block h-0.5 w-16 bg-[#D4AF37]" />
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {base.extras.map(([title, text], index) => {
            const Icon = extraIcons[index];
            return <article key={title} className="group rounded-[1.45rem] border border-[#D4AF37]/20 bg-white p-6 shadow-[0_18px_45px_rgba(0,33,71,.06)] transition hover:-translate-y-1 hover:border-[#D4AF37]/55 hover:shadow-[0_28px_70px_rgba(0,33,71,.12)]">
              <div className="flex items-start gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#F7F3EA] text-[#002147]"><Icon size={28}/></span>
                <span className="text-sm font-black text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-5 text-xl font-black text-[#061523]">{title}</h3>
              <p className="mt-3 text-base leading-7 text-[#061523]/64">{text}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="bg-[#07315C] px-5 py-18 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-center gap-5 text-center">
            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,transparent,#D4AF37)] md:block"/>
            <h2 className="text-4xl font-black uppercase tracking-[-.035em] md:text-6xl">{base.receiveTitle}</h2>
            <span className="hidden h-px flex-1 bg-[linear-gradient(90deg,#D4AF37,transparent)] md:block"/>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {base.deliverables.map(([title, text], index) => {
              const Icon = deliverableIcons[index];
              const gradients = ['from-[#E9EEF5] to-[#FFFFFF]', 'from-[#071827] to-[#0B2C4F]', 'from-[#05223D] to-[#0B5B8F]', 'from-[#071827] to-[#0B2C4F]'];
              return <article key={title} className="overflow-hidden rounded-[1.45rem] border border-[#D4AF37]/38 bg-[#061523] shadow-[0_24px_60px_rgba(0,0,0,.20)]">
                <div className={`relative h-36 bg-gradient-to-br ${gradients[index]}`}>
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-black text-[#061523]">0{index + 1}</span>
                  <div className="absolute inset-x-5 bottom-5 h-20 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
                    <div className="h-full rounded-xl bg-[linear-gradient(90deg,rgba(212,175,55,.75),rgba(255,255,255,.18))] opacity-60" />
                  </div>
                </div>
                <div className="p-6">
                  <Icon size={28} className="text-[#D4AF37]" />
                  <h3 className="mt-4 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/72">{text}</p>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#F7F3EA] pt-14">
        <ContactSection locale={locale} source="d-solution.org/desarrollo-web" visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />
      </div>
      <SiteFooter locale={locale} links={links} visualEditingEnabled={visualEditingEnabled} pageElements={pageElements} />
    </main>
  );
}
