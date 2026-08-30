const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('Falta DIRECTUS_TOKEN. Ejecuta: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase53-service-web-complete-editability-seed.mjs');
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

const content = {
  es: {
    hero: {
      eyebrow: 'Desarrollo web',
      title: 'Elige el tipo de web que necesitas',
      highlight: 'tipo de web',
      text: 'Explora ejemplos visuales y descubre qué estructura se adapta mejor a tu negocio.',
      cta: 'Hablemos de tu proyecto',
      selectedCta: 'Quiero una web',
      selectedHelp: 'También puedes escribirnos por WhatsApp o completar el formulario.',
    },
    preview: {
      badge: 'Imagen completa',
      tabs: { desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile' },
      notes: { desktop: 'Vista horizontal', tablet: 'Más ancha que móvil', mobile: 'Vista estrecha' },
    },
    extras: {
      eyebrow: 'Funciones extra',
      titleA: 'También podemos',
      titleB: 'integrar',
      text: 'Funciones extra para que tu web venda más, automatice más y mida mejor.',
      items: [
        ['Conexión con CRM', 'Envía tus leads automáticamente a tu CRM y ordena mejor tu seguimiento.'],
        ['WhatsApp integrado', 'Capta consultas rápidas y conecta al cliente directo con tu equipo.'],
        ['Chatbot web', 'Responde preguntas frecuentes y genera contactos incluso fuera de horario.'],
        ['Pagos online', 'Facilita compras y cobros desde la web con métodos de pago integrados.'],
        ['Automatizaciones con n8n', 'Conecta tu web con procesos, avisos y tareas automáticas.'],
        ['Analytics y conversiones', 'Mide visitas, formularios y acciones clave para tomar mejores decisiones.'],
        ['Reservas y citas', 'Permite agendar reuniones o servicios desde la propia web.'],
        ['Formularios inteligentes', 'Recoge datos útiles y clasifica mejor cada oportunidad.'],
      ],
    },
    types: [
      ['corporativa', 'Web corporativa', 'Presencia profesional', 'Proyecta una imagen profesional y genera confianza con un sitio web que comunica quién eres, qué haces y por qué deberían elegirte.', ['Refuerza tu marca y credibilidad', 'Presenta tus servicios con claridad', 'Diseñada para atraer, informar y convertir']],
      ['landing', 'Landing page', 'Campañas y leads', 'Una página enfocada en una sola acción: presentar una oferta, captar contactos o acompañar una campaña publicitaria.', ['Mensaje directo y persuasivo', 'Formulario o WhatsApp visibles', 'Ideal para campañas de Ads']],
      ['ecommerce', 'Tienda online', 'Venta digital', 'Una experiencia clara para mostrar productos, facilitar compras y gestionar consultas o pedidos desde la web.', ['Catálogo organizado', 'Carrito y métodos de pago', 'Preparada para crecer']],
      ['catalogo', 'Catálogo online', 'Productos y consultas', 'Muestra productos o servicios de forma ordenada y dirige cada consulta hacia WhatsApp o formulario.', ['Categorías claras', 'Fichas visuales', 'Consulta rápida por WhatsApp']],
      ['reservas', 'Web con reservas', 'Agenda y citas', 'Permite que tus clientes reserven citas, reuniones o servicios desde la propia web, sin mensajes repetitivos.', ['Calendario integrado', 'Menos coordinación manual', 'Mejor experiencia para el cliente']],
      ['plataforma', 'Plataforma web', 'Sistema a medida', 'Creamos sistemas web con usuarios, paneles, automatizaciones y flujos internos adaptados a tu operación.', ['Panel privado', 'Procesos conectados', 'Escalable para tu negocio']],
    ],
  },
  en: {
    hero: {
      eyebrow: 'Web development',
      title: 'Choose the type of website you need',
      highlight: 'type of website',
      text: 'Explore visual examples and discover the structure that fits your business best.',
      cta: 'Let’s talk about your project',
      selectedCta: 'I want this website',
      selectedHelp: 'You can also message us on WhatsApp or complete the form.',
    },
    preview: {
      badge: 'Full image',
      tabs: { desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile' },
      notes: { desktop: 'Landscape view', tablet: 'Wider than phone', mobile: 'Narrow view' },
    },
    extras: {
      eyebrow: 'Extra features',
      titleA: 'We can also',
      titleB: 'integrate',
      text: 'Extra features so your website sells more, automates more and measures better.',
      items: [
        ['CRM connection', 'Send leads automatically to your CRM and organise follow-up.'],
        ['Integrated WhatsApp', 'Capture quick enquiries and connect customers to your team.'],
        ['Web chatbot', 'Answer FAQs and generate contacts even after hours.'],
        ['Online payments', 'Enable purchases and payments directly from the website.'],
        ['n8n automations', 'Connect your website with processes, alerts and automatic tasks.'],
        ['Analytics and conversions', 'Measure visits, forms and key actions to make better decisions.'],
        ['Bookings and appointments', 'Let users schedule meetings or services from the website.'],
        ['Smart forms', 'Collect useful data and classify each opportunity better.'],
      ],
    },
    types: [
      ['corporativa', 'Corporate website', 'Professional presence', 'Build trust with a website that explains who you are, what you do and why people should choose you.', ['Strengthens brand credibility', 'Presents services clearly', 'Built to attract and convert']],
      ['landing', 'Landing page', 'Campaigns and leads', 'A focused page for one action: promote an offer, capture leads or support an ad campaign.', ['Clear persuasive message', 'Visible form or WhatsApp', 'Ideal for ad campaigns']],
      ['ecommerce', 'Online store', 'Digital sales', 'A clear experience to show products, enable purchases and manage enquiries or orders.', ['Organised catalogue', 'Cart and payments', 'Ready to scale']],
      ['catalogo', 'Online catalogue', 'Products and enquiries', 'Show products or services in an organised way and drive each enquiry to WhatsApp or a form.', ['Clear categories', 'Visual product pages', 'Fast WhatsApp enquiry']],
      ['reservas', 'Booking website', 'Appointments', 'Let clients book meetings, visits or services from your website without repeated messages.', ['Integrated calendar', 'Less manual coordination', 'Better client experience']],
      ['plataforma', 'Web platform', 'Custom system', 'Custom web systems with users, dashboards, automations and workflows adapted to your operation.', ['Private dashboard', 'Connected processes', 'Scalable for your business']],
    ],
  },
};

function row(locale, section, key, text, secondary_text, sort = 0) {
  return { page: 'service-web', locale, section, key, text, secondary_text, sort, is_published: true };
}

function rows(locale) {
  const c = content[locale];
  const r = [
    row(locale, 'hero', 'hero.eyebrow', c.hero.eyebrow, undefined, 1),
    row(locale, 'hero', 'hero.title', c.hero.title, undefined, 2),
    row(locale, 'hero', 'hero.title.highlight', c.hero.highlight, undefined, 3),
    row(locale, 'hero', 'hero.text', c.hero.text, undefined, 4),
    row(locale, 'global', 'cta', c.hero.cta, undefined, 5),
    row(locale, 'selected', 'selected.cta', c.hero.selectedCta, undefined, 6),
    row(locale, 'selected', 'selected.helpText', c.hero.selectedHelp, undefined, 7),
    row(locale, 'previews', 'preview.badge.fullImage', c.preview.badge, undefined, 8),
    row(locale, 'previews', 'preview.tab.desktop', c.preview.tabs.desktop, undefined, 9),
    row(locale, 'previews', 'preview.tab.tablet', c.preview.tabs.tablet, undefined, 10),
    row(locale, 'previews', 'preview.tab.mobile', c.preview.tabs.mobile, undefined, 11),
    row(locale, 'previews', 'preview.note.desktop', c.preview.notes.desktop, undefined, 12),
    row(locale, 'previews', 'preview.note.tablet', c.preview.notes.tablet, undefined, 13),
    row(locale, 'previews', 'preview.note.mobile', c.preview.notes.mobile, undefined, 14),
    row(locale, 'extras', 'extras.eyebrow', c.extras.eyebrow, undefined, 15),
    row(locale, 'extras', 'extras.titleA', c.extras.titleA, undefined, 16),
    row(locale, 'extras', 'extras.titleB', c.extras.titleB, undefined, 17),
    row(locale, 'extras', 'extras.text', c.extras.text, undefined, 18),
  ];

  c.types.forEach(([slug, title, short, description, benefits], i) => {
    const n = i + 1;
    r.push(row(locale, 'types', `types.${n}`, title, short, 30 + n));
    r.push(row(locale, 'types', `types.${n}.description`, description, undefined, 40 + n));
    benefits.forEach((benefit, j) => r.push(row(locale, 'types', `types.${n}.benefit.${j + 1}`, benefit, undefined, 50 + n * 10 + j)));
    ['desktop', 'tablet', 'mobile'].forEach((device, j) => {
      const label = device === 'desktop' ? 'desktop' : device === 'tablet' ? 'tablet' : 'mobile';
      const text = locale === 'es'
        ? `Imagen completa ${label} para ${title}`
        : `Full ${label} image for ${title}`;
      const secondary = locale === 'es'
        ? `Sube aquí la captura larga ${label} del ejemplo ${title}. Se mostrará con scroll interno.`
        : `Upload the long ${label} screenshot for the ${title} example here. It will be shown with internal scrolling.`;
      r.push(row(locale, 'previews', `preview.${slug}.${device}`, text, secondary, 100 + i * 10 + j));
    });
  });

  c.extras.items.forEach(([title, description], i) => r.push(row(locale, 'extras', `extras.${i + 1}`, title, description, 200 + i)));
  return r;
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
    console.log(`Actualizado: ${row.locale} · ${row.key}`);
  } else {
    await api('/items/page_elements', { method: 'POST', body: JSON.stringify(row) });
    console.log(`Creado: ${row.locale} · ${row.key}`);
  }
}

const all = [...rows('es'), ...rows('en')];
for (const item of all) await upsert(item);
console.log(`Listo: ${all.length} elementos de Desarrollo Web preparados para edición visual completa.`);
