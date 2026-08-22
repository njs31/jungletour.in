import { getEnv } from "@/lib/env";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { ImageOverride, ResolvedImageSlot } from "@/types/image-override";
import { buildImageCatalog, getImageSlotByKey } from "@/lib/images/catalog";

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(STORE_DIR, "image-overrides.json");

function parseOverrideRow(row: Record<string, unknown>): ImageOverride {
  return {
    image_key: String(row.image_key),
    url: String(row.url),
    alt: (row.alt as string) ?? null,
    storage_path: (row.storage_path as string) ?? null,
    updated_at: String(row.updated_at ?? new Date().toISOString()),
  };
}

async function readFileImageOverrides(): Promise<Record<string, ImageOverride>> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Record<string, ImageOverride>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

async function writeFileImageOverride(override: ImageOverride) {
  const all = await readFileImageOverrides();
  all[override.image_key] = override;
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(all, null, 2), "utf8");
  return override;
}

async function deleteFileImageOverride(imageKey: string) {
  const all = await readFileImageOverrides();
  delete all[imageKey];
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(all, null, 2), "utf8");
}

export const fetchAllImageOverrides = cache(async (): Promise<
  Record<string, ImageOverride>
> => {
  const fileOverrides = await readFileImageOverrides();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("image_overrides").select("*");

    if (error || !data) return fileOverrides;

    const dbOverrides = Object.fromEntries(
      data.map((row) => [String(row.image_key), parseOverrideRow(row)])
    );

    return { ...fileOverrides, ...dbOverrides };
  } catch {
    return fileOverrides;
  }
});

export async function getResolvedImageUrl(key: string, defaultUrl: string) {
  const overrides = await fetchAllImageOverrides();
  return overrides[key]?.url || defaultUrl;
}

export async function listResolvedImageSlots(): Promise<ResolvedImageSlot[]> {
  const catalog = buildImageCatalog();
  const overrides = await fetchAllImageOverrides();

  return catalog.map((slot) => {
    const override = overrides[slot.key];
    return {
      ...slot,
      currentUrl: override?.url || slot.defaultUrl,
      currentAlt: override?.alt || slot.defaultAlt,
      isOverridden: Boolean(override),
      storagePath: override?.storage_path ?? null,
      updatedAt: override?.updated_at ?? null,
    };
  });
}

export async function upsertImageOverride(input: {
  imageKey: string;
  url: string;
  alt?: string | null;
  storagePath?: string | null;
}) {
  const slot = getImageSlotByKey(input.imageKey);
  if (!slot) {
    throw new Error("Unknown image slot");
  }

  const payload = {
    image_key: input.imageKey,
    url: input.url,
    alt: input.alt ?? slot.defaultAlt,
    storage_path: input.storagePath ?? null,
    updated_at: new Date().toISOString(),
  };

  if (getEnv("SUPABASE_SERVICE_ROLE_KEY")) {
    try {
      const admin = createAdminClient();
      const { data, error } = await admin
        .from("image_overrides")
        .upsert(payload, { onConflict: "image_key" })
        .select("*")
        .single();

      if (error) throw error;
      return parseOverrideRow(data);
    } catch {
      // Fall through to local file store.
    }
  }

  return writeFileImageOverride(payload);
}

export async function removeImageOverride(imageKey: string) {
  if (getEnv("SUPABASE_SERVICE_ROLE_KEY")) {
    try {
      const admin = createAdminClient();
      const { error } = await admin
        .from("image_overrides")
        .delete()
        .eq("image_key", imageKey);

      if (error) throw error;
      return;
    } catch {
      // Fall through to local file store.
    }
  }

  await deleteFileImageOverride(imageKey);
}

export async function getTripCoverImage(tripId: string, defaultUrl: string) {
  return getResolvedImageUrl(`trip:${tripId}:cover`, defaultUrl);
}

export async function getTripGalleryImages(
  tripId: string,
  defaults: { src: string; alt: string }[]
) {
  const overrides = await fetchAllImageOverrides();
  const prefix = `trip:${tripId}:gallery:`;

  const overriddenEntries = Object.entries(overrides)
    .filter(([key]) => key.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b));

  if (overriddenEntries.length === 0) {
    const cover = overrides[`trip:${tripId}:cover`];
    if (!cover) return defaults;

    return [
      { src: cover.url, alt: cover.alt || defaults[0]?.alt || "" },
      ...defaults.slice(1),
    ];
  }

  return overriddenEntries.map(([, override], index) => ({
    src: override.url,
    alt: override.alt || defaults[index]?.alt || "",
  }));
}
