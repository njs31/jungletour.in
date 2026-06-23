import { createAdminClient } from "@/lib/supabase/admin";

export const TRIP_IMAGES_BUCKET = "trip-images";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 10 * 1024 * 1024;

function sanitizeStorageSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
}

export function validateImageFile(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WebP, and GIF images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 10 MB or smaller.");
  }
}

export async function uploadImageToStorage(file: File, imageKey: string) {
  validateImageFile(file);

  const admin = createAdminClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `${sanitizeStorageSegment(imageKey)}/${Date.now()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage
    .from(TRIP_IMAGES_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = admin.storage.from(TRIP_IMAGES_BUCKET).getPublicUrl(storagePath);

  return {
    url: data.publicUrl,
    storagePath,
  };
}

export async function deleteImageFromStorage(storagePath: string | null) {
  if (!storagePath) return;

  const admin = createAdminClient();
  const { error } = await admin.storage
    .from(TRIP_IMAGES_BUCKET)
    .remove([storagePath]);

  if (error) {
    throw new Error(error.message);
  }
}
