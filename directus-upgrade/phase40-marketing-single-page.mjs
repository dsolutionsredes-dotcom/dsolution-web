const DIRECTUS_URL = (process.env.DIRECTUS_URL || '').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const COLLECTION = 'marketing_page_single';

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('Faltan DIRECTUS_URL o DIRECTUS_TOKEN en las variables de EasyPanel.');
  console.error('Después del deploy ejecuta: node directus-upgrade/phase40-marketing-single-page.mjs');
  process.exit(1);
}

async function api(path, options = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${path} => ${response.status} ${body}`);
  try { return body ? JSON.parse(body) : null; } catch { return null; }
}

async function exists(path) {
  try { await api(path); return true; } catch { return false; }
}

async function ensureCollection() {
  if (await exists(`/collections/${COLLECTION}`)) {
    console.log(`= La colección ${COLLECTION} ya existe.`);
    return;
  }
  await api('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: COLLECTION,
      meta: {
        singleton: true,
        icon: 'campaign',
        accountability: 'all',
        note: 'Contenido editable de /servicios/marketing-digital',
        display_template: '{{hero_title}} {{hero_title_highlight}}',
      },
      schema: {},
    }),
  });
  console.log(`+ Colección ${COLLECTION} creada.`);
}

async function ensureField(field, type, meta, schema) {
  if (await exists(`/fields/${COLLECTION}/${field}`)) {
    console.log(`= El campo ${field} ya existe.`);
    return;
  }
  await api(`/fields/${COLLECTION}`, {
    method: 'POST',
    body: JSON.stringify({ field, type, meta, schema: { name: field, is_nullable: true, ...schema } }),
  });
  console.log(`+ Campo ${field} creado.`);
}

const input = { interface: 'input', width: 'half' };
const textarea = { interface: 'input-multiline', width: 'full' };
const json = { interface: 'input-code', options: { language: 'json', lineNumber: true }, width: 'full' };

await ensureCollection();
await ensureField('hero_eyebrow', 'string', input, { data_type: 'character varying' });
await ensureField('hero_title', 'string', input, { data_type: 'character varying' });
await ensureField('hero_title_highlight', 'string', input, { data_type: 'character varying' });
await ensureField('hero_description', 'text', textarea, { data_type: 'text' });
await ensureField('hero_cta_text', 'string', input, { data_type: 'character varying' });
await ensureField('hero_image', 'uuid', { interface: 'file-image', special: ['file'], width: 'full' }, { data_type: 'uuid', foreign_key_table: 'directus_files', foreign_key_column: 'id' });
await ensureField('services_label', 'string', input, { data_type: 'character varying' });
await ensureField('services_json', 'json', json, { data_type: 'json' });
await ensureField('includes_title', 'string', input, { data_type: 'character varying' });
await ensureField('includes_json', 'json', json, { data_type: 'json' });
await ensureField('audience_title', 'string', input, { data_type: 'character varying' });
await ensureField('audiences_json', 'json', json, { data_type: 'json' });

const seed = {
  hero_eyebrow: 'Servicio',
  hero_title: 'Marketing',
  hero_title_highlight: 'digital',
  hero_description: 'Creamos campañas digitales claras, bien segmentadas y medibles para atraer a las personas correctas hacia tu negocio.',
  hero_cta_text: 'Quiero impulsar mi negocio',
  services_label: 'Servicios que ofrecemos',
  services_json: [
    { title: 'Google Ads', logo: 'google_ads', description: 'Aparece justo cuando tus clientes buscan lo que ofreces, con campañas precisas que atraen contactos de calidad.' },
    { title: 'Meta Ads', logo: 'meta_ads', description: 'Creamos anuncios para Facebook e Instagram que captan atención y conectan con tu audiencia.' },
    { title: 'Google Analytics', logo: 'google_analytics', description: 'Configuramos métricas, eventos y conversiones para saber qué funciona y qué mejorar.' },
    { title: 'Google Tag Manager', logo: 'google_tag_manager', description: 'Instalamos etiquetas y tracking ordenado para tener datos claros desde el inicio.' },
  ],
  includes_title: 'Qué incluye nuestro servicio',
  includes_json: [
    { title: 'Configuración de campañas', icon: 'target', description: 'Estructuramos campañas desde el inicio para atraer a tu cliente ideal.' },
    { title: 'Creación de anuncios', icon: 'megaphone', description: 'Diseñamos anuncios con mensajes claros que captan atención rápido.' },
    { title: 'Tracking y conversiones', icon: 'line_chart', description: 'Medimos lo importante para saber qué funciona y qué no.' },
    { title: 'Optimización continua', icon: 'settings', description: 'Probamos, analizamos y ajustamos para mejorar cada campaña.' },
    { title: 'Reporte claro', icon: 'file_text', description: 'Te entregamos datos simples, insights y próximos pasos.' },
  ],
  audience_title: '¿Para quién es?',
  audiences_json: [
    { title: 'Negocios locales', icon: 'store', image: '/service-photography.jpg', description: 'Para negocios que quieren aparecer frente a personas cercanas y listas para contactarlos.' },
    { title: 'Empresas en crecimiento', icon: 'briefcase', image: '/service-marketing.jpg', description: 'Para marcas que necesitan ordenar su marketing y dejar de improvisar.' },
    { title: 'E-commerce', icon: 'shopping_cart', image: '/service-web.jpg', description: 'Para tiendas online que quieren campañas más claras, medibles y mejor dirigidas.' },
  ],
};

let current = null;
try {
  const result = await api(`/items/${COLLECTION}`);
  current = Array.isArray(result?.data) ? result.data[0] : result?.data;
} catch {}

if (current && Object.keys(current).some((key) => key !== 'id' && current[key] != null)) {
  console.log('= La colección ya contiene datos. No se sobrescribió el contenido editable.');
} else {
  await api(`/items/${COLLECTION}`, { method: 'PATCH', body: JSON.stringify(seed) });
  console.log('+ Contenido inicial cargado en el singleton.');
}

console.log('\nListo: Marketing Digital usa únicamente marketing_page_single.');
