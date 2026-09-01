import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/components/link';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { findNote, gardens, getGarden } from '@/garden';
import { localizedPath } from '@/i18n/paths';
import { openGraphLocale, pageAlternates } from '@/i18n/seo';
import { site } from '@/site';

type Props = { params: Promise<{ locale: Locale; garden: string; slug: string }> };

export function generateStaticParams() {
  return gardens.flatMap((garden) =>
    garden.notes.map((note) => ({ garden: garden.id, slug: note.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, garden: gardenId, slug } = await params;
  const garden = getGarden(gardenId, locale);
  const note = garden && findNote(garden, slug);
  if (!garden || !note) return {};

  const path = `${garden.path}/${note.slug}`;
  return {
    title: note.title,
    description: note.summary,
    alternates: pageAlternates(path, locale),
    openGraph: {
      title: `${note.title} | ${site.name}`,
      description: note.summary,
      url: localizedPath(path, locale),
      type: 'article',
      publishedTime: note.updated,
      tags: note.tags,
      ...openGraphLocale(locale),
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { locale, garden: gardenId, slug } = await params;
  setRequestLocale(locale);
  const garden = getGarden(gardenId, locale);
  const note = garden && findNote(garden, slug);
  if (!garden || !note) notFound();

  const t = await getTranslations();
  const { Content } = note;

  return (
    <article>
      <ArticleJsonLd
        title={note.title}
        description={note.summary}
        path={`${garden.path}/${note.slug}`}
        published={note.updated}
        tags={note.tags}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: t('nav.home'), path: '/' },
          { name: t('garden.title'), path: '/garden' },
          { name: garden.title, path: garden.path },
          { name: note.title, path: `${garden.path}/${note.slug}` },
        ]}
      />

      <nav className="text-sm">
        <Link href={garden.path} className="text-muted underline hover:text-foreground">
          ← {garden.title}
        </Link>
      </nav>

      <header className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {t(`garden.kind.${note.kind}`)} · {t(`garden.status.${note.status}`)}
        </p>
        <h1 className="mt-1 text-2xl font-medium leading-tight">{note.title}</h1>
        <p className="mt-2 leading-snug text-muted">{note.summary}</p>
      </header>

      <div className="note-prose mt-8">
        <Content />
      </div>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-card-border pt-3 text-sm text-muted">
        <span>{note.tags?.map((tag) => `#${tag}`).join('  ')}</span>
        <time dateTime={note.updated}>{t('common.updated', { date: note.updated })}</time>
      </footer>

      <p className="mt-6 text-sm">
        <Link
          href={`${garden.path}#${note.slug}`}
          className="text-link underline hover:text-link-hover"
        >
          {t('garden.seeOnBoard')}
        </Link>
      </p>
    </article>
  );
}
