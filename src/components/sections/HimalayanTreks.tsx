import HimalayanCard from "@/components/ui/HimalayanCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { himalayanTreks } from "@/data/himalayan";

export default function HimalayanTreks() {
  return (
    <section id="himalayan" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="High Altitude"
            title="Himalayan Treks"
            subtitle="Step beyond the Western Ghats. Epic multi-day expeditions in the Himalayas."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {himalayanTreks.map((trek) => (
            <HimalayanCard key={trek.id} trek={trek} />
          ))}
        </div>
      </div>
    </section>
  );
}
