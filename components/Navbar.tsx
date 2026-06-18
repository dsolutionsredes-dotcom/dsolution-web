'use client';

import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from './Motion';
import { SERVICE_LINKS } from '@/lib/services';

export type NavLink = [string, string];
type Props = { links: NavLink[]; ctaLabel: string; locale: 'es' | 'en'; onLocaleChange: (locale: 'es' | 'en') => void };

export default function Navbar({ links, ctaLabel, locale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node)) setServicesOpen(false); };
    document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close);
  }, []);
  const isServices = (label: string) => /^(servicios|services)$/i.test(label);
  return <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55 }} className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-[rgba(247,243,234,0.88)] backdrop-blur-xl">
    <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
      <a href="/" className="flex min-w-0 items-center gap-3"><Image src="/logo.png" alt="D-Solution" width={48} height={48} className="rounded-sm object-contain"/><span className="truncate text-lg font-semibold text-[#0B2340]">D-Solution</span></a>
      <div className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => isServices(label) ? <div key={label} ref={menuRef} className="relative flex items-center gap-1"><a href="/servicios" className="text-sm font-semibold text-[#0B2340]/86 transition hover:text-[#D4AF37]">{label}</a><button type="button" aria-label={locale === 'es' ? 'Abrir servicios' : 'Open services'} aria-expanded={servicesOpen} onClick={() => setServicesOpen(v => !v)} className="rounded p-1 text-[#0B2340]/70 transition hover:bg-white hover:text-[#D4AF37]"><ChevronDown size={15} className={servicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>{servicesOpen && <div className="absolute left-[-1rem] top-9 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_55px_rgba(0,33,71,.17)]"><a href="/servicios" className="mb-2 block rounded-xl bg-[#F7F3EA] px-3 py-2 text-sm font-bold text-[#002147]">{locale === 'es' ? 'Ver todos los servicios' : 'View all services'}</a>{SERVICE_LINKS.map(service => <a key={service.key} href={service.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#002147]/80 transition hover:bg-[#F7F3EA] hover:text-[#D4AF37]">{locale === 'es' ? service.es : service.en}</a>)}</div>}</div> : <a key={`${label}-${href}`} href={href} className="text-sm font-semibold text-[#0B2340]/86 transition hover:text-[#D4AF37]">{label}</a>)}
      </div>
      <div className="hidden items-center gap-3 md:flex"><div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 text-sm font-semibold text-[#0B2340] shadow-sm"><button type="button" onClick={() => onLocaleChange('es')} className={`rounded-full px-3 py-1.5 transition ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70 hover:text-[#0B2340]'}`}>ES</button><button type="button" onClick={() => onLocaleChange('en')} className={`rounded-full px-3 py-1.5 transition ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70 hover:text-[#0B2340]'}`}>EN</button></div><a href="#contacto" className="inline-flex w-[252px] justify-center rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] transition hover:-translate-y-0.5">{ctaLabel}</a></div>
      <button className="inline-flex rounded-xl border border-slate-200 bg-white/80 p-3 text-[#0B2340] md:hidden" aria-label="Menu" onClick={() => setOpen(v => !v)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </nav>
    {open && <div className="border-t border-slate-200 bg-[rgba(247,243,234,.98)] px-5 pb-5 pt-3 md:hidden"><div className="grid gap-3">{links.map(([label, href]) => isServices(label) ? <div key={label} className="grid gap-2"><a href="/servicios" onClick={() => setOpen(false)} className="text-sm font-semibold text-[#0B2340]/86">{label}</a><div className="ml-2 grid gap-2 border-l border-[#D4AF37]/40 pl-3">{SERVICE_LINKS.map(s => <a key={s.key} href={s.href} onClick={() => setOpen(false)} className="text-sm text-[#002147]/75">{locale === 'es' ? s.es : s.en}</a>)}</div></div> : <a key={`${label}-${href}`} href={href} onClick={() => setOpen(false)} className="text-sm font-semibold text-[#0B2340]/86">{label}</a>)}<div className="mt-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold text-[#0B2340] shadow-sm"><button type="button" onClick={() => onLocaleChange('es')} className={`rounded-full px-3 py-1.5 ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>ES</button><button type="button" onClick={() => onLocaleChange('en')} className={`rounded-full px-3 py-1.5 ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}>EN</button></div><a href="#contacto" onClick={() => setOpen(false)} className="mt-2 inline-flex w-full justify-center rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147]">{ctaLabel}</a></div></div>}
  </motion.header>;
}
