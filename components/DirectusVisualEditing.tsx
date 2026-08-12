'use client';

import { useEffect } from 'react';
import { apply, remove, setAttr } from '@directus/visual-editing';

const DIRECTUS_URL = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');

type ItemId = string | number | null | undefined;

export function directusAttr(
  enabled: boolean,
  collection: string,
  item: ItemId,
  fields?: string | string[],
) {
  if (!enabled || item === null || item === undefined || item === '') return undefined;
  return setAttr({ collection, item, fields, mode: 'popover' });
}

export function isDirectusVisualEditingFrame() {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get('visual-editing') === 'true') return true;

  try {
    if (window.self === window.top || !document.referrer) return false;
    return new URL(document.referrer).origin === new URL(DIRECTUS_URL).origin;
  } catch {
    return false;
  }
}

export default function DirectusVisualEditing({ enabled, refreshKey = '' }: { enabled: boolean; refreshKey?: string }) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let frame = 0;

    frame = window.requestAnimationFrame(() => {
      void (async () => {
        try {
          await remove();
          if (cancelled) return;
          await apply({ directusUrl: DIRECTUS_URL });
        } catch (error) {
          console.error('No se pudo activar Directus Visual Editing.', error);
        }
      })();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      void remove();
    };
  }, [enabled, refreshKey]);

  return null;
}
