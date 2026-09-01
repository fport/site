/**
 * One source of truth for the things every SEO surface repeats — metadata,
 * JSON-LD, the sitemap, robots and llms.txt all read from here, so the site
 * cannot describe itself two different ways.
 */
export const site = {
  url: 'https://getporti.com',
  name: 'Furkan Portakal',
  handle: 'fport',
  role: 'Frontend Tech Lead',
  employer: {
    name: 'Sanstech',
    url: 'https://www.linkedin.com/company/sans-technology',
  },
  /** Kept near 155 characters so search engines show it whole. */
  description:
    'Furkan Portakal — Frontend Tech Lead at Sanstech and co-founder of Fişle. Full-stack TypeScript, AI-native products, and notes on building with LLMs.',
  locale: 'en_US',
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'Frontend architecture',
    'LLM orchestration',
    'AI agents',
    'Model Context Protocol',
    'Retrieval-augmented generation',
    'Cloudflare Workers',
  ],
  /** Drives both the footer-style link set and schema.org sameAs. */
  profiles: [
    'https://github.com/fport',
    'https://www.linkedin.com/in/furkanportakal',
    'https://x.com/getporti',
    'https://www.youtube.com/@getporti',
    'https://huggingface.co/fport',
    'https://medium.com/@furkanportakal',
  ],
} as const;

/** Stable schema.org node ids, so entities reference each other by @id. */
export const schemaId = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
} as const;

export const absolute = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`);
