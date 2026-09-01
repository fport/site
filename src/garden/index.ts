import type { Locale } from "next-intl";
import { aiGarden } from "./ai";
import { aiGardenTr } from "./ai.tr";
import { mcpGarden } from "./mcp";
import { mcpGardenTr } from "./mcp.tr";
import { ragGarden } from "./rag";
import { ragGardenTr } from "./rag.tr";
import { stackGarden } from "./stack";
import { stackGardenTr } from "./stack.tr";
import { talksGarden } from "./talks";
import { talksGardenTr } from "./talks.tr";
import { localizeGarden, type Garden, type GardenTranslation } from "./types";

/**
 * Every garden on the site, in the order they appear on `/garden`. Adding one
 * — system design, backend — means a new `<name>.ts` + `<name>.layout.ts`
 * pair listed here (plus a `<name>.tr.ts` once it is translated). The routes
 * are generic and need no changes.
 *
 * This list is the English source of truth; pages go through `getGardens` /
 * `getGarden`, which lay the reader's language over it.
 */
export const gardens: Garden[] = [
  aiGarden,
  ragGarden,
  mcpGarden,
  stackGarden,
  talksGarden,
];

const translations: Record<string, Partial<Record<Locale, GardenTranslation>>> = {
  ai: { tr: aiGardenTr },
  rag: { tr: ragGardenTr },
  mcp: { tr: mcpGardenTr },
  stack: { tr: stackGardenTr },
  talks: { tr: talksGardenTr },
};

export function getGardens(locale: Locale): Garden[] {
  return gardens.map((garden) => localizeGarden(garden, translations[garden.id]?.[locale]));
}

export function getGarden(id: string, locale: Locale): Garden | undefined {
  return getGardens(locale).find((garden) => garden.id === id);
}

export { aiGarden, mcpGarden, ragGarden, stackGarden, talksGarden };
export * from "./types";
