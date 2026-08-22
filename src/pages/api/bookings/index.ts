import type { APIRoute } from "astro";
import { verifyCaptchaAnswer } from "@/lib/booking-captcha";
import { createBookingInquiry, normalizePhone } from "@/lib/bookings";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (body.website) {
      return Response.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const phone = normalizePhone(String(body.phone ?? ""));
    const tripTitle = String(body.tripTitle ?? "").trim();
    const tripSlug = String(body.tripSlug ?? "").trim() || null;
    const tripId = String(body.tripId ?? "").trim() || null;
    const answer = Number(body.answer);
    const a = Number(body.a);
    const b = Number(body.b);
    const token = String(body.token ?? "");

    if (!name || name.length < 2) {
      return Response.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!phone) {
      return Response.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!tripTitle) {
      return Response.json(
        { error: "Trip information is missing." },
        { status: 400 }
      );
    }

    if (!verifyCaptchaAnswer(answer, a, b, token)) {
      return Response.json(
        { error: "Incorrect answer. Please solve the math question." },
        { status: 400 }
      );
    }

    await createBookingInquiry({
      tripId,
      tripSlug,
      tripTitle,
      name,
      phone,
    });

    return Response.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit booking";
    return Response.json({ error: message }, { status: 500 });
  }
};
