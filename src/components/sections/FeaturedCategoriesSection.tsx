import FeaturedCategories from "@/components/sections/FeaturedCategories";
import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";
import { getPackagesWithOverrides } from "@/lib/treks/overrides";

export default async function FeaturedCategoriesSection() {
  const [twoNights, weekend, sunrise] = await Promise.all([
    getPackagesWithOverrides(twoNightPackages),
    getPackagesWithOverrides(weekendEscapes),
    getPackagesWithOverrides(sunriseTreks),
  ]);

  return (
    <FeaturedCategories
      twoNightPackages={twoNights}
      weekendEscapes={weekend}
      sunriseTreks={sunrise}
    />
  );
}
