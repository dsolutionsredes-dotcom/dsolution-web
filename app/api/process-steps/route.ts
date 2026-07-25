import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_PUBLIC_URL = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');

type DirectusFile = string | { id?: string; uuid?: string; filename_disk?: string } | null | undefined;
type DirectusStep = {
  id?: number | string;
  title?: string;
  description?: string;
  icon?: string;
  sort?: number | string;
  is_published?: boolean;
  image?: DirectusFile;
};

function fileId(file: DirectusFile) {
  if (!file) return undefined;
  if (typeof file === 'string') return file;
  return file.id || file.uuid || file.filename_disk;
}

function assetUrl(file: DirectusFile) {
  const id = fileId(file);
  if (!id) return undefined;
  if (id.startsWith('http')) return id;
  return `${DIRECTUS_PUBLIC_URL}/assets/${id}`;
}

export async function GET() {
  try {
    const params = new URLSearchParams({
      fields: 'id,title,description,icon,sort,is_published,image.id',
      sort: 'sort',
    });
    params.append('filter[is_published][_eq]', 'true');

    const response = await fetch(`${DIRECTUS_URL}/items/process_steps?${params.toString()}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ data: [], error: `Directus responded ${response.status}` }, { status: 200, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
    }

    const json = await response.json() as { data?: DirectusStep[] };
    const data = Array.isArray(json.data) ? json.data : [];
    const normalized = data
      .filter((item) => item.is_published !== false)
      .sort((a, b) => Number(a.sort ?? a.id ?? 9999) - Number(b.sort ?? b.id ?? 9999))
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
        sort: Number(item.sort ?? item.id ?? 9999),
        is_published: item.is_published !== false,
        image: item.image,
        image_url: assetUrl(item.image),
      }));

    return NextResponse.json({ data: normalized }, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
  } catch (error) {
    return NextResponse.json({ data: [], error: 'Failed to load process steps' }, { status: 200, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
  }
}
