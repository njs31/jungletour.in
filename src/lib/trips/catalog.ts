import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";
import { weekendTours } from "@/data/tours";
import { himalayanTreks } from "@/data/himalayan";
import { trekDetailsBySlug } from "@/data/treks/registry";

export type AdminTripKind = "trek" | "weekend-tour" | "himalayan";

export interface AdminTripCatalogEntry {
  id: string;
  kind: AdminTripKind;
  kindLabel: string;
  title: string;
  price: string;
  duration: string;
  slug?: string;
  metaDescription?: string;
  originalPrice?: string;
  discountLabel?: string;
  difficulty?: string;
  altitude?: string;
  distance?: string;
  highlights?: string[];
}

const kindLabels: Record<AdminTripKind, string> = {
  trek: "Package trek",
  "weekend-tour": "Weekend tour",
  himalayan: "Himalayan trek",
};

function buildTrekEntry(id: string, kindLabel: string): AdminTripCatalogEntry {
  const slug = `${id}-trek`;
  const detail = trekDetailsBySlug[slug];
  const pkg = [...twoNightPackages, ...weekendEscapes, ...sunriseTreks].find(
    (item) => item.id === id
  );

  return {
    id,
    kind: "trek",
    kindLabel,
    title: detail?.title ?? pkg?.title ?? id,
    price: detail?.price ?? pkg?.price ?? "",
    duration: detail?.duration ?? pkg?.duration ?? "",
    slug,
    metaDescription: detail?.metaDescription,
    originalPrice: detail?.originalPrice,
    discountLabel: detail?.discountLabel,
    difficulty: detail?.difficulty,
    altitude: detail?.altitude,
    distance: detail?.distance,
    highlights: detail?.highlights,
  };
}

const trekEntries: AdminTripCatalogEntry[] = [
  ...twoNightPackages.map((pkg) => buildTrekEntry(pkg.id, "2 Nights")),
  ...weekendEscapes.map((pkg) => buildTrekEntry(pkg.id, "Weekend escape")),
  ...sunriseTreks.map((pkg) => buildTrekEntry(pkg.id, "Sunrise trek")),
];

const tourEntries: AdminTripCatalogEntry[] = weekendTours.map((tour) => ({
  id: tour.id,
  kind: "weekend-tour" as const,
  kindLabel: kindLabels["weekend-tour"],
  title: tour.title,
  price: tour.price,
  duration: tour.duration,
}));

const himalayanEntries: AdminTripCatalogEntry[] = himalayanTreks.map((trek) => ({
  id: trek.id,
  kind: "himalayan" as const,
  kindLabel: kindLabels.himalayan,
  title: trek.title,
  price: trek.price,
  duration: trek.duration,
  difficulty: trek.difficulty,
  altitude: trek.elevation,
}));

const catalogById = Object.fromEntries(
  [...trekEntries, ...tourEntries, ...himalayanEntries].map((entry) => [
    entry.id,
    entry,
  ])
) as Record<string, AdminTripCatalogEntry>;

export const allAdminTripIds = Object.keys(catalogById);

export function getAdminTripById(id: string): AdminTripCatalogEntry | null {
  return catalogById[id] ?? null;
}

export function getAllAdminTrips(): AdminTripCatalogEntry[] {
  return [...trekEntries, ...tourEntries, ...himalayanEntries];
}
