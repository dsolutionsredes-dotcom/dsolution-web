import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import AudiovisualSolutionsPageClient from '@/components/AudiovisualSolutionsPageClient';
import { fetchPageElements } from '@/lib/page-elements';

export const metadata: Metadata = {
  title: 'Soluciones audiovisuales | D-Solution',
  description: 'Soluciones audiovisuales en Barcelona para eventos, streaming multicámara, producción en vivo, podcast, instalación, capacitación y postproducción.',
};

export default async function Page() {
  const elements = await fetchPageElements(['global', 'service-audiovisual'], draftMode().isEnabled);
  return <AudiovisualSolutionsPageClient pageElements={elements} />;
}
