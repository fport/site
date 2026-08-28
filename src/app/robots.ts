import type { MetadataRoute } from 'next';
import { site } from '@/site';

/**
 * Everything here is meant to be read, including by the assistants people now
 * ask about me instead of searching. The AI crawlers are listed explicitly
 * rather than left to the wildcard, so opting one out later is a one-line
 * change and not an archaeology exercise.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'Google-Extended',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'cohere-ai',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
