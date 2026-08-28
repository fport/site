import CypressNotlari from './notes/talks/cypress-notlari.mdx';
import FrontendshipWeeklyShip2 from './notes/talks/frontendship-weekly-ship-2.mdx';
import IstanbulJsAiNextjs from './notes/talks/istanbul-js-ai-nextjs.mdx';
import MicroFrontendEgitimi from './notes/talks/micro-frontend-egitimi.mdx';
import { talksLayout } from './talks.layout';
import type { Garden } from './types';

export const talksGarden: Garden = {
  id: 'talks',
  path: '/garden/talks',
  title: 'Talks & Resources',
  tagline: 'Conference talks, live sessions and the material I have published.',
  description:
    'My talks and live sessions, plus the Turkish documentation and training material I have published on testing and micro frontends.',
  clusters: [
    { id: 'sessions', label: 'talks & live sessions', accent: 'amber' },
    { id: 'resources', label: 'educational resources', accent: 'lime' },
  ],
  frames: talksLayout,
  notes: [
    {
      slug: 'frontendship-weekly-ship-2',
      title: 'Frontendship: Weekly Ship 2',
      summary: 'Açık kaynak katkı süreci — fork, PR ve upstream sync, canlı.',
      kind: 'talk',
      status: 'evergreen',
      updated: '2026-08-28',
      cluster: 'sessions',
      tags: ['git', 'open-source', 'live'],
      accent: 'amber',
      Content: FrontendshipWeeklyShip2,
    },
    {
      slug: 'istanbul-js-ai-nextjs',
      title: 'Istanbul JavaScript Community',
      summary: 'Unlocking AI with Next.js — AI SDK, streaming, modern web.',
      kind: 'talk',
      status: 'evergreen',
      updated: '2026-08-28',
      cluster: 'sessions',
      tags: ['nextjs', 'ai', 'talk'],
      accent: 'amber',
      Content: IstanbulJsAiNextjs,
    },
    {
      slug: 'cypress-notlari',
      title: 'Cypress Notları',
      summary: 'End-to-end testing üzerine kapsamlı Türkçe dokümantasyon.',
      kind: 'resource',
      status: 'evergreen',
      updated: '2026-08-28',
      cluster: 'resources',
      tags: ['cypress', 'testing', 'türkçe'],
      accent: 'lime',
      Content: CypressNotlari,
    },
    {
      slug: 'micro-frontend-egitimi',
      title: 'Micro Frontend Eğitimi',
      summary: 'Micro frontend mimarisi üzerine interaktif eğitim platformu.',
      kind: 'resource',
      status: 'evergreen',
      updated: '2026-08-28',
      cluster: 'resources',
      tags: ['micro-frontend', 'architecture'],
      accent: 'lime',
      Content: MicroFrontendEgitimi,
    },
  ],
};
