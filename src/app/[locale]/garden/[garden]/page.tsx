import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GardenCanvas } from '@/components/garden/canvas';
import { gardens, getGarden, placeNotes } from '@/garden';
import { localizedPath } from '@/i18n/paths';
import { openGraphLocale, pageAlternates } from '@/i18n/seo';
import { site } from '@/site';

type Props = { params: Promise<{ locale: Locale; garden: string }> };

export function generateStaticParams() {
  return gardens.map((garden) => ({ garden: garden.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, garden: gardenId } = await params;
  const garden = getGarden(gardenId, locale);
  if (!garden) return {};

  return {
    title: garden.title,
    description: garden.description,
    alternates: pageAlternates(garden.path, locale),
    openGraph: {
      title: `${garden.title} | ${site.name}`,
      description: garden.description,
      url: localizedPath(garden.path, locale),
      ...openGraphLocale(locale),
    },
  };
}

export default async function GardenCanvasPage({ params }: Props) {
  const { locale, garden: gardenId } = await params;
  setRequestLocale(locale);
  const garden = getGarden(gardenId, locale);
  if (!garden) notFound();

  // MDX is rendered here, on the server, and handed to the client canvas as
  // ready-made elements — note bodies never ship as client JavaScript.
  const notes = placeNotes(garden).map(({ Content, ...note }) => ({
    ...note,
    body: <Content />,
  }));

  return (
    <GardenCanvas
      garden={{
        id: garden.id,
        path: garden.path,
        title: garden.title,
        tagline: garden.tagline,
        clusters: garden.clusters,
        initialZoom: garden.initialZoom,
      }}
      notes={notes}
    />
  );
}
