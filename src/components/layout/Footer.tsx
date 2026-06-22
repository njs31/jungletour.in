import Image from "next/image";

const tourLinks = [
  "Thailand", "Andaman & Nicobar", "Goa", "Kashmir", "Kerala",
  "Bali", "Dubai", "Bhutan", "Chikmagalur", "Coorg",
  "Mangalore", "Hampi", "Maldives", "Singapore", "Meghalaya",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 – Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Image
                src="/home/bplogoa.jpeg"
                alt="Backpackers United"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-bold text-white text-base">
                BACKPACKERS <span className="text-orange-400">United</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
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
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Tour destination links */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Popular Destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {tourLinks.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-gray-400 hover:text-orange-400 cursor-pointer transition-colors"
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
                  <span className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors">
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
                    <span className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors">
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
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Phone
                </p>
                <a
                  href="tel:+918310822183"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
                >
                  +91 8310822183
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:info@backpackersunited.in"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  info@backpackersunited.in
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
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

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2026 Backpackers United. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
