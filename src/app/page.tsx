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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedCategories />
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
