'use client';

import { Link } from 'next-view-transitions';
import { useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

/** Verified against the canvas and reader key handlers. */
const SHORTCUTS: [key: string, what: string][] = [
  ['drag', 'pan the board'],
  ['⌘ scroll', 'zoom'],
  ['+ / −', 'zoom in and out'],
  ['0', 'fit everything'],
  ['/', 'search notes'],
  ['esc', 'close the note'],
  ['v', 'drag tool'],
  ['l', 'laser pointer'],
];

const button =
  'flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground';
const pill =
  'flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] text-muted transition-colors hover:bg-foreground/10 hover:text-foreground';
const active = 'bg-foreground/10 text-foreground';

export type Tool = 'pan' | 'laser';
/** `trail` follows the drag; `tap` only marks where you click. */
export type LaserMode = 'trail' | 'tap';

function HandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11m0 0V4.5a1.5 1.5 0 0 1 3 0V11m0 0V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a5 5 0 0 1-4.33-2.5L5 15.5a1.5 1.5 0 0 1 2.6-1.5L8 14.5V11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LaserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" stroke="none" />
      <path
        d="M11 13 20 4M13.5 5.5 15 4M18.5 10.5 20 9M12 9h-.5M15 12v.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Divider() {
  return <span aria-hidden="true" className="mx-1 h-4 w-px bg-card-border" />;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={open ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The only chrome on the whiteboard: the way out, the title, zoom, a toggle for
 * the note drawer, and a menu for what you need once rather than constantly.
 *
 * The drawer itself is rendered by the canvas on the left — a popover that wide
 * sat on top of the notes you were trying to read.
 */
export function CanvasToolbar({
  title,
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
  tool,
  onToolChange,
  laserMode,
  onLaserModeChange,
  notesOpen,
  onNotesOpenChange,
  notesCount,
  menuOpen,
  onMenuOpenChange,
}: {
  title: string;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  tool: Tool;
  onToolChange: (tool: Tool) => void;
  laserMode: LaserMode;
  onLaserModeChange: (mode: LaserMode) => void;
  notesOpen: boolean;
  onNotesOpenChange: (open: boolean) => void;
  notesCount: number;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notesOpen && !menuOpen) return;
    // Only the menu is anchored here. The drawer is a surface you work next to,
    // so it stays until you close it — clicking the board must not dismiss it.
    const onPointerDown = (event: PointerEvent) => {
      if (root.current?.contains(event.target as Node)) return;
      onMenuOpenChange(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onNotesOpenChange(false);
      onMenuOpenChange(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [notesOpen, menuOpen, onNotesOpenChange, onMenuOpenChange]);

  return (
    <div ref={root} className="pointer-events-auto relative">
      <div className="glass flex items-center gap-0.5 rounded-full p-1">
        <Link href="/" aria-label="Back to the home page" className={button}>
          ←
        </Link>

        <Divider />

        <span className="select-none px-1.5 text-[12px] font-medium">{title}</span>

        <Divider />

        <button
          type="button"
          aria-label="Drag to pan"
          aria-pressed={tool === 'pan'}
          className={`${button} ${tool === 'pan' ? active : ''}`}
          onClick={() => onToolChange('pan')}
        >
          <HandIcon />
        </button>
        <button
          type="button"
          aria-label="Laser pointer"
          aria-pressed={tool === 'laser'}
          className={`${button} ${tool === 'laser' ? active : ''}`}
          onClick={() => onToolChange('laser')}
        >
          <LaserIcon />
        </button>

        {/* Only worth the width once the laser is the tool in hand. */}
        {tool === 'laser' ? (
          <div className="ml-0.5 flex items-center gap-0.5 rounded-full border border-card-border p-0.5">
            {(['trail', 'tap'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={laserMode === mode}
                className={`rounded-full px-2 py-0.5 text-[11px] transition-colors ${
                  laserMode === mode
                    ? 'bg-foreground/10 text-foreground'
                    : 'text-muted hover:text-foreground'
                }`}
                onClick={() => onLaserModeChange(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        ) : null}

        <Divider />

        <button type="button" aria-label="Zoom out" className={button} onClick={onZoomOut}>
          −
        </button>
        <span className="w-11 select-none text-center text-[11.5px] tabular-nums text-muted">
          {Math.round(zoom * 100)}%
        </span>
        <button type="button" aria-label="Zoom in" className={button} onClick={onZoomIn}>
          +
        </button>

        <Divider />

        <button type="button" onClick={onFit} className={pill}>
          fit
        </button>

        <Divider />

        <button
          type="button"
          aria-expanded={notesOpen}
          className={`${pill} ${notesOpen ? active : ''}`}
          onClick={() => {
            onMenuOpenChange(false);
            onNotesOpenChange(!notesOpen);
          }}
        >
          notes
          <span className="tabular-nums opacity-60">{notesCount}</span>
          <Chevron open={notesOpen} />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Theme and shortcuts"
            aria-expanded={menuOpen}
            className={`${button} ${menuOpen ? active : ''}`}
            onClick={() => {
              onNotesOpenChange(false);
              onMenuOpenChange(!menuOpen);
            }}
          >
            ⋮
          </button>

          {menuOpen ? (
            <div className="glass-panel absolute right-0 top-full mt-2 w-60 rounded-xl p-3">
              <div className="flex items-center justify-between text-[12px] text-muted">
                <span>theme</span>
                <ThemeToggle />
              </div>

              <div aria-hidden="true" className="my-2.5 h-px bg-card-border" />

              <ul className="space-y-1.5">
                {SHORTCUTS.map(([key, what]) => (
                  <li
                    key={key}
                    className="flex items-baseline justify-between gap-3 text-[11.5px]"
                  >
                    <span className="shrink-0 rounded border border-card-border px-1.5 py-0.5 font-mono text-[10.5px] text-muted">
                      {key}
                    </span>
                    <span className="text-right text-muted">{what}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
