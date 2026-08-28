import type { NoteFrame } from './types';

/**
 * Card placement for the AI garden, in world units.
 *
 * This file is generated: open `/garden/ai?edit=1`, drag and resize the cards,
 * press "Copy layout", and paste the result over this file. Nothing else in
 * the app reads these numbers, so it is always safe to overwrite wholesale.
 */
export const aiLayout: Record<string, NoteFrame> = {
  'how-this-garden-works': { x: 0, y: 0, w: 400, h: 380 },
  'rag-retrieval-loop': { x: 500, y: 0, w: 470, h: 560 },
  'chunking-open-question': { x: 500, y: 610, w: 470, h: 430 },
  'agent-tool-loop': { x: 1070, y: 0, w: 450, h: 580 },
  'context-budget': { x: 1070, y: 630, w: 450, h: 410 },
  'evals-first': { x: 0, y: 520, w: 400, h: 500 },
};
