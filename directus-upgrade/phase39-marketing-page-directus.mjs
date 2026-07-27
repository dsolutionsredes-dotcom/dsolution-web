const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || '').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('Faltan DIRECTUS_URL o DIRECTUS_TOKEN');
  console.error('Ejemplo: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=... node directus-upgrade/phase39-marketing-page-directus.mjs');
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

async function ensureCollection(collection, meta = {}) {
  try {
    await api(`/collections/${collection}`);
    console.log(`= Colección existe: ${collection}`);
    return;
  } catch {}

  await api('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection,
      meta: { icon: 'article', accountability: 'all', ...meta },
      schema: {},
    }),
  });
  console.log(`+ Colección creada: ${collection}`);
}

async function addField(collection, field, type = 'string', meta = {}, schema = {}) {
  try {
    await api(`/fields/${collection}/${field}`);
    console.log(`= Campo existe: ${collection}.${field}`);
    return;
  } catch {}

  const defaultSchema = (() => {
    if (type === 'text') return { data_type: 'text', is_nullable: true };
    if (type === 'integer') return { data_type: 'integer', is_nullable: true };
    if (type === 'boolean') return { data_type: 'boolean', default_value: true, is_nullable: true };
    if (type === 'uuid') return { data_type: 'uuid', is_nullable: true };
    return { data_type: 'character varying', is_nullable: true };
  })();

  await api(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      field,
      type,
      meta: { interface: 'input', width: 'full', ...meta },
      schema: { name: field, ...defaultSchema, ...schema },
    }),
  });
  console.log(`+ Campo creado: ${collection}.${field}`);
}

async function ensureBaseFields(collection, { hasImage = false } = {}) {
  await addField(collection, 'title', 'string', { interface: 'input', width: 'half' });
  await addField(collection, 'description', 'text', { interface: 'input-multiline', width: 'full' });
  await addField(collection, 'sort', 'integer', { interface: 'input', width: 'half' });
  await addField(collection, 'is_published', 'boolean', { interface: 'boolean', width: 'half' });
  await addField(collection, 'icon', 'string', { interface: 'input', width: 'half', note: 'Opcional: nombre interno del icono.' });
  if (hasImage) {
    await addField(collection, 'image', 'uuid', { interface: 'file-image', special: ['file'], width: 'full' });
  }
}

async function getItems(collection) {
  const json = await api(`/items/${collection}?limit=100`);
  return Array.isArray(json?.data) ? json.data : [];
}

async function seedIfEmpty(collection, items) {
  const existing = await getItems(collection);
  if (existing.length) {
    console.log(`= ${collection}: ya tiene ${existing.length} items. No duplico contenido.`);
    return;
  }
  for (const item of items) {
    await api(`/items/${collection}`, { method: 'POST', body: JSON.stringify(item) });
  }
  console.log(`+ ${collection}: contenido inicial creado (${items.length} items).`);
}

async function seedSingleton(collection, item) {
  const json = await api(`/items/${collection}?limit=1`);
  const current = Array.isArray(json?.data) ? json.data[0] : json?.data;
  if (current?.id) {
    await api(`/items/${collection}/${current.id}`, { method: 'PATCH', body: JSON.stringify(item) });
    console.log(`= ${collection}: item existente actualizado.`);
  } else {
    await api(`/items/${collection}`, { method: 'POST', body: JSON.stringify(item) });
    console.log(`+ ${collection}: item inicial creado.`);
  }
}

await ensureCollection('marketing_page', { singleton: true, icon: 'campaign', note: 'Contenido editable para /servicios/marketing-digital' });
await addField('marketing_page', 'hero_eyebrow', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'hero_title', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'hero_title_highlight', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'hero_description', 'text', { interface: 'input-multiline', width: 'full' });
await addField('marketing_page', 'hero_cta_text', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'hero_image', 'uuid', { interface: 'file-image', special: ['file'], width: 'full' });
await addField('marketing_page', 'services_label', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'includes_title', 'string', { interface: 'input', width: 'half' });
await addField('marketing_page', 'audience_title', 'string', { interface: 'input', width: 'half' });

