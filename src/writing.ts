import type { MDXContent } from 'mdx/types';
import type { Locale } from 'next-intl';
import AiLearning from '@/content/paper/ai-learning.mdx';
import FabricGan from '@/content/paper/fabric-gan.mdx';
import FanteziKaptan from '@/content/paper/fantezi-kaptan.mdx';
import Fisle from '@/content/paper/fisle.mdx';
import GemmaFinetune from '@/content/paper/gemma-finetune.mdx';
import { postsTr } from './writing.tr';

/**
 * The long-form posts under `/paper`. Gardens are for atomic, non-linear
 * notes; these are essays that are meant to be read start to finish.
 *
 * English is the source of truth and lives in `src/content/paper/<slug>.mdx`.
 * A Turkish version sits next to it as `<slug>.tr.mdx` and is registered in
 * `writing.tr.ts`; anything a translation leaves out falls back to English,
 * so a half-translated post still renders whole.
 *
 * Dates come from git history — `published` is when the file first landed.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  published: string;
  updated?: string;
  Content: MDXContent;
};

/** What a translation may override. Everything else is shared. */
export type PostTranslation = Partial<Pick<Post, 'title' | 'summary' | 'Content'>>;

const translations: Record<Locale, Record<string, PostTranslation>> = {
  en: {},
  tr: postsTr,
};

/**
 * Order is deliberate, not chronological — this is also the order the homepage
 * takes its first three from, so the most worth reading sits at the top.
 */
const posts: Post[] = [
  {
    slug: 'gemma-finetune',
    title: 'The Fine-Tune That Made the Model Worse',
    summary:
      'LoRA on Gemma 3 4B with Turkish Alpaca. The pipeline worked and the model still got worse — which I only know because I measured it first.',
    published: '2026-08-24',
    Content: GemmaFinetune,
  },
  {
    slug: 'fantezi-kaptan',
    title: 'Fantezi Kaptan: Modelling the TFF Fantasy League',
    summary:
      'Eight seasons of Süper Lig, my own xG model, an xPts model and an ILP squad optimiser — with the baselines deciding what counted as working.',
    published: '2026-08-18',
    Content: FanteziKaptan,
  },
  {
    slug: 'ai-learning',
    title: 'My Journey in Generative AI',
    summary: 'From NLP and CNNs to transformers, fine-tuning and RAG — how the ground kept moving.',
    published: '2025-01-18',
    updated: '2026-01-16',
    Content: AiLearning,
  },
  {
    slug: 'fisle',
    title: 'Building Fisle on the Side',
    summary:
      'A side project that turns receipts into Luca-ready accounting entries for Turkish accountants.',
    published: '2026-05-26',
    Content: Fisle,
  },
  {
    slug: 'fabric-gan',
    title: 'Generating Fabric Patterns from Text, in 2021',
    summary:
      'A TÜBİTAK undergraduate research project: describe a textile pattern in words, get an original one back. Text-to-image before text-to-image was a product.',
    // The work, not the write-up — `updated` is when this was written down.
    published: '2021-03-09',
    updated: '2026-08-28',
    Content: FabricGan,
  },
];

/** Copies only the fields a translation actually provides. */
function localize(post: Post, translation: PostTranslation | undefined): Post {
  if (!translation) return post;
  return {
    ...post,
    title: translation.title ?? post.title,
    summary: translation.summary ?? post.summary,
    Content: translation.Content ?? post.Content,
  };
}

export function getPosts(locale: Locale): Post[] {
  return posts.map((post) => localize(post, translations[locale][post.slug]));
}

export function getPost(slug: string, locale: Locale): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug);
}

/** Slugs only — for `generateStaticParams`, where the language is irrelevant. */
export const postSlugs = posts.map((post) => post.slug);
