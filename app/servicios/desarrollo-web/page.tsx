import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import WebDevelopmentPageClient from '@/components/WebDevelopmentPageClient';
import { fetchPageElements } from '@/lib/page-elements';

export const metadata: Metadata = {
  title: 'Desarrollo web | D-Solution',
  description: 'Webs corporativas, landing pages, e-commerce, catálogos, reservas y plataformas web para negocios que quieren crecer online.',
};

export default async function Page() {
  const elements = await fetchPageElements(['global', 'service-web'], draftMode().isEnabled);
  return <WebDevelopmentPageClient pageElements={elements} />;
}
