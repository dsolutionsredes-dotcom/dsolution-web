# Faza 54 – fix preview-uri editabile pentru toate categoriile

Acest script creează/actualizează explicit itemurile Directus pentru toate preview-urile:

- Web corporativa / Corporate website
- Landing page
- Tienda online / Online store
- Catálogo online / Online catalogue
- Web con reservas / Booking website
- Plataforma web / Web platform

Pentru fiecare categorie creează:

- desktop
- tablet
- mobile

Și pentru ambele limbi:

- es
- en

## Comandă în EasyPanel

```bash
DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TOKENUL_TAU node directus-upgrade/phase54-ensure-all-service-web-preview-items.mjs
```

După rulare:

1. Reîncarcă Visual Editor cu `Ctrl + F5`.
2. Intră pe `/servicios/desarrollo-web`.
3. Testează fiecare categorie.
4. Fiecare ecran Desktop / Tablet / Mobile trebuie să fie editabil.
