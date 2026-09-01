"use client";

import { useTranslations } from "next-intl";
import type { RefObject } from "react";
import type { GardenCluster, PlacedNote } from "@/garden/types";

type Props = {
  tagline: string;
  clusters: GardenCluster[];
  notes: PlacedNote[];
  matches: Set<string>;
  query: string;
  onQueryChange: (value: string) => void;
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

/**
 * The note index, shown in the toolbar's "notes" popover: search, and every
 * note grouped by cluster. Clicking one flies the board to it.
 */
export function GardenIndex({
  tagline,
  clusters,
  notes,
  matches,
  query,
  onQueryChange,
  activeSlug,
  onSelect,
  searchRef,
}: Props) {
  const t = useTranslations("garden.index");
  const groups = [
    ...clusters.map((cluster) => ({
      id: cluster.id,
      label: cluster.label,
      notes: notes.filter((note) => note.cluster === cluster.id),
    })),
    {
      id: "__loose",
      label: t("unfiled"),
      notes: notes.filter((note) => !note.cluster),
    },
  ].filter((group) => group.notes.length > 0);

  return (
    <div className="flex max-h-[min(28rem,calc(100dvh-6rem))] flex-col">
      <p className="px-3 pt-3 text-[11.5px] leading-snug text-muted">
        {tagline}
      </p>

      <div className="px-3 pb-2 pt-2">
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t("search")}
          aria-label={t("search")}
          className="w-full rounded-md border border-card-border bg-background px-2 py-1.5 text-[12.5px] placeholder:text-muted focus:border-muted focus:outline-none"
        />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-3">
        {groups.map((group) => (
          <div key={group.id} className="mb-2">
            <p className="px-1 py-1 text-[10px] uppercase tracking-[0.16em] text-muted">
              {group.label}
            </p>
            <ul>
              {group.notes.map((note) => {
                const dimmed = !matches.has(note.slug);
                return (
                  <li key={note.slug}>
                    <button
                      type="button"
                      onClick={() => onSelect(note.slug)}
                      className={[
                        "w-full rounded-md px-2 py-1.5 text-left transition-colors",
                        activeSlug === note.slug
                          ? "bg-foreground/10"
                          : "hover:bg-foreground/[0.06]",
                        dimmed ? "opacity-35" : "",
                      ].join(" ")}
                    >
                      <span className="block truncate text-[12.5px] leading-snug">
                        {note.title}
                      </span>
                      <span className="block truncate text-[11px] leading-snug text-muted">
                        {note.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
