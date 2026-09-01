'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Link } from '@/components/link';
import type { CanvasNote } from '@/garden/types';

/** Full-size overlay for reading one note without leaving the canvas. */
export function NoteReader({
  note,
  gardenPath,
  onClose,
}: {
  note: CanvasNote;
  gardenPath: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('garden');

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={note.title}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/70 p-4 backdrop-blur-sm sm:p-10"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        data-accent={note.accent}
        style={{ boxShadow: 'var(--card-shadow)' }}
        className="my-auto w-full max-w-[68ch] overflow-hidden rounded-xl border border-card-border bg-card"
      >
        <header
          className={`flex items-start gap-3 border-b px-5 py-3 ${
            note.accent
              ? 'border-black/5 bg-[color:var(--accent)] dark:border-white/5'
              : 'border-card-border'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              {t(`kind.${note.kind}`)} · {t(`status.${note.status}`)} · {note.updated}
            </p>
            <h2 className="mt-0.5 text-lg font-medium leading-tight">{note.title}</h2>
          </div>
          <Link
            href={`${gardenPath}/${note.slug}`}
            className="shrink-0 text-[12px] text-muted underline transition-colors hover:text-foreground"
          >
            {t('reader.permalink')}
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('reader.close')}
            className="shrink-0 rounded p-1 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className="garden-prose px-5 py-4 !text-[15px]">{note.body}</div>
        {note.tags?.length ? (
          <footer className="border-t border-card-border px-5 py-2 text-[11px] text-muted">
            {note.tags.map((tag) => `#${tag}`).join('  ')}
          </footer>
        ) : null}
      </article>
    </div>
  );
}
