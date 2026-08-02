import SectionHeader from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <SectionHeader
            eyebrow="Happy Trekkers"
            title="What Trekkers Say"
            subtitle="Stories from travelers who've trekked and explored with us."
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl border border-brand-border bg-surface hover:shadow-md transition-shadow"
            >
              <StarRating rating={t.rating} />
              <p className="mt-3 text-brand-text text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cta-light flex items-center justify-center text-cta font-bold text-xs flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-brand-text text-sm">{t.name}</p>
                  <p className="text-xs text-brand-subtle">{t.trek}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
