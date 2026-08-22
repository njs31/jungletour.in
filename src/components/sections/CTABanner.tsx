import { SITE_IMAGE_DEFAULTS } from "@/lib/images/catalog";
import {
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";

interface CTABannerProps {
  backgroundImage?: string;
}

export default function CTABanner({
  backgroundImage = SITE_IMAGE_DEFAULTS.ctaBanner,
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden py-20 bg-navy">
      <img
        src={backgroundImage}
        alt="Trail landscape"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-navy/88" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Ready for your next trail?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
          Call or WhatsApp us — we&apos;ll help you pick the right trek or getaway.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={CONTACT_PHONE_TEL}
            className="rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover sm:text-base shadow-lg"
          >
            Call 9980602437
          </a>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:text-base shadow-lg"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
