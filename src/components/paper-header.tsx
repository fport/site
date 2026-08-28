import { Link } from 'next-view-transitions';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { getPost } from '@/writing';

/**
 * The header every `/paper` article opens with: a way back to the index, the
 * title, and the dates. Title and summary come from the post registry, so the
 * article and the index can never drift apart.
 *
 * Matches the header on `/paper` and the garden pages — MDX `#` headings are
 * reset to body size by preflight, which is why the title is set explicitly.
 */
export function PaperHeader({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;

  return (
    <header className="fade-in pt-12 mb-10">
      <ArticleJsonLd
        title={post.title}
        description={post.summary}
        path={`/paper/${post.slug}`}
        published={post.published}
        updated={post.updated}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/paper' },
          { name: post.title, path: `/paper/${post.slug}` },
        ]}
      />

      <nav className="text-sm">
        <Link href="/paper" className="text-muted underline hover:text-foreground">
          ← Writing
        </Link>
      </nav>

      <h1 className="mt-6 text-2xl font-medium leading-tight">{post.title}</h1>
      <p className="mt-2 leading-snug text-muted">{post.summary}</p>
      <p className="mt-3 text-sm text-muted">
        <time dateTime={post.published}>{post.published}</time>
        {post.updated ? <> · updated {post.updated}</> : null}
      </p>
    </header>
  );
}
