import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/link';
import { pageAlternates } from '@/i18n/seo';
import { getPosts } from '@/writing';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'writing' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: pageAlternates('/paper', locale),
  };
}

export default async function WritingIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <article>
      <header>
        <h1 className="text-2xl font-medium leading-tight">{t('writing.title')}</h1>
        <p className="mt-2 leading-snug text-muted">
          {t.rich('writing.intro', {
            garden: (chunks) => (
              <Link href="/garden" className="text-link underline hover:text-link-hover">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {getPosts(locale).map((post) => (
          <li key={post.slug}>
            <Link href={`/paper/${post.slug}`} className="group block">
              <h2 className="font-medium text-link underline group-hover:text-link-hover">
                {post.title}
              </h2>
              <p className="mt-1 leading-snug text-muted">{post.summary}</p>
            </Link>
            <p className="mt-1.5 text-sm text-muted">
              <time dateTime={post.published}>{post.published}</time>
              {post.updated ? <> · {t('common.updated', { date: post.updated })}</> : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
