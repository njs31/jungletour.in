export const CONTACT_PHONE_E164 = "+919481425166";
export const CONTACT_PHONE_DISPLAY = "+91 94814 25166";
export const CONTACT_WHATSAPP_URL = "https://wa.me/919481425166";
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE_E164}`;

export function getWhatsAppUrl(message?: string) {
  if (!message) return CONTACT_WHATSAPP_URL;
  return `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
