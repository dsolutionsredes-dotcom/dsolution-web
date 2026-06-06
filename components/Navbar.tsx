'use client';
import Image from 'next/image';
import { motion } from './Motion';

const links = ['Servicios', 'Nosotros', 'Portafolio', 'Blog', 'Contacto'];

export default function Navbar() {
  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7 }} className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-cream/75 px-5 py-3 shadow-soft backdrop-blur-xl">
        <a href="#inicio" className="flex items-center gap-3">
          <Image src="/logo.png" alt="D-Solution" width={42} height={42} className="rounded-full" />
          <span className="font-semibold tracking-wide text-navy">D-Solution</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-navy/75 transition hover:text-gold">{link}</a>)}
        </div>
        <a href="#contacto" className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold hover:text-navy">Solicitar propuesta</a>
      </nav>
    </motion.header>
  );
}
