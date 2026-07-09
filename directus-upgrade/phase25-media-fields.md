# Campos Directus recomendados para medios editables

La web ya prioriza medios de Directus cuando existen y usa fallbacks locales si el campo está vacío.

## Home Page
- `hero_video` — File, video MP4 del hero.
- `hero_video_poster` — File, imagen poster del hero.
- `hero_image` — File, fallback visual del hero.

## Services
- `image` — File, imagen para cada servicio del mosaico visual de la Home y página /servicios.

## Flex Sections / Proceso
Para las tarjetas de “Cómo trabajamos contigo”, crear elementos en `flex_sections` con:
- `section_type`: `process_step` (también se aceptan `process` o `proceso`).
- `image`: File, imagen de la tarjeta.
- `sort`: 1, 2, 3, 4 para ordenar.

Si no hay imágenes en Directus, se usan imágenes provisionales locales.

## Portfolio
- `image` — File, imagen principal de cada proyecto.

## Contacto / otras secciones visuales
Usar campos File equivalentes cuando se añadan nuevas imágenes o videos propios. La regla recomendada es mantener siempre un fallback local, pero dar prioridad a Directus.
