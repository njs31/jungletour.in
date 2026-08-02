import PackageSlider from "@/components/ui/PackageSlider";
import SectionHeader from "@/components/ui/SectionHeader";
import { getToursWithOverrides } from "@/lib/treks/overrides";

export default async function WeekendTours() {
  const weekendTours = await getToursWithOverrides();

  return (
    <section id="tours" className="scroll-mt-20 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Explore tours"
            title="Weekend getaways worth the drive"
            subtitle="Curated trips from Bangalore to South India's favourite destinations."
          />
        </div>

        <PackageSlider items={weekendTours} ariaLabel="Weekend tours" />
      </div>
    </section>
  );
}
