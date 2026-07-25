import type { Metadata } from 'next';
import MarketingDigitalPageClient from '@/components/MarketingDigitalPageClient';

export const metadata: Metadata = {
  title: 'Marketing digital | D-Solution',
  description: 'Campañas, analítica y optimización para negocios que quieren crecer con datos claros.',
};

export default function MarketingPage() {
  return <MarketingDigitalPageClient />;
}
