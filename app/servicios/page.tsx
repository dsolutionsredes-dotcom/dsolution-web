import type { Metadata } from 'next';
import ServicesOverviewClient from '@/components/ServicesOverviewClient';
export const metadata: Metadata = { title: 'Servicios | D-Solution', description: 'Soluciones de tecnología audiovisual, marketing digital, desarrollo web, automatización, branding y fotografía profesional en Barcelona.' };
export default function ServicesPage() { return <ServicesOverviewClient />; }
