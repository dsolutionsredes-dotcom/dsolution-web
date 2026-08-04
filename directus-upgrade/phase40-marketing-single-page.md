# Fase 40: Marketing Digital en un singleton

Esta fase cambia únicamente `/servicios/marketing-digital` para leer una sola colección de Directus:

`marketing_page_single`

El script crea automáticamente la colección, sus campos y el contenido inicial. Los servicios, lo que incluye el servicio y los públicos se guardan como JSON. No elimina las colecciones de la fase 39, por lo que puedes conservarlas hasta comprobar que la nueva página funciona.

## Uso en EasyPanel

1. Configura `DIRECTUS_URL` y `DIRECTUS_TOKEN` en las variables de entorno de `dsolution_web`.
2. Haz **Deploy / Rebuild** del ZIP.
3. Abre la consola **Sh** del servicio `dsolution_web`.
4. Ejecuta:

   `node directus-upgrade/phase40-marketing-single-page.mjs`

El script se puede ejecutar de nuevo: no duplica campos ni sobrescribe contenido que ya hayas editado.

Si Directus no responde, la página utiliza automáticamente el contenido local incluido en la web.
