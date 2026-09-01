import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';
import { Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ThemeProvider } from '@/components/providers';
import { SiteJsonLd } from '@/components/seo/json-ld';
import { localizedPath } from '@/i18n/paths';
import { routing } from '@/i18n/routing';
import { openGraphLocale, pageAlternates } from '@/i18n/seo';
import { site } from '@/site';

// `latin-ext` carries the Turkish letters (ğ, ş, ı, İ) — without it those
// glyphs fall back to the system font mid-word.
const manrope = Manrope({ subsets: ['latin', 'latin-ext'] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    alternates: pageAlternates('/', locale),
    title: {
      // "furkan portakal" is a crowded query, so the default title carries the
      // role that tells the search engine which one this is.
      default: t('title'),
      template: `%s | ${site.name}`,
    },
    description: t('description'),
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
      title: t('title'),
      description: t('description'),
      url: localizedPath('/', locale),
      ...openGraphLocale(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Lets every page below render statically instead of per request.
  setRequestLocale(locale);

  return (
    <ViewTransitions>
      <html lang={locale} className={`${manrope.className}`} suppressHydrationWarning>
        <body className="antialiased tracking-tight bg-background text-foreground">
          <SiteJsonLd />
          <NextIntlClientProvider>
            <ThemeProvider>
              {children}
              <Analytics />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
