import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const collection = String(searchParams.get('collection') || '').toLowerCase();
  const id = searchParams.get('id');
  const route = previewRoutes[collection] || { pathname: '/' };

  // Modo vista previa: habilita draft mode para que Next.js no trate esta navegación como estática.
  draftMode().enable();

  const redirectUrl = new URL(route.pathname, origin);
  redirectUrl.searchParams.set('preview', 'true');
  if (collection) redirectUrl.searchParams.set('preview_collection', collection);
  if (id) redirectUrl.searchParams.set('preview_id', id);
  if (route.hash) redirectUrl.hash = route.hash;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
