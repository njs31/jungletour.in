import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  fetchAllImageOverrides,
  listResolvedImageSlots,
  removeImageOverride,
} from "@/lib/images/overrides";
import { deleteImageFromStorage } from "@/lib/images/storage";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slots = await listResolvedImageSlots();
  return NextResponse.json({ slots });
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const imageKey = String(body.imageKey ?? "").trim();

    if (!imageKey) {
      return NextResponse.json({ error: "imageKey is required" }, { status: 400 });
    }

    const existing = (await fetchAllImageOverrides())[imageKey];
    if (!existing) {
      return NextResponse.json({ success: true });
    }

    if (existing.storage_path) {
      await deleteImageFromStorage(existing.storage_path);
    }

    await removeImageOverride(imageKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
