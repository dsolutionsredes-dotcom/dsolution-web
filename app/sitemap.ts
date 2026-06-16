import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://d-solution.org';
  const now = new Date();
  const servicePages = [
    'tecnologia-audiovisual',
    'marketing-digital',
    'desarrollo-web',
    'automatizacion-ia',
    'branding-diseno',
    'fotografia-profesional',
  ];

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/?lang=es`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/?lang=en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...servicePages.map((slug) => ({
      url: `${base}/servicios/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: slug === 'tecnologia-audiovisual' || slug === 'marketing-digital' ? 0.85 : 0.65,
    })),
  ];
}
