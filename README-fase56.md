# Faza 56 – Soluciones Audiovisuales

Ruta: `/servicios/tecnologia-audiovisual`

Incluye:
- página nueva completa para Soluciones Audiovisuales;
- foco en eventos / streaming;
- capacidades adicionales: dirección TV, podcast, instalación, postproducción, capacitación;
- espacios editables para fotos reales;
- conexión con Directus Visual Editor mediante `page_elements`.

Archivos:
```txt
components/AudiovisualSolutionsPageClient.tsx
app/servicios/tecnologia-audiovisual/page.tsx
directus-upgrade/phase56-service-audiovisual-editable-seed.mjs
README-fase56.md
```

Después del deploy, ejecutar:
```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TOKENUL_TAU node directus-upgrade/phase56-service-audiovisual-editable-seed.mjs
```

Imágenes editables:
- `hero.image`
- `streaming.image`
- `training.image`
- `projects.1.image`
- `projects.2.image`
- `projects.3.image`
- `projects.4.image`
- `projects.5.image`
