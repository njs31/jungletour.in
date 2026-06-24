import { getTrekDetailHref } from "@/data/treks";
import { getWhatsAppUrl } from "@/lib/contact";

const TOUR_TREK_ALIASES: Record<string, string> = {
  "gokarna-murudeshwar": "gokarna-beach",
};

export function resolveTripHref(id: string, title?: string): string {
  const trekHref =
    getTrekDetailHref(id) ??
    (TOUR_TREK_ALIASES[id]
      ? getTrekDetailHref(TOUR_TREK_ALIASES[id])
      : undefined);

  if (trekHref) return trekHref;

  const label = title ?? id;
  return getWhatsAppUrl(`Hi! I'd like to know more about ${label}.`);
}

export function isExternalHref(href: string) {
  return href.startsWith("http");
}

export function getDestinationHref(id: string): string {
  const map: Record<string, string> = {
    "western-ghats": "/#2nights-packages",
    gokarna: "/trek/gokarna-beach-trek",
    coorg: "/#tours",
    chikmagalur: "/#tours",
    hampi: "/#tours",
    "around-bangalore": "/#sunrise-treks",
    munnar: "/#tours",
    ooty: "/#tours",
    kodaikanal: "/#tours",
    sakleshpur: "/#2nights-packages",
    dandeli: "/#tours",
    pondicherry: "/#tours",
  };

  return map[id] ?? "/#destinations";
}

export function getBlogPostHref(id: string): string {
  const map: Record<string, string> = {
    "things-to-do-bangalore": "/#sunrise-treks",
    "places-wayanad": "/#tours",
    "reasons-munnar": "/#tours",
    "chikmagalur-attractions": "/#tours",
  };

  return map[id] ?? "/#packages";
}
