import type { NoteFrame } from "./types";

/**
 * Card placement for the AI garden, in world units. One column per cluster,
 * left to right in reading order: why → vanilla → table stakes → advanced
 * retrieval → agentic → fine-tuning → measurement. Heights are sized to the
 * rendered content, so no card has to be scrolled while teaching from it.
 *
 * This file is generated: open `/garden/ai?edit=1`, drag and resize the cards,
 * press "Copy layout", and paste the result over this file. Nothing else in
 * the app reads these numbers, so it is always safe to overwrite wholesale.
 */
export const aiLayout: Record<string, NoteFrame> = {
  // buradan başla
  "yol-haritasi": { x: 0, y: 0, w: 460, h: 470 },

  // neden rag?
  "neden-rag": { x: 540, y: 0, w: 460, h: 900 },
  "rag-vs-fine-tune": { x: 540, y: 960, w: 460, h: 1080 },

  // vanilla rag
  "vanilla-rag-hatti": { x: 1080, y: 0, w: 460, h: 680 },
  "baseline-yigin": { x: 1080, y: 740, w: 460, h: 880 },
  "naive-rag-nerede-kirilir": { x: 1080, y: 1680, w: 460, h: 680 },

  // table stakes
  chunklama: { x: 1620, y: 0, w: 460, h: 700 },
  "metadata-filtreleme": { x: 1620, y: 760, w: 460, h: 840 },
  "hibrit-arama-ve-rerank": { x: 1620, y: 1660, w: 460, h: 690 },
  "chunking-open-question": { x: 1620, y: 2410, w: 460, h: 580 },

  // ileri retrieval
  "small-to-big": { x: 2160, y: 0, w: 460, h: 680 },
  "sorgu-donusumleri": { x: 2160, y: 740, w: 460, h: 730 },
  "rag-retrieval-loop": { x: 2160, y: 1530, w: 460, h: 590 },

  // agentic rag — two columns, the cluster region wraps both
  "agentic-rag-dongusu": { x: 2700, y: 0, w: 460, h: 630 },
  "agentic-desenler": { x: 2700, y: 690, w: 460, h: 820 },
  "vanilla-vs-agentic": { x: 2700, y: 1570, w: 460, h: 700 },
  "agent-tool-loop": { x: 3240, y: 0, w: 460, h: 1110 },
  "context-budget": { x: 3240, y: 1170, w: 460, h: 680 },

  // fine-tuning
  "ne-zaman-fine-tune": { x: 3780, y: 0, w: 460, h: 910 },
  "fine-tune-yontemleri": { x: 3780, y: 970, w: 460, h: 740 },
  "embedding-fine-tune": { x: 3780, y: 1770, w: 460, h: 680 },

  // ölçüm
  "retrieval-evali": { x: 4320, y: 0, w: 460, h: 700 },
  "uctan-uca-eval": { x: 4320, y: 760, w: 460, h: 700 },
  "evals-first": { x: 4320, y: 1520, w: 460, h: 740 },
};
