import type { NoteFrame } from "./types";

/**
 * Card placement for the Code RAG garden, in world units. One column per
 * cluster, left to right in reading order: problem → stack → retrieval →
 * chunking & languages → saying no → agent surface → lessons. Heights are
 * first estimates from the rendered content.
 *
 * This file is generated: open `/garden/rag?edit=1`, drag and resize the
 * cards, press "Copy layout", and paste the result over this file. Nothing
 * else in the app reads these numbers, so it is always safe to overwrite
 * wholesale.
 */
export const ragLayout: Record<string, NoteFrame> = {
  // the problem
  "four-hard-things": { x: 0, y: 0, w: 460, h: 720 },
  "first-experiment": { x: 0, y: 780, w: 460, h: 820 },

  // the stack
  "stack-choices": { x: 540, y: 0, w: 460, h: 1080 },
  "incremental-sync": { x: 540, y: 1140, w: 460, h: 820 },

  // retrieval, measured
  "route-by-query-shape": { x: 1080, y: 0, w: 460, h: 860 },
  "reranker-hurt": { x: 1080, y: 920, w: 460, h: 820 },
  "turkish-over-english-code": { x: 1080, y: 1800, w: 460, h: 980 },

  // chunking & languages
  "chunk-is-a-code-unit": { x: 1620, y: 0, w: 460, h: 860 },
  "ast-vs-windows": { x: 1620, y: 920, w: 460, h: 900 },
  "language-coverage-is-a-rule": { x: 1620, y: 1880, w: 460, h: 1160 },

  // saying no
  "three-bands": { x: 2160, y: 0, w: 460, h: 1040 },

  // agent surface
  "mcp-same-process": { x: 2700, y: 0, w: 460, h: 940 },

  // lessons
  "measure-or-it-didnt-happen": { x: 3240, y: 0, w: 460, h: 900 },
  gotchas: { x: 3240, y: 960, w: 460, h: 940 },
};
