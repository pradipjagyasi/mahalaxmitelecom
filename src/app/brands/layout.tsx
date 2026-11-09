import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Our Stores | Jagyasi Mobile, MM Mobile, Phone Café & Mobile Point',
  'Discover Jagyasi Mobile, MM Mobile, Phone Café and Mobile Point, the four Mahalaxmi Telecom retail formats for mobile devices and accessories.',
  '/brands',
);

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
