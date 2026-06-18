export type ServiceKey = 'audiovisual' | 'marketing' | 'web' | 'automation' | 'branding' | 'photography';

export type ServiceLink = { key: ServiceKey; es: string; en: string; href: string };

export const SERVICE_LINKS: ServiceLink[] = [
  { key: 'audiovisual', es: 'Tecnología audiovisual', en: 'Audiovisual technology', href: '/servicios/tecnologia-audiovisual' },
  { key: 'marketing', es: 'Marketing digital', en: 'Digital marketing', href: '/servicios/marketing-digital' },
  { key: 'web', es: 'Desarrollo web', en: 'Web development', href: '/servicios/desarrollo-web' },
  { key: 'automation', es: 'Automatización e IA', en: 'Automation & AI', href: '/servicios/automatizacion-ia' },
  { key: 'branding', es: 'Branding y diseño', en: 'Branding & design', href: '/servicios/branding-diseno' },
  { key: 'photography', es: 'Fotografía profesional', en: 'Professional photography', href: '/servicios/fotografia-profesional' },
];

export function serviceHrefFromTitle(title?: string) {
  const normalized = (title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const aliases: Record<string, string> = {
    'tecnologia-audiovisual': '/servicios/tecnologia-audiovisual', audiovisual: '/servicios/tecnologia-audiovisual', 'audiovisual-technology': '/servicios/tecnologia-audiovisual',
    'marketing-digital': '/servicios/marketing-digital', 'digital-marketing': '/servicios/marketing-digital',
    'desarrollo-web': '/servicios/desarrollo-web', 'web-development': '/servicios/desarrollo-web',
    'automatizacion-e-ia': '/servicios/automatizacion-ia', 'automation-and-ai': '/servicios/automatizacion-ia',
    'branding-y-diseno': '/servicios/branding-diseno', 'branding-and-design': '/servicios/branding-diseno',
    'fotografia-profesional': '/servicios/fotografia-profesional', 'professional-photography': '/servicios/fotografia-profesional',
  };
  return aliases[normalized] || '/servicios';
}
