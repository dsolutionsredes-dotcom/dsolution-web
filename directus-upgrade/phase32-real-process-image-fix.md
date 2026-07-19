# Phase 32 - Fix real para imágenes de Process Steps

Directus devuelve `process_steps.image` como objeto con `image.id`.
La web ahora construye URLs públicas de assets usando siempre `NEXT_PUBLIC_DIRECTUS_URL` o `https://admin.d-solution.org`, no `DIRECTUS_URL`, para evitar que el navegador reciba hosts internos de Docker.

Cambios:
- `app/page.tsx` fuerza datos dinámicos: `dynamic = 'force-dynamic'`, `revalidate = 0`, `fetchCache = 'force-no-store'`.
- El fetch a Directus sigue pudiendo usar `DIRECTUS_URL` en servidor.
- Las URLs de imágenes entregadas al navegador usan `directusPublicUrl/assets/{id}`.
- Esto corrige el caso en que `DIRECTUS_URL` apunta a un host interno, pero el navegador necesita `https://admin.d-solution.org/assets/{id}`.

No se modificó la sección de logos/herramientas.
