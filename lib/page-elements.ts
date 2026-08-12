export type PageElement = {
  id?: string | number;
  page?: string;
  locale?: 'es' | 'en' | string;
  section?: string;
  key?: string;
  text?: string;
  secondary_text?: string;
  tertiary_text?: string;
  link?: string;
  image?: string | { id?: string };
  image_url?: string;
  color?: string;
  sort?: number;
  is_published?: boolean;
};

const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_PUBLIC_URL = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');

function imageId(value: PageElement['image']) {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  return value.id;
}

export function normalizePageElements(items: PageElement[]) {
  return items.map((item) => {
    const id = imageId(item.image);
    return {
      ...item,
      image_url: item.image_url || (id ? `${DIRECTUS_PUBLIC_URL}/assets/${id}` : undefined),
    };
  });
}

export async function fetchPageElements(pages: string[], preview = false): Promise<PageElement[]> {
  try {
    const params = new URLSearchParams();
    params.set('fields', 'id,page,locale,section,key,text,secondary_text,tertiary_text,link,image,color,sort,is_published');
    params.set('limit', '-1');
    params.set('sort', 'sort,id');
    params.set('filter[page][_in]', pages.join(','));

    const headers = new Headers();
    if (process.env.DIRECTUS_TOKEN) headers.set('Authorization', `Bearer ${process.env.DIRECTUS_TOKEN}`);

    const response = await fetch(`${DIRECTUS_URL}/items/page_elements?${params}`, {
      cache: 'no-store',
      headers,
    });
    if (!response.ok) return [];
    const json = await response.json() as { data?: PageElement[] };
    const rows = Array.isArray(json.data) ? json.data : [];
    return normalizePageElements(preview ? rows : rows.filter((item) => item.is_published !== false));
  } catch {
    return [];
  }
}

export function pageElement(
  items: PageElement[] | undefined,
  page: string,
  locale: 'es' | 'en',
  key: string,
) {
  return (items || []).find((item) => item.page === page && item.locale === locale && item.key === key);
}

export function pageSection(
  items: PageElement[] | undefined,
  page: string,
  locale: 'es' | 'en',
  section: string,
) {
  return (items || [])
    .filter((item) => item.page === page && item.locale === locale && item.section === section && item.is_published !== false)
    .sort((a, b) => Number(a.sort ?? 9999) - Number(b.sort ?? 9999));
}

export function elementText(item: PageElement | undefined, fallback: string, field: 'text' | 'secondary_text' | 'tertiary_text' = 'text') {
  const value = item?.[field];
  return typeof value === 'string' && value.trim() ? value : fallback;
}
