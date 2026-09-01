'use client';

import { Link } from '@/components/link';
import { usePathname } from '@/i18n/navigation';
import { site } from '@/site';

/**
 * The name in the header. On the homepage it is the page's `h1`; everywhere
 * else it is the way back home. Both carry `transition-element`, so the name
 * stays put through a view transition instead of fading out and back in.
 *
 * Hovering swaps the surname for the orange it means.
 */
export function SiteName() {
  const isHome = usePathname() === '/';

  const label = (
    <>
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true" className="group relative block overflow-hidden">
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
          {site.name}
        </span>
        <span className="absolute left-0 top-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
          Furkan 🍊
        </span>
      </span>
    </>
  );

  if (isHome) {
    return <h1 className="transition-element font-medium">{label}</h1>;
  }
  return (
    <Link href="/" className="transition-element block font-medium">
      {label}
    </Link>
  );
}
