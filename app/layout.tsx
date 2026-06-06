import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'D-Solution | Agencia Digital en Barcelona',
  description: 'Marketing digital, producción audiovisual y desarrollo web para marcas que quieren crecer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
