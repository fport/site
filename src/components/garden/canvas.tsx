'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import type { CanvasNote, GardenCluster, NoteFrame } from '@/garden/types';
import { AuthorToolbar } from './author-toolbar';
import { CanvasToolbar, type LaserMode, type Tool } from './canvas-toolbar';
import { LaserLayer, type LaserHandle } from './laser-layer';
import { ClusterRegions } from './cluster-regions';
import { Edges } from './edges';
import { GardenIndex } from './garden-index';
import { NoteCard } from './note-card';
import { NoteReader } from './note-reader';
import {
  clampZoom,
  fitViewport,
  useViewport,
  type Bounds,
  type Inset,
  type Viewport,
} from './use-viewport';

const SNAP = 8;
const MIN_CARD = { w: 220, h: 160 };

/** Wheel tuning. A mouse notch is ~120px, a trackpad nudge ~2px. */
const LINE_HEIGHT = 16;
const PAGE_HEIGHT = 400;
const MAX_WHEEL_STEP = 50;
const ZOOM_SENSITIVITY = 0.0035;
/** Step used by the +/- buttons and keys. */
const ZOOM_STEP = 1.25;
/** Space the floating chrome takes, so "fit" never parks a card underneath it. */
const TOOLBAR_HEIGHT = 56;
const CONTROLS_HEIGHT = 56;
const DRAWER_WIDTH = 280;

export type GardenMeta = {
  id: string;
  path: string;
  title: string;
  tagline: string;
  clusters: GardenCluster[];
  initialZoom?: number;
};

type Interaction =
  | { mode: 'idle' }
  | { mode: 'pan'; startX: number; startY: number; origin: Viewport }
  | { mode: 'laser' }
  | { mode: 'move'; slug: string; startX: number; startY: number; frame: NoteFrame }
  | { mode: 'resize'; slug: string; startX: number; startY: number; frame: NoteFrame }
  | {
      mode: 'pinch';
      startDistance: number;
      startMid: { x: number; y: number };
      origin: Viewport;
    };

const snap = (value: number, enabled: boolean) =>
  enabled ? Math.round(value / SNAP) * SNAP : Math.round(value);

function boundsOf(frames: NoteFrame[]): Bounds {
  return {
    minX: Math.min(...frames.map((f) => f.x)),
    minY: Math.min(...frames.map((f) => f.y)),
    maxX: Math.max(...frames.map((f) => f.x + f.w)),
    maxY: Math.max(...frames.map((f) => f.y + f.h)),
  };
}

