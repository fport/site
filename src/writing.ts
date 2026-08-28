/**
 * The long-form posts under `/paper`. Gardens are for atomic, non-linear
 * notes; these are essays that are meant to be read start to finish, so they
 * stay ordinary pages. This registry only drives the `/paper` index.
 *
 * Dates come from git history — `published` is when the file first landed.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  published: string;
  updated?: string;
};

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** Newest first. */
export const posts: Post[] = [
  {
    slug: 'fisle',
    title: 'Building Fisle on the Side',
    summary:
      'A side project that turns receipts into Luca-ready accounting entries for Turkish accountants.',
    published: '2026-05-26',
  },
  {
    slug: 'ai-learning',
    title: 'My Journey in Generative AI',
    summary:
      'From NLP and CNNs to transformers, fine-tuning and RAG — how the ground kept moving.',
    published: '2025-01-18',
    updated: '2026-01-16',
  },
];
