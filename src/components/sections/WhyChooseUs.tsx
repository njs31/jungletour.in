import SectionHeader from "@/components/ui/SectionHeader";

const pillars = [
  {
    title: "Local trek leads",
    desc: "Experienced guides who know the Western Ghats routes, weather, and safety protocols.",
  },
  {
    title: "Permits sorted",
    desc: "Forest permits, stays, and logistics are handled — you pack light and show up ready.",
  },
  {
    title: "Small groups",
    desc: "Intimate batches so every trekker gets attention, pace support, and a better trail experience.",
  },
  {
    title: "Honest planning",
    desc: "Clear inclusions, transparent pricing, and practical advice before you book.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Why Jungle Tours & Treks"
            title="Built for real trail days"
            subtitle="Since 2023 we've been crafting memorable treks and getaways from Bangalore — with care on the ground, not just a brochure online."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, index) => (
            <div
              key={p.title}
              className="border-l-2 border-cta/40 bg-surface px-5 py-6"
            >
              <p className="font-display text-sm font-semibold text-cta">
                0{index + 1}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-brand-text">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
