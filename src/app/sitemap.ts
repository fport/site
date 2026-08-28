import type { MetadataRoute } from 'next';
import { gardens } from '@/garden';
import { site } from '@/site';
import { posts } from '@/writing';

/** Newest note in a garden — the canvas itself has no date of its own. */
function gardenUpdated(notes: readonly { updated: string }[]) {
  return notes.reduce((latest, note) => (note.updated > latest ? note.updated : latest), '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const papers: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/paper/${post.slug}`,
    lastModified: new Date(post.updated ?? post.published),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const gardenPages: MetadataRoute.Sitemap = gardens.flatMap((garden) => [
    {
      url: `${site.url}${garden.path}`,
      lastModified: new Date(gardenUpdated(garden.notes) || now),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...garden.notes.map((note) => ({
      url: `${site.url}${garden.path}/${note.slug}`,
      lastModified: new Date(note.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]);

  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/paper`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/garden`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...papers,
    ...gardenPages,
  ];
}
