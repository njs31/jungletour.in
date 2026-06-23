import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

function getCaptchaSecret() {
  return (
    process.env.BOOKING_CAPTCHA_SECRET ??
    process.env.ADMIN_SESSION_SECRET ??
    "jtt-dev-booking-captcha"
  );
}

export function createCaptchaChallenge() {
  const a = randomInt(2, 12);
  const b = randomInt(2, 12);
  const token = createHmac("sha256", getCaptchaSecret())
    .update(`${a}:${b}`)
    .digest("hex");

  return { a, b, token };
}

export function verifyCaptchaAnswer(
  answer: number,
  a: number,
  b: number,
  token: string
) {
  if (!Number.isFinite(answer) || !Number.isFinite(a) || !Number.isFinite(b)) {
    return false;
  }

  const expectedToken = createHmac("sha256", getCaptchaSecret())
    .update(`${a}:${b}`)
    .digest("hex");

  try {
    const tokenOk = timingSafeEqual(
      Buffer.from(token),
      Buffer.from(expectedToken)
    );
    return tokenOk && answer === a + b;
  } catch {
    return false;
  }
}
