import { aiGarden } from "./ai";
import { mcpGarden } from "./mcp";
import { ragGarden } from "./rag";
import { stackGarden } from "./stack";
import { talksGarden } from "./talks";
import type { Garden } from "./types";

/**
 * Every garden on the site, in the order they appear on `/garden`. Adding one
 * — system design, backend — means a new `<name>.ts` + `<name>.layout.ts`
 * pair listed here. The routes are generic and need no changes.
 */
export const gardens: Garden[] = [
  aiGarden,
  ragGarden,
  mcpGarden,
  stackGarden,
  talksGarden,
];

export function getGarden(id: string): Garden | undefined {
  return gardens.find((garden) => garden.id === id);
}

export { aiGarden, mcpGarden, ragGarden, stackGarden, talksGarden };
export * from "./types";
