'use client';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from './Motion';

export type NavLink = [string, string];

type Props = {
  links: NavLink[];
  ctaLabel: string;
  locale: 'es' | 'en';
  onLocaleChange: (locale: 'es' | 'en') => void;
};

export default function Navbar({ links, ctaLabel, locale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-[rgba(247,243,234,0.82)] backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <Image src="/logo.png" alt="D-Solution" width={46} height={46} className="rounded-sm object-contain" />
          <span className="truncate text-lg font-semibold text-[#0B2340]">D-Solution</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-semibold text-[#0B2340]/86 transition hover:text-[#D4AF37]">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 p-1 text-sm font-semibold text-[#0B2340] shadow-sm">
            <button
              type="button"
              onClick={() => onLocaleChange('es')}
              className={`rounded-full px-3 py-1.5 transition ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70 hover:text-[#0B2340]'}`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              className={`rounded-full px-3 py-1.5 transition ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70 hover:text-[#0B2340]'}`}
            >
              EN
            </button>
          </div>
          <a href="#contacto" className="inline-flex rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] transition hover:-translate-y-0.5">
            {ctaLabel}
          </a>
        </div>

        <button
          className="inline-flex rounded-xl border border-slate-200 bg-white/80 p-3 text-[#0B2340] md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-[rgba(247,243,234,0.96)] px-5 pb-5 pt-3 md:hidden">
          <div className="grid gap-3">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm font-semibold text-[#0B2340]/86">
                {label}
              </a>
            ))}
            <div className="mt-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold text-[#0B2340] shadow-sm">
              <button
                type="button"
                onClick={() => onLocaleChange('es')}
                className={`rounded-full px-3 py-1.5 transition ${locale === 'es' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange('en')}
                className={`rounded-full px-3 py-1.5 transition ${locale === 'en' ? 'bg-[#002147] text-white' : 'text-[#0B2340]/70'}`}
              >
                EN
              </button>
            </div>
            <a href="#contacto" onClick={() => setOpen(false)} className="mt-2 inline-flex w-full justify-center rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147]">
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
