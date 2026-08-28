import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GardenCanvas } from '@/components/garden/canvas';
import { gardens, getGarden, placeNotes } from '@/garden';

type Params = { params: Promise<{ garden: string }> };

export function generateStaticParams() {
  return gardens.map((garden) => ({ garden: garden.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const garden = getGarden((await params).garden);
  if (!garden) return {};

  return {
    title: garden.title,
    description: garden.description,
    alternates: { canonical: garden.path },
    openGraph: {
      title: `${garden.title} | Furkan Portakal`,
      description: garden.description,
      url: garden.path,
    },
  };
}

export default async function GardenCanvasPage({ params }: Params) {
  const garden = getGarden((await params).garden);
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
