import type { MetadataRoute } from 'next';
const baseUrl = 'https://d-solution.org';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/servicios', '/servicios/tecnologia-audiovisual', '/servicios/marketing-digital', '/servicios/desarrollo-web', '/servicios/automatizacion-ia', '/servicios/branding-diseno', '/servicios/fotografia-profesional'];
  return pages.map((url) => ({ url: `${baseUrl}${url}`, lastModified: new Date(), changeFrequency: url === '/' || url === '/servicios' ? 'weekly' : 'monthly', priority: url === '/' ? 1 : url === '/servicios' ? 0.9 : 0.8 }));
}
