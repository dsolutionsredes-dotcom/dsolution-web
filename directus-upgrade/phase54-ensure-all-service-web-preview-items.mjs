const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('Falta DIRECTUS_TOKEN.');
  console.error('Ejecuta: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase54-ensure-all-service-web-preview-items.mjs');
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...(options.headers || {}),
    },
  });

  const raw = await res.text();
  let json = null;
  try { json = raw ? JSON.parse(raw) : null; } catch {}

  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${raw}`);
  }

  return json;
}

const languages = {
  es: {
    corporativa: 'Web corporativa',
    landing: 'Landing page',
    ecommerce: 'Tienda online',
    catalogo: 'Catálogo online',
    reservas: 'Web con reservas',
    plataforma: 'Plataforma web',
    deviceLabel: {
      desktop: 'desktop',
      tablet: 'tablet',
      mobile: 'mobile',
    },
    title(device, name) {
      return `Imagen completa ${this.deviceLabel[device]} para ${name}`;
    },
    description(device, name) {
      return `Sube aquí la captura larga ${this.deviceLabel[device]} del ejemplo ${name}. Se mostrará con scroll interno de arriba hacia abajo.`;
    },
  },
  en: {
    corporativa: 'Corporate website',
    landing: 'Landing page',
    ecommerce: 'Online store',
    catalogo: 'Online catalogue',
    reservas: 'Booking website',
    plataforma: 'Web platform',
    deviceLabel: {
      desktop: 'desktop',
      tablet: 'tablet',
      mobile: 'mobile',
    },
    title(device, name) {
      return `Full ${this.deviceLabel[device]} image for ${name}`;
    },
    description(device, name) {
      return `Upload the long ${this.deviceLabel[device]} screenshot for the ${name} example here. It will be shown with internal top-to-bottom scrolling.`;
    },
  },
};

const devices = ['desktop', 'tablet', 'mobile'];

function rows() {
  const output = [];

  Object.entries(languages).forEach(([locale, data]) => {
    const typeEntries = Object.entries(data).filter(([, value]) => typeof value === 'string');

    typeEntries.forEach(([slug, name], typeIndex) => {
      devices.forEach((device, deviceIndex) => {
        output.push({
          page: 'service-web',
          locale,
          section: 'previews',
          key: `preview.${slug}.${device}`,
          text: data.title(device, name),
          secondary_text: data.description(device, name),
          sort: 500 + typeIndex * 10 + deviceIndex,
          is_published: true,
        });
      });
    });

    output.push(
      {
        page: 'service-web',
        locale,
        section: 'previews',
        key: 'preview.tab.desktop',
        text: 'Desktop',
        sort: 480,
        is_published: true,
      },
      {
        page: 'service-web',
        locale,
        section: 'previews',
        key: 'preview.tab.tablet',
        text: 'Tablet',
        sort: 481,
        is_published: true,
      },
      {
        page: 'service-web',
        locale,
        section: 'previews',
        key: 'preview.tab.mobile',
        text: locale === 'es' ? 'Móvil' : 'Mobile',
        sort: 482,
        is_published: true,
      },
      {
        page: 'service-web',
        locale,
        section: 'previews',
        key: 'preview.badge.fullImage',
        text: locale === 'es' ? 'Imagen completa' : 'Full image',
        sort: 483,
        is_published: true,
      },
    );
  });

  return output;
}

async function findItem(row) {
  const params = new URLSearchParams();
  params.set('filter[page][_eq]', row.page);
  params.set('filter[locale][_eq]', row.locale);
  params.set('filter[key][_eq]', row.key);
  params.set('limit', '1');
  params.set('fields', 'id,image');

  const found = await api(`/items/page_elements?${params}`);
  return found?.data?.[0];
}

async function upsert(row) {
  const existing = await findItem(row);

  if (existing?.id) {
    // Important: do not send "image" here, so existing uploaded preview images are preserved.
    await api(`/items/page_elements/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(row),
    });
    console.log(`OK updated: ${row.locale} · ${row.key}`);
  } else {
    await api('/items/page_elements', {
      method: 'POST',
      body: JSON.stringify(row),
    });
    console.log(`OK created: ${row.locale} · ${row.key}`);
  }
}

const allRows = rows();

for (const row of allRows) {
  await upsert(row);
}

console.log('');
console.log(`Done. Ensured ${allRows.length} service-web preview/tab items for ES and EN.`);
console.log('Now refresh Directus Visual Editor with Ctrl+F5.');
