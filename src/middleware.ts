import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything but Next internals, files with an extension (sitemap.xml,
  // robots.txt, llms.txt …) and the generated icon / Open Graph images, which
  // already carry their locale in the path.
  matcher: ['/((?!api|_next|_vercel|icon|apple-icon|.*opengraph-image|.*\\..*).*)'],
};
