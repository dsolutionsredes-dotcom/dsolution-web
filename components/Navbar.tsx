'use client';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { motion } from './Motion';

const links = [
  ['Inicio', '#inicio'],
  ['Servicios', '#servicios'],
  ['Portafolio', '#portafolio'],
  ['Nosotros', '#nosotros'],
  ['Blog', '#blog'],
  ['Contacto', '#contacto'],
];

export default function Navbar() {
  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55 }} className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#002147]/92 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <Image src="/logo.png" alt="D-Solution" width={46} height={46} className="rounded-sm object-contain" />
          <span className="text-lg font-semibold text-white">D-Solution</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-white/78 transition hover:text-[#D4AF37]">{label}</a>)}
        </div>
        <a href="#contacto" className="hidden rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#002147] transition hover:-translate-y-0.5 md:inline-flex">Hablemos de tu proyecto</a>
        <button className="rounded-xl border border-white/15 p-3 text-white md:hidden" aria-label="Menu"><Menu size={20} /></button>
      </nav>
    </motion.header>
  );
}
