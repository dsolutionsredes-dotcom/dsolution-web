# Fase 39 — Marketing Digital editable en Directus

Esta fase conecta solo la página:

`/servicios/marketing-digital`

con colecciones editables de Directus. Las otras páginas de servicios no se modifican.

## Colecciones creadas por el script

- `marketing_page` — contenido principal del hero y títulos de secciones.
- `marketing_page_services` — bloques de “Servicios que ofrecemos”.
- `marketing_page_includes` — cards de “Qué incluye nuestro servicio”.
- `marketing_page_audiences` — cards de “¿Para quién es?” con imagen opcional.

## Cómo crear todo sin hacerlo manualmente

En tu entorno local o servidor con Node, ejecuta:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase39-marketing-page-directus.mjs
```

O si usas `.env`:

```bash
npm run directus:marketing-page
```

El script crea las colecciones, campos y contenido inicial aprobado.

## Para que la web lea los datos

Opción recomendada: en EasyPanel → app `dsolution_web` → `Mediu`, agrega:

```env
DIRECTUS_TOKEN=TU_TOKEN_DE_LECTURA
DIRECTUS_URL=https://admin.d-solution.org
NEXT_PUBLIC_DIRECTUS_URL=https://admin.d-solution.org
```

Ese token queda solo en backend y no se expone al navegador.

Alternativa: dar permiso Read público en Directus para:

- `marketing_page`
- `marketing_page_services`
- `marketing_page_includes`
- `marketing_page_audiences`
- `directus_files`

## Comportamiento

Si Directus tiene contenido, la página usa Directus.
Si Directus no responde o faltan permisos, la página mantiene el diseño/textos fallback actuales.
