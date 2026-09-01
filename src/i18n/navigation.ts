import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware versions of the Next.js navigation APIs. `usePathname` here
 * returns the path *without* the locale prefix, which is what the language
 * switcher needs to point at "this page, in the other language".
 *
 * Internal links use `@/components/link` instead of the `Link` exported here,
 * so they keep the view transitions the site already had.
 */
export const { redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
