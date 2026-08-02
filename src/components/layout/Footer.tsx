import Link from "next/link";
import LoadingImage from "@/components/ui/LoadingImage";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";

const tourLinks = [
  "Thailand", "Andaman & Nicobar", "Goa", "Kashmir", "Kerala",
  "Bali", "Dubai", "Bhutan", "Chikmagalur", "Coorg",
  "Mangalore", "Hampi", "Maldives", "Singapore", "Meghalaya",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 – Brand */}
          <div>
            <Link href="/#home" className="flex items-center gap-2 mb-4">
              <LoadingImage
                src="/logo.webp"
                alt="Jungle Tours & Treks"
                width={40}
                height={40}
                className="rounded-full object-cover"
                showLabel={false}
              />
              <span className="font-bold text-base">
                <span className="text-white">JUNGLE</span>{" "}
                <span className="text-cta">Tours & Treks</span>
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/60">
              Guided treks and weekend getaways from Bangalore — curated for
              every kind of adventurer since 2023.
            </p>
            <div className="flex gap-4">
              {[
                { label: "Facebook", href: "https://facebook.com", icon: "f" },
                { label: "Instagram", href: "https://instagram.com", icon: "ig" },
                { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-navy-light hover:bg-cta flex items-center justify-center text-white/60 hover:text-white transition-colors text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Tour destination links */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                Popular Destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {tourLinks.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-white/55 hover:text-cta cursor-pointer transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 – Links */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm">
              {["Blogs", "About Us", "Careers", "Partner with Us"].map((l) => (
                <li key={l}>
                  <span className="text-white/55 hover:text-cta cursor-pointer transition-colors">
                    {l}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm font-semibold text-white uppercase tracking-widest mt-8 mb-4">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              {["Terms of Use", "Privacy Policy", "Terms & Conditions"].map(
                (l) => (
                  <li key={l}>
                    <span className="text-white/55 hover:text-cta cursor-pointer transition-colors">
                      {l}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 – Contact */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-xs uppercase tracking-wide text-white/50 mb-0.5">
                  Phone
                </p>
                <a
                  href={CONTACT_PHONE_TEL}
                  className="font-medium text-white/70 transition-colors hover:text-cta"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <p className="text-xs uppercase tracking-wide text-white/50 mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:info@jungletoursandtreks.in"
                  className="text-white/70 transition-colors hover:text-cta"
                >
                  info@jungletoursandtreks.in
                </a>
              </li>
              <li className="pt-1">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={CONTACT_PHONE_TEL}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Call
                  </a>
                  <a
                    href={CONTACT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy-light text-center text-xs text-white/50">
          © 2026 Jungle Tours & Treks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
