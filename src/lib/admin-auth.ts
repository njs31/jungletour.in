import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "jtt_admin_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "jtt-dev-session-secret-change-me";
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
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

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const [username, timestamp] = payload.split(":");
    const expectedUser = process.env.ADMIN_USERNAME;
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

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("Unauthorized");
  }
}
