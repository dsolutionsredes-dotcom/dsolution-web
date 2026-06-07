import 'dotenv/config';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('Faltan DIRECTUS_URL o DIRECTUS_TOKEN');
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
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${text}`);
  return json;
}

async function addField(collection, field, type = 'string', meta = {}) {
  try {
    await api(`/fields/${collection}/${field}`);
    console.log(`= Ya existe: ${collection}.${field}`);
    return;
  } catch {}
  await api(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      field,
      type,
      meta: { interface: 'input', width: 'full', ...meta },
      schema: { name: field, data_type: type === 'text' ? 'text' : 'character varying', is_nullable: true },
    }),
  });
  console.log(`+ Campo creado: ${collection}.${field}`);
}

const fields = [
  ['site_settings', 'primary_color'],
  ['site_settings', 'secondary_color'],
  ['site_settings', 'background_color'],
  ['home_page', 'hero_image_url'],
  ['about_page', 'image_url'],
  ['services', 'image_url'],
  ['services', 'button_text'],
  ['services', 'button_url'],
  ['portfolio', 'image_url'],
  ['blog_posts', 'image_url'],
  ['flex_sections', 'button_text'],
  ['flex_sections', 'button_url'],
  ['flex_sections', 'image_url'],
];

for (const [collection, field] of fields) {
  await addField(collection, field);
}

console.log('Listo: campos extra Fase 5 creados.');
