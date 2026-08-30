# Fase 53 — Desarrollo Web edición visual completa

Incluye los ajustes previos y añade una corrección para que la página `/servicios/desarrollo-web` tenga más elementos enlazados al Visual Editor de Directus.

## Archivos incluidos

- `components/WebDevelopmentPageClient.tsx`
- `components/MarketingDigitalPageClient.tsx`
- `directus-upgrade/phase50-fix-page-elements-image-field.mjs`
- `directus-upgrade/phase53-service-web-complete-editability-seed.mjs`

## Qué corrige

- Mantiene eliminada la sección “Qué recibe tu proyecto / What your project receives”.
- Mantiene tabs en móvil para Desktop / Tablet / Mobile.
- Mantiene imágenes largas editables para cada tipo de web y cada dispositivo.
- Añade elementos faltantes para edición visual: tabs, notas, textos de placeholder e items EN/ES.
- Conserva los ajustes de Marketing Digital: overlay solo a la izquierda e imágenes color.

## Acción necesaria en terminal

Después del deploy, si quieres asegurar todos los items editables en Directus, ejecuta:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase53-service-web-complete-editability-seed.mjs
```

Si el campo `image` todavía no guarda bien, ejecuta también:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase50-fix-page-elements-image-field.mjs
```