function matchesQuery(note: CanvasNote, query: string) {
  if (!query.trim()) return true;
  const haystack = [note.title, note.summary, note.cluster ?? '', ...(note.tags ?? [])]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/** Turns the current frames back into the contents of `src/garden/<id>.layout.ts`. */
function layoutSource(gardenId: string, order: string[], frames: Record<string, NoteFrame>) {
  const exportName = `${gardenId.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}Layout`;
  const entries = order
    .map((slug) => {
      const f = frames[slug];
      return `  '${slug}': { x: ${Math.round(f.x)}, y: ${Math.round(f.y)}, w: ${Math.round(
        f.w,
      )}, h: ${Math.round(f.h)} },`;
    })
    .join('\n');

  return `import type { NoteFrame } from './types';

/**
 * Card placement for the ${gardenId} garden, in world units.
 *
 * This file is generated: open \`${`/garden/${gardenId}?edit=1`}\`, drag and resize the cards,
 * press "Copy layout", and paste the result over this file. Nothing else in
 * the app reads these numbers, so it is always safe to overwrite wholesale.
 */
export const ${exportName}: Record<string, NoteFrame> = {
${entries}
};
`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

export function GardenCanvas({ garden, notes }: { garden: GardenMeta; notes: CanvasNote[] }) {
  const initialFrames = useMemo(
    () =>
      Object.fromEntries(
        notes.map((note) => [note.slug, { x: note.x, y: note.y, w: note.w, h: note.h }]),
      ) as Record<string, NoteFrame>,
    [notes],
  );

  const [frames, setFrames] = useState<Record<string, NoteFrame>>(initialFrames);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState('');
  const t = useTranslations('garden');
  const [indexOpen, setIndexOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tool, setTool] = useState<Tool>('pan');
  const [laserMode, setLaserMode] = useState<LaserMode>('trail');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const surfaceRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<LaserHandle>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const interaction = useRef<Interaction>({ mode: 'idle' });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const fitted = useRef(false);

  const { viewport, set, animateTo, zoomAt } = useViewport();
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;
  const framesRef = useRef(frames);
  framesRef.current = frames;

  const placed = useMemo(
    () => notes.map((note) => ({ ...note, ...frames[note.slug] })),
    [notes, frames],
  );

  const matches = useMemo(
    () => new Set(placed.filter((note) => matchesQuery(note, query)).map((note) => note.slug)),
    [placed, query],
  );

  const dirtyCount = useMemo(
    () =>
      Object.keys(frames).filter((slug) => {
        const a = frames[slug];
        const b = initialFrames[slug];
        return a.x !== b.x || a.y !== b.y || a.w !== b.w || a.h !== b.h;
      }).length,
    [frames, initialFrames],
  );

  const storageKey = `garden:${garden.id}:frames`;

  /* ---------------------------------------------------------------- author */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;
    setEditing(true);
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, NoteFrame>;
        setFrames((previous) => {
          const next = { ...previous };
          // Drafts can outlive a note. Only restore slugs that still exist.
          for (const slug of Object.keys(next)) {
            if (parsed[slug]) next[slug] = parsed[slug];
          }
          return next;
        });
      }
    } catch {
      // A malformed draft should never block the canvas.
    }
  }, [storageKey]);

  useEffect(() => {
    if (!editing) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(frames));
    } catch {
      // Private mode, quota — the copy button still works.
    }
  }, [editing, frames, storageKey]);

  /* -------------------------------------------------------------- viewport */

  const indexOpenRef = useRef(indexOpen);
  indexOpenRef.current = indexOpen;

  // The toolbar always floats over the top; the note drawer only covers the
  // left when it is open. "fit" has to keep clear of whatever is showing.
  const fitInset = useCallback(
    (): Inset => ({
      top: TOOLBAR_HEIGHT,
      bottom: CONTROLS_HEIGHT,
      left: indexOpenRef.current ? DRAWER_WIDTH : 0,
    }),
    [],
  );

  const fitAll = useCallback(() => {
    const element = surfaceRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    animateTo(fitViewport(boundsOf(Object.values(framesRef.current)), rect, 48, 1, fitInset()));
  }, [animateTo, fitInset]);

  const flyTo = useCallback(
    (slug: string) => {
      const element = surfaceRef.current;
      const frame = framesRef.current[slug];
      if (!element || !frame) return;
      const rect = element.getBoundingClientRect();
      if (rect.width === 0) return;
      const z = clampZoom(
        Math.min((rect.width * 0.62) / frame.w, (rect.height * 0.82) / frame.h, 1.15),
      );
      animateTo({
        z,
        x: rect.width / 2 - (frame.x + frame.w / 2) * z + (indexOpen ? DRAWER_WIDTH / 2 : 0),
        y: rect.height / 2 - (frame.y + frame.h / 2) * z,
      });
      setActiveSlug(slug);
    },
    [animateTo, indexOpen],
  );

  // Fit once the surface actually has a size — it starts at zero while the
  // list view is the visible one, and on orientation changes.
  useEffect(() => {
    const element = surfaceRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (fitted.current) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;
      fitted.current = true;
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      if (hash && framesRef.current[hash]) {
        flyTo(hash);
      } else {
        const bounds = boundsOf(Object.values(framesRef.current));
        const inset = fitInset();
        const fit = fitViewport(bounds, { width, height }, 48, 1, inset);
        // Opening at `initialZoom` only makes sense when it is closer than the
        // fit — otherwise the board would open zoomed out from its own edges.
        // Anchor at the top-left of the content rather than centring, so the
        // first column lands where the reader starts looking.
        if (garden.initialZoom && garden.initialZoom > fit.z) {
          const z = clampZoom(garden.initialZoom);
          animateTo(
            {
              z,
              x: (inset.left ?? 0) + 48 - bounds.minX * z,
              y: (inset.top ?? 0) + 48 - bounds.minY * z,
            },
            0,
          );
        } else {
          animateTo(fit, 0);
        }
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [animateTo, flyTo, fitInset, garden.initialZoom]);

  /* ------------------------------------------------------------ wheel/zoom */

  useEffect(() => {
    const element = surfaceRef.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-canvas-chrome]')) return;

      // Browsers report wheel deltas in pixels, lines or pages, and a mouse
      // wheel sends ~120px where a trackpad sends ~2. Normalise to pixels and
      // cap a single event so one notch cannot slam into the zoom limits.
      const unit = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? PAGE_HEIGHT : 1;
      const deltaY = event.deltaY * unit;
      const deltaX = event.deltaX * unit;

      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const step = Math.max(-MAX_WHEEL_STEP, Math.min(MAX_WHEEL_STEP, deltaY));
        zoomAt(
          Math.exp(-step * ZOOM_SENSITIVITY),
          event.clientX,
          event.clientY,
          element.getBoundingClientRect(),
        );
        return;
      }

      // Scrolling over a note reads the note; only once it bottoms out does
      // the gesture fall through to panning the board.
      const scroller = target?.closest('[data-note-scroll]') as HTMLElement | null;
      if (scroller && scroller.scrollHeight > scroller.clientHeight + 1) {
        const goingDown = event.deltaY > 0;
        const atTop = scroller.scrollTop <= 0;
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if (!((goingDown && atBottom) || (!goingDown && atTop))) return;
      }

      event.preventDefault();
      set((previous) => ({
        ...previous,
        x: previous.x - deltaX,
        y: previous.y - deltaY,
      }));
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
  }, [set, zoomAt]);

  /* --------------------------------------------------------------- pointer */

  const beginPan = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-canvas-chrome]')) return;
    // Let the card's own controls win, and in author mode let the header drag.
    if (target.closest('a, button, input')) return;
    if (editing && target.closest('[data-note-card]')) return;

    if (tool === 'laser') {
      const rect = surfaceRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // A tap marks the spot in either mode; only `trail` keeps drawing as the
      // pointer moves, which is what the drag mode is for.
      laserRef.current?.ping(x, y);
      if (laserMode === 'trail') {
        laserRef.current?.draw(x, y);
        interaction.current = { mode: 'laser' };
      }
      return;
    }

    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      interaction.current = {
        mode: 'pinch',
        startDistance: Math.hypot(b.x - a.x, b.y - a.y) || 1,
        startMid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        origin: viewportRef.current,
      };
      return;
    }
    interaction.current = {
      mode: 'pan',
      startX: event.clientX,
      startY: event.clientY,
      origin: viewportRef.current,
    };
    setActiveSlug(null);
  };

  const beginMove = (event: React.PointerEvent, slug: string) => {
    event.preventDefault();
    event.stopPropagation();
    interaction.current = {
      mode: 'move',
      slug,
      startX: event.clientX,
      startY: event.clientY,
      frame: framesRef.current[slug],
    };
    setActiveSlug(slug);
  };

  const beginResize = (event: React.PointerEvent, slug: string) => {
    event.preventDefault();
    event.stopPropagation();
    interaction.current = {
      mode: 'resize',
      slug,
      startX: event.clientX,
      startY: event.clientY,
      frame: framesRef.current[slug],
    };
    setActiveSlug(slug);
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const state = interaction.current;
      if (state.mode === 'idle') return;

      if (pointers.current.has(event.pointerId)) {
        pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (state.mode === 'pinch') {
        const [a, b] = [...pointers.current.values()];
        if (!a || !b) return;
        const distance = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const z = clampZoom(state.origin.z * (distance / state.startDistance));
        const scale = z / state.origin.z;
        set({
          z,
          x: mid.x - (state.startMid.x - state.origin.x) * scale,
          y: mid.y - (state.startMid.y - state.origin.y) * scale,
        });
        return;
      }

      if (state.mode === 'laser') {
        const rect = surfaceRef.current?.getBoundingClientRect();
        if (!rect) return;
        laserRef.current?.draw(event.clientX - rect.left, event.clientY - rect.top);
        return;
      }

      if (state.mode === 'pan') {
        set({
          z: state.origin.z,
          x: state.origin.x + (event.clientX - state.startX),
          y: state.origin.y + (event.clientY - state.startY),
        });
        return;
      }

      const z = viewportRef.current.z;
      const dx = (event.clientX - state.startX) / z;
      const dy = (event.clientY - state.startY) / z;
      const free = event.shiftKey;

      if (state.mode === 'move') {
        setFrames((previous) => ({
          ...previous,
          [state.slug]: {
            ...previous[state.slug],
            x: snap(state.frame.x + dx, !free),
            y: snap(state.frame.y + dy, !free),
          },
        }));
        return;
      }

      setFrames((previous) => ({
        ...previous,
        [state.slug]: {
          ...previous[state.slug],
          w: Math.max(MIN_CARD.w, snap(state.frame.w + dx, !free)),
          h: Math.max(MIN_CARD.h, snap(state.frame.h + dy, !free)),
        },
      }));
    };

    const onUp = (event: PointerEvent) => {
      pointers.current.delete(event.pointerId);
      if (pointers.current.size < 2) interaction.current = { mode: 'idle' };
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [set]);

  /* -------------------------------------------------------------- keyboard */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

      if (event.key === '/' && !typing) {
        event.preventDefault();
        setMenuOpen(false);
        setIndexOpen(true);
        // The input mounts with the panel, so it cannot be focused until the
        // state change has painted.
        requestAnimationFrame(() => searchRef.current?.focus());
        return;
      }
      if (typing) {
        if (event.key === 'Escape') (target as HTMLInputElement).blur();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const element = surfaceRef.current;
      if (event.key === 'v' || event.key === 'V') {
        setTool('pan');
        return;
      }
      if (event.key === 'l' || event.key === 'L') {
        setTool('laser');
        return;
      }
      if (event.key === '0') {
        event.preventDefault();
        fitAll();
      } else if ((event.key === '+' || event.key === '=') && element) {
        const rect = element.getBoundingClientRect();
        zoomAt(ZOOM_STEP, rect.left + rect.width / 2, rect.top + rect.height / 2, rect);
      } else if (event.key === '-' && element) {
        const rect = element.getBoundingClientRect();
        zoomAt(1 / ZOOM_STEP, rect.left + rect.width / 2, rect.top + rect.height / 2, rect);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fitAll, zoomAt]);

  /* ----------------------------------------------------------------- chrome */

  const onCopyLayout = async () => {
    const source = layoutSource(
      garden.id,
      notes.map((note) => note.slug),
      frames,
    );
    const ok = await copyText(source);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const onResetLayout = () => {
    setFrames(initialFrames);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Nothing to clean up.
    }
  };

  const openNote = placed.find((note) => note.slug === openSlug) ?? null;

  useEffect(() => {
    if (tool !== 'laser') laserRef.current?.clear();
  }, [tool]);

  /** Zoom about the centre of the surface — what the toolbar buttons mean. */
  const zoomCentre = useCallback(
    (factor: number) => {
      const rect = surfaceRef.current?.getBoundingClientRect();
      if (rect) {
        zoomAt(factor, rect.left + rect.width / 2, rect.top + rect.height / 2, rect);
      }
    },
    [zoomAt],
  );

  return (
    <>
      {/* ------------------------------------------------------- canvas ---- */}
      <div
        ref={surfaceRef}
        onPointerDown={beginPan}
        className={`relative hidden h-dvh w-full touch-none select-none overflow-hidden bg-paper md:block ${
          tool === 'laser' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--paper-dot) 1px, transparent 1px)',
            backgroundSize: `${24 * viewport.z}px ${24 * viewport.z}px`,
            backgroundPosition: `${viewport.x}px ${viewport.y}px`,
            opacity: Math.min(1, viewport.z * 1.4),
          }}
        />

        <div
          className={`absolute left-0 top-0 origin-top-left ${
            tool === 'laser' ? 'pointer-events-none' : ''
          }`}
          style={{
            transform: `translate3d(${viewport.x}px, ${viewport.y}px, 0) scale(${viewport.z})`,
          }}
        >
          <ClusterRegions clusters={garden.clusters} notes={placed} />
          <Edges notes={placed} activeSlug={activeSlug} />
          {placed.map((note) => (
            <NoteCard
              key={note.slug}
              note={note}
              gardenPath={garden.path}
              mode="canvas"
              editing={editing}
              active={activeSlug === note.slug}
              dimmed={!matches.has(note.slug)}
              onOpen={setOpenSlug}
              onDragStart={beginMove}
              onResizeStart={beginResize}
            />
          ))}
        </div>

        <LaserLayer ref={laserRef} />

        <div data-canvas-chrome="" className="pointer-events-none absolute inset-0 p-4">
          <div className="absolute left-1/2 top-4 -translate-x-1/2">
            <CanvasToolbar
              title={garden.title}
              zoom={viewport.z}
              onZoomIn={() => zoomCentre(ZOOM_STEP)}
              onZoomOut={() => zoomCentre(1 / ZOOM_STEP)}
              onFit={fitAll}
              tool={tool}
              onToolChange={setTool}
              laserMode={laserMode}
              onLaserModeChange={setLaserMode}
              notesOpen={indexOpen}
              onNotesOpenChange={setIndexOpen}
              notesCount={placed.length}
              menuOpen={menuOpen}
              onMenuOpenChange={setMenuOpen}
            />
          </div>

          {indexOpen ? (
            <div className="glass-panel pointer-events-auto absolute left-4 top-4 w-[264px] overflow-hidden rounded-xl">
              <GardenIndex
                tagline={garden.tagline}
                clusters={garden.clusters}
                notes={placed}
                matches={matches}
                query={query}
                onQueryChange={setQuery}
                activeSlug={activeSlug}
                onSelect={flyTo}
                searchRef={searchRef}
              />
            </div>
          ) : null}

          {editing ? (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <AuthorToolbar
                dirtyCount={dirtyCount}
                copied={copied}
                fileName={`src/garden/${garden.id}.layout.ts`}
                onCopy={onCopyLayout}
                onReset={onResetLayout}
                onExit={() => {
                  setEditing(false);
                  // Drop `?edit=1` but keep the (possibly locale-prefixed) path.
                  window.history.replaceState(null, '', window.location.pathname);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* --------------------------------------------------------- list ---- */}
      <div className="mx-auto w-full max-w-[46rem] space-y-4 p-5 pb-20 md:hidden">
        <SiteHeader className="-mx-5 -mt-5 px-5" />
        <header className="pt-2">
          <h1 className="text-xl font-medium">{garden.title}</h1>
          <p className="mt-1 text-[13.5px] leading-snug text-muted">{garden.tagline}</p>
          <p className="mt-3 text-[12px] text-muted">{t('mobileHint')}</p>
        </header>
        {placed.map((note) => (
          <NoteCard
            key={note.slug}
            note={note}
            gardenPath={garden.path}
            mode="list"
            onOpen={setOpenSlug}
          />
        ))}
      </div>

      {openNote ? (
        <NoteReader note={openNote} gardenPath={garden.path} onClose={() => setOpenSlug(null)} />
      ) : null}
    </>
  );
}
