import type { Metadata } from "next";
import { Construction, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Under Maintenance | Jungle Tours & Treks",
  description:
    "Jungle Tours & Treks is temporarily under maintenance. We will be back online shortly.",
  robots: { index: false, follow: false },
};

export default function UnderDeploymentPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 py-12 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #f47c2c 0%, transparent 45%), radial-gradient(circle at 80% 80%, #16165c 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm sm:size-20">
          <Construction className="size-8 text-cta sm:size-10" aria-hidden />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cta sm:text-sm">
          Jungle Tours & Treks
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Site Under Maintenance
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
          We&apos;re performing scheduled maintenance to improve your experience.
          The full site will be back online shortly. Thank you for your patience.
        </p>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur-sm sm:p-6">
          <p className="text-sm font-semibold text-white">
            Need to book a trek or tour?
          </p>
          <p className="mt-1 text-xs text-white/65 sm:text-sm">
            Reach us directly while the site is under maintenance.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/918310822183"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cta px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
            <a
              href="tel:+918310822183"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <Phone className="size-4" aria-hidden />
              Call us
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-white/45">
          Expert-led adventures from Bangalore since 2017
        </p>
      </div>
    </div>
  );
}
