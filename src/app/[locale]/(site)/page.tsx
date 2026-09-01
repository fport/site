import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { MDXContent } from 'mdx/types';
import { ProfilePageJsonLd } from '@/components/seo/json-ld';
import HomeEn from '@/content/home.mdx';
import HomeTr from '@/content/home.tr.mdx';

const home: Record<Locale, MDXContent> = { en: HomeEn, tr: HomeTr };

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const Home = home[locale];

  return (
    <>
      <ProfilePageJsonLd />
      <Home />
    </>
  );
}
