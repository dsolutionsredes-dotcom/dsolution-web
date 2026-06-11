import type { Metadata } from 'next';
import './globals.css';
import ChatwootWidget from '@/components/ChatwootWidget';

export const metadata: Metadata = {
  title: 'D-Solution | Agencia Digital en Barcelona',
  description: 'Marketing digital, producción audiovisual y desarrollo web para marcas que quieren crecer.',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <ChatwootWidget />
      </body>
    </html>
  );
}
