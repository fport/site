import CypressNotlariTr from './notes/talks/cypress-notlari.tr.mdx';
import FisleCofounderTr from './notes/talks/fisle-cofounder.tr.mdx';
import FrontendshipWeeklyShip2Tr from './notes/talks/frontendship-weekly-ship-2.tr.mdx';
import IstanbulJsAiNextjsTr from './notes/talks/istanbul-js-ai-nextjs.tr.mdx';
import KodizimTr from './notes/talks/kodizim.tr.mdx';
import MicroFrontendEgitimiTr from './notes/talks/micro-frontend-egitimi.tr.mdx';
import MythologyTechTr from './notes/talks/mythology-tech.tr.mdx';
import PargaliTr from './notes/talks/pargali.tr.mdx';
import SanstechTr from './notes/talks/sanstech.tr.mdx';
import SimpraTr from './notes/talks/simpra.tr.mdx';
import Tubitak2209bTr from './notes/talks/tubitak-2209b.tr.mdx';
import type { GardenTranslation } from './types';

/**
 * Turkish overlay for the talks garden: titles, taglines, cluster labels and
 * note bodies (`notes/talks/<slug>.tr.mdx`). Anything missing here falls back
 * to the English registry in `talks.ts`.
 */
export const talksGardenTr: GardenTranslation = {
  title: 'Deneyim, Konuşmalar & Kaynaklar',
  tagline: 'Çalıştığım yerler, başlattığım işler ve yayımladığım konuşmalar ile materyaller.',
  description:
    'Üstlendiğim roller ve başlattığım işler; bir de konuşmalarım, canlı yayınlarım ve yayımladığım Türkçe dokümantasyon ile eğitim materyalleri.',
  clusters: {
    experience: 'çalıştığım yerler',
    founded: 'kurduklarım & yürüttüklerim',
    sessions: 'konuşmalar & canlı yayınlar',
    resources: 'eğitim kaynakları',
  },
  notes: {
    sanstech: {
      title: 'Sanstech',
      summary: 'Frontend Developer → Senior → Tech Lead. Iddaa, iki büyük geçiş, şirket içi bir AI ürünü.',
      Content: SanstechTr,
    },
    pargali: {
      title: 'Pargali Bilişim',
      summary: 'Konaklama ve turizm için bulut uygulamaları — isomorphic React, BFF ve PWA.',
      Content: PargaliTr,
    },
    simpra: {
      title: 'Simpra',
      summary: 'Check and Place üzerinde arayüz mimarisi — React, Redux, Storybook ve gerçek bir test düzeni.',
      Content: SimpraTr,
    },
    'mythology-tech': {
      title: 'Mythology Tech',
      summary: 'İlk iş — elle yürütülen bir sürecin yerini alan stok yönetim uygulaması.',
      Content: MythologyTechTr,
    },
    'fisle-cofounder': {
      title: 'Fisle',
      summary: "Türkiye'deki mali müşavirler için AI ile fiş okuma ve Luca aktarımı.",
      Content: FisleCofounderTr,
    },
    kodizim: {
      title: 'Kodizim',
      summary: "Bursa'da kurucu ortağı olduğum yazılım, tasarım ve teknoloji topluluğu.",
      Content: KodizimTr,
    },
    'tubitak-2209b': {
      title: 'TÜBİTAK 2209-B Araştırma Bursiyeri',
      summary: 'Desteklenen bir lisans araştırma projesi: metinden üretilen kumaş desenleri.',
      Content: Tubitak2209bTr,
    },
    'frontendship-weekly-ship-2': {
      title: 'Frontendship: Weekly Ship 2',
      summary: 'Açık kaynak katkı süreci — fork, PR ve upstream sync, canlı.',
      Content: FrontendshipWeeklyShip2Tr,
    },
    'istanbul-js-ai-nextjs': {
      title: 'İstanbul JavaScript Topluluğu',
      summary: 'Unlocking AI with Next.js — AI SDK, streaming, modern web.',
      Content: IstanbulJsAiNextjsTr,
    },
    'cypress-notlari': {
      title: 'Cypress Notları',
      summary: 'End-to-end testing üzerine kapsamlı Türkçe dokümantasyon.',
      Content: CypressNotlariTr,
    },
    'micro-frontend-egitimi': {
      title: 'Micro Frontend Eğitimi',
      summary: 'Micro frontend mimarisi üzerine interaktif eğitim platformu.',
      Content: MicroFrontendEgitimiTr,
    },
  },
};
