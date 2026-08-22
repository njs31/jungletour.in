import type { APIRoute } from "astro";
import { isAdminAuthenticatedRequest, requireAdminRequest } from "@/lib/admin-auth";
import {
  getAdminTrekFormData,
  listAdminTreks,
  upsertTrekOverride,
} from "@/lib/treks/overrides";
import type { TrekOverrideInput } from "@/types/trek-override";

export const GET: APIRoute = async ({ request }) => {
  if (!isAdminAuthenticatedRequest(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trekId = new URL(request.url).searchParams.get("trekId");

  if (trekId) {
    const trek = await getAdminTrekFormData(trekId);
    if (!trek) {
      return Response.json({ error: "Trek not found" }, { status: 404 });
    }
    return Response.json({ trek });
  }

  const treks = await listAdminTreks();
  return Response.json({ treks });
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    requireAdminRequest(request);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const trekId = String(body.trekId ?? "");
    if (!trekId) {
      return Response.json({ error: "trekId is required" }, { status: 400 });
    }

    const input: TrekOverrideInput = {
      price: body.price,
      original_price: body.originalPrice,
      discount_label: body.discountLabel,
      title: body.title,
      meta_description: body.metaDescription,
      duration: body.duration,
      difficulty: body.difficulty,
      altitude: body.altitude,
      distance: body.distance,
      next_trip_dates: body.nextTripDates,
      highlights: body.highlights,
      is_active: body.isActive,
    };

    const updated = await upsertTrekOverride(trekId, input);
    return Response.json({ success: true, trek: updated });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save trek";
    return Response.json({ error: message }, { status: 500 });
  }
};
