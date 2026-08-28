import type { MDXContent } from 'mdx/types';

/** Post-it colours. Resolved to CSS variables through `data-accent`. */
export type NoteAccent = 'amber' | 'lime' | 'sky' | 'rose' | 'violet' | 'slate';

/** How ripe a note is. Borrowed from the digital-garden convention. */
export type NoteStatus = 'seed' | 'growing' | 'evergreen';

/** What the note *is*, so the canvas can badge it at a glance. */
export type NoteKind =
  | 'note'
  | 'schema'
  | 'experiment'
  | 'snippet'
  | 'open-question'
  | 'talk'
  | 'resource';

/** Where a card sits on the infinite plane, in world units. */
export type NoteFrame = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/** A named region drawn behind the cards that belong to it. */
export type GardenCluster = {
  id: string;
  label: string;
  accent?: NoteAccent;
};

/** Everything about a note except where it sits and what it renders to. */
export type NoteMeta = {
  slug: string;
  title: string;
  /** One line. Shown in the index panel and used as the page description. */
  summary: string;
  kind: NoteKind;
  status: NoteStatus;
  /** ISO date, e.g. '2026-08-28'. */
  updated: string;
  cluster?: string;
  tags?: string[];
  accent?: NoteAccent;
  /** Slugs this note points at. Drawn as arrows on the canvas. */
  links?: string[];
};

/** Authored form: metadata plus the compiled MDX body. */
export type GardenNote = NoteMeta & {
  Content: MDXContent;
};

/** Metadata plus frame — everything the client canvas needs, minus the body. */
export type PlacedNote = NoteMeta & NoteFrame;

/**
 * What actually crosses the server/client boundary. `body` is a
 * server-rendered React element, so note MDX never ships as client JS.
 */
export type CanvasNote = PlacedNote & {
  body: React.ReactNode;
};

export type Garden = {
  id: string;
  /** Route this garden lives at, e.g. '/ai-garden'. */
  path: string;
  title: string;
  tagline: string;
  description: string;
  clusters: GardenCluster[];
  notes: GardenNote[];
  frames: Record<string, NoteFrame>;
  /**
   * Zoom to open at, instead of fitting the whole board. A wide board fits at
   * a scale too small to read, so a garden can opt out and let the reader pan.
   */
  initialZoom?: number;
};

/** Fallback frame for a note that has not been placed yet. */
export const DEFAULT_FRAME: NoteFrame = { x: 0, y: 0, w: 380, h: 300 };

export function placeNotes(garden: Garden): (GardenNote & NoteFrame)[] {
  return garden.notes.map((note, index) => {
    const frame = garden.frames[note.slug];
    if (frame) return { ...note, ...frame };
    // Unplaced notes queue up in a column to the right so they are never lost.
    return {
      ...note,
      ...DEFAULT_FRAME,
      x: 1600,
      y: index * (DEFAULT_FRAME.h + 40),
    };
  });
}

export function findNote(garden: Garden, slug: string) {
  return placeNotes(garden).find((note) => note.slug === slug);
}
