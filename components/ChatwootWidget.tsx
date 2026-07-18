'use client';

import { useCallback, useEffect } from 'react';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: {
      reset?: () => void;
      setUser?: (...args: unknown[]) => void;
    };
  }
}

const CHATWOOT_BASE_URL =
  process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || 'https://chatwoot.d-solution.org';

const CHATWOOT_WEBSITE_TOKEN =
  process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN || 'ZDxdyUG2Qr5PgffgRkvNSEPC';

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export default function ChatwootWidget() {
  const resetChatwootSession = useCallback((reload = false) => {
    // Limpia solo la sesión local del widget. No resuelve la conversación en Chatwoot.
    window.$chatwoot?.reset?.();
    if (reload) window.location.reload();
  }, []);

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

      // La identificación con setUser debe hacerse solo después de que el visitante introduzca sus datos.
      // No se llama setUser automáticamente aquí para evitar reutilizar datos antiguos.
    };

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let inactivityTimer: number | undefined;

    const restartTimer = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        // Timeout de inactividad: libera este navegador sin resolver la conversación en Chatwoot.
        resetChatwootSession(false);
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events: Array<keyof WindowEventMap> = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((eventName) => window.addEventListener(eventName, restartTimer, { passive: true }));
    restartTimer();

    return () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      events.forEach((eventName) => window.removeEventListener(eventName, restartTimer));
    };
  }, [resetChatwootSession]);

  return (
    <button
      type="button"
      className="chatwoot-reset-button"
      onClick={() => resetChatwootSession(true)}
      aria-label="Nuevo chat / Soy otra persona"
    >
      Nuevo chat
    </button>
  );
}
