import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'WAFLE Rocket TEC | Ideas que despegan en equipo',
  description: 'Conoce la identidad y al equipo detrás de WAFLE Rocket TEC.',
  applicationName: 'WAFLE Rocket TEC',
  openGraph: {
    title: 'WAFLE Rocket TEC',
    description: 'Tecnología, creatividad y trabajo en equipo.',
    type: 'website',
    images: ['/brand/wafle-emblem.png']
  },
  icons: {
    icon: '/brand/wafle-emblem.png',
    apple: '/brand/wafle-emblem.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  colorScheme: 'dark light'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
