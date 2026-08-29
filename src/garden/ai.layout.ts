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
  // start here
  roadmap: { x: 0, y: 0, w: 460, h: 470 },

  // why rag?
  "why-rag": { x: 540, y: 0, w: 460, h: 880 },
  "rag-vs-fine-tune": { x: 540, y: 940, w: 460, h: 1160 },

  // vanilla rag
  "vanilla-rag-pipeline": { x: 1080, y: 0, w: 460, h: 740 },
  "baseline-stack": { x: 1080, y: 800, w: 460, h: 870 },
  "where-naive-rag-breaks": { x: 1080, y: 1730, w: 460, h: 670 },

  // table stakes
  chunking: { x: 1620, y: 0, w: 460, h: 740 },
  "metadata-filtering": { x: 1620, y: 800, w: 460, h: 830 },
  "hybrid-search-rerank": { x: 1620, y: 1690, w: 460, h: 690 },
  "chunking-open-question": { x: 1620, y: 2440, w: 460, h: 660 },

  // advanced retrieval
  "small-to-big": { x: 2160, y: 0, w: 460, h: 680 },
  "query-transforms": { x: 2160, y: 740, w: 460, h: 770 },
  "rag-retrieval-loop": { x: 2160, y: 1570, w: 460, h: 620 },

  // agentic rag
  "agentic-rag-loop": { x: 2700, y: 0, w: 460, h: 660 },
  "agentic-patterns": { x: 2700, y: 720, w: 460, h: 800 },
  "vanilla-vs-agentic": { x: 2700, y: 1580, w: 460, h: 670 },

  // agentic rag, cont.
  "agent-tool-loop": { x: 3240, y: 0, w: 460, h: 1070 },
  "context-budget": { x: 3240, y: 1130, w: 460, h: 650 },

  // fine-tuning
  "when-to-fine-tune": { x: 3780, y: 0, w: 460, h: 950 },
  "fine-tuning-methods": { x: 3780, y: 1010, w: 460, h: 740 },
  "embedding-fine-tune": { x: 3780, y: 1810, w: 460, h: 650 },

  // measurement
  "retrieval-eval": { x: 4320, y: 0, w: 460, h: 750 },
  "end-to-end-eval": { x: 4320, y: 810, w: 460, h: 670 },
  "evals-first": { x: 4320, y: 1540, w: 460, h: 740 },
};
