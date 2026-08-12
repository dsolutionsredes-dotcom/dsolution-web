import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || '').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const DRY_RUN = process.env.PHASE42_DRY_RUN === 'true';

if ((!DIRECTUS_URL || !DIRECTUS_TOKEN) && !DRY_RUN) {
  console.error('Faltan DIRECTUS_URL o DIRECTUS_TOKEN.');
  console.error('Ejemplo: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=... npm run directus:complete-editing');
  process.exit(1);
}

async function api(path, options = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  const raw = await response.text();
  let json = null;
  try { json = raw ? JSON.parse(raw) : null; } catch {}
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${path} => ${response.status} ${raw}`);
  return json;
}

async function exists(path) {
  try { await api(path); return true; } catch { return false; }
}

async function ensureCollection() {
  if (await exists('/collections/page_elements')) {
    console.log('= Colección page_elements existente');
    return;
  }
  await api('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: 'page_elements',
      meta: {
        icon: 'edit_note',
        note: 'Textos, enlaces e imágenes editables visualmente en todas las páginas',
        display_template: '{{page}} · {{locale}} · {{key}}',
        sort_field: 'sort',
      },
      schema: {},
    }),
  });
  console.log('+ Colección page_elements creada');
}

async function ensureField(field, type = 'string', meta = {}, schema = {}) {
  if (await exists(`/fields/page_elements/${field}`)) return;
  const types = {
    text: { data_type: 'text', is_nullable: true },
    integer: { data_type: 'integer', is_nullable: true },
    boolean: { data_type: 'boolean', default_value: true, is_nullable: true },
    uuid: { data_type: 'uuid', is_nullable: true },
    string: { data_type: 'character varying', is_nullable: true },
  };
  await api('/fields/page_elements', {
    method: 'POST',
    body: JSON.stringify({
      field,
      type,
      meta: { interface: type === 'text' ? 'input-multiline' : 'input', width: 'half', ...meta },
      schema: { name: field, ...types[type], ...schema },
    }),
  });
  console.log(`+ Campo page_elements.${field}`);
}

function row(page, locale, key, text, options = {}) {
  return {
    page,
    locale,
    section: options.section || key.split('.')[0],
    key,
    text,
    secondary_text: options.secondary_text,
    tertiary_text: options.tertiary_text,
    link: options.link,
    color: options.color,
    sort: options.sort ?? 0,
    is_published: true,
  };
}

const globalRows = [
  row('global', 'es', 'brand.name', 'D-Solution'),
  row('global', 'es', 'brand.tagline', 'Audiovisual · Marketing Digital · Desarrollo Web'),
  row('global', 'en', 'brand.name', 'D-Solution'),
  row('global', 'en', 'brand.tagline', 'Audiovisual · Digital Marketing · Web Development'),
  row('global', 'es', 'nav.home', 'Inicio', { link: '/', sort: 1 }),
  row('global', 'es', 'nav.services', 'Servicios', { link: '/servicios', sort: 2 }),
  row('global', 'es', 'nav.portfolio', 'Portafolio', { link: '/#portafolio', sort: 3 }),
  row('global', 'es', 'nav.process', 'Proceso', { link: '/#proceso', sort: 4 }),
  row('global', 'es', 'nav.contact', 'Contacto', { link: '#contacto', sort: 5 }),
  row('global', 'es', 'nav.cta', 'Hablemos de tu proyecto', { link: '#contacto', sort: 6 }),
  row('global', 'en', 'nav.home', 'Home', { link: '/', sort: 1 }),
  row('global', 'en', 'nav.services', 'Services', { link: '/servicios', sort: 2 }),
  row('global', 'en', 'nav.portfolio', 'Portfolio', { link: '/#portafolio', sort: 3 }),
  row('global', 'en', 'nav.process', 'Process', { link: '/#proceso', sort: 4 }),
  row('global', 'en', 'nav.contact', 'Contact', { link: '#contacto', sort: 5 }),
  row('global', 'en', 'nav.cta', 'Let’s talk about your project', { link: '#contacto', sort: 6 }),
  row('global', 'es', 'footer.navigation', 'Navegación'),
  row('global', 'es', 'footer.services', 'Servicios'),
  row('global', 'es', 'footer.description', 'Tecnología audiovisual, marketing digital y desarrollo web para marcas que quieren crecer con una ejecución clara y profesional.'),
  row('global', 'es', 'footer.rights', '© 2026 D-Solution. Todos los derechos reservados.'),
  row('global', 'en', 'footer.navigation', 'Navigation'),
  row('global', 'en', 'footer.services', 'Services'),
  row('global', 'en', 'footer.description', 'Audiovisual technology, digital marketing and web development for brands that want to grow with clear, professional execution.'),
  row('global', 'en', 'footer.rights', '© 2026 D-Solution. All rights reserved.'),
  row('global', 'es', 'contact.eyebrow', 'Contacto'),
  row('global', 'es', 'contact.title', 'Hablemos de tu próximo proyecto'),
  row('global', 'es', 'contact.name', 'Nombre completo'),
  row('global', 'es', 'contact.email', 'Email'),
  row('global', 'es', 'contact.phone', 'Teléfono / WhatsApp'),
  row('global', 'es', 'contact.company', 'Empresa / Proyecto'),
  row('global', 'es', 'contact.message', 'Cuéntanos sobre tu proyecto'),
  row('global', 'es', 'contact.submit', 'Enviar mensaje'),
  row('global', 'en', 'contact.eyebrow', 'Contact'),
  row('global', 'en', 'contact.title', 'Let’s talk about your next project'),
  row('global', 'en', 'contact.name', 'Full name'),
  row('global', 'en', 'contact.email', 'Email'),
  row('global', 'en', 'contact.phone', 'Phone / WhatsApp'),
  row('global', 'en', 'contact.company', 'Company / Project'),
  row('global', 'en', 'contact.message', 'Tell us about your project'),
  row('global', 'en', 'contact.submit', 'Send message'),
  row('global', 'es', 'promo.label', 'Promoción'),
  row('global', 'es', 'promo.button', 'Ver promoción'),
  row('global', 'en', 'promo.label', 'Promotion'),
  row('global', 'en', 'promo.button', 'View promotion'),
];

const homeCopy = {
  es: {
    'hero.title': 'Transformamos ideas en experiencias digitales',
    'services.eyebrow': 'Servicios',
    'services.title': 'Soluciones creativas para impulsar tu negocio',
    'services.intro': 'Servicios independientes o integrados en una estrategia completa para tu marca.',
    'services.button': 'Explorar servicio',
    'process.eyebrow': 'Proceso',
    'process.title': 'Cómo trabajamos contigo',
    'process.intro': 'Un proceso ágil y colaborativo para convertir ideas en resultados reales.',
    'process.cta': 'Hablemos de tu proyecto',
    'why.eyebrow': '¿Por qué elegirnos?',
    'why.title': 'Resultados que hablan por nosotros',
    'ecosystem.eyebrow': 'Ecosistema',
    'ecosystem.title': 'Herramientas que usamos para crear, medir y optimizar proyectos.',
    'portfolio.eyebrow': 'Portafolio',
    'portfolio.title': 'Proyectos que inspiran nuevas ideas',
    'portfolio.intro': 'Una selección de trabajos que combinan estrategia, creatividad y tecnología.',
    'portfolio.button': 'Ver proyecto',
  },
  en: {
    'hero.title': 'We transform ideas into digital experiences',
    'services.eyebrow': 'Services',
    'services.title': 'Creative solutions to move your business forward',
    'services.intro': 'Independent services or a fully connected strategy for your brand.',
    'services.button': 'Explore service',
    'process.eyebrow': 'Process',
    'process.title': 'How we work with you',
    'process.intro': 'An agile, collaborative process that turns ideas into real outcomes.',
    'process.cta': 'Let’s talk about your project',
    'why.eyebrow': 'Why choose us?',
    'why.title': 'Results that speak for us',
    'ecosystem.eyebrow': 'Ecosystem',
    'ecosystem.title': 'Tools we use to create, measure and optimise projects.',
    'portfolio.eyebrow': 'Portfolio',
    'portfolio.title': 'Projects that inspire new ideas',
    'portfolio.intro': 'Selected work combining strategy, creativity and technology.',
    'portfolio.button': 'View project',
  },
};

const homeRows = Object.entries(homeCopy).flatMap(([locale, values]) =>
  Object.entries(values).map(([key, text], index) => row('home', locale, key, text, { sort: index + 1 })),
);

const stats = {
  es: [['+10', 'años de experiencia'], ['+50', 'proyectos gestionados'], ['6', 'tipos de servicios que dominamos'], ['+10', 'plataformas utilizadas a nivel avanzado']],
  en: [['+10', 'years of experience'], ['+50', 'projects managed'], ['6', 'service categories we master'], ['+10', 'platforms used at an advanced level']],
};
for (const [locale, items] of Object.entries(stats)) {
  items.forEach(([value, label], index) => homeRows.push(row('home', locale, `stats.${index + 1}`, value, { section: 'stats', secondary_text: label, sort: index + 1 })));
}

const homeServices = {
  es: [
    ['audiovisual', 'Audiovisual', 'Audio, video, luces, streaming y soporte técnico para experiencias profesionales.'],
    ['marketing', 'Marketing Digital', 'Google Ads, Analytics, Tag Manager y campañas enfocadas en resultados medibles.'],
    ['web', 'Desarrollo Web', 'Sitios corporativos, landings y experiencias digitales rápidas, claras y optimizadas.'],
    ['automation', 'IA y Automatización', 'Flujos inteligentes, agentes e integraciones que reducen trabajo repetitivo.'],
    ['branding', 'Branding y Diseño', 'Identidad visual, piezas creativas y diseño coherente para tu marca.'],
    ['photography', 'Fotografía Profesional', 'Fotografía comercial, de producto, retrato y eventos con imagen profesional.'],
  ],
  en: [
    ['audiovisual', 'Audiovisual technology', 'Audio, video, lighting, streaming and technical support for professional experiences.'],
    ['marketing', 'Digital marketing', 'Google Ads, Analytics, Tag Manager and campaigns focused on measurable results.'],
    ['web', 'Web development', 'Corporate websites, landing pages and fast, clear, optimised digital experiences.'],
    ['automation', 'AI & automation', 'Smart workflows, agents and integrations that reduce repetitive work.'],
    ['branding', 'Branding & design', 'Visual identity, creative assets and coherent design for your brand.'],
    ['photography', 'Professional photography', 'Commercial, product, portrait and event photography with a professional image.'],
  ],
};
for (const [locale, items] of Object.entries(homeServices)) {
  items.forEach(([key, title, description], index) => homeRows.push(row('home', locale, `service-card.${key}`, title, { section: 'service-card', secondary_text: description, sort: index + 1 })));
  items.forEach(([key, title], index) => globalRows.push(row('global', locale, `service.${key}`, title, { section: 'service', link: ({ audiovisual: '/servicios/tecnologia-audiovisual', marketing: '/servicios/marketing-digital', web: '/servicios/desarrollo-web', automation: '/servicios/automatizacion-ia', branding: '/servicios/branding-diseno', photography: '/servicios/fotografia-profesional' })[key], sort: index + 1 })));
}

const homeProcess = {
  es: [
    ['Entendemos', 'Escuchamos tu idea, analizamos tu negocio y definimos objetivos claros.'],
    ['Estrategia', 'Diseñamos un plan digital con canales, contenido y acciones clave.'],
    ['Creamos y ejecutamos', 'Producimos contenido, lanzamos campañas, webs o automatizaciones.'],
    ['Medimos y optimizamos', 'Analizamos resultados y ajustamos para mejorar el impacto.'],
  ],
  en: [
    ['We understand', 'We listen to your idea, analyse your business and define clear goals.'],
    ['Strategy', 'We design a digital plan with channels, content and key actions.'],
    ['We create and execute', 'We produce content, launch campaigns, websites or automations.'],
    ['We measure and optimize', 'We analyse results and adjust to improve impact.'],
  ],
};
for (const [locale, items] of Object.entries(homeProcess)) {
  items.forEach(([title, description], index) => homeRows.push(row('home', locale, `process-step.${index + 1}`, title, { section: 'process-step', secondary_text: description, sort: index + 1 })));
}

const tools = [
  ['Canva', 'C', '#7C5CFF'], ['Facebook Ads', 'Meta', '#1877F2'], ['Google Ads', 'Ads', '#34A853'],
  ['Google Analytics', 'GA', '#F9AB00'], ['Google Tag Manager', 'GTM', '#4285F4'], ['Photoshop', 'Ps', '#31A8FF'],
  ['Codex', '○', '#FFFFFF'], ['Claude Code', 'AI', '#D97745'], ['n8n', 'n8n', '#EA4B71'],
  ['WordPress', 'W', '#FFFFFF'], ['Next.js', 'N', '#FFFFFF'], ['Wix', 'Wix', '#FFFFFF'],
  ['vMix', 'vM', '#2196F3'], ['Mimolive', '▶', '#FF5A5F'], ['ATEM Blackmagic', 'BM', '#F4B400'],
  ['OBS', '◉', '#FFFFFF'], ['TikTok Ads', '♪', '#25F4EE'], ['Automatización IA', 'AI', '#D4AF37'],
];
tools.forEach(([name, mark, color], index) => {
  for (const locale of ['es', 'en']) homeRows.push(row('home', locale, `tools.${index + 1}`, name, { section: 'tools', secondary_text: mark, color, sort: index + 1 }));
});

const overview = {
  es: {
    'hero.eyebrow': 'Soluciones digitales a medida',
    'hero.title': 'Ayudamos a tu empresa a encontrar la mejor solución digital para sus necesidades',
    'hero.intro': 'Integramos tecnología audiovisual, marketing digital, desarrollo web, automatización, diseño y fotografía para crear una solución clara, profesional y adaptada a tu realidad.',
    'services.label': 'Servicios', 'services.button': 'Explorar servicio',
  },
  en: {
    'hero.eyebrow': 'Tailored digital solutions',
    'hero.title': 'We help your business find the best digital solution for its needs',
    'hero.intro': 'We combine audiovisual technology, digital marketing, web development, automation, design and photography to create a clear, professional solution adapted to your context.',
    'services.label': 'Services', 'services.button': 'Explore service',
  },
};
const overviewRows = Object.entries(overview).flatMap(([locale, values]) => Object.entries(values).map(([key, text], index) => row('services-overview', locale, key, text, { sort: index + 1 })));
for (const [locale, items] of Object.entries(homeServices)) {
  items.forEach(([key, title, description], index) => overviewRows.push(row('services-overview', locale, `card.${key}`, title, { section: 'card', secondary_text: description, link: ({ audiovisual: '/servicios/tecnologia-audiovisual', marketing: '/servicios/marketing-digital', web: '/servicios/desarrollo-web', automation: '/servicios/automatizacion-ia', branding: '/servicios/branding-diseno', photography: '/servicios/fotografia-profesional' })[key], sort: index + 1 })));
}

function extractObject(source, variableName) {
  const marker = `const ${variableName} =`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`No se encontró ${variableName}`);
  const objectStart = source.indexOf('{', start + marker.length);
  const endMarker = '} as const;';
  const objectEnd = source.indexOf(endMarker, objectStart);
  if (objectEnd < 0) throw new Error(`No se encontró el final de ${variableName}`);
  const objectSource = source.slice(objectStart, objectEnd + 1);
  return Function(`"use strict"; return (${objectSource});`)();
}

async function serviceRows() {
  const sources = [
    ['service-audiovisual', 'app/servicios/tecnologia-audiovisual/page.tsx', 'localeContent'],
    ['service-automation', 'app/servicios/automatizacion-ia/page.tsx', 'content'],
    ['service-branding', 'app/servicios/branding-diseno/page.tsx', 'content'],
    ['service-web', 'app/servicios/desarrollo-web/page.tsx', 'content'],
    ['service-photography', 'app/servicios/fotografia-profesional/page.tsx', 'content'],
  ];
  const rows = [];
  const visualLabels = {
    'service-audiovisual': { es: ['Audio', 'Video', 'Luces', 'Streaming'], en: ['Audio', 'Video', 'Lighting', 'Streaming'] },
    'service-automation': { es: ['Flujos', 'IA', 'Integraciones', 'Escala'], en: ['Flows', 'AI', 'Integrations', 'Scale'] },
    'service-branding': { es: ['Identidad', 'Diseño', 'Campañas', 'Sistema'], en: ['Identity', 'Design', 'Campaigns', 'System'] },
    'service-web': { es: ['UX', 'Web', 'SEO', 'Conversión'], en: ['UX', 'Web', 'SEO', 'Conversion'] },
    'service-photography': { es: ['Producto', 'Marca', 'Eventos', 'Edición'], en: ['Product', 'Brand', 'Events', 'Editing'] },
  };
  for (const [page, filename, variableName] of sources) {
    const source = await readFile(resolve(filename), 'utf8');
    const content = extractObject(source, variableName);
    for (const locale of ['es', 'en']) {
      const localeContent = content[locale];
      for (const [key, value] of Object.entries(localeContent)) {
        if (typeof value === 'string') {
          rows.push(row(page, locale, key, value));
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string') rows.push(row(page, locale, `${key}.${index + 1}`, item, { section: key, sort: index + 1 }));
            else rows.push(row(page, locale, `${key}.${index + 1}`, item.title || '', { section: key, secondary_text: item.summary, tertiary_text: item.result, sort: index + 1 }));
          });
        }
      }
      const micro = locale === 'es'
        ? { back: 'Volver a servicios', brand: 'D-Solution', subtitle: page === 'service-audiovisual' ? 'Configuración en directo' : 'Sistema de crecimiento', ready: 'Sistema preparado para ejecución', plan: 'Plan', setup: 'Configuración', result: 'Resultado', example: 'Ejemplo ilustrativo', expected: 'Resultado esperado' }
        : { back: 'Back to services', brand: 'D-Solution', subtitle: page === 'service-audiovisual' ? 'Live setup' : 'Growth system', ready: 'System ready for execution', plan: 'Plan', setup: 'Setup', result: 'Result', example: 'Illustrative example', expected: 'Expected outcome' };
      for (const [key, text] of Object.entries(micro)) rows.push(row(page, locale, `micro.${key}`, text, { section: 'micro' }));
      (visualLabels[page]?.[locale] || []).forEach((text, index) => rows.push(row(page, locale, `visual.label.${index + 1}`, text, { section: 'visual', sort: index + 1 })));
    }
  }
  const marketingSource = await readFile(resolve('components/MarketingDigitalPageClient.tsx'), 'utf8');
  const marketing = extractObject(marketingSource, 'copy');
  for (const locale of ['es', 'en']) {
    for (const [key, value] of Object.entries(marketing[locale])) {
      if (typeof value === 'string') rows.push(row('service-marketing', locale, key, value));
      else if (Array.isArray(value)) value.forEach((entry, index) => rows.push(row('service-marketing', locale, `${key}.${index + 1}`, entry[0], { section: key, secondary_text: entry[1], sort: index + 1 })));
    }
    rows.push(row('service-marketing', locale, 'hero.image', '', { section: 'hero' }));
  }
  return rows;
}

const seeds = [...globalRows, ...homeRows, ...overviewRows, ...(await serviceRows())];
if (DRY_RUN) {
  const pages = [...new Set(seeds.map(item => item.page))];
  console.log(`Dry run correcto: ${seeds.length} elementos en ${pages.length} páginas.`);
  console.log(pages.join(', '));
  process.exit(0);
}

await ensureCollection();
await ensureField('page', 'string', { required: true, width: 'half' }, { is_nullable: false });
await ensureField('locale', 'string', { required: true, width: 'half', options: { choices: [{ text: 'Español', value: 'es' }, { text: 'English', value: 'en' }] } }, { is_nullable: false });
await ensureField('section', 'string');
await ensureField('key', 'string', { required: true }, { is_nullable: false });
await ensureField('text', 'text', { interface: 'input-multiline', width: 'full' });
await ensureField('secondary_text', 'text', { interface: 'input-multiline', width: 'full' });
await ensureField('tertiary_text', 'text', { interface: 'input-multiline', width: 'full' });
await ensureField('link', 'string', { width: 'full' });
await ensureField('image', 'uuid', { interface: 'file-image', special: ['file'], width: 'full' });
await ensureField('color', 'string', { interface: 'select-color', width: 'half' });
await ensureField('sort', 'integer', { interface: 'input', width: 'half' });
await ensureField('is_published', 'boolean', { interface: 'boolean', width: 'half' });

const existingResponse = await api('/items/page_elements?limit=-1&fields=page,locale,key');
const existingKeys = new Set((existingResponse?.data || []).map(item => `${item.page}\u0000${item.locale}\u0000${item.key}`));
const missing = seeds.filter(item => !existingKeys.has(`${item.page}\u0000${item.locale}\u0000${item.key}`));

let created = 0;
for (let index = 0; index < missing.length; index += 50) {
  const batch = missing.slice(index, index + 50);
  try {
    await api('/items/page_elements', { method: 'POST', body: JSON.stringify(batch) });
    created += batch.length;
  } catch (error) {
    console.warn(`El lote ${index / 50 + 1} no pudo crearse junto; se intenta elemento por elemento.`);
    for (const item of batch) {
      await api('/items/page_elements', { method: 'POST', body: JSON.stringify(item) });
      created += 1;
    }
  }
}

console.log(`\nListo: ${created} elementos nuevos; ${seeds.length - created} ya existían.`);
console.log('La colección page_elements está preparada para edición visual completa.');
