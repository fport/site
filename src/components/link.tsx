'use client';

import { useLocale, type Locale } from 'next-intl';
import { Link as TransitionLink } from 'next-view-transitions';
import type { ComponentProps } from 'react';
import { localizedPath } from '@/i18n/paths';

type Props = Omit<ComponentProps<typeof TransitionLink>, 'href' | 'locale'> & {
  href: string;
  /** Link into another language. Only the language switcher sets this. */
  locale?: Locale;
};

/**
 * The one `Link` for internal navigation: it prefixes the href with the
 * current locale (`/paper` → `/tr/paper` on the Turkish site) and keeps the
 * view transitions from `next-view-transitions`. External and same-page
 * (`#…`) hrefs pass through untouched.
 */
export function Link({ href, locale, ...props }: Props) {
  const current = useLocale();
  const target = locale ?? current;
  const localized = href.startsWith('/') ? localizedPath(href, target) : href;

  if (locale && locale !== current) {
    // Crossing into the other language swaps the `[locale]` segment, which
    // remounts the root layout — and with it the view-transition provider.
    // The transition started for that click can then never be finished, and
    // the browser keeps the old page on screen until it gives up (Chrome:
    // four seconds; others: until a reload). The same happens on back/forward
    // across locales. A plain document navigation sidesteps all of it, and a
    // fresh load is the right thing for a language switch anyway: <html lang>,
    // fonts and every client-side string start clean.
    // Router-only props mean nothing on a plain anchor.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { prefetch, replace, scroll, ...anchor } = props;
    return <a href={localized} hrefLang={locale} {...anchor} />;
  }

  return <TransitionLink href={localized} {...props} />;
}
