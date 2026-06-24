import { getResolvedImageUrl } from "@/lib/images/overrides";
import { SITE_IMAGE_DEFAULTS } from "@/lib/images/catalog";
import {
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";

export default async function CTABanner() {
  const backgroundImage = await getResolvedImageUrl(
    "site:cta-banner",
    SITE_IMAGE_DEFAULTS.ctaBanner
  );

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-navy/90" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Your Next Adventure is One Click Away
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Join 50,000+ trekkers who chose the Western Ghats this season.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CONTACT_PHONE_TEL}
            className="bg-cta text-white font-semibold px-8 py-3.5 rounded-full hover:bg-cta-hover transition-colors"
          >
            Talk to an Expert
          </a>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/15 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
