'use client';

import { Link } from 'next-view-transitions';
import type { CanvasNote, NoteKind, NoteStatus } from '@/garden/types';

const KIND_LABEL: Record<NoteKind, string> = {
  note: 'note',
  schema: 'schema',
  experiment: 'experiment',
  snippet: 'snippet',
  'open-question': 'open question',
  talk: 'talk',
  resource: 'resource',
};

const STATUS_GLYPH: Record<NoteStatus, string> = {
  seed: '◌',
  growing: '◐',
  evergreen: '●',
};

/** Deterministic ±0.5° tilt so the board looks placed by hand, not by a grid. */
function tilt(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return ((hash % 100) / 100 - 0.5) * 1.1;
}

type Props = {
  note: CanvasNote;
  gardenPath: string;
  mode: 'canvas' | 'list';
  editing?: boolean;
  active?: boolean;
  dimmed?: boolean;
  onOpen: (slug: string) => void;
  onDragStart?: (event: React.PointerEvent, slug: string) => void;
  onResizeStart?: (event: React.PointerEvent, slug: string) => void;
};

export function NoteCard({
  note,
  gardenPath,
  mode,
  editing = false,
  active = false,
  dimmed = false,
  onOpen,
  onDragStart,
  onResizeStart,
}: Props) {
  const isCanvas = mode === 'canvas';

  return (
    <article
      id={isCanvas ? `note-${note.slug}` : undefined}
      data-accent={note.accent}
      data-note-card=""
      style={
        isCanvas
          ? {
              left: note.x,
              top: note.y,
              width: note.w,
              height: note.h,
              transform: `rotate(${tilt(note.slug)}deg)`,
              boxShadow: 'var(--card-shadow)',
            }
          : undefined
      }
      className={[
        'flex flex-col overflow-hidden rounded-lg border bg-card',
        isCanvas ? 'absolute' : 'relative w-full',
        active ? 'border-foreground/40 ring-1 ring-foreground/20' : 'border-card-border',
        dimmed ? 'opacity-25' : 'opacity-100',
        'transition-[opacity,border-color] duration-200',
      ].join(' ')}
    >
      <header
        onPointerDown={editing && onDragStart ? (event) => onDragStart(event, note.slug) : undefined}
        className={[
          'flex shrink-0 items-start gap-2 border-b px-3 py-2',
          note.accent ? 'border-black/5 bg-[color:var(--accent)] dark:border-white/5' : 'border-card-border',
          editing ? 'cursor-grab active:cursor-grabbing' : '',
        ].join(' ')}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
            <span title={note.status}>{STATUS_GLYPH[note.status]}</span>
            <span>{KIND_LABEL[note.kind]}</span>
          </div>
          <h2 className="mt-0.5 truncate text-[14px] font-medium leading-snug" title={note.title}>
            {note.title}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => onOpen(note.slug)}
            aria-label={`Open ${note.title}`}
            title="Open full size"
            className="rounded p-1 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M9.5 2h4.5v4.5M14 2 9 7M6.5 14H2V9.5M2 14l5-5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href={`${gardenPath}/${note.slug}`}
            aria-label={`Permalink to ${note.title}`}
            title="Permalink"
            className="rounded p-1 text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6.7 9.3a2.6 2.6 0 0 0 3.9.3l2-2a2.6 2.6 0 0 0-3.7-3.7l-1.1 1.1M9.3 6.7a2.6 2.6 0 0 0-3.9-.3l-2 2a2.6 2.6 0 0 0 3.7 3.7l1.1-1.1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </header>

      <div
        data-note-scroll=""
        className={[
          'garden-prose min-h-0 flex-1 px-3 py-2.5',
          isCanvas ? 'overflow-y-auto overscroll-contain' : '',
        ].join(' ')}
      >
        {note.body}
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-card-border px-3 py-1.5 text-[10.5px] text-muted">
        <div className="flex min-w-0 gap-1.5 truncate">
          {note.tags?.map((tag) => (
            <span key={tag} className="truncate">
              #{tag}
            </span>
          ))}
        </div>
        <time dateTime={note.updated} className="shrink-0 tabular-nums">
          {note.updated}
        </time>
      </footer>

      {editing && isCanvas && onResizeStart ? (
        <button
          type="button"
          aria-label={`Resize ${note.title}`}
          onPointerDown={(event) => onResizeStart(event, note.slug)}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize rounded-tl border-l border-t border-card-border bg-card"
        />
      ) : null}
    </article>
  );
}
