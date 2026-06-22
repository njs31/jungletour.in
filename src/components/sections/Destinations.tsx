import DestCard from "@/components/ui/DestCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { destinations } from "@/data/destinations";

export default function Destinations() {
  return (
    <section id="destinations" className="py-16 md:py-24 bg-gray-50">
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
