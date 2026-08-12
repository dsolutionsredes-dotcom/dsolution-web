'use client';

import Image from 'next/image';
import { SERVICE_LINKS } from '@/lib/services';
import type { NavLink } from '@/components/Navbar';
import { directusAttr } from '@/components/DirectusVisualEditing';

type Props = { locale: 'es' | 'en'; links: NavLink[]; siteId?: string | number; siteName?: string; description?: string; visualEditingEnabled?: boolean };

function FooterBrand({ siteId, siteName = 'D-Solution', visualEditingEnabled = false }: Pick<Props, 'siteId' | 'siteName' | 'visualEditingEnabled'>) {
  return (
    <div className="mb-7 inline-flex items-center gap-4">
      <Image src="/ds-logo-mark-light.png" alt="D-Solution" width={86} height={90} className="h-16 w-auto object-contain" priority={false} />
      <div className="leading-none">
        <div className="text-3xl font-bold tracking-[-.035em] text-white" data-directus={directusAttr(visualEditingEnabled, 'site_settings', siteId, 'site_name')}>{siteName}</div>
        <div className="mt-2 text-[.62rem] font-semibold uppercase tracking-[.16em] text-white/64">Audiovisual · Marketing Digital · Desarrollo Web</div>
      </div>
    </div>
  );
}

export default function SiteFooter({ locale, links, siteId, siteName, description, visualEditingEnabled = false }: Props) {
  const copy = locale === 'en'
    ? { nav: 'Navigation', services: 'Services', rights: '© 2026 D-Solution. All rights reserved.', description: 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear, professional execution.' }
    : { nav: 'Navegación', services: 'Servicios', rights: '© 2026 D-Solution. Todos los derechos reservados.', description: 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.' };
  return (
    <footer className="bg-[#002147] px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 md:grid-cols-[1.22fr_.75fr_.9fr]">
        <div>
          <FooterBrand siteId={siteId} siteName={siteName} visualEditingEnabled={visualEditingEnabled} />
          <p className="max-w-sm leading-7 text-white/70">{description || copy.description}</p>
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
