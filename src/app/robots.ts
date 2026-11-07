import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.mahalaxmitelecom.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/privacy-policy', '/terms-and-conditions'],
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
