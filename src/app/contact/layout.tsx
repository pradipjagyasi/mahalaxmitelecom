import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Contact Us | Franchise Enquiries in Nandurbar',
  'Contact Mahalaxmi Telecom in Nandurbar, Maharashtra for franchise and business enquiries by phone, email or our enquiry form.',
  '/contact',
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
