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
const directusPublicUrl = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const directusToken = process.env.DIRECTUS_TOKEN;

type DirectusFile = string | { id?: string; uuid?: string; filename_disk?: string } | null | undefined;
type MarketingPageItem = {
  hero_eyebrow?: string;
  hero_title?: string;
  hero_title_highlight?: string;
  hero_description?: string;
  hero_cta_text?: string;
  hero_image?: DirectusFile;
  services_label?: string;
  includes_title?: string;
  audience_title?: string;
};
type MarketingListItem = {
  title?: string;
  description?: string;
  logo?: string;
  icon?: string;
  sort?: number | string;
  is_published?: boolean;
  image?: DirectusFile;
};

type DirectusResponse<T> = { data?: T | T[] | null };

function fileId(file: DirectusFile) {
  if (!file) return undefined;
  if (typeof file === 'string') return file;
  return file.id || file.uuid || file.filename_disk;
}

function assetUrl(file: DirectusFile) {
  const id = fileId(file);
  if (!id) return undefined;
  if (id.startsWith('http')) return id;
  return `${directusPublicUrl}/assets/${id}`;
}

async function directusFetch<T>(path: string): Promise<T | undefined> {
  try {
    const headers: HeadersInit = { Accept: 'application/json' };
    if (directusToken) headers.Authorization = `Bearer ${directusToken}`;
    const res = await fetch(`${directusUrl}${path}`, { cache: 'no-store', headers });
    if (!res.ok) return undefined;
    return (await res.json()) as T;
  } catch {
    return undefined;
  }
}

async function getSingleton<T extends Record<string, any>>(collection: string, fields: string): Promise<T | undefined> {
  const json = await directusFetch<DirectusResponse<T>>(`/items/${collection}?fields=${encodeURIComponent(fields)}`);
  if (!json?.data) return undefined;
  return Array.isArray(json.data) ? json.data[0] : json.data;
}

async function getItems<T extends Record<string, any>>(collection: string, fields: string): Promise<T[]> {
  const params = new URLSearchParams({ fields, sort: 'sort' });
  params.append('filter[is_published][_eq]', 'true');
  const json = await directusFetch<DirectusResponse<T>>(`/items/${collection}?${params.toString()}`);
  const data = Array.isArray(json?.data) ? json.data : [];
  return data
    .filter((item) => item.is_published !== false)
    .sort((a, b) => Number(a.sort ?? 9999) - Number(b.sort ?? 9999));
}

async function getMarketingPageCms(): Promise<MarketingPageCms | undefined> {
  const [page, services, includes, audiences] = await Promise.all([
    getSingleton<MarketingPageItem>('marketing_page', 'hero_eyebrow,hero_title,hero_title_highlight,hero_description,hero_cta_text,hero_image.id,services_label,includes_title,audience_title'),
    getItems<MarketingListItem>('marketing_page_services', 'title,description,logo,sort,is_published'),
    getItems<MarketingListItem>('marketing_page_includes', 'title,description,icon,sort,is_published'),
    getItems<MarketingListItem>('marketing_page_audiences', 'title,description,icon,image.id,sort,is_published'),
  ]);

  if (!page && !services.length && !includes.length && !audiences.length) return undefined;

  return {
    heroEyebrow: page?.hero_eyebrow,
    heroTitle: page?.hero_title,
    heroTitleHighlight: page?.hero_title_highlight,
    heroDescription: page?.hero_description,
    heroCtaText: page?.hero_cta_text,
    heroImageUrl: assetUrl(page?.hero_image),
    servicesLabel: page?.services_label,
    services: services.map((item) => ({
      title: item.title || '',
      description: item.description || '',
      logo: item.logo,
    })).filter((item) => item.title),
    includesTitle: page?.includes_title,
    includes: includes.map((item) => ({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon,
    })).filter((item) => item.title),
    audienceTitle: page?.audience_title,
    audience: audiences.map((item) => ({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon,
      imageUrl: assetUrl(item.image),
    })).filter((item) => item.title),
  };
}

export default async function MarketingPage() {
  const cms = await getMarketingPageCms();
  return <MarketingDigitalPageClient cms={cms} />;
}
