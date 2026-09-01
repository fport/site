'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LOCALE_LABEL } from '@/i18n/seo';

/**
 * "This page, in the other language." Slugs are shared across locales, so the
 * unprefixed pathname is enough to build the target — no lookup needed. The
 * link is a full navigation on purpose (see `Link`).
 */
export function LanguageSwitcher({
  className = 'text-muted hover:text-foreground underline transition-colors',
}: {
  /** Applied to each language link; the header and the canvas toolbar differ. */
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('language');

  return (
    <nav aria-label={t('label')} className="flex gap-x-3">
      {routing.locales
        .filter((other) => other !== locale)
        .map((other) => (
          <Link key={other} href={pathname} locale={other} lang={other} className={className}>
            {LOCALE_LABEL[other]}
          </Link>
        ))}
    </nav>
  );
}
