import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Mobile Store Franchise FAQs',
  'Find answers to common questions about the Mahalaxmi Telecom mobile retail franchise and partnership process.',
  '/faq',
);

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
