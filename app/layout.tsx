import type { Metadata } from 'next';
import './globals.css';
import ChatwootWidget from '@/components/ChatwootWidget';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import IntroLoader from '@/components/IntroLoader';

const siteUrl = 'https://d-solution.org';
const seoTitle = 'D-Solution | Agencia digital en Barcelona';
const seoDescription = 'Tecnología audiovisual, streaming, marketing digital, desarrollo web, automatización e inteligencia artificial.';
const seoImage = '/seo-image.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoTitle,
  description: seoDescription,
  applicationName: 'D-Solution',
  keywords: [
    'agencia digital Barcelona',
    'tecnología audiovisual Barcelona',
    'streaming Barcelona',
    'marketing digital Barcelona',
    'desarrollo web Barcelona',
    'automatización e inteligencia artificial',
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-ES': `${siteUrl}/?lang=es`,
      'en-US': `${siteUrl}/?lang=en`,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'D-Solution',
    locale: 'es_ES',
    title: seoTitle,
    description: seoDescription,
    images: [{ url: seoImage, width: 688, height: 696, alt: 'D-Solution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [seoImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'D-Solution',
  url: siteUrl,
  logo: `${siteUrl}${seoImage}`,
  image: `${siteUrl}${seoImage}`,
  description: seoDescription,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressCountry: 'ES',
  },
  areaServed: 'Barcelona',
  email: 'dsolutions.redes@gmail.com',
  sameAs: [
    'https://www.instagram.com/dfoto.bcn/',
    'https://www.facebook.com/people/Daniel-Fot%C3%B3grafo-Barcelona/61583053737909/',
    'https://www.tiktok.com/@dfoto.bcn',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-ES">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <IntroLoader />
        {children}
        <FloatingWhatsApp />
        <ChatwootWidget />
      </body>
    </html>
  );
}
