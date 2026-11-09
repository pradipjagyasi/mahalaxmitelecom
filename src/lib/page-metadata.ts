import type { Metadata } from 'next';

const siteUrl = 'https://www.mahalaxmitelecom.in';
const siteName = 'Mahalaxmi Telecom Private Limited';
const shareImage = {
  url: '/mahalaxmi-banner-logo.jpg',
  width: 1200,
  height: 630,
  alt: siteName,
};

/** Metadata for a public page; the root layout supplies the site-name suffix. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | Mahalaxmi Telecom`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${siteUrl}${path}`,
      siteName,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
