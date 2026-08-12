import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const previewRoutes: Record<string, { pathname: string; hash?: string }> = {
  home_page: { pathname: '/' },
  site_settings: { pathname: '/' },
  services: { pathname: '/', hash: 'servicios' },
  process_steps: { pathname: '/', hash: 'proceso' },
  portfolio: { pathname: '/', hash: 'portafolio' },
  blog_posts: { pathname: '/', hash: 'blog' },
  contact_settings: { pathname: '/', hash: 'contacto' },
  flex_sections: { pathname: '/' },
};

function getSiteUrl() {
  return (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://d-solution.org').replace(/\/$/, '');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const expectedSecret = process.env.DIRECTUS_PREVIEW_SECRET;
  const suppliedSecret = searchParams.get('secret');

  if (expectedSecret && suppliedSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Token de vista previa no válido.' }, { status: 401 });
  }

  const collection = String(searchParams.get('collection') || '').toLowerCase();
  const id = searchParams.get('id');
  const route = previewRoutes[collection] || { pathname: '/' };

  // Vista previa Directus: se limpia cualquier origen interno como localhost:80.
  // La redirección siempre usa SITE_URL / NEXT_PUBLIC_SITE_URL o el dominio público fallback.
  draftMode().enable();

  const redirectUrl = new URL(route.pathname, getSiteUrl());
  redirectUrl.searchParams.set('preview', 'true');
  if (collection) redirectUrl.searchParams.set('preview_collection', collection);
  if (id) redirectUrl.searchParams.set('preview_id', id);
  if (searchParams.get('visual-editing') === 'true') redirectUrl.searchParams.set('visual-editing', 'true');
  if (route.hash) redirectUrl.hash = route.hash;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
