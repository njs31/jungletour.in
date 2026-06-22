import {
  trekDetailIds,
  trekDetailsBySlug,
  getTrekBySlug,
} from "@/data/treks/registry";

export const trekDetailSlugs = new Set(trekDetailIds);

export function getTrekDetailHref(id: string) {
  return trekDetailSlugs.has(id) ? `/trek/${id}-trek` : undefined;
}

export { getTrekBySlug, trekDetailsBySlug, trekDetailIds };
