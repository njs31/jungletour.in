import type { APIRoute } from "astro";
import { createCaptchaChallenge } from "@/lib/booking-captcha";

export const GET: APIRoute = async () => {
  const challenge = createCaptchaChallenge();
  return Response.json(challenge);
};
