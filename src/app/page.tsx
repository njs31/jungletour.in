import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import WeekendTours from "@/components/sections/WeekendTours";
import HimalayanTreks from "@/components/sections/HimalayanTreks";
import Destinations from "@/components/sections/Destinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";
import { getPackagesWithOverrides } from "@/lib/treks/overrides";

export const revalidate = 60;

export default async function Home() {
  const [twoNights, weekend, sunrise] = await Promise.all([
    getPackagesWithOverrides(twoNightPackages),
    getPackagesWithOverrides(weekendEscapes),
    getPackagesWithOverrides(sunriseTreks),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedCategories
          twoNightPackages={twoNights}
          weekendEscapes={weekend}
          sunriseTreks={sunrise}
        />
        <WeekendTours />
        <HimalayanTreks />
        <Destinations />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
        <Blog />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
