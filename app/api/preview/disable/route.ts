import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  draftMode().disable();

  return NextResponse.redirect(new URL('/', origin), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
