# Fase 47 — Previews de Desarrollo Web editables como imágenes

## Qué corrige
- Los espacios vacíos dentro de desktop/tablet/mobile ahora también tienen `data-directus` apuntando al campo `image`.
- Esto permite seleccionar/cambiar la imagen desde Directus Visual Editor, incluso cuando todavía no hay imagen cargada.
- Si ya hay imagen en Directus, se muestra la imagen larga y conserva el scroll automático.
- Si no hay imagen, se muestra el placeholder, pero ahora el área grande del placeholder queda asociada al campo `image`.

## Items usados
Subir las capturas largas en `Page Elements`, campo `image`, para claves como:
- `preview.corporativa.desktop`
- `preview.corporativa.tablet`
- `preview.corporativa.mobile`
- `preview.landing.desktop`
- `preview.ecommerce.desktop`
- `preview.catalogo.desktop`
- `preview.reservas.desktop`
- `preview.plataforma.desktop`
