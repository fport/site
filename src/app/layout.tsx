import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://getporti.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Furkan Portakal',
    template: '%s | Furkan Portakal',
  },
  description: 'Frontend developer',
  verification: {
    google: '3FQmrHc1F7KpCLi3vcVRFiC7ASQlMHBl4DZyMzpjnc4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
        <body className="antialiased tracking-tight bg-background text-foreground">
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
