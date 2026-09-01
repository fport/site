import { getLocale } from 'next-intl/server';
import { Link } from '@/components/link';
import { getPosts } from '@/writing';

/**
 * The first few posts, for the homepage. Reads the same registry as /paper so
 * a new essay appears here on its own — the rest sit behind "see all".
 *
 * Classes mirror the `ul`/`li`/`a` overrides in mdx-components, so it is
 * indistinguishable from the hand-written lists around it.
 */
export async function RecentWriting({ limit = 3 }: { limit?: number }) {
  const locale = await getLocale();

  return (
    <ul className="text-foreground list-disc pl-5 space-y-1">
      {getPosts(locale)
        .slice(0, limit)
        .map((post) => (
          <li key={post.slug} className="pl-1">
            <Link
              href={`/paper/${post.slug}`}
              className="text-link hover:text-link-hover underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
