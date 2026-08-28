import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers';
import { SiteJsonLd } from '@/components/seo/json-ld';
import { site } from '@/site';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: {
    canonical: '/',
  },
  title: {
    // "furkan portakal" is a crowded query, so the default title carries the
    // role that tells the search engine which one this is.
    default: `${site.name} — ${site.role} & Full-stack Engineer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    'Furkan Portakal developer',
    'Frontend Tech Lead',
    'full-stack engineer',
    ...site.knowsAbout,
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role} & Full-stack Engineer`,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role} & Full-stack Engineer`,
    description: site.description,
    creator: '@getporti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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
      <html lang="en" className={`${manrope.className}`} suppressHydrationWarning>
        <body className="antialiased tracking-tight bg-background text-foreground">
          <SiteJsonLd />
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
