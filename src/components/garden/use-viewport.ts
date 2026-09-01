'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type Viewport = { x: number; y: number; z: number };
export type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 2.5;

export const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Screen pixel → world coordinate, relative to the canvas element. */
export function toWorld(viewport: Viewport, rect: DOMRect, clientX: number, clientY: number) {
  return {
    x: (clientX - rect.left - viewport.x) / viewport.z,
    y: (clientY - rect.top - viewport.y) / viewport.z,
  };
}

export type Inset = { left?: number; top?: number; right?: number; bottom?: number };

/**
 * The viewport that fits `bounds` inside `rect`. `inset` keeps content clear of
 * the chrome floating over the canvas — the index rail and the zoom controls.
 */
export function fitViewport(
  bounds: Bounds,
  rect: { width: number; height: number },
  padding = 48,
  maxZoom = 1,
  inset: Inset = {},
): Viewport {
  const { left = 0, top = 0, right = 0, bottom = 0 } = inset;
  const width = Math.max(1, bounds.maxX - bounds.minX);
  const height = Math.max(1, bounds.maxY - bounds.minY);
  const availableWidth = Math.max(1, rect.width - left - right - padding * 2);
  const availableHeight = Math.max(1, rect.height - top - bottom - padding * 2);
  const z = clampZoom(Math.min(availableWidth / width, availableHeight / height, maxZoom));
  return {
    z,
    x: left + padding + (availableWidth - width * z) / 2 - bounds.minX * z,
    y: top + padding + (availableHeight - height * z) / 2 - bounds.minY * z,
  };
}

export function useViewport(initial: Viewport = { x: 0, y: 0, z: 1 }) {
  const [viewport, setViewport] = useState<Viewport>(initial);
  const frame = useRef<number | null>(null);
  const current = useRef(viewport);
  current.current = viewport;

  const stop = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, []);

  useEffect(() => stop, [stop]);

  /** Jump straight there — used by drag, wheel and pinch. */
  const set = useCallback(
    (next: Viewport | ((previous: Viewport) => Viewport)) => {
      stop();
      setViewport(next);
    },
    [stop],
  );

  /** Tween there — used by fit, zoom buttons and "fly to note". */
  const animateTo = useCallback(
    (target: Viewport, duration = 420) => {
      stop();
      const from = current.current;
      if (prefersReducedMotion() || duration <= 0) {
        setViewport(target);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const e = easeOutCubic(t);
        setViewport({
          x: from.x + (target.x - from.x) * e,
          y: from.y + (target.y - from.y) * e,
          z: from.z + (target.z - from.z) * e,
        });
        if (t < 1) {
          frame.current = requestAnimationFrame(step);
        } else {
          frame.current = null;
        }
      };
      frame.current = requestAnimationFrame(step);
    },
    [stop],
  );

  /** Zoom by `factor`, keeping the world point under (clientX, clientY) fixed. */
  const zoomAt = useCallback(
    (factor: number, clientX: number, clientY: number, rect: DOMRect) => {
      set((previous) => {
        const z = clampZoom(previous.z * factor);
        if (z === previous.z) return previous;
        const px = clientX - rect.left;
        const py = clientY - rect.top;
        return {
          z,
          x: px - ((px - previous.x) / previous.z) * z,
          y: py - ((py - previous.y) / previous.z) * z,
        };
      });
    },
    [set],
  );

  return { viewport, set, animateTo, zoomAt, stop };
}
