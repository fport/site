import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PaperHeader } from '@/components/paper-header';
import { localizedPath } from '@/i18n/paths';
import { openGraphLocale, pageAlternates } from '@/i18n/seo';
import { site } from '@/site';
import { getPost, postSlugs } from '@/writing';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const path = `/paper/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: pageAlternates(path, locale),
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.summary,
      url: localizedPath(path, locale),
      type: 'article',
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [site.url],
      ...openGraphLocale(locale),
    },
  };
}

/**
 * One route for every essay: the body is the MDX registered for this slug in
 * `writing.ts`, in the reader's language — or English when the translation
 * does not exist yet.
 */
export default async function PaperPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();

  const { Content } = post;

  return (
    <>
      <PaperHeader post={post} />
      <Content />
    </>
  );
}
