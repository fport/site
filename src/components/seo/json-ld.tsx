import { getLocale, getTranslations } from 'next-intl/server';
import { absoluteUrl } from '@/i18n/paths';
import { schemaId, site } from '@/site';

/** XSS-safe JSON-LD serialisation — the escape Next.js recommends. */
function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
  );
}

/**
 * The person and the site, emitted once from the root layout.
 *
 * "furkan portakal" is a crowded query — an orange oil brand, a TV presenter —
 * so the job is entity disambiguation: one Person node with `sameAs` pointing
 * at every profile that already ranks, and everything else on the site
 * referencing it by @id rather than repeating an author name.
 *
 * The description follows the page language; the @ids do not, so the Turkish
 * and English pages describe the same entity rather than two.
 */
export async function SiteJsonLd() {
  const locale = await getLocale();
  const t = await getTranslations('meta');

  return (
    <>
      <Script
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': schemaId.person,
          name: site.name,
          alternateName: site.handle,
          url: site.url,
          jobTitle: site.role,
          description: t('description'),
          worksFor: {
            '@type': 'Organization',
            name: site.employer.name,
            url: site.employer.url,
          },
          knowsAbout: [...site.knowsAbout],
          knowsLanguage: ['tr', 'en'],
          sameAs: [...site.profiles],
        }}
      />
      <Script
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': schemaId.website,
          url: site.url,
          name: site.name,
          description: t('description'),
          inLanguage: locale,
          publisher: { '@id': schemaId.person },
        }}
      />
    </>
  );
}

/** The homepage is a profile page for the Person above. */
export async function ProfilePageJsonLd() {
  const locale = await getLocale();

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: absoluteUrl('/', locale),
        name: site.name,
        inLanguage: locale,
        isPartOf: { '@id': schemaId.website },
        about: { '@id': schemaId.person },
        mainEntity: { '@id': schemaId.person },
      }}
    />
  );
}

export async function ArticleJsonLd({
  title,
  description,
  path,
  published,
  updated,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  published?: string;
  updated?: string;
  tags?: readonly string[];
}) {
  const locale = await getLocale();
  const url = absoluteUrl(path, locale);

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        author: { '@id': schemaId.person },
        publisher: { '@id': schemaId.person },
        isPartOf: { '@id': schemaId.website },
        inLanguage: locale,
        ...(published ? { datePublished: published } : {}),
        ...((updated ?? published) ? { dateModified: updated ?? published } : {}),
        ...(tags?.length ? { keywords: [...tags] } : {}),
      }}
    />
  );
}

/** Tells search engines where a page sits, so results show a real path. */
export async function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  const locale = await getLocale();

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((step, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: step.name,
          item: absoluteUrl(step.path, locale),
        })),
      }}
    />
  );
}
