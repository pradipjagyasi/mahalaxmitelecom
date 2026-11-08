import './globals.css';
import './utilities.css';
import './responsive.css';
import type { Metadata } from 'next';

const siteUrl = 'https://www.mahalaxmitelecom.in';
const siteName = 'Mahalaxmi Telecom Private Limited';
const siteDescription =
  'Mahalaxmi Telecom is a trusted multi-brand mobile and electronics retail chain in Maharashtra, offering smartphones, accessories, consumer electronics and franchise opportunities.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mahalaxmi Telecom | Multi-Brand Mobile Retail & Franchise',
    template: '%s | Mahalaxmi Telecom',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'Mahalaxmi Telecom',
    'mobile stores in Maharashtra',
    'mobile phone retailer Maharashtra',
    'smartphones and accessories',
    'consumer electronics retailer',
    'mobile store franchise Maharashtra',
    'telecom distribution Maharashtra',
    'Jagyasi Mobile',
    'MM Mobile',
    'Phone Café',
    'Mobile Point',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Mobile retail and consumer electronics',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName,
    title: 'Mahalaxmi Telecom | Multi-Brand Mobile Retail & Franchise',
    description: siteDescription,
    images: [
      {
        url: '/mahalaxmi-banner-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mahalaxmi Telecom Private Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahalaxmi Telecom | Multi-Brand Mobile Retail & Franchise',
    description: siteDescription,
    images: ['/mahalaxmi-banner-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: { url: '/icons/mahalaxmi-48-v1.png', type: 'image/png', sizes: '48x48' },
    apple: { url: '/icons/mahalaxmi-180-v1.png', type: 'image/png', sizes: '180x180' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#business`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/mahalaxmi-logo.png`,
        image: `${siteUrl}/mahalaxmi-banner-logo.jpg`,
        description: siteDescription,
        telephone: '+91-96048-36936',
        email: 'mahalaxmitelecom26@gmail.com',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 420, Subhash Chowk, Mangal Gate Police Chowki',
          addressLocality: 'Nandurbar',
          addressRegion: 'Maharashtra',
          postalCode: '425412',
          addressCountry: 'IN',
        },
        areaServed: {
          '@type': 'State',
          name: 'Maharashtra',
        },
        sameAs: [
          'https://www.facebook.com/p/Mahalaxmi-Telecom-Pvt-Ltd-100063747265654/',
          'https://www.instagram.com/jagyasimobiles_offical/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: { '@id': `${siteUrl}/#business` },
        inLanguage: 'en-IN',
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
