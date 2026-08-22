import { createHmac, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/lib/env";

export const ADMIN_COOKIE = "jtt_admin_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getSessionSecret() {
  return getEnv("ADMIN_SESSION_SECRET") ?? "jtt-dev-session-secret-change-me";
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = getEnv("ADMIN_USERNAME");
  const expectedPass = getEnv("ADMIN_PASSWORD");
  if (!expectedUser || !expectedPass) return false;
  return username === expectedUser && password === expectedPass;
}

export function createAdminSessionToken(username: string) {
  const payload = `${username}:${Date.now()}`;
  const signature = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;

  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const [username, timestamp] = payload.split(":");
    const expectedUser = getEnv("ADMIN_USERNAME");
    if (!expectedUser || username !== expectedUser) return false;
    if (Date.now() - Number(timestamp) > SESSION_TTL_MS) return false;

    const expectedSig = createHmac("sha256", getSessionSecret())
      .update(payload)
      .digest("hex");

    return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

function getRequestCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

interface CookieStoreLike {
  get(name: string): { value: string } | undefined;
}

export function isAdminAuthenticatedRequest(request: Request): boolean {
  return verifyAdminSessionToken(getRequestCookie(request, ADMIN_COOKIE));
}

export function isAdminAuthenticatedCookies(cookies: CookieStoreLike): boolean {
  return verifyAdminSessionToken(cookies.get(ADMIN_COOKIE)?.value);
}

export function requireAdminRequest(request: Request): void {
  if (!isAdminAuthenticatedRequest(request)) {
    throw new Error("Unauthorized");
  }
}

export function buildSessionCookieHeader(token: string, maxAge: number): string {
  const parts = [
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (isProduction()) parts.push("Secure");
  return parts.join("; ");
}
