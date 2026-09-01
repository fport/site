import { defineRouting } from 'next-intl/routing';

/**
 * The two languages the site is written in. English is the default and stays
 * at the bare path (`/paper`), Turkish is prefixed (`/tr/paper`) — so every
 * URL that was indexed before i18n keeps working unchanged.
 *
 * Detection is off on purpose: the language is the URL and nothing else. With
 * next-intl's defaults a Turkish browser opening `/` was bounced to `/tr`, and
 * the `NEXT_LOCALE` cookie set on that visit then kept bouncing `/paper` back
 * to `/tr/paper` — which made the "English" link in the footer look broken.
 * Now `/` is English for everyone; `/tr` is Turkish for whoever asks for it.
 */
export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
});

export type AppLocale = (typeof routing.locales)[number];
