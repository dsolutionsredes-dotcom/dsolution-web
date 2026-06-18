# D-Solution Web - Fase 10

Incluye:
- Diseño premium actual
- Logo oficial como favicon y en navegación
- Directus conectado
- Portfolio y Blog dinámicos
- Imágenes desde Directus
- Chatwoot integrado
- Botones activos desde Directus
- Banner popup promocional desde Flex Sections

## Botones activos
En Directus > Home Page:
- primary_button_action
- secondary_button_action

Valores recomendados:
- section: ir a una sección, usando URL tipo #contacto
- whatsapp: abrir WhatsApp
- chat: abrir Chatwoot
- external: abrir enlace externo
- form: ir a contacto

## Banner popup de promociones
En Directus > Flex Sections crea un item:
- section_type: promo_popup
- title: título de promoción
- subtitle: texto breve
- content: texto adicional opcional
- link_url: enlace de destino
- link_text: texto del botón
- image_url: URL de imagen opcional
- is_published: activo

Si no existe un item promo_popup publicado, no aparece banner.

## Update: unified services and contact flow
- Added `/servicios` overview page with the six service categories.
- Unified header and footer across Home and service pages.
- Added shared contact form to every service page, using the existing n8n webhook flow.
- Added service dropdown navigation, clickable footer services, and improved floating WhatsApp button.
