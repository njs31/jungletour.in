import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { TrekCard, TourCard, HimalayanTrek } from "@/types";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekOverride, TrekOverrideInput } from "@/types/trek-override";
import {
  getTrekBySlug,
} from "@/data/treks/registry";
import {
  getAdminTripById,
  getAllAdminTrips,
  type AdminTripCatalogEntry,
} from "@/lib/trips/catalog";
import {
  readFileOverrides,
  writeFileOverride,
  mergeOverrides,
} from "@/lib/treks/override-store";
import { weekendTours } from "@/data/tours";
import { himalayanTreks } from "@/data/himalayan";
import {
  fetchAllImageOverrides,
  getTripGalleryImages,
} from "@/lib/images/overrides";

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

function isTripActive(override: TrekOverride | null | undefined) {
  return override?.is_active !== false;
}

function departuresFromOverride(
  trek: TrekDetail,
  override: TrekOverride | null
): TrekDetail["departures"] {
  if (!override?.next_trip_dates?.length) return trek.departures;

  const priceLabel = `${override.price || trek.price} / person`;
  return override.next_trip_dates.map((trip) => ({
    date: trip.date,
    status: trip.status,
    price: priceLabel,
  }));
}

export const fetchAllTrekOverrides = cache(async (): Promise<
  Record<string, TrekOverride>
> => {
  const fileOverrides = await readFileOverrides();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("trek_overrides").select("*");

    if (error || !data) return fileOverrides;

    const dbOverrides = Object.fromEntries(
      data.map((row) => [String(row.trek_id), parseOverrideRow(row)])
    );
    return mergeOverrides(dbOverrides, fileOverrides);
  } catch {
    return fileOverrides;
  }
});

export async function fetchTrekOverride(
  trekId: string
): Promise<TrekOverride | null> {
  const all = await fetchAllTrekOverrides();
  return all[trekId] ?? null;
}

function applyOverrideToTrek(
  trek: TrekDetail,
  override: TrekOverride | null,
  images?: TrekDetail["images"]
): TrekDetail {
  if (!override && !images) return trek;

  return {
    ...trek,
    ...(images ? { images } : {}),
    title: override?.title || trek.title,
    metaDescription: override?.meta_description || trek.metaDescription,
    price: override?.price || trek.price,
    originalPrice: override?.original_price ?? trek.originalPrice,
    discountLabel: override?.discount_label ?? trek.discountLabel,
    duration: override?.duration || trek.duration,
    difficulty: override?.difficulty || trek.difficulty,
    altitude: override?.altitude || trek.altitude,
    distance: override?.distance || trek.distance,
    highlights:
      override?.highlights && override.highlights.length > 0
        ? override.highlights
        : trek.highlights,
    departures: departuresFromOverride(trek, override),
  };
}

function applyOverrideToCard(
  card: TrekCard,
  override: TrekOverride | null,
  imageUrl?: string
): TrekCard {
  const nextCard = imageUrl ? { ...card, image: imageUrl } : card;
  if (!override) return nextCard;

  return {
    ...nextCard,
    title: override.title || nextCard.title,
    price: override.price || nextCard.price,
    duration: override.duration || nextCard.duration,
    elevation: override.altitude
      ? nextCard.elevation.includes("·")
        ? `${override.altitude} · ${override.distance || nextCard.elevation.split("·")[1]?.trim() || ""}`.trim()
        : override.altitude
      : nextCard.elevation,
  };
}

function applyOverrideToTour(
  tour: TourCard,
  override: TrekOverride | null,
  imageUrl?: string
): TourCard {
  const nextTour = imageUrl ? { ...tour, image: imageUrl } : tour;
  if (!override) return nextTour;

  return {
    ...nextTour,
    title: override.title || nextTour.title,
    price: override.price || nextTour.price,
    duration: override.duration || nextTour.duration,
  };
}

function applyOverrideToHimalayan(
  trek: HimalayanTrek,
  override: TrekOverride | null,
  imageUrl?: string
): HimalayanTrek {
  const nextTrek = imageUrl ? { ...trek, image: imageUrl } : trek;
  if (!override) return nextTrek;

  return {
    ...nextTrek,
    title: override.title || nextTrek.title,
    price: override.price || nextTrek.price,
    duration: override.duration || nextTrek.duration,
    difficulty: override.difficulty || nextTrek.difficulty,
    elevation: override.altitude || nextTrek.elevation,
  };
}

export async function getTrekBySlugWithOverrides(slug: string) {
  const base = getTrekBySlug(slug);
  if (!base) return null;

  const trekId = slug.replace(/-trek$/, "");
  const override = await fetchTrekOverride(trekId);
  if (!isTripActive(override)) return null;

  const images = await getTripGalleryImages(trekId, base.images);
  return applyOverrideToTrek(base, override, images);
}

export async function getPackagesWithOverrides(packages: TrekCard[]) {
  const overrides = await fetchAllTrekOverrides();
  const imageOverrides = await fetchAllImageOverrides();

  return packages
    .filter((pkg) => isTripActive(overrides[pkg.id]))
    .map((pkg) => {
      const cover =
        imageOverrides[`trip:${pkg.id}:cover`]?.url || pkg.image;
      return applyOverrideToCard(pkg, overrides[pkg.id] ?? null, cover);
    });
}

