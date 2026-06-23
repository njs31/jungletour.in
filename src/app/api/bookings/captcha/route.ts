import { NextResponse } from "next/server";
import { createCaptchaChallenge } from "@/lib/booking-captcha";

export async function GET() {
  const challenge = createCaptchaChallenge();
  return NextResponse.json(challenge);
}
