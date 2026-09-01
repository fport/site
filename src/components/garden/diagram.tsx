import { useTranslations } from 'next-intl';
import { useId } from 'react';

/**
 * An architecture diagram in the style of an infra whiteboard: typed nodes on
 * a grid, dashed regions around the ones that share a boundary, labelled
 * arrows between them, and a legend. Authored as data in MDX, rendered as one
 * static SVG on the server — nothing ships to the client.
 *
 * Nodes sit on a cell grid (`x`, `y`, 0-based; fractions allowed, so `y: 0.5`
 * parks a node between two rows). Groups are bounding boxes of the nodes they
 * name, so moving a node moves its region. Edges draw straight when the two
 * nodes share a row or column and take one elbow otherwise.
 */

export type DiagramKind =
  | 'service'
  | 'data'
  | 'cloud'
  | 'security'
  | 'queue'
  | 'external'
  | 'model';

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  kind?: DiagramKind;
  /** Grid column, 0-based. */
  x: number;
  /** Grid row, 0-based. */
  y: number;
  /** Columns to span. */
  w?: number;
};

export type DiagramGroup = {
  label: string;
  kind?: DiagramKind;
  /** Ids of the nodes inside. The region is their bounding box. */
  nodes: string[];
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  kind?: DiagramKind;
  dashed?: boolean;
  /**
   * For nodes that share neither row nor column: `hv` leaves the source
   * sideways and turns into the top/bottom of the target, `vh` leaves it
   * vertically and turns into the side. Defaults to whichever axis is longer.
   */
  route?: 'hv' | 'vh';
};

type Rect = { x: number; y: number; w: number; h: number };

const KINDS: DiagramKind[] = ['service', 'data', 'cloud', 'security', 'queue', 'external', 'model'];

const NODE_W = 156;
const NODE_H = 68;
/** Wide enough for a ~16-character edge label to sit between two nodes. */
const GAP_X = 108;
const GAP_Y = 72;
const CELL_W = NODE_W + GAP_X;
const CELL_H = NODE_H + GAP_Y;
/** Space a group keeps around its members; nested groups step outwards. */
const GROUP_PAD = 14;
const GROUP_LABEL = 16;
const MARGIN = 12;
const FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** 12×12 outline glyphs, one per kind, drawn in the node's top-left corner. */
const ICON: Record<DiagramKind, string> = {
  service: 'M4.5 3 1.5 6l3 3M7.5 3l3 3-3 3',
  data: 'M2 3.2a4 1.4 0 0 0 8 0a4 1.4 0 0 0-8 0zM2 3.2v5.6a4 1.4 0 0 0 8 0V3.2',
  cloud: 'M3.6 9.5h5.1a2.3 2.3 0 0 0 .4-4.6 3 3 0 0 0-5.7-.7A2.6 2.6 0 0 0 3.6 9.5z',
  security: 'M6 1.5 2.5 3v3c0 2.3 1.5 3.7 3.5 4.5 2-.8 3.5-2.2 3.5-4.5V3z',
  queue: 'M2 3.5h8M2 6h8M2 8.5h8',
  external: 'M7 2h3v3M10 2 5.5 6.5M8.5 7v2.5h-6v-6H5',
  model: 'M6 1.5v2M6 8.5v2M1.5 6h2M8.5 6h2M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
};

const fill = (kind: DiagramKind) => `var(--dg-${kind}-fill)`;
const stroke = (kind: DiagramKind) => `var(--dg-${kind}-stroke)`;
const ink = (kind: DiagramKind) => `var(--dg-${kind}-ink)`;

/** Rough monospace width, for wrapping the legend. */
const textWidth = (text: string, size: number) => text.length * size * 0.62;

function nodeRect(node: DiagramNode): Rect {
  return {
    x: node.x * CELL_W,
    y: node.y * CELL_H,
    w: NODE_W + ((node.w ?? 1) - 1) * CELL_W,
    h: NODE_H,
  };
}

const centre = (r: Rect) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

type Point = { x: number; y: number };

