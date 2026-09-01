'use client';

import { useTranslations } from 'next-intl';

type Props = {
  dirtyCount: number;
  copied: boolean;
  fileName: string;
  onCopy: () => void;
  onReset: () => void;
  onExit: () => void;
};

/**
 * Only rendered with `?edit=1`. It writes nothing to a server — layout changes
 * live in localStorage until you copy them into the repo.
 */
export function AuthorToolbar({ dirtyCount, copied, fileName, onCopy, onReset, onExit }: Props) {
  const t = useTranslations('garden.author');

  return (
    <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-card-border bg-card/90 px-1.5 py-1 text-[12px] backdrop-blur-md">
      <span className="px-2 text-muted">{t('status', { count: dirtyCount })}</span>
      <button
        type="button"
        onClick={onCopy}
        title={t('copyTitle', { file: fileName })}
        className="rounded-full px-2.5 py-1 transition-colors hover:bg-foreground/10"
      >
        {copied ? t('copied') : t('copy')}
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={dirtyCount === 0}
        className="rounded-full px-2.5 py-1 transition-colors hover:bg-foreground/10 disabled:opacity-40"
      >
        {t('reset')}
      </button>
      <button
        type="button"
        onClick={onExit}
        className="rounded-full px-2.5 py-1 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        {t('exit')}
      </button>
    </div>
  );
}
