'use client';

import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from './Motion';
import { SERVICE_LINKS } from '@/lib/services';

export type NavLink = [string, string];
type Props = {
  links: NavLink[];
  ctaLabel: string;
  locale: 'es' | 'en';
  onLocaleChange: (locale: 'es' | 'en') => void;
  transparentOnTop?: boolean;
};

export default function Navbar({ links, ctaLabel, locale, onLocaleChange, transparentOnTop = false }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    if (!transparentOnTop) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparentOnTop]);

  const isServices = (label: string) => /^(servicios|services)$/i.test(label);
  const transparent = transparentOnTop && !scrolled && !open;

  const headerClass = transparent
    ? 'fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-transparent transition-all duration-300'
    : 'fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-[linear-gradient(to_bottom,rgba(247,243,234,.98)_0%,rgba(247,243,234,.93)_70%,rgba(247,243,234,.62)_100%)] shadow-[0_12px_35px_rgba(0,33,71,.07)] backdrop-blur-xl transition-all duration-300';

  const navText = transparent ? 'text-white hover:text-[#D4AF37]' : 'text-[#0B2340]/88 hover:text-[#D4AF37]';
  const navButton = transparent ? 'text-white hover:bg-white/10 hover:text-[#D4AF37]' : 'text-[#0B2340]/70 hover:bg-white/70 hover:text-[#D4AF37]';
  const langWrap = transparent ? 'border-white/20 bg-white/10 text-white backdrop-blur' : 'border-slate-200 bg-white/80 text-[#0B2340] shadow-sm';
  const inactiveLang = transparent ? 'text-white/70 hover:text-white' : 'text-[#0B2340]/70 hover:text-[#0B2340]';
  const mobileBtn = transparent ? 'border-white/20 bg-white/10 text-white backdrop-blur' : 'border-slate-200 bg-white/80 text-[#0B2340]';
  const ctaClass = transparent
    ? 'inline-flex h-[52px] w-[252px] items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#002147] shadow-[0_10px_28px_rgba(0,0,0,.13)] transition hover:-translate-y-0.5 hover:bg-[#D4AF37]'
    : 'inline-flex h-[52px] w-[252px] items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-bold text-[#002147] shadow-[0_10px_28px_rgba(0,33,71,.08)] transition hover:-translate-y-0.5';

  return <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55 }} className={headerClass}>
    <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
      <a href="/" className="flex shrink-0 items-center">
        <Image src={transparent ? '/ds-logo-mark-light.png' : '/ds-logo-mark-dark.png'} alt="D-Solution" width={72} height={72} className="h-14 w-auto object-contain transition-all duration-300" priority />
      </a>

      <div className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => isServices(label) ? <div key={label} ref={menuRef} className="relative flex items-center gap-1">
          <a href="/servicios" className={`text-sm font-semibold transition ${navText}`}>{label}</a>
          <button type="button" aria-label={locale === 'es' ? 'Abrir servicios' : 'Open services'} aria-expanded={servicesOpen} onClick={() => setServicesOpen(v => !v)} className={`rounded p-1 transition ${navButton}`}>
            <ChevronDown size={15} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {servicesOpen && <div className="absolute left-[-1rem] top-9 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_55px_rgba(0,33,71,.17)]">
            {SERVICE_LINKS.map(service => <a key={service.key} href={service.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#002147]/80 transition hover:bg-[#F7F3EA] hover:text-[#D4AF37]">{locale === 'es' ? service.es : service.en}</a>)}
          </div>}
        </div> : <a key={`${label}-${href}`} href={href} className={`text-sm font-semibold transition ${navText}`}>{label}</a>)}
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className={`inline-flex items-center rounded-full border p-1 text-sm font-semibold transition ${langWrap}`}>
          <button type="button" onClick={() => onLocaleChange('es')} className={`rounded-full px-3 py-1.5 transition ${locale === 'es' ? 'bg-[#002147] text-white' : inactiveLang}`}>ES</button>
          <button type="button" onClick={() => onLocaleChange('en')} className={`rounded-full px-3 py-1.5 transition ${locale === 'en' ? 'bg-[#002147] text-white' : inactiveLang}`}>EN</button>
        </div>
        <a href="#contacto" className={ctaClass}>{ctaLabel}</a>
      </div>

      <button className={`inline-flex rounded-xl border p-3 transition md:hidden ${mobileBtn}`} aria-label="Menu" onClick={() => setOpen(v => !v)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </nav>

    {open && <div className="border-t border-slate-200 bg-[rgba(247,243,234,.98)] px-5 pb-5 pt-3 md:hidden">
      <div className="grid gap-3">
        {links.map(([label, href]) => isServices(label) ? <div key={label} className="grid gap-2"><a href="/servicios" onClick={() => setOpen(false)} className="text-sm font-semibold text-[#0B2340]/86">{label}</a><div className="ml-2 grid gap-2 border-l border-[#D4AF37]/40 pl-3">{SERVICE_LINKS.map(s => <a key={s.key} href={s.href} onClick={() => setOpen(false)} className="text-sm text-[#002147]/75">{locale === 'es' ? s.es : s.en}</a>)}</div></div> : <a key={`${label}-${href}`} href={href} onClick={() => setOpen(false)} className="text-sm font-semibold text-[#0B2340]/86">{label}</a>)}
        <div className="mt-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold text-[#0B2340] shadow-sm"><button type="button" onClick={() => onLocaleChange('es')} className={`rounded-full px-3 py-1.5 ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>ES</button><button type="button" onClick={() => onLocaleChange('en')} className={`rounded-full px-3 py-1.5 ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>EN</button></div>
        <a href="#contacto" onClick={() => setOpen(false)} className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#D4AF37] px-5 text-sm font-bold text-[#002147]">{ctaLabel}</a>
      </div>
    </div>}
  </motion.header>;
}
