'use client';

import type { GardenCluster, PlacedNote } from '@/garden/types';

const PADDING = 26;
const LABEL_SPACE = 22;

/**
 * Dashed regions drawn behind the cards, sized to whatever belongs to each
 * cluster. Nothing to position by hand — move a card and its region follows.
 */
export function ClusterRegions({
  clusters,
  notes,
}: {
  clusters: GardenCluster[];
  notes: PlacedNote[];
}) {
  return (
    <>
      {clusters.map((cluster) => {
        const members = notes.filter((note) => note.cluster === cluster.id);
        if (members.length === 0) return null;

        const minX = Math.min(...members.map((note) => note.x)) - PADDING;
        const minY = Math.min(...members.map((note) => note.y)) - PADDING - LABEL_SPACE;
        const maxX = Math.max(...members.map((note) => note.x + note.w)) + PADDING;
        const maxY = Math.max(...members.map((note) => note.y + note.h)) + PADDING;

        return (
          <div
            key={cluster.id}
            aria-hidden="true"
            data-accent={cluster.accent}
            style={{ left: minX, top: minY, width: maxX - minX, height: maxY - minY }}
            className="pointer-events-none absolute rounded-2xl border border-dashed border-card-border"
          >
            <span className="absolute left-3 top-1.5 select-none text-[10.5px] uppercase tracking-[0.18em] text-muted">
              {cluster.label}
            </span>
          </div>
        );
      })}
    </>
  );
}