await ensureCollection('marketing_page_services', { icon: 'ads_click', note: 'Servicios/plataformas editables para Marketing Digital' });
await ensureBaseFields('marketing_page_services');
await addField('marketing_page_services', 'logo', 'string', { interface: 'input', width: 'half', note: 'Valores recomendados: google_ads, meta_ads, google_analytics, google_tag_manager' });

await ensureCollection('marketing_page_includes', { icon: 'checklist', note: 'Cards de “Qué incluye nuestro servicio”' });
await ensureBaseFields('marketing_page_includes');

await ensureCollection('marketing_page_audiences', { icon: 'groups', note: 'Cards de “¿Para quién es?”' });
await ensureBaseFields('marketing_page_audiences', { hasImage: true });

await seedSingleton('marketing_page', {
  hero_eyebrow: 'Servicio',
  hero_title: 'Marketing',
  hero_title_highlight: 'digital',
  hero_description: 'Creamos campañas digitales claras, bien segmentadas y medibles para atraer a las personas correctas hacia tu negocio.',
  hero_cta_text: 'Quiero impulsar mi negocio',
  services_label: 'Servicios que ofrecemos',
  includes_title: 'Qué incluye nuestro servicio',
  audience_title: '¿Para quién es?',
});

await seedIfEmpty('marketing_page_services', [
  { title: 'Google Ads', logo: 'google_ads', sort: 1, is_published: true, description: 'Aparece justo cuando tus clientes buscan lo que ofreces, con campañas precisas que atraen contactos de calidad.' },
  { title: 'Meta Ads', logo: 'meta_ads', sort: 2, is_published: true, description: 'Creamos anuncios para Facebook e Instagram que captan atención y conectan con tu audiencia.' },
  { title: 'Google Analytics', logo: 'google_analytics', sort: 3, is_published: true, description: 'Configuramos métricas, eventos y conversiones para saber qué funciona y qué mejorar.' },
  { title: 'Google Tag Manager', logo: 'google_tag_manager', sort: 4, is_published: true, description: 'Instalamos etiquetas y tracking ordenado para tener datos claros desde el inicio.' },
]);

await seedIfEmpty('marketing_page_includes', [
  { title: 'Configuración de campañas', icon: 'target', sort: 1, is_published: true, description: 'Estructuramos campañas desde el inicio para atraer a tu cliente ideal.' },
  { title: 'Creación de anuncios', icon: 'megaphone', sort: 2, is_published: true, description: 'Diseñamos anuncios con mensajes claros que captan atención rápido.' },
  { title: 'Tracking y conversiones', icon: 'line_chart', sort: 3, is_published: true, description: 'Medimos lo importante para saber qué funciona y qué no.' },
  { title: 'Optimización continua', icon: 'settings', sort: 4, is_published: true, description: 'Probamos, analizamos y ajustamos para mejorar cada campaña.' },
  { title: 'Reporte claro', icon: 'file_text', sort: 5, is_published: true, description: 'Te entregamos datos simples, insights y próximos pasos.' },
]);

await seedIfEmpty('marketing_page_audiences', [
  { title: 'Negocios locales', icon: 'store', sort: 1, is_published: true, description: 'Para negocios que quieren aparecer frente a personas cercanas y listas para contactarlos.' },
  { title: 'Empresas en crecimiento', icon: 'briefcase', sort: 2, is_published: true, description: 'Para marcas que necesitan ordenar su marketing y dejar de improvisar.' },
  { title: 'E-commerce', icon: 'shopping_cart', sort: 3, is_published: true, description: 'Para tiendas online que quieren campañas más claras, medibles y mejor dirigidas.' },
]);

console.log('\nListo. Marketing Digital ya queda editable desde Directus:');
console.log('- marketing_page');
console.log('- marketing_page_services');
console.log('- marketing_page_includes');
console.log('- marketing_page_audiences');
console.log('\nImportante: añade DIRECTUS_TOKEN en EasyPanel o da Read público a estas colecciones y directus_files.');
