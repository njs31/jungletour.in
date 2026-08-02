import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import PackageSlider from "@/components/ui/PackageSlider";
import HimalayanCard from "@/components/ui/HimalayanCard";
import DestCard from "@/components/ui/DestCard";
import LoadingImage from "@/components/ui/LoadingImage";
import SectionHeader from "@/components/ui/SectionHeader";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import Link from "next/link";
import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";
import {
  getPackagesWithOverrides,
  getToursWithOverrides,
  getHimalayanWithOverrides,
} from "@/lib/treks/overrides";
import {
  getDestinationsWithOverrides,
  getBlogPostsWithOverrides,
} from "@/lib/images/content";
import { getResolvedImageUrl } from "@/lib/images/overrides";
import { SITE_IMAGE_DEFAULTS } from "@/lib/images/catalog";
import { getBlogPostHref } from "@/lib/trips/links";

export const revalidate = 300;

export default async function Home() {
  const [
    heroImage,
    ctaImage,
    twoNights,
    weekend,
    sunrise,
    tours,
    himalayan,
    destinations,
    blogPosts,
  ] = await Promise.all([
    getResolvedImageUrl("site:hero", SITE_IMAGE_DEFAULTS.hero),
    getResolvedImageUrl("site:cta-banner", SITE_IMAGE_DEFAULTS.ctaBanner),
    getPackagesWithOverrides(twoNightPackages),
    getPackagesWithOverrides(weekendEscapes),
    getPackagesWithOverrides(sunriseTreks),
    getToursWithOverrides(),
    getHimalayanWithOverrides(),
    getDestinationsWithOverrides(),
    getBlogPostsWithOverrides(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero backgroundImage={heroImage} />
        <Stats />
        <ExploreCategories />
        <FeaturedCategories
          twoNightPackages={twoNights}
          weekendEscapes={weekend}
          sunriseTreks={sunrise}
        />

        <section id="tours" className="scroll-mt-20 bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 md:mb-10">
              <SectionHeader
                eyebrow="Explore tours"
                title="Weekend getaways worth the drive"
                subtitle="Curated trips from Bangalore to South India's favourite destinations."
              />
            </div>
            <PackageSlider items={tours} ariaLabel="Weekend tours" />
          </div>
        </section>

        <section id="himalayan" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <SectionHeader
                eyebrow="High altitude"
                title="Himalayan Treks"
                subtitle="Step beyond the Western Ghats. Epic multi-day expeditions in the Himalayas."
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {himalayan.map((trek) => (
                <HimalayanCard key={trek.id} trek={trek} />
              ))}
            </div>
          </div>
        </section>

        <section id="destinations" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <SectionHeader
                eyebrow="Explore by region"
                title="Popular Destinations"
                subtitle="Discover adventures across South India's most iconic landscapes."
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {destinations.map((dest) => (
                <DestCard key={dest.id} dest={dest} />
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Testimonials />
        <CTABanner backgroundImage={ctaImage} />

        <section id="blog" className="scroll-mt-20 bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <SectionHeader
                eyebrow="Stories & guides"
                title="Travel Guides & Inspiration"
                subtitle="Tips, guides, and travel stories from the trails."
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getBlogPostHref(post.id)}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <LoadingImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-cta px-2.5 py-1 text-xs font-semibold text-white">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold leading-snug text-brand-text transition-colors group-hover:text-cta">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-brand-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-cta">
                      Read more <span>→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
