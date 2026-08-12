import type { Metadata } from 'next';
import ServicesOverviewClient from '@/components/ServicesOverviewClient';
import { draftMode } from 'next/headers';
import { fetchPageElements } from '@/lib/page-elements';
export const metadata: Metadata = { title: 'Servicios | D-Solution', description: 'Soluciones de tecnología audiovisual, marketing digital, desarrollo web, automatización, branding y fotografía profesional en Barcelona.' };
export default async function ServicesPage() { const elements = await fetchPageElements(['global', 'services-overview'], draftMode().isEnabled); return <ServicesOverviewClient pageElements={elements} />; }
