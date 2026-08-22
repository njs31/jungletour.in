import type { APIRoute } from "astro";
import { buildSessionCookieHeader } from "@/lib/admin-auth";

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ success: true }), {
    headers: [
      ["Content-Type", "application/json"],
      ["Set-Cookie", buildSessionCookieHeader("", 0)],
    ],
  });
};
