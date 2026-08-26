const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('Falta DIRECTUS_TOKEN. Ejecuta: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase46-service-web-editable-seed.mjs');
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
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${text}`);
  return json;
}

const types = [
  ['corporativa', 'Web corporativa', 'Presencia profesional', 'Proyecta una imagen profesional y genera confianza con un sitio web que comunica quién eres, qué haces y por qué deberían elegirte.', ['Refuerza tu marca y credibilidad', 'Presenta tus servicios con claridad', 'Diseñada para atraer, informar y convertir']],
  ['landing', 'Landing page', 'Campañas y leads', 'Una página enfocada en una sola acción: presentar una oferta, captar contactos o acompañar una campaña publicitaria.', ['Mensaje directo y persuasivo', 'Formulario o WhatsApp visibles', 'Ideal para campañas de Ads']],
  ['ecommerce', 'Tienda online', 'Venta digital', 'Una experiencia clara para mostrar productos, facilitar compras y gestionar consultas o pedidos desde la web.', ['Catálogo organizado', 'Carrito y métodos de pago', 'Preparada para crecer']],
  ['catalogo', 'Catálogo online', 'Productos y consultas', 'Muestra productos o servicios de forma ordenada y dirige cada consulta hacia WhatsApp o formulario.', ['Categorías claras', 'Fichas visuales', 'Consulta rápida por WhatsApp']],
  ['reservas', 'Web con reservas', 'Agenda y citas', 'Permite que tus clientes reserven citas, reuniones o servicios desde la propia web, sin mensajes repetitivos.', ['Calendario integrado', 'Menos coordinación manual', 'Mejor experiencia para el cliente']],
  ['plataforma', 'Plataforma web', 'Sistema a medida', 'Creamos sistemas web con usuarios, paneles, automatizaciones y flujos internos adaptados a tu operación.', ['Panel privado', 'Procesos conectados', 'Escalable para tu negocio']],
];

const extras = [
  ['Conexión con CRM', 'Envía tus leads automáticamente a tu CRM y ordena mejor tu seguimiento.'],
  ['WhatsApp integrado', 'Capta consultas rápidas y conecta al cliente directo con tu equipo.'],
  ['Chatbot web', 'Responde preguntas frecuentes y genera contactos incluso fuera de horario.'],
  ['Pagos online', 'Facilita compras y cobros desde la web con métodos de pago integrados.'],
  ['Automatizaciones con n8n', 'Conecta tu web con procesos, avisos y tareas automáticas.'],
  ['Analytics y conversiones', 'Mide visitas, formularios y acciones clave para tomar mejores decisiones.'],
  ['Reservas y citas', 'Permite agendar reuniones o servicios desde la propia web.'],
  ['Formularios inteligentes', 'Recoge datos útiles y clasifica mejor cada oportunidad.'],
];

const deliverables = [
  ['Diseño estratégico', 'Diseños únicos y enfocados en la experiencia de usuario y los objetivos de tu negocio.'],
  ['Rendimiento superior', 'Sitios rápidos y optimizados para SEO que mejoran tu posicionamiento.'],
  ['Seguridad y confianza', 'Implementamos buenas prácticas para proteger tu web y los datos de tus usuarios.'],
  ['Escalable y medible', 'Sitios preparados para crecer y medir resultados con métricas detalladas.'],
];

function rows(locale = 'es') {
  const r = [
    ['hero.eyebrow', 'hero', 'Desarrollo web'],
    ['hero.title', 'hero', 'Elige el tipo de web que necesitas'],
    ['hero.title.highlight', 'hero', 'tipo de web'],
    ['hero.text', 'hero', 'Explora ejemplos visuales y descubre qué estructura se adapta mejor a tu negocio.'],
    ['cta', 'global', 'Hablemos de tu proyecto'],
    ['selected.cta', 'selected', 'Quiero una web'],
    ['selected.helpText', 'selected', 'También puedes escribirnos por WhatsApp o completar el formulario.'],
    ['extras.eyebrow', 'extras', 'Funciones extra'],
    ['extras.titleA', 'extras', 'También podemos'],
    ['extras.titleB', 'extras', 'integrar'],
    ['extras.text', 'extras', 'Funciones extra para que tu web venda más, automatice más y mida mejor.'],
    ['deliverables.title', 'deliverables', 'Qué recibe tu proyecto'],
  ];

  types.forEach(([, title, short, description, benefits], i) => {
    const n = i + 1;
    r.push([`types.${n}`, 'types', title, short]);
    r.push([`types.${n}.description`, 'types', description]);
    benefits.forEach((benefit, j) => r.push([`types.${n}.benefit.${j + 1}`, 'types', benefit]));
  });

  types.forEach(([slug], i) => {
    ['desktop', 'tablet', 'mobile'].forEach((device, j) => {
      r.push([`preview.${slug}.${device}`, 'previews', `Imagen ${device} para ${slug}`, `Sube aquí la captura larga ${device} del ejemplo ${slug}.`]);
    });
  });

  extras.forEach(([title, description], i) => r.push([`extras.${i + 1}`, 'extras', title, description]));
  deliverables.forEach(([title, description], i) => r.push([`deliverables.${i + 1}`, 'deliverables', title, description]));

  return r.map(([key, section, text, secondary_text], sort) => ({
    page: 'service-web',
    locale,
    section,
    key,
    text,
    secondary_text,
    sort: sort + 1,
    is_published: true,
  }));
}

async function upsert(row) {
  const params = new URLSearchParams();
  params.set('filter[page][_eq]', row.page);
  params.set('filter[locale][_eq]', row.locale);
  params.set('filter[key][_eq]', row.key);
  params.set('limit', '1');
  params.set('fields', 'id');
  const found = await api(`/items/page_elements?${params}`);
  const id = found?.data?.[0]?.id;
  if (id) {
    await api(`/items/page_elements/${id}`, { method: 'PATCH', body: JSON.stringify(row) });
    console.log(`Actualizado: ${row.key}`);
  } else {
    await api('/items/page_elements', { method: 'POST', body: JSON.stringify(row) });
    console.log(`Creado: ${row.key}`);
  }
}

for (const row of rows('es')) await upsert(row);
console.log('Listo: página Desarrollo Web editable en page_elements.');
