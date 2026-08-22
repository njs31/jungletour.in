import type { APIRoute } from "astro";
import {
  buildSessionCookieHeader,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!verifyAdminCredentials(username, password)) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createAdminSessionToken(username);

  return new Response(JSON.stringify({ success: true }), {
    headers: [
      ["Content-Type", "application/json"],
      ["Set-Cookie", buildSessionCookieHeader(token, 60 * 60 * 24)],
    ],
  });
};
