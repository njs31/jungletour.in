import Link from "next/link";

const categories = [
  {
    href: "#2nights-packages",
    title: "Explore Treks",
    subtitle: "Multi-day Western Ghats trails",
    tone: "from-navy to-navy-light",
  },
  {
    href: "#weekend-escapes",
    title: "Weekend Getaways",
    subtitle: "Short escapes from Bangalore",
    tone: "from-[#0f3d2e] to-[#1a5c45]",
  },
  {
    href: "#sunrise-treks",
    title: "Sunrise Treks",
    subtitle: "Dawn views near the city",
    tone: "from-cta to-cta-hover",
  },
] as const;

export default function ExploreCategories() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-cta">
            Start here
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-brand-text md:text-4xl">
            Pick your kind of adventure
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.tone} px-6 py-10 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Category
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-white/80">{category.subtitle}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-white/95 group-hover:underline">
                  View packages →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
