import DestCard from "@/components/ui/DestCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getDestinationsWithOverrides } from "@/lib/images/content";

export default async function Destinations() {
  const destinations = await getDestinationsWithOverrides();

  return (
    <section id="destinations" className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Explore by Region"
            title="Popular Destinations"
            subtitle="Discover adventures across South India's most iconic landscapes."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <DestCard key={dest.id} dest={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
