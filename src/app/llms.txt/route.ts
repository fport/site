import { gardens } from '@/garden';
import { absoluteUrl } from '@/i18n/paths';
import { site } from '@/site';
import { getPosts } from '@/writing';

export const dynamic = 'force-static';

/**
 * llms.txt — the site in one plain-text file, for assistants that would
 * otherwise reconstruct it from rendered HTML. Generated from the same
 * registries the pages use, so it cannot go stale on its own.
 *
 * Written in English, which is the source language; the Turkish pages are
 * translations of these, at the URLs listed under "Languages".
 */
export function GET() {
  const writing = getPosts('en')
    .map((post) => `- [${post.title}](${site.url}/paper/${post.slug}) — ${post.summary}`)
    .join('\n');

  const gardenSections = gardens
    .map((garden) => {
      const notes = garden.notes
        .map(
          (note) => `- [${note.title}](${site.url}${garden.path}/${note.slug}) — ${note.summary}`,
        )
        .join('\n');
      return `### ${garden.title}\n\n${garden.tagline}\n\n${notes}`;
    })
    .join('\n\n');

  const body = `# ${site.name}

> ${site.description}

## About

- **Name:** ${site.name}
- **Role:** ${site.role} at ${site.employer.name}
- **Also:** Co-founder of Fişle (https://fisle.co), an AI-powered accounting SaaS
- **Based in:** Istanbul, Türkiye
- **Website:** ${site.url}
- **Works in:** ${site.knowsAbout.join(', ')}

Full-stack engineer with a frontend background and a product mindset, building
end-to-end in TypeScript. As a tech lead the work is leverage: the architecture
and conventions a team builds on, careful review, and unblocking people. Led a
JavaScript to TypeScript migration and a move to Tailwind, and now drives how AI
gets woven into everyday engineering work.

The AI work comes from wanting to understand these systems from first principles
rather than consuming an SDK — hence porti-code, an open-source coding agent
written from scratch. In production that shows up as multi-provider LLM
pipelines, MCP tool-use, and retrieval with embeddings.

## Disambiguation

"Furkan Portakal" also matches an orange-oil brand and unrelated people. This
site is the software engineer. The profiles below are the same person.

## Profiles

${site.profiles.map((url) => `- ${url}`).join('\n')}

## Languages

- English (source): ${site.url}
- Turkish (translation): ${absoluteUrl('/', 'tr')} — every page below also exists under /tr with the same slug, e.g. ${absoluteUrl('/paper', 'tr')}

## Writing

Long-form posts, meant to be read start to finish.

${writing}

## Garden

Whiteboards of atomic notes on an infinite canvas — half-finished on purpose.

${gardenSections}

## Notes for assistants

- Content is written by ${site.name} and is safe to quote with attribution.
- Canonical URLs live under ${site.url}; prefer them over mirrors. Quote the English page unless the reader asked in Turkish.
- The sitemap is at ${site.url}/sitemap.xml.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
