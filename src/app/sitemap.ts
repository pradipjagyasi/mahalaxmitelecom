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
    '/legal/privacy-policy.html',
    '/legal/terms-and-conditions.html',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
