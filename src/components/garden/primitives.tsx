import type { NoteAccent } from '@/garden/types';

/**
 * Building blocks for hand-drawing schemas inside a note's MDX.
 * They are registered globally in `mdx-components.tsx`, so a note can use
 * `<Schema>`, `<Box>`, `<Arrow>` … without importing anything.
 *
 * All of these are server components — only `<Mermaid>` ships client JS.
 */

type Children = { children?: React.ReactNode };

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                    */
/* -------------------------------------------------------------------------- */

/** A framed drawing surface with a faint grid. Wrap any diagram in this. */
export function Schema({
  title,
  children,
  scroll = true,
}: Children & { title?: string; scroll?: boolean }) {
  return (
    <figure className="my-4 rounded-lg border border-card-border bg-[image:radial-gradient(var(--paper-dot)_0.6px,transparent_0.6px)] [background-size:12px_12px] not-prose">
      {title ? (
        <figcaption className="border-b border-card-border/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
          {title}
        </figcaption>
      ) : null}
      <div className={`p-3 ${scroll ? 'overflow-x-auto' : ''}`}>{children}</div>
    </figure>
  );
}

/** Post-it note. Good for an aside you would have scribbled in the margin. */
export function Sticky({ children, accent = 'amber' }: Children & { accent?: NoteAccent }) {
  return (
    <div
      data-accent={accent}
      className="my-3 rotate-[-0.4deg] rounded-sm bg-[color:var(--accent)] px-3 py-2 text-[13px] leading-snug shadow-[2px_3px_10px_-4px_rgba(0,0,0,0.35)]"
    >
      {children}
    </div>
  );
}

const CALLOUT_MARKS = {
  note: { mark: '·', label: 'Note' },
  idea: { mark: '✳', label: 'Idea' },
  warn: { mark: '!', label: 'Watch out' },
  gotcha: { mark: '⚑', label: 'Gotcha' },
  todo: { mark: '□', label: 'Todo' },
} as const;

export function Callout({
  children,
  type = 'note',
  title,
}: Children & { type?: keyof typeof CALLOUT_MARKS; title?: string }) {
  const { mark, label } = CALLOUT_MARKS[type];
  return (
    <aside className="my-3 flex gap-2.5 rounded-md border border-dashed border-card-border bg-foreground/[0.02] px-3 py-2 text-[13px] leading-snug">
      <span aria-hidden="true" className="select-none pt-px text-muted">
        {mark}
      </span>
      <div className="min-w-0">
        <span className="mr-1.5 font-medium">{title ?? label}</span>
        <span className="text-muted">{children}</span>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout helpers                                                              */
/* -------------------------------------------------------------------------- */

export function Row({
  children,
  gap = 8,
  align = 'stretch',
  wrap = false,
}: Children & { gap?: number; align?: 'start' | 'center' | 'stretch'; wrap?: boolean }) {
  return (
    <div
      className="flex"
      style={{
        gap,
        alignItems: align === 'start' ? 'flex-start' : align === 'center' ? 'center' : 'stretch',
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  );
}

export function Col({ children, gap = 8 }: Children & { gap?: number }) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Nodes and connectors                                                        */
/* -------------------------------------------------------------------------- */

/** A labelled node. `sub` is a small caption underneath the label. */
export function Box({
  children,
  sub,
  accent,
  dashed = false,
  wide = false,
}: Children & { sub?: string; accent?: NoteAccent; dashed?: boolean; wide?: boolean }) {
  return (
    <div
      data-accent={accent}
      className={[
        'flex min-w-fit flex-1 flex-col justify-center rounded-md border px-2.5 py-2 text-center leading-tight',
        dashed ? 'border-dashed' : 'border-solid',
        accent ? 'border-transparent bg-[color:var(--accent)]' : 'border-card-border bg-card',
        wide ? 'basis-full' : '',
      ].join(' ')}
    >
      <span className="truncate text-[12.5px] font-medium">{children}</span>
      {sub ? <span className="mt-0.5 truncate text-[10.5px] text-muted">{sub}</span> : null}
    </div>
  );
}

const ARROW_GLYPH = {
  right: '→',
  left: '←',
  down: '↓',
  up: '↑',
  both: '↔',
} as const;

/** A connector between two `<Box>`es, with an optional label above it. */
export function Arrow({
  dir = 'right',
  label,
}: {
  dir?: keyof typeof ARROW_GLYPH;
  label?: string;
}) {
  const vertical = dir === 'down' || dir === 'up';
  return (
    <div
      className={`flex shrink-0 items-center justify-center text-muted ${
        vertical ? 'w-full flex-col py-0.5' : 'flex-col px-0.5'
      }`}
    >
      {label ? (
        <span className="whitespace-nowrap text-[10px] leading-none text-muted">{label}</span>
      ) : null}
      <span aria-hidden="true" className="text-[15px] leading-none">
        {ARROW_GLYPH[dir]}
      </span>
    </div>
  );
}

/** Shorthand for `Box → Box → Box`. Steps may be `'Label'` or `'Label|caption'`. */
export function Pipeline({ steps, accent }: { steps: string[]; accent?: NoteAccent }) {
  return (
    <div className="flex items-stretch gap-1">
      {steps.map((step, index) => {
        const [label, sub] = step.split('|');
        return (
          <div key={step} className="flex min-w-fit flex-1 items-stretch gap-1">
            <Box sub={sub} accent={accent}>
              {label}
            </Box>
            {index < steps.length - 1 ? <Arrow /> : null}
          </div>
        );
      })}
    </div>
  );
}

/** Layered architecture, top to bottom. Handy for system-design notes. */
export function Stack({
  layers,
}: {
  layers: { label: string; sub?: string; accent?: NoteAccent }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {layers.map((layer) => (
        <div
          key={layer.label}
          data-accent={layer.accent}
          className={[
            'flex items-baseline justify-between gap-3 rounded-md border px-2.5 py-1.5',
            layer.accent
              ? 'border-transparent bg-[color:var(--accent)]'
              : 'border-card-border bg-card',
          ].join(' ')}
        >
          <span className="text-[12.5px] font-medium">{layer.label}</span>
          {layer.sub ? (
            <span className="truncate text-[10.5px] text-muted">{layer.sub}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** A tiny horizontal bar. Useful for budgets, ratios, benchmark deltas. */
export function Meter({
  label,
  value,
  max = 100,
  unit = '',
}: {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="my-1.5">
      <div className="mb-1 flex items-baseline justify-between text-[11.5px]">
        <span>{label}</span>
        <span className="tabular-nums text-muted">
          {value.toLocaleString('en-US')}
          {unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full rounded-full bg-foreground/45" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Kbd({ children }: Children) {
  return (
    <kbd className="rounded border border-card-border bg-card px-1 py-px font-mono text-[11px] leading-normal">
      {children}
    </kbd>
  );
}
