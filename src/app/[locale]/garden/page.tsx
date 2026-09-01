import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/link';
import { SiteShell } from '@/components/site-shell';
import { getGardens } from '@/garden';
import { pageAlternates } from '@/i18n/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'garden' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: pageAlternates('/garden', locale),
  };
}

export default async function GardenIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <SiteShell>
      <header>
        <h1 className="text-2xl font-medium leading-tight">{t('garden.title')}</h1>
        <p className="mt-2 leading-snug text-muted">{t('garden.intro')}</p>
      </header>

      <ul className="mt-8 space-y-6">
        {getGardens(locale).map((garden) => (
          <li key={garden.id}>
            <Link href={garden.path} className="group block">
              <h2 className="font-medium text-link underline group-hover:text-link-hover">
                {garden.title}
              </h2>
              <p className="mt-1 leading-snug text-muted">{garden.tagline}</p>
            </Link>
            <p className="mt-1.5 text-sm text-muted">
              {t('common.notesCount', { count: garden.notes.length })} ·{' '}
              {garden.clusters.map((cluster) => cluster.label).join(' · ')}
            </p>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
