import type { NoteFrame } from './types';

/**
 * Card placement for the MCP garden, in world units. One column per cluster,
 * left to right in reading order: why → architecture → primitives → building
 * → security → the 2026 spec. Heights are sized to the rendered content, so no
 * card has to be scrolled while teaching from it.
 *
 * This file is generated: open `/garden/mcp?edit=1`, drag and resize the cards,
 * press "Copy layout", and paste the result over this file. Nothing else in
 * the app reads these numbers, so it is always safe to overwrite wholesale.
 */
export const mcpLayout: Record<string, NoteFrame> = {
  // why mcp exists
  'what-mcp-is': { x: 0, y: 0, w: 460, h: 740 },
  'the-nxm-problem': { x: 0, y: 800, w: 460, h: 820 },

  // architecture
  'host-client-server': { x: 540, y: 0, w: 460, h: 550 },
  transports: { x: 540, y: 610, w: 460, h: 750 },
  'request-walkthrough': { x: 540, y: 1420, w: 460, h: 750 },

  // primitives
  'server-primitives': { x: 1080, y: 0, w: 460, h: 680 },
  'client-primitives': { x: 1080, y: 740, w: 460, h: 710 },
  'tool-design': { x: 1080, y: 1510, w: 460, h: 690 },

  // building one
  'anatomy-of-a-server': { x: 1620, y: 0, w: 460, h: 690 },
  'mcp-vs-function-calling': { x: 1620, y: 750, w: 460, h: 600 },

  // security
  'attack-surface': { x: 2160, y: 0, w: 460, h: 780 },
  authorization: { x: 2160, y: 840, w: 460, h: 690 },

  // where the spec went
  'stateless-spec': { x: 2700, y: 0, w: 460, h: 840 },
};
