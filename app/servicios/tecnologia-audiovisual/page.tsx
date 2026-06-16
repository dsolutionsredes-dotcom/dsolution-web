
import type { Metadata } from 'next';
import ServicePageClient from '@/components/ServicePageClient';

export const metadata: Metadata = {
  title: 'Tecnología audiovisual | D-Solution',
  description: 'Servicios de tecnología audiovisual y streaming en Barcelona para eventos, marcas y producciones.',
};

const localeContent = {
  es: {
    heroEyebrow: 'Servicio principal',
    heroTitle: 'Tecnología audiovisual',
    heroSubtitle: 'Diseñamos experiencias audiovisuales con criterio técnico, ejecución cuidada y una puesta en escena pensada para marcas, eventos y formatos híbridos.',
    primaryCta: 'Solicitar propuesta',
    secondaryCta: 'Ver portafolio',
    includesTitle: 'Qué incluye',
    includes: [
      'Planificación técnica de audio, video, luces y transmisión.',
      'Streaming y soporte para eventos en directo, híbridos o corporativos.',
      'Configuración de equipos, coordinación técnica y pruebas previas.',
      'Cobertura visual y grabación para reutilizar el contenido en campañas.',
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Marcas que organizan lanzamientos, presentaciones o experiencias presenciales.',
      'Empresas que necesitan webinars, podcasts o eventos corporativos bien ejecutados.',
      'Equipos que buscan una parte técnica confiable sin improvisación.',
    ],
    examplesTitle: 'Ejemplos',
    examples: [
      {
        title: 'Streaming para evento de marca',
        summary: 'Producción técnica para un lanzamiento en Barcelona con realización multicámara, sonido, soporte de escena y emisión privada para invitados.',
        result: 'Experiencia fluida, imagen profesional y contenido reutilizable para redes y campañas posteriores.',
      },
      {
        title: 'Podcast visual para empresa',
        summary: 'Set audiovisual, iluminación, audio y grabación de episodios para una marca que quería comunicar autoridad y cercanía en formato largo.',
        result: 'Contenido consistente, mejor imagen de marca y biblioteca de clips para difusión durante semanas.',
      },
      {
        title: 'Cobertura técnica de jornada corporativa',
        summary: 'Audio, video, luces y apoyo técnico para un evento interno con ponencias, pantallas, señal y registro final.',
        result: 'Evento mejor coordinado, menos incidencias y una experiencia más sólida para asistentes y ponentes.',
      },
    ],
    resultsTitle: 'Resultados',
    results: [
      'Más claridad técnica antes del evento.',
      'Menos fricción durante la ejecución.',
      'Contenido audiovisual útil más allá del directo.',
      'Percepción de marca más profesional.',
    ],
    finalTitle: 'CTA',
    finalText: 'Si quieres una propuesta clara para un evento, streaming o producción audiovisual, podemos ayudarte a plantearlo de forma técnica y bien organizada.',
  },
  en: {
    heroEyebrow: 'Core service',
    heroTitle: 'Audiovisual technology',
    heroSubtitle: 'We design audiovisual experiences with technical clarity, careful execution and staging built for brands, events and hybrid formats.',
    primaryCta: 'Request proposal',
    secondaryCta: 'View portfolio',
    includesTitle: 'What it includes',
    includes: [
      'Technical planning for audio, video, lighting and live broadcasting.',
      'Streaming support for live, hybrid or corporate events.',
      'Equipment setup, technical coordination and pre-event testing.',
      'Visual coverage and recording for later campaign reuse.',
    ],
    audienceTitle: 'Who it is for',
    audience: [
      'Brands running launches, presentations or live experiences.',
      'Companies producing webinars, podcasts or corporate events.',
      'Teams looking for reliable technical execution without improvisation.',
    ],
    examplesTitle: 'Examples',
    examples: [
      {
        title: 'Brand event streaming',
        summary: 'Technical production for a Barcelona product launch with multicamera direction, sound, stage support and a private stream for invited guests.',
        result: 'Smooth experience, strong visual quality and reusable content for social media and follow-up campaigns.',
      },
      {
        title: 'Video podcast for a company',
        summary: 'Audiovisual set, lighting, audio and episode recording for a brand that wanted to communicate authority and proximity in long-form content.',
        result: 'Consistent content, stronger brand perception and a clip library for weeks of distribution.',
      },
      {
        title: 'Corporate event technical coverage',
        summary: 'Audio, video, lighting and stage support for an internal event with talks, screens, signal routing and full event capture.',
        result: 'Better coordination, fewer incidents and a stronger experience for both attendees and speakers.',
      },
    ],
    resultsTitle: 'Results',
    results: [
      'More technical clarity before the event.',
      'Less friction during execution.',
      'Audiovisual content that keeps working after the live moment.',
      'A more professional brand perception.',
    ],
    finalTitle: 'CTA',
    finalText: 'If you need a clear proposal for an event, streaming setup or audiovisual production, we can help you define it with technical precision and clean execution.',
  },
} as const;

export default function AudiovisualPage() {
  return <ServicePageClient serviceKey="audiovisual" localeContent={localeContent} variant="immersive" />;
}
