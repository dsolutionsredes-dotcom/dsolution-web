# Phase 30 - Solo 2 correcciones después de fase 29

Incluye únicamente:

1. Corrección de carga de imágenes de `process_steps` desde Directus.
   - Consulta directa de `id,title,description,icon,sort,is_published,image`.
   - Conversión robusta de `image` a `/assets/{id}`.
   - Soporte para UUID, objeto o array.

2. Alineación del encabezado de `Ecosistema` con `¿Por qué elegirnos?`.
   - Misma guía izquierda, mismo contenedor visual.
   - Las líneas de logos/herramientas no se modifican.
