import SectionHeader from "@/components/ui/SectionHeader";

const pillars = [
  {
    emoji: "🏅",
    title: "Certified Trek Leaders",
    desc: "Every trek led by trained, first-aid certified guides who know the trails inside out.",
  },
  {
    emoji: "📋",
    title: "All Permits Handled",
    desc: "Forest permits, entry fees, accommodation — we handle every detail so you just show up.",
  },
  {
    emoji: "👥",
    title: "Small Batches",
    desc: "Max 20 people per batch for a personal, safe, and immersive trekking experience.",
  },
  {
    emoji: "🌱",
    title: "Leave No Trace",
    desc: "We carry back every piece of waste and actively restore the trails we walk on.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Why Jungle Tours & Treks"
            title="Built for the Trail"
            subtitle="Seven years of leading treks in the Western Ghats and beyond. We are not a marketplace — we are the team on the ground with you."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-2xl bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
