import { absolute, schemaId, site } from '@/site';

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
 */
export function SiteJsonLd() {
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
          description: site.description,
          worksFor: {
            '@type': 'Organization',
            name: site.employer.name,
            url: site.employer.url,
          },
          knowsAbout: [...site.knowsAbout],
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
          description: site.description,
          inLanguage: 'en',
          publisher: { '@id': schemaId.person },
        }}
      />
    </>
  );
}

/** The homepage is a profile page for the Person above. */
export function ProfilePageJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: site.url,
        name: site.name,
        isPartOf: { '@id': schemaId.website },
        about: { '@id': schemaId.person },
        mainEntity: { '@id': schemaId.person },
      }}
    />
  );
}

export function ArticleJsonLd({
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
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: absolute(path),
        mainEntityOfPage: absolute(path),
        author: { '@id': schemaId.person },
        publisher: { '@id': schemaId.person },
        isPartOf: { '@id': schemaId.website },
        inLanguage: 'en',
        ...(published ? { datePublished: published } : {}),
        ...(updated ?? published ? { dateModified: updated ?? published } : {}),
        ...(tags?.length ? { keywords: [...tags] } : {}),
      }}
    />
  );
}

/** Tells search engines where a page sits, so results show a real path. */
export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((step, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: step.name,
          item: absolute(step.path),
        })),
      }}
    />
  );
}
