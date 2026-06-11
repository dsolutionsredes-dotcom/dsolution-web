import type { Metadata } from 'next';
import './globals.css';
import ChatwootWidget from '@/components/ChatwootWidget';

export const metadata: Metadata = {
  title: 'D-Solution | Agencia Digital en Barcelona',
  description: 'Marketing digital, producción audiovisual y desarrollo web para marcas que quieren crecer.',
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
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
