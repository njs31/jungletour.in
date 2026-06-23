import Link from "next/link";
import LoadingImage from "@/components/ui/LoadingImage";

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
                src="/logo.png"
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
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Expert-led treks and weekend tours from Bangalore. Curated for
              every kind of adventurer since 2017.
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
                <p className="text-xs text-white/50 uppercase tracking-wide mb-0.5">
                  Phone
                </p>
                <a
                  href="tel:+918310822183"
                  className="text-white/70 hover:text-cta transition-colors font-medium"
                >
                  +91 8310822183
                </a>
              </li>
              <li>
                <p className="text-xs text-white/50 uppercase tracking-wide mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:info@jungletoursandtreks.in"
                  className="text-white/70 hover:text-cta transition-colors"
                >
                  info@jungletoursandtreks.in
                </a>
              </li>
              <li>
                <p className="text-xs text-white/50 uppercase tracking-wide mb-0.5">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/918310822183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Chat with Us
                </a>
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
