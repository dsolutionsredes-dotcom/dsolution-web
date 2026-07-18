# Phase 29 final fixes

- `PromoPopup` now reads `site_settings.popup_delay_seconds` and uses seconds as the popup delay.
- The Home Process cards read images from Directus `process_steps.image` more defensively and use Directus media before fallbacks.
- `process_steps` should have Public Read, and `directus_files` should have Public Read.
- Ecosistema/tools marquee rows are restored to full viewport width while the heading keeps the main container alignment.
- The Chatwoot reset control is made smaller and positioned close to the widget group instead of as a large floating pill.
