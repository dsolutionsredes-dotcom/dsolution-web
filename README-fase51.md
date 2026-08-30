# Fase 51 - Ajustes Marketing + Desarrollo Web

Archivos modificados:

- components/MarketingDigitalPageClient.tsx
- components/WebDevelopmentPageClient.tsx
- directus-upgrade/phase50-fix-page-elements-image-field.mjs

Cambios incluidos:

## Marketing Digital
- El overlay oscuro del hero queda solo en la zona izquierda del texto.
- La imagen del hero queda más clara hacia la derecha.
- Las imágenes de la sección "¿Para quién es?" ya no usan grayscale; quedan en color original.

## Desarrollo Web
- En móvil, los previews usan tabs: Desktop / Tablet / Mobile.
- En móvil se muestra solo un preview a la vez para reducir scroll.
- Desktop, Tablet y Mobile tienen proporciones diferentes.
- Las imágenes siguen siendo editables desde Directus por cada tipo de web y dispositivo.
- El scroll lento interno se mantiene.

## Directus
- Se incluye el script de fase 50 para corregir el campo `page_elements.image` como imagen/file normal.

Comando para ejecutar el script si aún no se aplicó:

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase50-fix-page-elements-image-field.mjs
```
