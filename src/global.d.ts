import type { routing } from '@/i18n/routing';
import type messages from '../messages/en.json';

/** Typed `Locale`, message keys and `t()` arguments across next-intl. */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
