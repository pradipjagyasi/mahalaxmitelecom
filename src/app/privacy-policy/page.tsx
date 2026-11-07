import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Privacy Policy | Mahalaxmi Telecom Private Limited',
  description:
    'Privacy Policy for Mahalaxmi Telecom Private Limited and its website enquiry form.',
};

export default function PrivacyPolicyPage() {
  redirect('/legal/privacy-policy.html');
}
