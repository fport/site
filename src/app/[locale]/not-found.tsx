import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import { SiteShell } from '@/components/site-shell';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <SiteShell>
      <header>
        <h1 className="text-2xl font-medium leading-tight">{t('title')}</h1>
        <p className="mt-2 leading-snug text-muted">{t('body')}</p>
      </header>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-link underline hover:text-link-hover">
          {t('home')}
        </Link>
      </p>
    </SiteShell>
  );
}
