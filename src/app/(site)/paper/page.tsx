import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { posts } from '@/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form posts — side projects, stacks and what I learned building them.',
  alternates: { canonical: '/paper' },
};

export default function WritingIndexPage() {
  return (
    <article>
      <nav className="pt-12 text-sm">
        <Link href="/" className="text-muted underline hover:text-foreground">
          ← Furkan Portakal
        </Link>
      </nav>

      <header className="mt-6">
        <h1 className="text-2xl font-medium leading-tight">Writing</h1>
        <p className="mt-2 leading-snug text-muted">
          Longer pieces, meant to be read start to finish. The half-finished thinking lives in the{' '}
          <Link href="/garden" className="text-link underline hover:text-link-hover">
            garden
          </Link>{' '}
          instead.
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/paper/${post.slug}`} className="group block">
              <h2 className="font-medium text-link underline group-hover:text-link-hover">
                {post.title}
              </h2>
              <p className="mt-1 leading-snug text-muted">{post.summary}</p>
            </Link>
            <p className="mt-1.5 text-sm text-muted">
              <time dateTime={post.published}>{post.published}</time>
              {post.updated ? <> · updated {post.updated}</> : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
