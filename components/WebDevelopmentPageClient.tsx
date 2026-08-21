'use client';

import { useEffect, useState } from 'react';
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
  ShoppingCart,
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

type PreviewTemplate = {
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  primaryCta: string;
  secondaryCta: string;
  pills: readonly string[];
  tabletTitle: string;
  tabletText: string;
  tabletItems: readonly string[];
  mobileTitle: string;
  mobileItems: readonly string[];
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

function previewTemplate(id: string, locale: Locale): PreviewTemplate {
  const t = {
    es: {
      corporativa: {
        eyebrow: 'WEB CORPORATIVA', heroTitle: 'Soluciones digitales que impulsan tu negocio', heroText: 'Presenta tu empresa, servicios y experiencia con una imagen profesional y clara.', primaryCta: 'Conoce la empresa', secondaryCta: 'Agenda una reunión', pills: ['Sobre nosotros', 'Servicios', 'Casos de éxito'], tabletTitle: 'Web corporativa', tabletText: 'Empresa • Servicios • Credibilidad', tabletItems: ['Quiénes somos', 'Servicios', 'Casos de éxito'], mobileTitle: 'Web corporativa', mobileItems: ['Sobre nosotros', 'Servicios', 'Contacto'],
      },
      landing: {
        eyebrow: 'LANDING PAGE', heroTitle: 'Convierte visitas en contactos', heroText: 'Una página enfocada en una oferta concreta, con mensaje directo y CTA visible.', primaryCta: 'Quiero leads', secondaryCta: 'Ver oferta', pills: ['Oferta clara', 'Beneficios', 'Formulario rápido'], tabletTitle: 'Landing page', tabletText: 'Oferta • Formulario • Conversión', tabletItems: ['Titular fuerte', 'Beneficios', 'Formulario'], mobileTitle: 'Landing page', mobileItems: ['Oferta', 'CTA visible', 'WhatsApp'],
      },
      ecommerce: {
        eyebrow: 'TIENDA ONLINE', heroTitle: 'Vende tus productos de forma simple', heroText: 'Catálogo, carrito y pagos online para convertir visitas en ventas.', primaryCta: 'Comprar ahora', secondaryCta: 'Ver categorías', pills: ['Categorías', 'Productos', 'Checkout simple'], tabletTitle: 'Tienda online', tabletText: 'Productos • Carrito • Pagos', tabletItems: ['Categorías', 'Productos', 'Carrito'], mobileTitle: 'Tienda online', mobileItems: ['Catálogo', 'Pago fácil', 'Soporte'],
      },
      catalogo: {
        eyebrow: 'CATÁLOGO ONLINE', heroTitle: 'Muestra tu catálogo y genera consultas', heroText: 'Ideal para empresas que quieren mostrar productos o servicios sin proceso de compra completo.', primaryCta: 'Solicitar catálogo', secondaryCta: 'Pedir información', pills: ['Categorías', 'Fichas visuales', 'Consulta rápida'], tabletTitle: 'Catálogo online', tabletText: 'Catálogo • Categorías • Consulta', tabletItems: ['Categorías', 'Productos', 'Consulta'], mobileTitle: 'Catálogo online', mobileItems: ['Productos', 'WhatsApp', 'Cotización'],
      },
      reservas: {
        eyebrow: 'WEB CON RESERVAS', heroTitle: 'Agenda citas sin mensajes repetitivos', heroText: 'Tus clientes reservan fechas y horarios desde la propia web.', primaryCta: 'Reservar ahora', secondaryCta: 'Ver agenda', pills: ['Servicios', 'Calendario', 'Horarios'], tabletTitle: 'Web con reservas', tabletText: 'Servicios • Agenda • Disponibilidad', tabletItems: ['Servicios', 'Calendario', 'Horarios'], mobileTitle: 'Reservas', mobileItems: ['Calendario', 'Horarios', 'Confirmación'],
      },
      plataforma: {
        eyebrow: 'PLATAFORMA WEB', heroTitle: 'Tu operación conectada en un solo panel', heroText: 'Usuarios, paneles, automatizaciones y reportes adaptados a tu negocio.', primaryCta: 'Ver plataforma', secondaryCta: 'Solicitar demo', pills: ['Módulos', 'Usuarios', 'Reportes'], tabletTitle: 'Plataforma web', tabletText: 'Panel • Procesos • Reportes', tabletItems: ['Dashboard', 'Usuarios', 'Módulos'], mobileTitle: 'Plataforma', mobileItems: ['Panel', 'Alertas', 'Tareas'],
      },
    },
    en: {
      corporativa: {
        eyebrow: 'CORPORATE WEBSITE', heroTitle: 'Digital solutions that move your business forward', heroText: 'Present your company, services and experience with a clear professional image.', primaryCta: 'Meet the company', secondaryCta: 'Book a meeting', pills: ['About us', 'Services', 'Case studies'], tabletTitle: 'Corporate website', tabletText: 'Company • Services • Trust', tabletItems: ['About us', 'Services', 'Case studies'], mobileTitle: 'Corporate website', mobileItems: ['About', 'Services', 'Contact'],
      },
      landing: {
        eyebrow: 'LANDING PAGE', heroTitle: 'Turn visits into qualified leads', heroText: 'A focused page for a single offer, with direct messaging and a visible CTA.', primaryCta: 'Get leads', secondaryCta: 'View offer', pills: ['Clear offer', 'Benefits', 'Quick form'], tabletTitle: 'Landing page', tabletText: 'Offer • Form • Conversion', tabletItems: ['Strong headline', 'Benefits', 'Form'], mobileTitle: 'Landing page', mobileItems: ['Offer', 'CTA', 'WhatsApp'],
      },
      ecommerce: {
        eyebrow: 'ONLINE STORE', heroTitle: 'Sell products with a frictionless experience', heroText: 'Catalogue, cart and online payments designed to turn visits into orders.', primaryCta: 'Shop now', secondaryCta: 'Browse categories', pills: ['Categories', 'Products', 'Easy checkout'], tabletTitle: 'Online store', tabletText: 'Products • Cart • Payments', tabletItems: ['Categories', 'Products', 'Cart'], mobileTitle: 'Online store', mobileItems: ['Catalogue', 'Easy pay', 'Support'],
      },
      catalogo: {
        eyebrow: 'ONLINE CATALOGUE', heroTitle: 'Show your catalogue and drive enquiries', heroText: 'Perfect for businesses that want to display products or services without full checkout.', primaryCta: 'Request catalogue', secondaryCta: 'Ask for info', pills: ['Categories', 'Visual cards', 'Fast enquiry'], tabletTitle: 'Online catalogue', tabletText: 'Catalogue • Categories • Enquiry', tabletItems: ['Categories', 'Products', 'Enquiry'], mobileTitle: 'Online catalogue', mobileItems: ['Products', 'WhatsApp', 'Quote'],
      },
      reservas: {
        eyebrow: 'BOOKING WEBSITE', heroTitle: 'Book appointments without back-and-forth messages', heroText: 'Clients can choose dates and times directly from your website.', primaryCta: 'Book now', secondaryCta: 'View calendar', pills: ['Services', 'Calendar', 'Time slots'], tabletTitle: 'Booking website', tabletText: 'Services • Calendar • Availability', tabletItems: ['Services', 'Calendar', 'Slots'], mobileTitle: 'Bookings', mobileItems: ['Calendar', 'Slots', 'Confirmation'],
      },
      plataforma: {
        eyebrow: 'WEB PLATFORM', heroTitle: 'Your operation connected in one dashboard', heroText: 'Users, dashboards, automations and reports adapted to your workflow.', primaryCta: 'View platform', secondaryCta: 'Request demo', pills: ['Modules', 'Users', 'Reports'], tabletTitle: 'Web platform', tabletText: 'Dashboard • Workflows • Reports', tabletItems: ['Dashboard', 'Users', 'Modules'], mobileTitle: 'Platform', mobileItems: ['Dashboard', 'Alerts', 'Tasks'],
      },
    },
  } as const;

  return (t as Record<string, Record<string, PreviewTemplate>>)[locale][id];
}

function DesktopPreviewContent({ selected, locale }: { selected: WebType; locale: Locale }) {
  const data = previewTemplate(selected.id, locale);

  if (selected.id === 'corporativa') {
    return (
      <div className="min-h-[760px] bg-[#f7f6f2] text-[#061523]">
        <div className="flex items-center justify-between border-b border-[#e7deca] bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061523]/60">
          <span>NEXORA</span>
          <span>Inicio · Servicios · Casos · Contacto</span>
        </div>
        <div className="grid grid-cols-[1.05fr_.95fr] gap-8 px-8 py-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#B88A1A]">{data.eyebrow}</p>
            <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#061523]/70">{data.heroText}</p>
            <div className="mt-5 flex gap-3">
              <span className="rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-black text-[#061523]">{data.primaryCta}</span>
              <span className="rounded-lg border border-[#d8ccaf] px-4 py-3 text-sm font-black text-[#061523]">{data.secondaryCta}</span>
            </div>
            <div className="mt-7 grid grid-cols-4 gap-3 text-center text-xs font-bold text-[#061523]/45">
              <span>ALMARA</span><span>ZENTRO</span><span>VERDEX</span><span>LUMEN</span>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-[#efe7d8] bg-[linear-gradient(135deg,#d8e1eb,#ffffff)] p-5">
            <div className="h-full rounded-[1.2rem] bg-[linear-gradient(180deg,#dbe4ee,#ffffff)] p-4">
              <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,#cfd8e5,#fdfefe)]" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {data.pills.map((pill) => (
                  <div key={pill} className="rounded-xl bg-white p-3 text-center text-xs font-bold shadow-sm">{pill}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 px-8">
          {['Experiencia sólida', 'Mensaje claro', 'Llamado a la acción'].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="h-1.5 w-12 rounded-full bg-[#D4AF37]" />
              <p className="mt-4 text-sm font-black">{item}</p>
              <p className="mt-2 text-xs leading-5 text-[#061523]/60">Contenido ordenado para comunicar mejor tu propuesta.</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 p-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#B88A1A]">Quiénes somos</p>
            <div className="mt-4 h-24 rounded-2xl bg-[#ecf0f4]" />
            <div className="mt-4 space-y-2">
              <div className="h-2 rounded-full bg-[#dde3ea]" />
              <div className="h-2 w-5/6 rounded-full bg-[#dde3ea]" />
              <div className="h-2 w-4/6 rounded-full bg-[#dde3ea]" />
            </div>
          </div>
          <div className="rounded-2xl bg-[#061523] p-5 text-white">
            <div className="grid grid-cols-3 gap-3 text-center">
              {['+50', '12 años', '24/7'].map((metric) => (
                <div key={metric} className="rounded-xl bg-white/6 p-4">
                  <p className="text-2xl font-black text-[#D4AF37]">{metric}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-white/60">Confianza</p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-24 rounded-2xl border border-white/10 bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (selected.id === 'landing') {
    return (
      <div className="min-h-[760px] bg-[#fbfaf7] text-[#061523]">
        <div className="bg-[#061523] px-8 py-6 text-white">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-white/65"><span>NEXORA</span><span>Oferta · Beneficios · Contacto</span></div>
          <div className="grid grid-cols-[1fr_.85fr] gap-8 py-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[.22em] text-[#D4AF37]">{data.eyebrow}</p>
              <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/72">{data.heroText}</p>
              <div className="mt-5 flex gap-3">
                <span className="rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-black text-[#061523]">{data.primaryCta}</span>
                <span className="rounded-lg border border-white/20 px-4 py-3 text-sm font-black">{data.secondaryCta}</span>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-white p-5 text-[#061523] shadow-lg">
              <div className="rounded-2xl bg-[#f5efe0] px-4 py-5">
                <p className="text-xs font-black uppercase tracking-[.18em] text-[#B88A1A]">Oferta especial</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-white p-4"><p className="text-3xl font-black">50%</p><p className="mt-1 text-xs font-bold text-[#061523]/55">OFF</p></div>
                  <div className="rounded-xl bg-white p-4"><p className="text-3xl font-black">24h</p><p className="mt-1 text-xs font-bold text-[#061523]/55">respuesta</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 px-8 py-6">
          {data.pills.map((pill) => (
            <div key={pill} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-black">{pill}</p>
              <div className="mt-4 h-2 rounded-full bg-[#e8dcc0]" />
              <div className="mt-2 h-2 w-4/5 rounded-full bg-[#ece3cf]" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_.9fr] gap-5 px-8 pb-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#B88A1A]">Testimonio</p>
            <p className="mt-4 text-lg font-black leading-7">“Ahora recibimos más contactos calificados sin complicar la navegación.”</p>
            <div className="mt-5 h-10 w-36 rounded-full bg-[#f0f2f4]" />
          </div>
          <div className="rounded-2xl bg-[#061523] p-5 text-white">
            <p className="text-sm font-black">Formulario rápido</p>
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-20 rounded-xl bg-white/10" />
              <div className="h-11 rounded-xl bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selected.id === 'ecommerce') {
    return (
      <div className="min-h-[760px] bg-[#f6f7f8] text-[#061523]">
        <div className="flex items-center justify-between bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061523]/60"><span>NEXORA SHOP</span><span>Categorías · Ofertas · Carrito</span></div>
        <div className="grid grid-cols-[1fr_.9fr] gap-8 px-8 py-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]">{data.eyebrow}</p>
            <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#061523]/70">{data.heroText}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Moda', 'Hogar', 'Tecnología', 'Ofertas'].map((chip) => <span key={chip} className="rounded-full border border-[#d8ccaf] bg-white px-3 py-2 text-xs font-black">{chip}</span>)}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-[#ece8df] bg-white p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {['Producto A', 'Producto B', 'Producto C', 'Producto D'].map((item, index) => (
                <div key={item} className="rounded-2xl bg-[#f6f7f8] p-3">
                  <div className="h-20 rounded-xl bg-[linear-gradient(135deg,#dce4ee,#ffffff)]" />
                  <p className="mt-3 text-xs font-black">{item}</p>
                  <p className="mt-1 text-xs text-[#061523]/55">€{29 + index * 11}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1.2fr_.8fr] gap-5 px-8 pb-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex gap-3">
              {data.pills.map((pill) => <span key={pill} className="rounded-full bg-[#f2eee6] px-3 py-2 text-xs font-black">{pill}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['Envíos claros', 'Cupones', 'Stock visible'].map((text) => (
                <div key={text} className="rounded-2xl border border-[#ebe3d2] p-4 text-sm font-bold">{text}</div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#061523] p-5 text-white">
            <p className="text-sm font-black">Resumen de compra</p>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between rounded-xl bg-white/8 p-3 text-xs"><span>Subtotal</span><span>€124</span></div>
              <div className="flex justify-between rounded-xl bg-white/8 p-3 text-xs"><span>Envío</span><span>€6</span></div>
              <div className="flex justify-between rounded-xl bg-[#D4AF37] p-3 text-xs font-black text-[#061523]"><span>Total</span><span>€130</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selected.id === 'catalogo') {
    return (
      <div className="min-h-[760px] bg-[#f8f6f1] text-[#061523]">
        <div className="flex items-center justify-between bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061523]/60"><span>NEXORA CATALOG</span><span>Categorías · Productos · Consultas</span></div>
        <div className="grid grid-cols-[260px_1fr] gap-5 px-8 py-8">
          <div className="rounded-[1.7rem] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#B88A1A]">Categorías</p>
            <div className="mt-5 space-y-3">
              {['Equipos', 'Accesorios', 'Soluciones', 'Paquetes'].map((item) => <div key={item} className="rounded-xl border border-[#eee7d8] px-4 py-3 text-sm font-bold">{item}</div>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]">{data.eyebrow}</p>
            <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#061523]/70">{data.heroText}</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {['Catálogo 01', 'Catálogo 02', 'Catálogo 03', 'Catálogo 04', 'Catálogo 05', 'Catálogo 06'].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="h-24 rounded-xl bg-[linear-gradient(135deg,#dbe3ed,#ffffff)]" />
                  <p className="mt-3 text-xs font-black">{item}</p>
                  <p className="mt-1 text-xs text-[#061523]/55">Ficha + consulta</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#061523] p-5 text-white">
              <p className="text-sm font-black">Consulta por WhatsApp</p>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/8 px-4 py-3 text-xs"><span>Producto seleccionado</span><span className="text-[#D4AF37]">Enviar ahora</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selected.id === 'reservas') {
    return (
      <div className="min-h-[760px] bg-[#f8f6f1] text-[#061523]">
        <div className="flex items-center justify-between bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061523]/60"><span>NEXORA BOOKING</span><span>Servicios · Agenda · Confirmación</span></div>
        <div className="grid grid-cols-[1fr_.95fr] gap-8 px-8 py-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]">{data.eyebrow}</p>
            <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#061523]/70">{data.heroText}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Consulta', 'Reunión', 'Sesión'].map((item) => <div key={item} className="rounded-2xl bg-white p-4 text-center text-sm font-bold shadow-sm">{item}</div>)}
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm font-black"><span>Septiembre</span><span className="text-[#B88A1A]">Disponibilidad</span></div>
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[10px] font-bold">
              {['L','M','X','J','V','S','D'].map((d) => <span key={d} className="text-[#061523]/45">{d}</span>)}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => <span key={n} className={`rounded-lg px-2 py-2 ${n === 12 || n === 18 ? 'bg-[#D4AF37] text-[#061523]' : 'bg-[#f5f1e8]'}`}>{n}</span>)}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {['09:00', '11:30', '16:00'].map((slot) => <div key={slot} className="rounded-xl border border-[#eadfc6] px-3 py-3 text-center text-xs font-black">{slot}</div>)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1.05fr_.95fr] gap-5 px-8 pb-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex gap-3">{data.pills.map((pill) => <span key={pill} className="rounded-full bg-[#f3eee3] px-3 py-2 text-xs font-black">{pill}</span>)}</div>
            <div className="h-28 rounded-2xl bg-[#edf1f4]" />
          </div>
          <div className="rounded-2xl bg-[#061523] p-5 text-white">
            <p className="text-sm font-black">Confirmación automática</p>
            <div className="mt-4 space-y-3">
              {['Reserva recibida', 'Recordatorio enviado', 'Datos del cliente guardados'].map((item) => <div key={item} className="rounded-xl bg-white/8 p-3 text-xs font-bold">{item}</div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[760px] bg-[#f6f8fb] text-[#061523]">
      <div className="flex items-center justify-between bg-[#061523] px-8 py-4 text-xs font-bold uppercase tracking-[.14em] text-white/70"><span>NEXORA PLATFORM</span><span>Dashboard · Usuarios · Reportes</span></div>
      <div className="grid grid-cols-[1fr_.95fr] gap-8 px-8 py-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#B88A1A]">{data.eyebrow}</p>
          <h3 className="mt-3 text-4xl font-black leading-tight">{data.heroTitle}</h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#061523]/70">{data.heroText}</p>
          <div className="mt-5 flex gap-3">
            <span className="rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-black text-[#061523]">{data.primaryCta}</span>
            <span className="rounded-lg border border-[#d8ccaf] px-4 py-3 text-sm font-black text-[#061523]">{data.secondaryCta}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['+124', '98%', '24/7'].map((metric) => (
            <div key={metric} className="rounded-2xl bg-white p-4 shadow-sm text-center">
              <p className="text-2xl font-black text-[#061523]">{metric}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-[#061523]/50">actividad</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1.15fr_.85fr] gap-5 px-8 pb-8">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#B88A1A]">Flujos de trabajo</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {['Pendiente', 'En proceso', 'Completado'].map((col) => (
              <div key={col} className="rounded-2xl bg-[#f5f7fa] p-3">
                <p className="text-xs font-black">{col}</p>
                <div className="mt-3 space-y-2">
                  <div className="h-12 rounded-xl bg-white shadow-sm" />
                  <div className="h-12 rounded-xl bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#061523] p-5 text-white">
          <p className="text-sm font-black">Módulos conectados</p>
          <div className="mt-4 grid gap-3">
            {['Usuarios', 'Automatizaciones', 'Reportes', 'Permisos'].map((module) => <div key={module} className="rounded-xl bg-white/8 p-3 text-xs font-bold">{module}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletPreviewContent({ selected, locale }: { selected: WebType; locale: Locale }) {
  const data = previewTemplate(selected.id, locale);
  const dark = selected.id === 'landing' || selected.id === 'plataforma';

  return (
    <div className={`min-h-[560px] ${dark ? 'bg-[#061523] text-white' : 'bg-[#f8f4eb] text-[#061523]'}`}>
      <div className={`p-4 ${dark ? 'bg-[#061523]' : 'bg-white'}`}>
        <p className="text-[10px] font-black uppercase tracking-[.16em]">NEXORA</p>
        <h4 className="mt-7 text-xl font-black leading-tight">{data.tabletTitle}</h4>
        <p className={`mt-3 text-xs leading-5 ${dark ? 'text-white/70' : 'text-[#061523]/60'}`}>{data.tabletText}</p>
        <span className="mt-5 inline-flex rounded-md bg-[#D4AF37] px-3 py-2 text-[10px] font-black text-[#061523]">{data.primaryCta}</span>
      </div>
      <div className="space-y-3 p-4">
        {selected.id === 'ecommerce' ? (
          <div className="grid grid-cols-2 gap-3">
            {['Producto', 'Oferta', 'Checkout', 'Pago'].map((item) => (
              <div key={item} className={`rounded-xl p-3 shadow-sm ${dark ? 'bg-white/8' : 'bg-white'}`}>
                <div className={`h-12 rounded-lg ${dark ? 'bg-white/10' : 'bg-[#eef2f5]'}`} />
                <p className="mt-2 text-[10px] font-black">{item}</p>
              </div>
            ))}
          </div>
        ) : selected.id === 'reservas' ? (
          <div className="rounded-xl bg-white p-3 text-[#061523] shadow-sm">
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-black">
              {['L','M','X','J','V','09:00','11:30','16:00'].map((item) => <span key={item} className="rounded-lg bg-[#f4efdf] px-2 py-2">{item}</span>)}
            </div>
          </div>
        ) : selected.id === 'plataforma' ? (
          <div className="grid grid-cols-2 gap-3">
            {['Dashboard', 'Usuarios', 'Reportes', 'Alertas'].map((item) => <div key={item} className="rounded-xl bg-white/8 p-3 text-[10px] font-black">{item}</div>)}
          </div>
        ) : (
          data.tabletItems.map((row) => (
            <div key={row} className={`rounded-xl p-3 text-xs font-bold shadow-sm ${dark ? 'bg-white/8' : 'bg-white'}`}>{row}</div>
          ))
        )}
      </div>
    </div>
  );
}

function MobilePreviewContent({ selected, locale }: { selected: WebType; locale: Locale }) {
  const data = previewTemplate(selected.id, locale);
  const dark = selected.id === 'landing' || selected.id === 'plataforma';

  return (
    <div className={`min-h-[460px] ${dark ? 'bg-[#061523] text-white' : 'bg-[#f8f4eb] text-[#061523]'}`}>
      <div className={`p-3 ${dark ? 'bg-[#061523]' : 'bg-white'}`}>
        <p className="text-[9px] font-black">NEXORA</p>
        <h4 className="mt-7 text-sm font-black leading-tight">{data.mobileTitle}</h4>
        <span className="mt-4 inline-flex rounded bg-[#D4AF37] px-2 py-1 text-[8px] font-black text-[#061523]">CTA</span>
      </div>
      <div className="space-y-2 p-2">
        {selected.id === 'ecommerce' ? (
          ['Producto', 'Carrito', 'Pago'].map((item) => <div key={item} className="rounded bg-white p-2 text-[8px] font-bold text-[#061523] shadow">{item}</div>)
        ) : selected.id === 'reservas' ? (
          ['Servicio', 'Calendario', 'Confirmación'].map((item) => <div key={item} className="rounded bg-white p-2 text-[8px] font-bold text-[#061523] shadow">{item}</div>)
        ) : selected.id === 'plataforma' ? (
          ['Panel', 'Alerta', 'Tarea'].map((item) => <div key={item} className="rounded bg-white/10 p-2 text-[8px] font-bold shadow">{item}</div>)
        ) : (
          data.mobileItems.map((row) => <div key={row} className="rounded bg-white p-2 text-[8px] font-bold text-[#061523] shadow">{row}</div>)
        )}
      </div>
    </div>
  );
}

function DevicePreview({ selected, locale }: { selected: WebType; locale: Locale }) {
  return (
    <div className="relative min-h-[470px] w-full">
      <div className="absolute left-[5%] top-8 w-[70%] rounded-[1.7rem] border border-white/30 bg-[#131922] p-3 shadow-[0_35px_90px_rgba(0,0,0,.35)]">
        <div className="h-[360px] overflow-hidden rounded-[1.2rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-slow min-h-[760px]">
            <DesktopPreviewContent selected={selected} locale={locale} />
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] top-24 w-[22%] min-w-[150px] rounded-[1.5rem] border border-white/40 bg-[#0f1620] p-2 shadow-[0_25px_70px_rgba(0,0,0,.38)]">
        <div className="h-[305px] overflow-hidden rounded-[1rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-medium min-h-[560px]">
            <TabletPreviewContent selected={selected} locale={locale} />
          </div>
        </div>
      </div>
      <div className="absolute right-[1%] top-36 w-[13%] min-w-[92px] rounded-[1.25rem] border border-white/40 bg-[#0f1620] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,.42)]">
        <div className="h-[240px] overflow-hidden rounded-[.9rem] bg-white">
          <div className="web-scroll-demo web-scroll-demo-fast min-h-[460px]">
            <MobilePreviewContent selected={selected} locale={locale} />
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

            <DevicePreview selected={selected} locale={locale} />
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
