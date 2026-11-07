import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Terms & Conditions | Mahalaxmi Telecom Private Limited',
  description:
    'Terms and conditions for using the Mahalaxmi Telecom Private Limited website.',
};

export default function TermsAndConditionsPage() {
  redirect('/legal/terms-and-conditions.html');
}
