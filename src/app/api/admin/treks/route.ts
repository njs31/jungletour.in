import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getAdminTrekFormData,
  listAdminTreks,
  upsertTrekOverride,
} from "@/lib/treks/overrides";
import type { TrekOverrideInput } from "@/types/trek-override";

export async function GET(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trekId = new URL(request.url).searchParams.get("trekId");

  if (trekId) {
    const trek = await getAdminTrekFormData(trekId);
    if (!trek) {
      return NextResponse.json({ error: "Trek not found" }, { status: 404 });
    }
    return NextResponse.json({ trek });
  }

  const treks = await listAdminTreks();
  return NextResponse.json({ treks });
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const trekId = String(body.trekId ?? "");
    if (!trekId) {
      return NextResponse.json({ error: "trekId is required" }, { status: 400 });
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
    return NextResponse.json({ success: true, trek: updated });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save trek";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
