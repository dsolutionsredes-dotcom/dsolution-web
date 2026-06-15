
import type { Metadata } from 'next';
import ServicePageClient from '@/components/ServicePageClient';

export const metadata: Metadata = {
  title: 'Marketing digital | D-Solution',
  description: 'Servicios de marketing digital, Google Ads, Analytics y medición en Barcelona.',
};

const localeContent = {
  es: {
    heroEyebrow: 'Servicio principal',
    heroTitle: 'Marketing digital',
    heroSubtitle: 'Estructuramos campañas, analítica y medición para que las decisiones se tomen con datos claros y el crecimiento no dependa de intuiciones.',
    primaryCta: 'Solicitar propuesta',
    secondaryCta: 'Ver portafolio',
    includesTitle: 'Qué incluye',
    includes: [
      'Google Ads, campañas de captación y estructura de cuentas.',
      'Implementación de Analytics, Tag Manager y medición de conversiones.',
      'Optimización continua de campañas, audiencias y activos.',
      'Reporting claro para entender qué funciona y qué corregir.',
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Empresas que quieren generar leads con campañas bien medidas.',
      'Negocios que ya invierten en Ads, pero no tienen visibilidad clara del rendimiento.',
      'Marcas que necesitan una base analítica sólida antes de escalar.',
    ],
    examplesTitle: 'Ejemplos',
    examples: [
      {
        title: 'Captación para empresa de servicios',
        summary: 'Estructura de Google Ads, tracking de formularios y cuadro de mando básico para una empresa que quería medir mejor cada lead.',
        result: 'Campañas más ordenadas, menos desperdicio de presupuesto y mejor lectura del coste por oportunidad.',
      },
      {
        title: 'Optimización de cuenta existente',
        summary: 'Auditoría de campañas, limpieza de términos de búsqueda, nuevas agrupaciones y mejora de conversiones en Analytics y Tag Manager.',
        result: 'Datos más fiables, mejor asignación del presupuesto y un sistema más claro para tomar decisiones.',
      },
      {
        title: 'Lanzamiento de campaña local',
        summary: 'Segmentación, anuncios, analítica y remarketing para una marca que buscaba visibilidad en Barcelona con control de resultados.',
        result: 'Más consultas cualificadas y un proceso comercial mejor conectado con la inversión publicitaria.',
      },
    ],
    resultsTitle: 'Resultados',
    results: [
      'Más visibilidad sobre el rendimiento real.',
      'Mejor lectura de conversiones y coste por lead.',
      'Campañas con estructura más clara.',
      'Menos decisiones basadas en intuición.',
    ],
    finalTitle: 'CTA',
    finalText: 'Si quieres campañas mejor medidas y una estructura clara de analítica y optimización, podemos ayudarte a ordenar todo el sistema desde la base.',
  },
  en: {
    heroEyebrow: 'Core service',
    heroTitle: 'Digital marketing',
    heroSubtitle: 'We structure campaigns, analytics and measurement so decisions are based on clear data and growth does not depend on intuition.',
    primaryCta: 'Request proposal',
    secondaryCta: 'View portfolio',
    includesTitle: 'What it includes',
    includes: [
      'Google Ads, lead generation campaigns and account structure.',
      'Analytics, Tag Manager and conversion tracking implementation.',
      'Ongoing optimisation of campaigns, audiences and creative assets.',
      'Clear reporting to understand what is working and what should change.',
    ],
    audienceTitle: 'Who it is for',
    audience: [
      'Companies that want to generate leads with properly measured campaigns.',
      'Businesses already investing in ads but lacking clear performance visibility.',
      'Brands that need a strong analytics foundation before scaling.',
    ],
    examplesTitle: 'Examples',
    examples: [
      {
        title: 'Lead generation for a services company',
        summary: 'Google Ads structure, form tracking and a simple dashboard for a company that wanted stronger lead visibility.',
        result: 'Cleaner campaigns, less budget waste and a better understanding of cost per opportunity.',
      },
      {
        title: 'Existing account optimisation',
        summary: 'Campaign audit, search term cleanup, new grouping strategy and improved conversions in Analytics and Tag Manager.',
        result: 'More reliable data, better budget allocation and a clearer decision-making system.',
      },
      {
        title: 'Local campaign launch',
        summary: 'Targeting, ads, analytics and remarketing for a brand aiming to improve visibility in Barcelona with proper result control.',
        result: 'More qualified enquiries and a sales process better connected to ad investment.',
      },
    ],
    resultsTitle: 'Results',
    results: [
      'Stronger visibility on real performance.',
      'Better reading of conversions and cost per lead.',
      'Campaigns with a clearer structure.',
      'Fewer intuition-based decisions.',
    ],
    finalTitle: 'CTA',
    finalText: 'If you want cleaner campaigns and a stronger analytics structure, we can help you build a more reliable setup from the ground up.',
  },
} as const;

export default function MarketingPage() {
  return <ServicePageClient serviceKey="marketing" localeContent={localeContent} variant="editorial" />;
}
