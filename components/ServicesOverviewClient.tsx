'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar, { type NavLink } from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';
import { motion } from '@/components/Motion';
import { SERVICE_LINKS } from '@/lib/services';

type Locale = 'es' | 'en';
const LOCALE_KEY = 'dsolution-language';
const serviceMedia: Record<string, string> = { audiovisual: '/service-audiovisual.jpg', marketing: '/service-marketing.jpg', web: '/service-web.jpg', automation: '/service-automation.jpg', branding: '/service-branding.jpg', photography: '/service-photography.jpg' };
const copy = {
  es: { cta: 'Hablemos de tu proyecto', eyebrow: 'Soluciones digitales a medida', title: 'Ayudamos a tu empresa a encontrar la mejor solución digital para sus necesidades', intro: 'Integramos tecnología audiovisual, marketing digital, desarrollo web, automatización, diseño y fotografía para crear una solución clara, profesional y adaptada a tu realidad.', label: 'Servicios', learn: 'Explorar servicio', cards: ['Audio, video, luces, streaming y soporte técnico para eventos y contenido profesional.', 'Campañas, medición y estrategia digital enfocada en resultados reales.', 'Websites, landings y experiencias web rápidas, claras y optimizadas.', 'Automatizaciones, integraciones e IA para ahorrar tiempo y mejorar procesos.', 'Identidad visual, diseño y piezas creativas para comunicar con coherencia.', 'Fotografía comercial, de producto, retrato y eventos con imagen profesional.'] },
  en: { cta: 'Let’s talk about your project', eyebrow: 'Tailored digital solutions', title: 'We help your business find the best digital solution for its needs', intro: 'We combine audiovisual technology, digital marketing, web development, automation, design and photography to create a clear, professional solution adapted to your context.', label: 'Services', learn: 'Explore service', cards: ['Audio, video, lighting, streaming and technical support for events and professional content.', 'Campaigns, measurement and digital strategy focused on real results.', 'Websites, landing pages and fast, clear, optimised web experiences.', 'Automation, integrations and AI to save time and improve processes.', 'Visual identity, design and creative assets for coherent communication.', 'Commercial, product, portrait and event photography with a professional image.'] },
} as const;

export default function ServicesOverviewClient() {
  const [locale, setLocale] = useState<Locale>('es');
  useEffect(() => { const saved = localStorage.getItem(LOCALE_KEY); if (saved === 'en' || saved === 'es') setLocale(saved); }, []);
  const switchLocale = (next: Locale) => { setLocale(next); localStorage.setItem(LOCALE_KEY, next); document.documentElement.lang = next === 'en' ? 'en' : 'es-ES'; };
  const t = copy[locale];
  const nav = (locale === 'es' ? [['Inicio', '/'], ['Servicios', '/servicios'], ['Portafolio', '/#portafolio'], ['Nosotros', '/#nosotros'], ['Blog', '/#blog'], ['Contacto', '#contacto']] : [['Home', '/'], ['Services', '/servicios'], ['Portfolio', '/#portafolio'], ['About', '/#nosotros'], ['Blog', '/#blog'], ['Contact', '#contacto']]) as NavLink[];
  return <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#002147]">
    <Navbar links={nav} ctaLabel={t.cta} locale={locale} onLocaleChange={switchLocale} />
    <section className="relative overflow-hidden bg-[#002147] px-5 pb-20 pt-36 text-white md:px-8 md:pt-44">
      <video className="absolute inset-0 h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster="/seo-image.jpg"><source src="/hero-dsolution-loop.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,33,71,.96),rgba(0,33,71,.62)),radial-gradient(circle_at_85%_30%,rgba(212,175,55,.22),transparent_26%)]" />
      <div className="relative mx-auto max-w-6xl"><motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .68 }} className="max-w-4xl"><p className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[.28em] text-[#D4AF37]">{t.eyebrow}</p><h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight md:text-7xl">{t.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">{t.intro}</p></motion.div></div>
    </section>
    <section className="relative px-5 py-20 md:px-8"><div className="mx-auto max-w-6xl"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.28em] text-[#B58F18]">{t.label}</p></div><div className="grid overflow-hidden rounded-[2rem] border border-white/60 bg-[#002147] shadow-[0_30px_80px_rgba(0,33,71,.18)] md:grid-cols-3">{SERVICE_LINKS.map((service, index) => <motion.a key={service.key} href={service.href} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .55, delay: index * .04 }} className="group relative min-h-[270px] overflow-hidden border-white/10 md:border-r md:border-b"><img src={serviceMedia[service.key]} alt={locale === 'es' ? service.es : service.en} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-focus:scale-105 group-focus:grayscale-0"/><div className="absolute inset-0 bg-black/58 transition duration-500 group-hover:bg-black/30"/><div className="absolute inset-x-0 bottom-0 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">0{index + 1}</p><h2 className="mt-2 text-2xl font-bold tracking-wide">{locale === 'es' ? service.es : service.en}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-white/0 transition duration-500 group-hover:text-white/82">{t.cards[index]}</p><span className="mt-5 inline-flex translate-y-3 items-center gap-2 text-sm font-bold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{t.learn}<ArrowRight size={16}/></span></div></motion.a>)}</div></div></section>
    <ContactSection locale={locale} source="d-solution.org/servicios" />
    <SiteFooter locale={locale} links={nav}/>
  </main>;
}