export async function getToursWithOverrides() {
  const overrides = await fetchAllTrekOverrides();
  const imageOverrides = await fetchAllImageOverrides();

  return weekendTours
    .filter((tour) => isTripActive(overrides[tour.id]))
    .map((tour) => {
      const cover =
        imageOverrides[`trip:${tour.id}:cover`]?.url || tour.image;
      return applyOverrideToTour(tour, overrides[tour.id] ?? null, cover);
    });
}

export async function getHimalayanWithOverrides() {
  const overrides = await fetchAllTrekOverrides();
  const imageOverrides = await fetchAllImageOverrides();

  return himalayanTreks
    .filter((trek) => isTripActive(overrides[trek.id]))
    .map((trek) => {
      const cover =
        imageOverrides[`trip:${trek.id}:cover`]?.url || trek.image;
      return applyOverrideToHimalayan(trek, overrides[trek.id] ?? null, cover);
    });
}

function buildUpsertPayload(
  trekId: string,
  base: AdminTripCatalogEntry,
  input: TrekOverrideInput
) {
  return {
    trek_id: trekId,
    price: input.price ?? base.price ?? null,
    original_price: input.original_price ?? base.originalPrice ?? null,
    discount_label: input.discount_label ?? base.discountLabel ?? null,
    title: input.title ?? base.title ?? null,
    meta_description: input.meta_description ?? base.metaDescription ?? null,
    duration: input.duration ?? base.duration ?? null,
    difficulty: input.difficulty ?? base.difficulty ?? null,
    altitude: input.altitude ?? base.altitude ?? null,
    distance: input.distance ?? base.distance ?? null,
    next_trip_dates: input.next_trip_dates ?? [],
    highlights: input.highlights ?? base.highlights ?? null,
    is_active: input.is_active ?? true,
    updated_at: new Date().toISOString(),
  };
}

async function upsertViaServiceRole(payload: ReturnType<typeof buildUpsertPayload>) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("trek_overrides")
    .upsert(payload, { onConflict: "trek_id" })
    .select("*")
    .single();

  if (error) throw error;
  return parseOverrideRow(data);
}

async function upsertViaRpc(payload: ReturnType<typeof buildUpsertPayload>) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is required for admin saves. Add it to .env.local."
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("upsert_trek_override_admin", {
    p_payload: payload,
    p_secret: secret,
  });

  if (error) throw error;
  return parseOverrideRow(data as Record<string, unknown>);
}

function payloadToOverride(
  trekId: string,
  payload: ReturnType<typeof buildUpsertPayload>
): TrekOverride {
  return {
    trek_id: trekId,
    price: payload.price,
    original_price: payload.original_price,
    discount_label: payload.discount_label,
    title: payload.title,
    meta_description: payload.meta_description,
    duration: payload.duration,
    difficulty: payload.difficulty,
    altitude: payload.altitude,
    distance: payload.distance,
    next_trip_dates: payload.next_trip_dates,
    highlights: payload.highlights,
    is_active: payload.is_active,
    updated_at: payload.updated_at,
  };
}

export async function upsertTrekOverride(
  trekId: string,
  input: TrekOverrideInput
) {
  const base = getAdminTripById(trekId);
  if (!base) {
    throw new Error("Trip not found");
  }

  const payload = buildUpsertPayload(trekId, base, input);
  const fileFallback = () =>
    writeFileOverride(trekId, payloadToOverride(trekId, payload));

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      return await upsertViaServiceRole(payload);
    } catch {
      // Fall through to RPC or local file store.
    }
  }

  try {
    return await upsertViaRpc(payload);
  } catch {
    return fileFallback();
  }
}

export async function listAdminTreks() {
  const overrides = await fetchAllTrekOverrides();

  return getAllAdminTrips().map((trip) => {
    const override = overrides[trip.id] ?? null;

    return {
      id: trip.id,
      slug: trip.slug,
      kind: trip.kind,
      kindLabel: trip.kindLabel,
      title: override?.title || trip.title,
      price: override?.price || trip.price,
      duration: override?.duration || trip.duration,
      nextTripDates: override?.next_trip_dates ?? [],
      isActive: override?.is_active ?? true,
      updatedAt: override?.updated_at ?? null,
    };
  });
}

export async function getAdminTrekFormData(trekId: string) {
  const base = getAdminTripById(trekId);
  if (!base) return null;

  const override = await fetchTrekOverride(trekId);

  return {
    trekId,
    kind: base.kind,
    slug: base.slug,
    title: override?.title || base.title,
    metaDescription: override?.meta_description || base.metaDescription || "",
    price: override?.price || base.price,
    originalPrice: override?.original_price || base.originalPrice || "",
    discountLabel: override?.discount_label || base.discountLabel || "",
    duration: override?.duration || base.duration,
    difficulty: override?.difficulty || base.difficulty || "",
    altitude: override?.altitude || base.altitude || "",
    distance: override?.distance || base.distance || "",
    nextTripDates: override?.next_trip_dates ?? [],
    highlights:
      override?.highlights?.length
        ? override.highlights
        : base.highlights ?? [],
    isActive: override?.is_active ?? true,
  };
}
