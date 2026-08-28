import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { findNote, gardens, getGarden } from '@/garden';

type Params = { params: Promise<{ garden: string; slug: string }> };

export function generateStaticParams() {
  return gardens.flatMap((garden) =>
    garden.notes.map((note) => ({ garden: garden.id, slug: note.slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { garden: gardenId, slug } = await params;
  const garden = getGarden(gardenId);
  const note = garden && findNote(garden, slug);
  if (!garden || !note) return {};

  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `${garden.path}/${note.slug}` },
    openGraph: {
      title: `${note.title} | Furkan Portakal`,
      description: note.summary,
      url: `${garden.path}/${note.slug}`,
      type: 'article',
      publishedTime: note.updated,
      tags: note.tags,
    },
  };
}

export default async function NotePage({ params }: Params) {
  const { garden: gardenId, slug } = await params;
  const garden = getGarden(gardenId);
  const note = garden && findNote(garden, slug);
  if (!garden || !note) notFound();

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
          { name: 'Home', path: '/' },
          { name: 'Garden', path: '/garden' },
          { name: garden.title, path: garden.path },
          { name: note.title, path: `${garden.path}/${note.slug}` },
        ]}
      />

      <nav className="pt-12 text-sm">
        <Link href={garden.path} className="text-muted underline hover:text-foreground">
          ← {garden.title}
        </Link>
      </nav>

      <header className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {note.kind.replace('-', ' ')} · {note.status}
        </p>
        <h1 className="mt-1 text-2xl font-medium leading-tight">{note.title}</h1>
        <p className="mt-2 leading-snug text-muted">{note.summary}</p>
      </header>

      <div className="note-prose mt-8">
        <Content />
      </div>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-card-border pt-3 text-sm text-muted">
        <span>{note.tags?.map((tag) => `#${tag}`).join('  ')}</span>
        <time dateTime={note.updated}>updated {note.updated}</time>
      </footer>

      <p className="mt-6 text-sm">
        <Link
          href={`${garden.path}#${note.slug}`}
          className="text-link underline hover:text-link-hover"
        >
          See this note on the whiteboard →
        </Link>
      </p>
    </article>
  );
}
