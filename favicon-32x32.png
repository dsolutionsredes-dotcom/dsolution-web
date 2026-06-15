'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: unknown;
  }
}

const CHATWOOT_BASE_URL =
  process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || 'https://chatwoot.d-solution.org';

const CHATWOOT_WEBSITE_TOKEN =
  process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN || 'ZDxdyUG2Qr5PgffgRkvNSEPC';

export default function ChatwootWidget() {
  useEffect(() => {
    if (!CHATWOOT_BASE_URL || !CHATWOOT_WEBSITE_TOKEN) return;
    if (document.getElementById('chatwoot-sdk')) return;

    const script = document.createElement('script');
    script.id = 'chatwoot-sdk';
    script.src = `${CHATWOOT_BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken: CHATWOOT_WEBSITE_TOKEN,
        baseUrl: CHATWOOT_BASE_URL,
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
