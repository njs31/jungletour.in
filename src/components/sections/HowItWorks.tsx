import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    step: "01",
    emoji: "🔍",
    title: "Discover Your Trek",
    desc: "Browse 50+ curated treks and tours. Filter by difficulty, duration, or destination.",
  },
  {
    step: "02",
    emoji: "📞",
    title: "Book Securely",
    desc: "Reserve your spot with a small advance. Flexible cancellation and full transparency.",
  },
  {
    step: "03",
    emoji: "📚",
    title: "Get Briefed",
    desc: "Receive a detailed trek brief, packing list, and WhatsApp group invite 3 days before.",
  },
  {
    step: "04",
    emoji: "🏔",
    title: "Trek & Collect Memories",
    desc: "Show up, trek, bond, and come back with stories (and photos) that last a lifetime.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-2">
            Simple process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">From Sofa to Summit</h2>
          <p className="mt-3 text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Getting on a trek with us is easier than you think.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-cta/30 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-cta/20 border border-cta/40 flex items-center justify-center text-2xl mb-4">
                  {s.emoji}
                </div>
                <p className="text-xs font-bold text-cta uppercase tracking-widest mb-1">
                  Step {s.step}
                </p>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
