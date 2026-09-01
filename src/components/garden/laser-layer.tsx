'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

/** How long a point of the trail stays on screen. */
const TRAIL_MS = 480;
/** How long a tap's ring takes to bloom and fade. */
const PING_MS = 900;
/** A longer trail than this has already faded at the tail anyway. */
const MAX_POINTS = 90;

export type LaserHandle = {
  /** Add a point to the trail. */
  draw: (x: number, y: number) => void;
  /** Drop a ring where the pointer was tapped. */
  ping: (x: number, y: number) => void;
  /** Wipe everything — used when the tool is put away. */
  clear: () => void;
};

type Point = { x: number; y: number; t: number };
type Ping = Point & { id: number };

/**
 * The laser pointer, drawn in screen space on purpose: a laser points at what
 * the viewer is looking at, so panning or zooming the board underneath must not
 * drag the mark along with it.
 *
 * The canvas drives this through a ref rather than through props, so a 60fps
 * trail re-renders this overlay alone and never the note cards.
 */
export const LaserLayer = forwardRef<LaserHandle>(function LaserLayer(_props, ref) {
  const [, tick] = useState(0);
  const points = useRef<Point[]>([]);
  const pings = useRef<Ping[]>([]);
  const frame = useRef<number | null>(null);
  const nextId = useRef(0);

  const wake = useCallback(() => {
    if (frame.current !== null) return;
    const step = () => {
      const now = performance.now();
      points.current = points.current.filter((point) => now - point.t < TRAIL_MS);
      pings.current = pings.current.filter((ping) => now - ping.t < PING_MS);
      tick((n) => n + 1);
      // Stop once the last mark has faded, so an idle board costs nothing.
      // The next mark wakes the loop again.
      frame.current =
        points.current.length || pings.current.length ? requestAnimationFrame(step) : null;
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    },
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      draw(x, y) {
        points.current.push({ x, y, t: performance.now() });
        if (points.current.length > MAX_POINTS) points.current.shift();
        wake();
      },
      ping(x, y) {
        pings.current.push({ x, y, t: performance.now(), id: nextId.current++ });
        wake();
      },
      clear() {
        points.current = [];
        pings.current = [];
        tick((n) => n + 1);
      },
    }),
    [wake],
  );

  const now = performance.now();
  const trail = points.current;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: 'drop-shadow(0 0 6px var(--laser-glow))' }}
    >
      {trail.slice(1).map((point, index) => {
        const previous = trail[index];
        const life = 1 - (now - point.t) / TRAIL_MS;
        if (life <= 0) return null;
        return (
          <line
            key={`${point.t}-${index}`}
            x1={previous.x}
            y1={previous.y}
            x2={point.x}
            y2={point.y}
            stroke="var(--laser)"
            strokeOpacity={life}
            strokeWidth={2 + 5 * life}
            strokeLinecap="round"
          />
        );
      })}

      {pings.current.map((ping) => {
        const age = (now - ping.t) / PING_MS;
        const life = 1 - age;
        if (life <= 0) return null;
        return (
          <g key={ping.id}>
            <circle
              cx={ping.x}
              cy={ping.y}
              r={5 + 24 * age}
              fill="none"
              stroke="var(--laser)"
              strokeOpacity={life * 0.8}
              strokeWidth={2}
            />
            <circle cx={ping.x} cy={ping.y} r={5} fill="var(--laser)" fillOpacity={life} />
          </g>
        );
      })}
    </svg>
  );
});
