'use client';

import Image from 'next/image';
import { SERVICE_LINKS } from '@/lib/services';
import type { NavLink } from '@/components/Navbar';

type Props = { locale: 'es' | 'en'; links: NavLink[]; siteName?: string; description?: string };

export default function SiteFooter({ locale, links, siteName = 'D-Solution', description }: Props) {
  const copy = locale === 'en'
    ? { nav: 'Navigation', services: 'Services', rights: '© 2026 D-Solution. All rights reserved.', description: 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear, professional execution.' }
    : { nav: 'Navegación', services: 'Servicios', rights: '© 2026 D-Solution. Todos los derechos reservados.', description: 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.' };
  return (
    <footer className="bg-[#002147] px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 md:grid-cols-[1.22fr_.75fr_.9fr]">
        <div>
          <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#001a39] p-2 shadow-[0_18px_40px_rgba(0,0,0,.18)]">
            <Image src="/footer-logo.jpg" alt="D-Solution" width={678} height={570} className="h-24 w-auto rounded-xl object-cover object-center" priority={false} />
          </div>
          <h3 className="text-2xl font-semibold">{siteName}</h3>
          <p className="mt-3 max-w-sm leading-7 text-white/70">{description || copy.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37]">{copy.nav}</h4>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {links.map(([label, href]) => <a key={`${label}-${href}`} href={href} className="transition hover:text-[#D4AF37]">{label}</a>)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37]">{copy.services}</h4>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {SERVICE_LINKS.map((service) => <a key={service.key} href={service.href} className="transition hover:text-[#D4AF37]">{locale === 'en' ? service.en : service.es}</a>)}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/45">{copy.rights}</div>
    </footer>
  );
}
