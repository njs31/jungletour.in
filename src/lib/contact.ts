export const CONTACT_PHONE_E164 = "+919980602437";
export const CONTACT_PHONE_DISPLAY = "+91 99806 02437";
export const CONTACT_PHONE_DIGITS = "919980602437";
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_DIGITS}`;
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE_E164}`;

export function getWhatsAppUrl(message?: string) {
  if (!message) return CONTACT_WHATSAPP_URL;
  return `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
