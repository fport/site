'use client';

import type { PlacedNote } from '@/garden/types';

type Point = { x: number; y: number };

/** Pick the pair of card edges that gives the shortest, least-crossing curve. */
function anchors(from: PlacedNote, to: PlacedNote): { start: Point; end: Point; horizontal: boolean } {
  const fromCenter = { x: from.x + from.w / 2, y: from.y + from.h / 2 };
  const toCenter = { x: to.x + to.w / 2, y: to.y + to.h / 2 };
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const rightwards = dx >= 0;
    return {
      horizontal: true,
      start: { x: rightwards ? from.x + from.w : from.x, y: fromCenter.y },
      end: { x: rightwards ? to.x : to.x + to.w, y: toCenter.y },
    };
  }

  const downwards = dy >= 0;
  return {
    horizontal: false,
    start: { x: fromCenter.x, y: downwards ? from.y + from.h : from.y },
    end: { x: toCenter.x, y: downwards ? to.y : to.y + to.h },
  };
}

function path(from: PlacedNote, to: PlacedNote) {
  const { start, end, horizontal } = anchors(from, to);
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const pull = Math.min(160, Math.max(40, distance * 0.4));
  const c1 = horizontal
    ? { x: start.x + Math.sign(end.x - start.x || 1) * pull, y: start.y }
    : { x: start.x, y: start.y + Math.sign(end.y - start.y || 1) * pull };
  const c2 = horizontal
    ? { x: end.x - Math.sign(end.x - start.x || 1) * pull, y: end.y }
    : { x: end.x, y: end.y - Math.sign(end.y - start.y || 1) * pull };
  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
}

/**
 * Arrows between linked notes. Rendered inside the transformed plane so the
 * curves pan and zoom with the cards; a 1×1 SVG with `overflow: visible` lets
 * us draw anywhere without sizing it to the content.
 */
export function Edges({
  notes,
  activeSlug,
}: {
  notes: PlacedNote[];
  activeSlug: string | null;
}) {
  const bySlug = new Map(notes.map((note) => [note.slug, note]));
  const edges = notes.flatMap((note) =>
    (note.links ?? []).flatMap((target) => {
      const to = bySlug.get(target);
      return to ? [{ from: note, to, key: `${note.slug}->${target}` }] : [];
    })
  );

  if (edges.length === 0) return null;

  return (
    <svg
      width="1"
      height="1"
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
    >
      <defs>
        <marker
          id="garden-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--edge)" />
        </marker>
      </defs>
      {edges.map(({ from, to, key }) => {
        const active = activeSlug === from.slug || activeSlug === to.slug;
        return (
          <path
            key={key}
            d={path(from, to)}
            fill="none"
            stroke="var(--edge)"
            strokeWidth={active ? 2 : 1.25}
            strokeDasharray="5 5"
            opacity={activeSlug && !active ? 0.2 : 0.65}
            markerEnd="url(#garden-arrow)"
            className="transition-opacity duration-200"
          />
        );
      })}
    </svg>
  );
}
