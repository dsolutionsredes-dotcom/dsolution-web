# Phase 35 – Preview URL and cache warning fix

Cambios puntuales sobre fase 34:

1. `/api/preview` ya no usa `origin` del request porque en EasyPanel/Next puede llegar como `localhost:80`.
   Ahora redirige usando:
   - `SITE_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - fallback `https://d-solution.org`

2. `/api/preview/disable` usa la misma lógica para salir de preview.

3. Se quitó la combinación inválida de `cache: 'no-store'` + `next: { revalidate: 0 }` dentro de los mismos fetch.
   Queda solo `cache: 'no-store'` en las llamadas a Directus.

Variables recomendadas en EasyPanel → Mediu:

```env
SITE_URL=https://d-solution.org
NEXT_PUBLIC_SITE_URL=https://d-solution.org
DIRECTUS_URL=https://admin.d-solution.org
NEXT_PUBLIC_DIRECTUS_URL=https://admin.d-solution.org
```

Después de cambiar variables: hacer Rebuild/Redeploy, no solo restart.
