'use client';

import Image from 'next/image';
import { SERVICE_LINKS } from '@/lib/services';
import type { NavLink } from '@/components/Navbar';
import { directusAttr } from '@/components/DirectusVisualEditing';
import { elementText, pageElement, type PageElement } from '@/lib/page-elements';

type Props = { locale: 'es' | 'en'; links: NavLink[]; siteId?: string | number; siteName?: string; description?: string; visualEditingEnabled?: boolean; pageElements?: PageElement[] };

function FooterBrand({ name, tagline, nameAttr, taglineAttr }: { name: string; tagline: string; nameAttr?: string; taglineAttr?: string }) {
  return (
    <div className="mb-7 inline-flex items-center gap-4">
      <Image src="/ds-logo-mark-light.png" alt="D-Solution" width={86} height={90} className="h-16 w-auto object-contain" priority={false} />
      <div className="leading-none">
        <div className="text-3xl font-bold tracking-[-.035em] text-white" data-directus={nameAttr}>{name}</div>
        <div className="mt-2 text-[.62rem] font-semibold uppercase tracking-[.16em] text-white/64" data-directus={taglineAttr}>{tagline}</div>
      </div>
    </div>
  );
}

export default function SiteFooter({ locale, links, siteId, siteName, description, visualEditingEnabled = false, pageElements = [] }: Props) {
  const fallbackCopy = locale === 'en'
    ? { nav: 'Navigation', services: 'Services', rights: '© 2026 D-Solution. All rights reserved.', description: 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear, professional execution.' }
    : { nav: 'Navegación', services: 'Servicios', rights: '© 2026 D-Solution. Todos los derechos reservados.', description: 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.' };
  const item = (key: string) => pageElement(pageElements, 'global', locale, `footer.${key}`);
  const copy = {
    nav: elementText(item('navigation'), fallbackCopy.nav),
    services: elementText(item('services'), fallbackCopy.services),
    rights: elementText(item('rights'), fallbackCopy.rights),
    description: elementText(item('description'), description || fallbackCopy.description),
  };
  const attr = (key: string) => directusAttr(visualEditingEnabled, 'page_elements', item(key)?.id, 'text');
  const brandName = pageElement(pageElements, 'global', locale, 'brand.name');
  const brandTagline = pageElement(pageElements, 'global', locale, 'brand.tagline');
  return (
    <footer className="bg-[#002147] px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 md:grid-cols-[1.22fr_.75fr_.9fr]">
        <div>
          <FooterBrand
            name={elementText(brandName, siteName || 'D-Solution')}
            tagline={elementText(brandTagline, locale === 'es' ? 'Audiovisual · Marketing Digital · Desarrollo Web' : 'Audiovisual · Digital Marketing · Web Development')}
            nameAttr={directusAttr(visualEditingEnabled, 'page_elements', brandName?.id, 'text')}
            taglineAttr={directusAttr(visualEditingEnabled, 'page_elements', brandTagline?.id, 'text')}
          />
          <p className="max-w-sm leading-7 text-white/70" data-directus={attr('description')}>{copy.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37]" data-directus={attr('navigation')}>{copy.nav}</h4>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {links.map(([label, href], index) => { const navKeys = ['home', 'services', 'portfolio', 'process', 'contact']; const navItem = pageElement(pageElements, 'global', locale, `nav.${navKeys[index]}`); return <a key={`${label}-${href}`} href={navItem?.link || href} className="transition hover:text-[#D4AF37]" data-directus={directusAttr(visualEditingEnabled, 'page_elements', navItem?.id, ['text', 'link'])}>{elementText(navItem, label)}</a>; })}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-[#D4AF37]" data-directus={attr('services')}>{copy.services}</h4>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {SERVICE_LINKS.map((service) => { const serviceItem = pageElement(pageElements, 'global', locale, `service.${service.key}`); return <a key={service.key} href={serviceItem?.link || service.href} className="transition hover:text-[#D4AF37]" data-directus={directusAttr(visualEditingEnabled, 'page_elements', serviceItem?.id, ['text', 'link'])}>{elementText(serviceItem, locale === 'en' ? service.en : service.es)}</a>; })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/45" data-directus={attr('rights')}>{copy.rights}</div>
    </footer>
  );
}
