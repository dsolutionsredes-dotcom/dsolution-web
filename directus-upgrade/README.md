# Upgrade Directus Fase 5

Este script agrega campos extra para editar imágenes, colores y botones.

Uso en el VPS:

```bash
cd /root/dsolution-web-fase5-premium/directus-upgrade
npm init -y
npm install dotenv
nano .env
```

Contenido de `.env`:

```env
DIRECTUS_URL=https://admin.d-solution.org
DIRECTUS_TOKEN=TU_TOKEN_ADMIN
```

Ejecutar:

```bash
node phase5-fields.mjs
```
