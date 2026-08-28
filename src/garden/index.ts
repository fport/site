import { aiGarden } from './ai';
import { talksGarden } from './talks';
import type { Garden } from './types';

/**
 * Every garden on the site, in the order they appear on `/garden`. Adding one
 * — system design, backend — means a new `<name>.ts` + `<name>.layout.ts`
 * pair listed here. The routes are generic and need no changes.
 */
export const gardens: Garden[] = [aiGarden, talksGarden];

export function getGarden(id: string): Garden | undefined {
  return gardens.find((garden) => garden.id === id);
}

export { aiGarden, talksGarden };
export * from './types';
