# Fase 34 — Vista previa visual simple con Directus

Este cambio agrega una ruta de preview en Next.js para abrir la web desde Directus y verla en contexto.

## Rutas agregadas

- `/api/preview`
- `/api/preview/disable`

## URLs recomendadas para configurar en Directus

En cada colección, usa una URL de preview parecida a estas:

### Home Page

```txt
https://d-solution.org/api/preview?collection=home_page&id={{id}}
```

### Services

```txt
https://d-solution.org/api/preview?collection=services&id={{id}}
```

### Process Steps

```txt
https://d-solution.org/api/preview?collection=process_steps&id={{id}}
```

### Portfolio

```txt
https://d-solution.org/api/preview?collection=portfolio&id={{id}}
```

### Contact Settings

```txt
https://d-solution.org/api/preview?collection=contact_settings&id={{id}}
```

### Site Settings

```txt
https://d-solution.org/api/preview?collection=site_settings&id={{id}}
```

## Qué hace

- Activa draft mode de Next.js.
- Abre la página correcta.
- Añade `?preview=true` para mostrar una pequeña etiqueta “Vista previa Directus”.
- Para secciones de Home, abre con hash:
  - Services → `#servicios`
  - Process Steps → `#proceso`
  - Portfolio → `#portafolio`
  - Contact Settings → `#contacto`

## Importante

Esta fase agrega vista previa simple. No es edición drag-and-drop ni inline editing completa.
Para que los cambios se vean, la web sigue necesitando permisos/lectura correcta desde Directus y que las secciones estén conectadas al CMS.
