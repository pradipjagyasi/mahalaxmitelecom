import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'About Us | Our Story, Vision & Mission',
  'Learn about Mahalaxmi Telecom, our Nandurbar roots, telecom distribution experience, retail journey, vision and mission.',
  '/about',
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
