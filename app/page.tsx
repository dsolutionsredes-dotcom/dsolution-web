import HomeClient, { type SiteData } from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

const directusUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org';

type DirectusResponse<T> = { data?: T | T[] | null };

async function getItem<T>(collection: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${directusUrl}/items/${collection}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const json = (await res.json()) as DirectusResponse<T>;
    if (Array.isArray(json.data)) return (json.data[0] as T) || fallback;
    return (json.data as T) || fallback;
  } catch {
    return fallback;
  }
}

async function getItems<T>(collection: string, fallback: T[]): Promise<T[]> {
  try {
    const res = await fetch(`${directusUrl}/items/${collection}?filter[is_published][_eq]=true&sort=sort`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const json = (await res.json()) as DirectusResponse<T>;
    return Array.isArray(json.data) ? json.data : fallback;
  } catch {
    return fallback;
  }
}

function assetUrl(file?: string | null) {
  if (!file) return undefined;
  if (typeof file === 'string' && file.startsWith('http')) return file;
  return `${directusUrl}/assets/${file}`;
}

function normalizeAssets(site: any, home: any, about: any, services: any[], portfolio: any[], blog: any[]) {
  return {
    site,
    home: {
      ...home,
      hero_image_url: home.hero_image_url || assetUrl(home.hero_image),
    },
    about: {
      ...about,
      image_url: about.image_url || assetUrl(about.about_image),
    },
    services: services.map((item) => ({
      ...item,
      image_url: item.image_url || assetUrl(item.image),
    })),
    portfolio: portfolio.map((item) => ({
      ...item,
      image_url: item.image_url || assetUrl(item.image),
    })),
    blog: blog.map((item) => ({
      ...item,
      image_url: item.image_url || assetUrl(item.featured_image || item.image),
    })),
  };
}

const fallback: SiteData = {
  site: {
    site_name: 'D-Solution',
    footer_text: 'Transformamos ideas en experiencias digitales que conectan, inspiran y generan resultados.',
  },
  home: {
    eyebrow: 'AGENCIA DIGITAL EN BARCELONA',
    hero_title: 'Transformamos ideas en experiencias digitales',
    hero_subtitle: 'Desde la estrategia hasta la ejecución, hacemos crecer tu presencia digital.',
    primary_button_text: 'Solicitar propuesta',
    primary_button_url: '#contacto',
    secondary_button_text: 'Ver servicios',
    secondary_button_url: '#servicios',
    trusted_logos: 'Google, Meta, TikTok, WordPress',
  },
  about: {
    eyebrow: 'SOBRE NOSOTROS',
    title: 'De una idea en pareja a una agencia digital en crecimiento',
    intro: 'D-Solution nació como un pequeño proyecto creado por una pareja con una visión clara: ayudar a negocios y emprendedores a destacar en el mundo digital mediante soluciones creativas, estratégicas y efectivas.',
    difference: 'No creemos en soluciones genéricas. Cada marca tiene una historia, objetivos y desafíos únicos. Por eso trabajamos de manera cercana, diseñando estrategias personalizadas que combinan creatividad, tecnología y resultados medibles.',
    where_we_work: 'Barcelona es nuestra base, pero trabajamos también con clientes de otras ciudades y países gracias a herramientas digitales y comunicación remota.',
    mission: 'Transformar ideas en soluciones digitales que conecten, inspiren y generen resultados.',
    years_experience: 5,
    projects_count: 50,
  },
  contact: {
    email: 'dsolutions.redes@gmail.com',
    whatsapp: '+34 624 57 18 59',
    city: 'Barcelona',
    country: 'España',
    instagram: 'https://www.instagram.com/dfoto.bcn/',
    facebook: 'https://www.facebook.com/people/Daniel-Fot%C3%B3grafo-Barcelona/61583053737909/',
    tiktok: 'https://www.tiktok.com/@dfoto.bcn',
  },
  services: [
    { title: 'Audiovisual', description: 'Producción de video, live streaming, podcasts y contenido visual que cuenta historias.' },
    { title: 'Fotografía', description: 'Fotografía comercial, de producto, retrato y eventos con estilo profesional.' },
    { title: 'Marketing Digital', description: 'Estrategias digitales, publicidad online, RRSS y campañas que generan resultados.' },
    { title: 'Branding & Diseño', description: 'Construimos marcas sólidas y memorables con identidad y diseño de alto impacto.' },
    { title: 'Desarrollo Web', description: 'Websites, landing pages y aplicaciones web modernas, rápidas y optimizadas.' },
    { title: 'IA & Automatización', description: 'Automatizamos procesos y creamos soluciones inteligentes que ahorran tiempo y recursos.' },
  ],
  portfolio: [],
  blog: [],
  flex: [],
};

export default async function Home() {
  const [site, home, about, contact, services, portfolio, blog, flex] = await Promise.all([
    getItem('site_settings', fallback.site),
    getItem('home_page', fallback.home),
    getItem('about_page', fallback.about),
    getItem('contact_settings', fallback.contact),
    getItems('services', fallback.services),
    getItems('portfolio', fallback.portfolio),
    getItems('blog_posts', fallback.blog),
    getItems('flex_sections', fallback.flex),
  ]);

  const normalized = normalizeAssets(site, home, about, services, portfolio, blog);

  return <HomeClient data={{
    site: normalized.site,
    home: normalized.home,
    about: normalized.about,
    contact,
    services: normalized.services,
    portfolio: normalized.portfolio,
    blog: normalized.blog,
    flex,
  }} />;
}
