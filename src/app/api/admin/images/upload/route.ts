import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getImageSlotByKey } from "@/lib/images/catalog";
import {
  fetchAllImageOverrides,
  upsertImageOverride,
} from "@/lib/images/overrides";
import {
  deleteImageFromStorage,
  uploadImageToStorage,
} from "@/lib/images/storage";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const imageKey = String(formData.get("imageKey") ?? "").trim();
    const file = formData.get("file");

    if (!imageKey) {
      return NextResponse.json({ error: "imageKey is required" }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const slot = getImageSlotByKey(imageKey);
    if (!slot) {
      return NextResponse.json({ error: "Unknown image slot" }, { status: 404 });
    }

    const existing = (await fetchAllImageOverrides())[imageKey];
    const uploaded = await uploadImageToStorage(file, imageKey);

    const saved = await upsertImageOverride({
      imageKey,
      url: uploaded.url,
      alt: slot.defaultAlt,
      storagePath: uploaded.storagePath,
    });

    if (existing?.storage_path && existing.storage_path !== uploaded.storagePath) {
      try {
        await deleteImageFromStorage(existing.storage_path);
      } catch {
        // Old file cleanup is best-effort.
      }
    }

    return NextResponse.json({ success: true, override: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
