import type { NoteFrame } from './types';

/**
 * Card placement for the experience garden, in world units. One column per
 * cluster: jobs, then the things I started, then talks, then resources —
 * newest at the top of each column.
 *
 * This file is generated: open `/garden/talks?edit=1`, drag and resize the
 * cards, press "Copy layout", and paste the result over this file. Nothing
 * else in the app reads these numbers, so it is always safe to overwrite.
 */
export const talksLayout: Record<string, NoteFrame> = {
  'sanstech': { x: 0, y: 0, w: 440, h: 460 },
  'pargali': { x: 0, y: 520, w: 440, h: 380 },
  'simpra': { x: 0, y: 960, w: 440, h: 400 },
  'mythology-tech': { x: 0, y: 1420, w: 440, h: 340 },
  'fisle-cofounder': { x: 540, y: 0, w: 440, h: 360 },
  'kodizim': { x: 540, y: 420, w: 440, h: 380 },
  'tubitak-2209b': { x: 540, y: 860, w: 440, h: 460 },
  'frontendship-weekly-ship-2': { x: 1080, y: 0, w: 440, h: 330 },
  'istanbul-js-ai-nextjs': { x: 1080, y: 390, w: 440, h: 400 },
  'cypress-notlari': { x: 1620, y: 0, w: 400, h: 200 },
  'micro-frontend-egitimi': { x: 1620, y: 260, w: 400, h: 180 },
};
