import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { localizedPath } from './paths';
import { routing } from './routing';

/** Open Graph wants the territory form, not the bare language tag. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
};

/** Human-readable language names, in their own language. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
};

/**
 * `hreflang` map for one page: every locale plus `x-default`, which points at
 * the English page since that is where an unprefixed URL lands.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedPath(path, locale)]),
  );
  return { ...languages, 'x-default': localizedPath(path, routing.defaultLocale) };
}

/**
 * The `alternates` block every page sets. Next.js does not merge nested
 * metadata between a layout and its pages, so each page passes its own path.
 */
export function pageAlternates(path: string, locale: Locale): Metadata['alternates'] {
  return {
    canonical: localizedPath(path, locale),
    languages: languageAlternates(path),
  };
}

export function openGraphLocale(locale: Locale) {
  return {
    locale: OG_LOCALE[locale],
    alternateLocale: routing.locales
      .filter((other) => other !== locale)
      .map((other) => OG_LOCALE[other]),
  };
}
