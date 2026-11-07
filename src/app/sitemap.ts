import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.mahalaxmitelecom.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/brands',
    '/franchise',
    '/leadership',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
