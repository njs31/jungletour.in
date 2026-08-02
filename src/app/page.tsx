import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedCategoriesSection from "@/components/sections/FeaturedCategoriesSection";
import WeekendTours from "@/components/sections/WeekendTours";
import HimalayanTreks from "@/components/sections/HimalayanTreks";
import Destinations from "@/components/sections/Destinations";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import SectionLoading from "@/components/ui/SectionLoading";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<SectionLoading />}>
          <Hero />
        </Suspense>
        <Stats />
        <ExploreCategories />
        <Suspense fallback={<SectionLoading />}>
          <FeaturedCategoriesSection />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <WeekendTours />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <HimalayanTreks />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Destinations />
        </Suspense>
        <WhyChooseUs />
        <Testimonials />
        <Suspense fallback={<SectionLoading />}>
          <CTABanner />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Blog />
        </Suspense>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
