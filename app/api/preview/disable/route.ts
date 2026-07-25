import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getSiteUrl() {
  return (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://d-solution.org').replace(/\/$/, '');
}

export async function GET() {
  draftMode().disable();

  return NextResponse.redirect(new URL('/', getSiteUrl()), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
