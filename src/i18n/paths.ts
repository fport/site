import type { Locale } from 'next-intl';
import { site } from '@/site';
import { routing } from './routing';

/**
 * `/paper` → `/paper` for English, `/tr/paper` for Turkish. Deliberately a
 * few lines of string handling rather than a call into next-intl: this runs
 * in the sitemap and JSON-LD too, outside any request, and there is nothing
 * to configure beyond "prefix everything but the default".
 */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path: string, locale: Locale): string {
  return `${site.url}${localizedPath(path, locale)}`;
}
