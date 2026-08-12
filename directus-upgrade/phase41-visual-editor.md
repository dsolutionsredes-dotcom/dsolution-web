# Fase 41 — Directus Visual Editor oficial

La web incluye `@directus/visual-editing` y conecta los elementos visibles con sus registros y campos reales de Directus.

## 1. Variables en EasyPanel

Configura las variables de `.env.example` y vuelve a ejecutar **Rebuild/Redeploy**.

- `DIRECTUS_TOKEN` es opcional para la edición visual normal. Se recomienda para Draft Mode si el rol público no puede leer borradores.
- `DIRECTUS_PREVIEW_SECRET` debe ser una cadena larga y privada. No debe llevar el prefijo `NEXT_PUBLIC_`.

## 2. URL del módulo Visual Editor

En Directus, abre **Settings → Visual Editor** y usa:

```txt
https://d-solution.org/?visual-editing=true
```

El parámetro hace que los atributos internos de edición solo aparezcan dentro del editor. La web también reconoce automáticamente el iframe cuando procede de `https://admin.d-solution.org`.

## 3. Preview URL por colección

En **Settings → Data Model → colección → Preview URL**, usa el secreto configurado en EasyPanel:

```txt
https://d-solution.org/api/preview?secret=TU_SECRETO&collection=home_page&id={{id}}
```

Sustituye `home_page` para las demás colecciones:

- `site_settings`
- `services`
- `process_steps`
- `portfolio`
- `blog_posts`
- `contact_settings`
- `flex_sections`

## 4. Elementos editables en la portada

- `home_page`: título y vídeo/fondo del Hero, póster y logos de confianza.
- `services`: título e imagen de cada servicio.
- `process_steps`: título, descripción e imagen de cada paso.
- `portfolio`: imagen, categoría, título, descripción y enlace de cada proyecto.
- `contact_settings`: email, WhatsApp, ciudad y país.
- `site_settings`: nombre de marca del pie de página.
- `flex_sections`: imagen, título, subtítulo, contenido y botón del popup.

Los textos ingleses que siguen definidos en código no se marcan como contenido de Directus para evitar que una edición cambie por error el contenido español.

## 5. Si la web no carga dentro de Directus

La aplicación ya envía una política `frame-ancestors` que permite `https://admin.d-solution.org`. Si EasyPanel o un proxy añade `X-Frame-Options: DENY` o `SAMEORIGIN`, elimina esa cabecera en el proxy y conserva la política CSP generada por Next.js.
