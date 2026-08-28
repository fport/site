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

/**
 * Order is deliberate, not chronological — this is also the order the homepage
 * takes its first three from, so the most worth reading sits at the top.
 */
export const posts: Post[] = [
  {
    slug: 'gemma-finetune',
    title: 'The Fine-Tune That Made the Model Worse',
    summary:
      'LoRA on Gemma 3 4B with Turkish Alpaca. The pipeline worked and the model still got worse — which I only know because I measured it first.',
    published: '2026-08-24',
  },
  {
    slug: 'fantezi-kaptan',
    title: 'Fantezi Kaptan: Modelling the TFF Fantasy League',
    summary:
      'Eight seasons of Süper Lig, my own xG model, an xPts model and an ILP squad optimiser — with the baselines deciding what counted as working.',
    published: '2026-08-18',
  },
  {
    slug: 'ai-learning',
    title: 'My Journey in Generative AI',
    summary:
      'From NLP and CNNs to transformers, fine-tuning and RAG — how the ground kept moving.',
    published: '2025-01-18',
    updated: '2026-01-16',
  },
  {
    slug: 'fisle',
    title: 'Building Fisle on the Side',
    summary:
      'A side project that turns receipts into Luca-ready accounting entries for Turkish accountants.',
    published: '2026-05-26',
  },
];
