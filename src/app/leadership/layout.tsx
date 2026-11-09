import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Our Leadership & Directors',
  'Meet the leadership team and directors behind Mahalaxmi Telecom and learn about the company’s approach to mobile retail.',
  '/leadership',
);

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
