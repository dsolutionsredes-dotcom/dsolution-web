# Fase 46 — Desarrollo Web editable en Directus

## Qué cambia
- La página `/servicios/desarrollo-web` usa `page_elements` para editar textos y previews.
- El hero, selector de tipos de web, descripción activa, beneficios, integraciones, entregables y CTA son editables.
- Los espacios de desktop/tablet/mobile aceptan imágenes desde Directus en el campo `image`.
- Se mantiene el efecto de desplazamiento automático suave en las pantallas.

## Script de carga inicial
Ejecutar dentro del contenedor de la web:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase46-service-web-editable-seed.mjs
```

## Imágenes de previews
En Directus, dentro de `Page Elements`, busca claves como:

- `preview.corporativa.desktop`
- `preview.corporativa.tablet`
- `preview.corporativa.mobile`
- `preview.landing.desktop`
- `preview.ecommerce.desktop`
- etc.

Sube una imagen larga en el campo `image` de cada item.
