# Fase 50 — corregir campo image de Page Elements

Este script deja `page_elements.image` como campo normal de Directus para seleccionar imágenes desde `directus_files`.

Corrige:
- interfaz `file-image`;
- `special: ["file"]`;
- relación `page_elements.image → directus_files.id`;
- campo nullable para que puedas quitar o cambiar imágenes.

## Uso en EasyPanel

En la consola del servicio web, ejecuta:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase50-fix-page-elements-image-field.mjs
```

Luego recarga Directus con `Ctrl + F5` y prueba de nuevo:

`Page Elements → service-web · es · preview.corporativa.desktop → Image`