/** The polyline an edge follows, from the source border to the target border. */
function routeEdge(from: Rect, to: Rect, route?: 'hv' | 'vh'): Point[] {
  const a = centre(from);
  const b = centre(to);
  const sameRow = Math.abs(a.y - b.y) < 1;
  const sameCol = Math.abs(a.x - b.x) < 1;

  if (sameRow) {
    return b.x > a.x
      ? [
          { x: from.x + from.w, y: a.y },
          { x: to.x, y: b.y },
        ]
      : [
          { x: from.x, y: a.y },
          { x: to.x + to.w, y: b.y },
        ];
  }
  if (sameCol) {
    return b.y > a.y
      ? [
          { x: a.x, y: from.y + from.h },
          { x: b.x, y: to.y },
        ]
      : [
          { x: a.x, y: from.y },
          { x: b.x, y: to.y + to.h },
        ];
  }

  const mode = route ?? (Math.abs(b.x - a.x) >= Math.abs(b.y - a.y) ? 'hv' : 'vh');
  if (mode === 'hv') {
    const start = { x: b.x > a.x ? from.x + from.w : from.x, y: a.y };
    const end = { x: b.x, y: b.y > a.y ? to.y : to.y + to.h };
    return [start, { x: b.x, y: a.y }, end];
  }
  const start = { x: a.x, y: b.y > a.y ? from.y + from.h : from.y };
  const end = { x: b.x > a.x ? to.x : to.x + to.w, y: b.y };
  return [start, { x: a.x, y: b.y }, end];
}

/** Where a label sits: the middle of the longest segment, offset off the line. */
function labelAnchor(points: Point[]) {
  let best = { length: -1, from: points[0], to: points[1] };
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    if (length > best.length) best = { length, from, to };
  }
  const horizontal = Math.abs(best.to.y - best.from.y) < 1;
  const mid = { x: (best.from.x + best.to.x) / 2, y: (best.from.y + best.to.y) / 2 };
  return horizontal
    ? { x: mid.x, y: mid.y - 7, anchor: 'middle' as const, baseline: 'auto' as const }
    : { x: mid.x + 8, y: mid.y, anchor: 'start' as const, baseline: 'middle' as const };
}

function union(rects: Rect[]): Rect {
  const x = Math.min(...rects.map((r) => r.x));
  const y = Math.min(...rects.map((r) => r.y));
  const right = Math.max(...rects.map((r) => r.x + r.w));
  const bottom = Math.max(...rects.map((r) => r.y + r.h));
  return { x, y, w: right - x, h: bottom - y };
}

const isSubset = (inner: string[], outer: string[]) =>
  inner.length < outer.length && inner.every((id) => outer.includes(id));

