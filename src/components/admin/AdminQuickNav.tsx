"use client";

const links = [
  { href: "#bookings", label: "Bookings" },
  { href: "/admin/images", label: "Images", external: true },
  { href: "#trips", label: "Trips" },
] as const;

export default function AdminQuickNav() {
  return (
    <nav
      aria-label="Dashboard sections"
      className="sticky top-[57px] z-30 -mx-4 mb-5 border-b border-brand-border bg-surface/95 px-4 py-2 backdrop-blur-md sm:top-[73px] sm:-mx-6 sm:px-6 md:hidden"
    >
      <div className="flex gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex-1 rounded-lg border border-brand-border bg-white px-3 py-2.5 text-center text-sm font-semibold text-brand-text shadow-sm transition-colors hover:border-cta/30 hover:text-cta"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
