import TrekCard from "@/components/ui/TrekCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getToursWithOverrides } from "@/lib/treks/overrides";

export default async function WeekendTours() {
  const weekendTours = await getToursWithOverrides();

  return (
    <section id="tours" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="Weekend Escapes"
            title="Tours: Getaways Worth the Drive"
            subtitle="Curated weekend trips from Bangalore to South India's most beautiful destinations."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weekendTours.map((tour) => (
            <TrekCard key={tour.id} trek={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
