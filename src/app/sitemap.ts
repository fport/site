import type { MetadataRoute } from 'next';
import { gardens } from '@/garden';
import { absoluteUrl } from '@/i18n/paths';
import { routing } from '@/i18n/routing';
import { getPosts } from '@/writing';

type Entry = MetadataRoute.Sitemap[number];

/** Newest note in a garden — the canvas itself has no date of its own. */
function gardenUpdated(notes: readonly { updated: string }[]) {
  return notes.reduce((latest, note) => (note.updated > latest ? note.updated : latest), '');
}

/**
 * One row per language for a path, each carrying the full `hreflang` set —
 * the form Google asks for, so it pairs `/paper` and `/tr/paper` as the same
 * page rather than two competing ones.
 */
function localized(
  path: string,
  rest: Pick<Entry, 'lastModified' | 'changeFrequency' | 'priority'>,
): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(path, locale)])),
    'x-default': absoluteUrl(path, routing.defaultLocale),
  };
  return routing.locales.map((locale) => ({
    url: absoluteUrl(path, locale),
    ...rest,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const papers = getPosts(routing.defaultLocale).flatMap((post) =>
    localized(`/paper/${post.slug}`, {
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: 'yearly',
      priority: 0.7,
    }),
  );

  const gardenPages = gardens.flatMap((garden) => [
    ...localized(garden.path, {
      lastModified: new Date(gardenUpdated(garden.notes) || now),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    ...garden.notes.flatMap((note) =>
      localized(`${garden.path}/${note.slug}`, {
        lastModified: new Date(note.updated),
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
  ]);

  return [
    ...localized('/', { lastModified: now, changeFrequency: 'weekly', priority: 1 }),
    ...localized('/paper', { lastModified: now, changeFrequency: 'monthly', priority: 0.8 }),
    ...localized('/garden', { lastModified: now, changeFrequency: 'weekly', priority: 0.8 }),
    ...papers,
    ...gardenPages,
  ];
}
