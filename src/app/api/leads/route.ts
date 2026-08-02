import { NextResponse } from "next/server";
import { createBookingInquiry, normalizePhone } from "@/lib/bookings";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const phone = normalizePhone(String(body.phone ?? ""));
    const interest = String(body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    await createBookingInquiry({
      tripId: null,
      tripSlug: null,
      tripTitle: interest || "Homepage enquiry",
      name,
      phone,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit enquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