export function Diagram({
  title,
  nodes,
  groups = [],
  edges = [],
  legend = true,
}: {
  title?: string;
  nodes: DiagramNode[];
  groups?: DiagramGroup[];
  edges?: DiagramEdge[];
  /** `false` hides the legend; a map overrides the label for a kind. */
  legend?: boolean | Partial<Record<DiagramKind, string>>;
}) {
  const t = useTranslations('garden.diagram');
  // useId is not guaranteed to be a valid CSS identifier.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const rects = new Map<string, Rect>();
  for (const node of nodes) rects.set(node.id, nodeRect(node));
  const rectOf = (id: string) => {
    const rect = rects.get(id);
    if (!rect) throw new Error(`<Diagram>: unknown node "${id}"`);
    return rect;
  };

  // Outer groups get more padding than the ones they contain, so nested
  // regions never share a border.
  const groupRects = groups.map((group) => {
    const inner = groups.filter((other) => isSubset(other.nodes, group.nodes)).length;
    const pad = GROUP_PAD + GROUP_PAD * inner;
    const box = union(group.nodes.map(rectOf));
    return {
      ...group,
      kind: group.kind ?? 'external',
      rect: {
        x: box.x - pad,
        y: box.y - pad - GROUP_LABEL,
        w: box.w + pad * 2,
        h: box.h + pad * 2 + GROUP_LABEL,
      },
    };
  });

  const bounds = union([...rects.values(), ...groupRects.map((g) => g.rect)]);

  // Legend: one swatch per kind in use, wrapped to the diagram's width.
  const counts = new Map<DiagramKind, number>();
  for (const node of nodes) {
    const kind = node.kind ?? 'service';
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  const legendLabels = typeof legend === 'object' ? legend : {};
  const legendItems = legend
    ? KINDS.filter((kind) => counts.has(kind)).map((kind) => ({
        kind,
        label: legendLabels[kind] ?? t(kind),
        count: counts.get(kind) ?? 0,
      }))
    : [];
  const legendRows: { kind: DiagramKind; label: string; count: number; x: number; y: number }[] =
    [];
  {
    let x = bounds.x;
    let y = bounds.y + bounds.h + 30;
    for (const item of legendItems) {
      const width =
        22 + textWidth(item.label, 10.5) + 12 + textWidth(String(item.count), 9) + 10 + 18;
      if (x + width > bounds.x + bounds.w && x > bounds.x) {
        x = bounds.x;
        y += 22;
      }
      legendRows.push({ ...item, x, y });
      x += width;
    }
  }

  const height = legendRows.length ? legendRows[legendRows.length - 1].y + 10 - bounds.y : bounds.h;
  const viewBox = `${bounds.x - MARGIN} ${bounds.y - MARGIN} ${bounds.w + MARGIN * 2} ${height + MARGIN * 2}`;
  const width = bounds.w + MARGIN * 2;

  const arrow = (kind: DiagramKind) => `url(#${uid}-${kind})`;

  return (
    <figure className="my-4 rounded-lg border border-card-border bg-[image:radial-gradient(var(--paper-dot)_0.6px,transparent_0.6px)] [background-size:12px_12px] not-prose">
      {title ? (
        <figcaption className="border-b border-card-border/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
          {title}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto p-2">
        <svg
          viewBox={viewBox}
          width="100%"
          role="img"
          aria-label={title ?? t('alt')}
          style={{
            display: 'block',
            height: 'auto',
            // Shrink to the container, but not past the point where labels
            // stop being readable — below that the figure scrolls sideways.
            minWidth: Math.round(width * 0.6),
            fontFamily: FONT,
          }}
        >
          <defs>
            {KINDS.map((kind) => (
              <marker
                key={kind}
                id={`${uid}-${kind}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0 10 5 0 10z" style={{ fill: stroke(kind) }} />
              </marker>
            ))}
          </defs>

          {groupRects.map((group) => (
            <g key={group.label}>
              <rect
                x={group.rect.x}
                y={group.rect.y}
                width={group.rect.w}
                height={group.rect.h}
                rx="12"
                strokeDasharray="5 4"
                strokeWidth="1.2"
                style={{ fill: fill(group.kind), fillOpacity: 0.35, stroke: stroke(group.kind) }}
              />
              <text
                x={group.rect.x + 12}
                y={group.rect.y + 15}
                fontSize="10.5"
                fontWeight="600"
                style={{ fill: ink(group.kind) }}
              >
                {group.label}
              </text>
            </g>
          ))}

          {edges.map((edge, index) => {
            const kind = edge.kind ?? 'external';
            const points = routeEdge(rectOf(edge.from), rectOf(edge.to), edge.route);
            const label = edge.label ? labelAnchor(points) : null;
            return (
              <g key={`${edge.from}-${edge.to}-${index}`}>
                <polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeDasharray={edge.dashed ? '5 4' : undefined}
                  markerEnd={arrow(kind)}
                  style={{ stroke: stroke(kind) }}
                />
                {label ? (
                  <text
                    x={label.x}
                    y={label.y}
                    fontSize="9.5"
                    textAnchor={label.anchor}
                    dominantBaseline={label.baseline}
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    style={{ fill: ink(kind), stroke: 'var(--card)' }}
                  >
                    {edge.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {nodes.map((node) => {
            const kind = node.kind ?? 'service';
            const rect = rectOf(node.id);
            const cx = rect.x + rect.w / 2;
            const cy = rect.y + rect.h / 2;
            return (
              <g key={node.id}>
                <rect
                  x={rect.x}
                  y={rect.y}
                  width={rect.w}
                  height={rect.h}
                  rx="8"
                  strokeWidth="1.4"
                  style={{ fill: fill(kind), stroke: stroke(kind) }}
                />
                <path
                  d={ICON[kind]}
                  transform={`translate(${rect.x + 8} ${rect.y + 7}) scale(0.95)`}
                  fill="none"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ stroke: ink(kind) }}
                />
                <text
                  x={cx}
                  y={node.sub ? cy - 3 : cy + 4.5}
                  fontSize="12.5"
                  fontWeight="700"
                  textAnchor="middle"
                  style={{ fill: 'var(--foreground)' }}
                >
                  {node.label}
                </text>
                {node.sub ? (
                  <text
                    x={cx}
                    y={cy + 13}
                    fontSize="10.5"
                    textAnchor="middle"
                    style={{ fill: 'var(--muted)' }}
                  >
                    {node.sub}
                  </text>
                ) : null}
              </g>
            );
          })}

          {legendRows.map((item) => {
            const labelX = item.x + 22;
            const countX = labelX + textWidth(item.label, 10.5) + 8;
            const pillW = textWidth(String(item.count), 9) + 10;
            return (
              <g key={item.kind}>
                <rect
                  x={item.x}
                  y={item.y - 9}
                  width="16"
                  height="11"
                  rx="3"
                  strokeWidth="1.2"
                  style={{ fill: fill(item.kind), stroke: stroke(item.kind) }}
                />
                <text x={labelX} y={item.y} fontSize="10.5" style={{ fill: 'var(--foreground)' }}>
                  {item.label}
                </text>
                <rect
                  x={countX}
                  y={item.y - 9}
                  width={pillW}
                  height="12"
                  rx="6"
                  style={{ fill: 'var(--foreground)', fillOpacity: 0.08 }}
                />
                <text
                  x={countX + pillW / 2}
                  y={item.y}
                  fontSize="9"
                  textAnchor="middle"
                  style={{ fill: 'var(--muted)' }}
                >
                  {item.count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
