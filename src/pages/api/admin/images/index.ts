import type { APIRoute } from "astro";
import { requireAdminRequest } from "@/lib/admin-auth";
import {
  fetchAllImageOverrides,
  listResolvedImageSlots,
  removeImageOverride,
} from "@/lib/images/overrides";
import { deleteImageFromStorage } from "@/lib/images/storage";

export const GET: APIRoute = async ({ request }) => {
  try {
    requireAdminRequest(request);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slots = await listResolvedImageSlots();
  return Response.json({ slots });
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    requireAdminRequest(request);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const imageKey = String(body.imageKey ?? "").trim();

    if (!imageKey) {
      return Response.json(
        { error: "imageKey is required" },
        { status: 400 }
      );
    }

    const existing = (await fetchAllImageOverrides())[imageKey];
    if (!existing) {
      return Response.json({ success: true });
    }

    if (existing.storage_path) {
      await deleteImageFromStorage(existing.storage_path);
    }

    await removeImageOverride(imageKey);

    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return Response.json({ error: message }, { status: 500 });
  }
};
