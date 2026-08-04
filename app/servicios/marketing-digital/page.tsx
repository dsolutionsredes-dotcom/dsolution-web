import type { Metadata } from 'next';
import MarketingDigitalPageClient, { type MarketingPageCms } from '@/components/MarketingDigitalPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Marketing digital | D-Solution',
  description: 'Campañas, analítica y optimización para negocios que quieren crecer con datos claros.',
};

const directusUrl = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const directusPublicUrl = (process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const directusToken = process.env.DIRECTUS_TOKEN;

type DirectusFile = string | { id?: string; uuid?: string; filename_disk?: string } | null | undefined;
type JsonValue = string | Record<string, unknown>[] | null | undefined;

type MarketingPageSingle = {
  hero_eyebrow?: string;
  hero_title?: string;
  hero_title_highlight?: string;
  hero_description?: string;
  hero_cta_text?: string;
  hero_image?: DirectusFile;
  services_label?: string;
  services_json?: JsonValue;
  includes_title?: string;
  includes_json?: JsonValue;
  audience_title?: string;
  audiences_json?: JsonValue;
};

type DirectusResponse<T> = { data?: T | T[] | null };

function assetUrl(file: DirectusFile) {
  if (!file) return undefined;
  const id = typeof file === 'string' ? file : file.id || file.uuid || file.filename_disk;
  if (!id) return undefined;
  return id.startsWith('http') || id.startsWith('/') ? id : `${directusPublicUrl}/assets/${id}`;
}

function jsonArray(value: JsonValue): Record<string, unknown>[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function text(value: unknown) {
  return typeof value === 'string' ? value : '';
}

async function getMarketingPageCms(): Promise<MarketingPageCms | undefined> {
  try {
    const headers: HeadersInit = { Accept: 'application/json' };
    if (directusToken) headers.Authorization = `Bearer ${directusToken}`;

    const fields = 'hero_eyebrow,hero_title,hero_title_highlight,hero_description,hero_cta_text,hero_image.id,services_label,services_json,includes_title,includes_json,audience_title,audiences_json';
    const response = await fetch(`${directusUrl}/items/marketing_page_single?fields=${encodeURIComponent(fields)}`, {
      cache: 'no-store',
      headers,
    });
    if (!response.ok) return undefined;

    const json = (await response.json()) as DirectusResponse<MarketingPageSingle>;
    const page = Array.isArray(json.data) ? json.data[0] : json.data;
    if (!page) return undefined;

    const services = jsonArray(page.services_json)
      .map((item) => ({ title: text(item.title), description: text(item.description), logo: text(item.logo) || undefined }))
      .filter((item) => item.title);
    const includes = jsonArray(page.includes_json)
      .map((item) => ({ title: text(item.title), description: text(item.description), icon: text(item.icon) || undefined }))
      .filter((item) => item.title);
    const audience = jsonArray(page.audiences_json)
      .map((item) => ({
        title: text(item.title),
        description: text(item.description),
        icon: text(item.icon) || undefined,
        imageUrl: assetUrl(item.image as DirectusFile),
      }))
      .filter((item) => item.title);

    return {
      heroEyebrow: page.hero_eyebrow,
      heroTitle: page.hero_title,
      heroTitleHighlight: page.hero_title_highlight,
      heroDescription: page.hero_description,
      heroCtaText: page.hero_cta_text,
      heroImageUrl: assetUrl(page.hero_image),
      servicesLabel: page.services_label,
      services,
      includesTitle: page.includes_title,
      includes,
      audienceTitle: page.audience_title,
      audience,
    };
  } catch (error) {
    console.warn('Directus no está disponible; se usa el contenido local de Marketing Digital.', error);
    return undefined;
  }
}

export default async function MarketingPage() {
  const cms = await getMarketingPageCms();
  return <MarketingDigitalPageClient cms={cms} />;
}
