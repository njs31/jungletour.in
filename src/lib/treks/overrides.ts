import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { TrekCard } from "@/types";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekOverride, TrekOverrideInput } from "@/types/trek-override";
import {
  trekDetails,
  trekDetailsBySlug,
  trekDetailIds,
  getTrekBySlug,
} from "@/data/treks/registry";

function parseOverrideRow(row: Record<string, unknown>): TrekOverride {
  return {
    trek_id: String(row.trek_id),
    price: (row.price as string) ?? null,
    original_price: (row.original_price as string) ?? null,
    discount_label: (row.discount_label as string) ?? null,
    title: (row.title as string) ?? null,
    meta_description: (row.meta_description as string) ?? null,
    duration: (row.duration as string) ?? null,
    difficulty: (row.difficulty as string) ?? null,
    altitude: (row.altitude as string) ?? null,
    distance: (row.distance as string) ?? null,
    next_trip_dates: Array.isArray(row.next_trip_dates)
      ? (row.next_trip_dates as TrekOverride["next_trip_dates"])
      : [],
    highlights: Array.isArray(row.highlights)
      ? (row.highlights as string[])
      : null,
    is_active: row.is_active !== false,
    updated_at: String(row.updated_at ?? new Date().toISOString()),
  };
}

export async function fetchAllTrekOverrides(): Promise<
  Record<string, TrekOverride>
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("trek_overrides").select("*");

    if (error || !data) return {};

    return Object.fromEntries(
      data.map((row) => [String(row.trek_id), parseOverrideRow(row)])
    );
  } catch {
    return {};
  }
}

export async function fetchTrekOverride(
  trekId: string
): Promise<TrekOverride | null> {
  const all = await fetchAllTrekOverrides();
  return all[trekId] ?? null;
}

function applyOverrideToTrek(
  trek: TrekDetail,
  override: TrekOverride | null
): TrekDetail {
  if (!override) return trek;

  return {
    ...trek,
    title: override.title || trek.title,
    metaDescription: override.meta_description || trek.metaDescription,
    price: override.price || trek.price,
    originalPrice: override.original_price ?? trek.originalPrice,
    discountLabel: override.discount_label ?? trek.discountLabel,
    duration: override.duration || trek.duration,
    difficulty: override.difficulty || trek.difficulty,
    altitude: override.altitude || trek.altitude,
    distance: override.distance || trek.distance,
    highlights:
      override.highlights && override.highlights.length > 0
        ? override.highlights
        : trek.highlights,
    departures: [],
  };
}

function applyOverrideToCard(
  card: TrekCard,
  override: TrekOverride | null
): TrekCard {
  if (!override) return card;

  return {
    ...card,
    title: override.title || card.title,
    price: override.price || card.price,
    duration: override.duration || card.duration,
    elevation: override.altitude
      ? card.elevation.includes("·")
        ? `${override.altitude} · ${override.distance || card.elevation.split("·")[1]?.trim() || ""}`.trim()
        : override.altitude
      : card.elevation,
  };
}

export async function getTrekBySlugWithOverrides(slug: string) {
  const base = getTrekBySlug(slug);
  if (!base) return null;

  const trekId = slug.replace(/-trek$/, "");
  const override = await fetchTrekOverride(trekId);
  return applyOverrideToTrek(base, override);
}

export async function getAllTreksWithOverrides() {
  const overrides = await fetchAllTrekOverrides();
  return trekDetails.map((trek) => {
    const trekId = trek.slug.replace(/-trek$/, "");
    return applyOverrideToTrek(trek, overrides[trekId] ?? null);
  });
}

export async function getPackagesWithOverrides(packages: TrekCard[]) {
  const overrides = await fetchAllTrekOverrides();
  return packages.map((pkg) =>
    applyOverrideToCard(pkg, overrides[pkg.id] ?? null)
  );
}

export async function listAdminTreks() {
  const overrides = await fetchAllTrekOverrides();

  return trekDetailIds.map((id) => {
    const slug = `${id}-trek`;
    const base = trekDetailsBySlug[slug];
    const override = overrides[id] ?? null;

    return {
      id,
      slug,
      title: override?.title || base?.title || id,
      price: override?.price || base?.price || "",
      duration: override?.duration || base?.duration || "",
      nextTripDates: override?.next_trip_dates ?? [],
      isActive: override?.is_active ?? true,
      updatedAt: override?.updated_at ?? null,
    };
  });
}

export async function upsertTrekOverride(
  trekId: string,
  input: TrekOverrideInput
) {
  const admin = createAdminClient();
  const base = trekDetailsBySlug[`${trekId}-trek`];

  const payload = {
    trek_id: trekId,
    price: input.price ?? base?.price ?? null,
    original_price: input.original_price ?? base?.originalPrice ?? null,
    discount_label: input.discount_label ?? base?.discountLabel ?? null,
    title: input.title ?? base?.title ?? null,
    meta_description: input.meta_description ?? base?.metaDescription ?? null,
    duration: input.duration ?? base?.duration ?? null,
    difficulty: input.difficulty ?? base?.difficulty ?? null,
    altitude: input.altitude ?? base?.altitude ?? null,
    distance: input.distance ?? base?.distance ?? null,
    next_trip_dates: input.next_trip_dates ?? [],
    highlights: input.highlights ?? base?.highlights ?? null,
    is_active: input.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await admin
    .from("trek_overrides")
    .upsert(payload, { onConflict: "trek_id" })
    .select("*")
    .single();

  if (error) throw error;
  return parseOverrideRow(data);
}

export async function getAdminTrekFormData(trekId: string) {
  const slug = `${trekId}-trek`;
  const base = trekDetailsBySlug[slug];
  if (!base) return null;

  const override = await fetchTrekOverride(trekId);

  return {
    trekId,
    slug,
    title: override?.title || base.title,
    metaDescription: override?.meta_description || base.metaDescription,
    price: override?.price || base.price,
    originalPrice: override?.original_price || base.originalPrice || "",
    discountLabel: override?.discount_label || base.discountLabel || "",
    duration: override?.duration || base.duration,
    difficulty: override?.difficulty || base.difficulty,
    altitude: override?.altitude || base.altitude,
    distance: override?.distance || base.distance,
    nextTripDates: override?.next_trip_dates ?? [],
    highlights: override?.highlights?.length
      ? override.highlights
      : base.highlights,
    isActive: override?.is_active ?? true,
  };
}
