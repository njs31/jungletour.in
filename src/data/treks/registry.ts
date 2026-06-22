import type { TrekCard } from "@/types";
import type { TrekDetail } from "@/types/trek-detail";
import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";

import kudremukh from "@/data/treks/scraped/kudremukh.json";
import netravati from "@/data/treks/scraped/netravati.json";
import kumaraParvatha from "@/data/treks/scraped/kumara-parvatha.json";
import kodachadri from "@/data/treks/scraped/kodachadri.json";
import gokarnaBeach from "@/data/treks/scraped/gokarna-beach.json";
import tadiandamol from "@/data/treks/scraped/tadiandamol.json";
import bandajeFalls from "@/data/treks/scraped/bandaje-falls.json";
import kurinjal from "@/data/treks/scraped/kurinjal.json";
import skandagiri from "@/data/treks/scraped/skandagiri.json";
import uttariBetta from "@/data/treks/scraped/uttari-betta.json";
import nishaniMotte from "@/data/treks/scraped/nishani-motte.json";
import narasimhaParvatha from "@/data/treks/scraped/narasimha-parvatha.json";

type ScrapedTrek = Omit<TrekDetail, "location" | "category"> & {
  id: string;
  location?: string;
  category?: string;
};

const scrapedById: Record<string, ScrapedTrek> = {
  kudremukh: kudremukh as ScrapedTrek,
  netravati: netravati as ScrapedTrek,
  "kumara-parvatha": kumaraParvatha as ScrapedTrek,
  kodachadri: kodachadri as ScrapedTrek,
  "gokarna-beach": gokarnaBeach as ScrapedTrek,
  tadiandamol: tadiandamol as ScrapedTrek,
  "bandaje-falls": bandajeFalls as ScrapedTrek,
  kurinjal: kurinjal as ScrapedTrek,
  skandagiri: skandagiri as ScrapedTrek,
  "uttari-betta": uttariBetta as ScrapedTrek,
  "nishani-motte": nishaniMotte as ScrapedTrek,
  "narasimha-parvatha": narasimhaParvatha as ScrapedTrek,
};

const allPackages: TrekCard[] = [
  ...twoNightPackages,
  ...weekendEscapes,
  ...sunriseTreks,
];

function brandText(value: string) {
  return value
    .replace(/Backpackers United/gi, "Jungle Tours & Treks")
    .replace(/backpackersunited\.in/gi, "jungletoursandtreks.in")
    .replace(/info@backpackersunited\.in/gi, "info@jungletoursandtreks.in");
}

function cleanList(items: string[]) {
  return items
    .map(brandText)
    .filter(
      (item) =>
        item.length > 0 &&
        item.length < 280 &&
        !/^(accommodations|forest entry permit|what to expect)$/i.test(item) &&
        !/kumara parvatha trek is the most demanding/i.test(item)
    );
}

function buildTrekDetail(pkg: TrekCard): TrekDetail {
  const scraped = scrapedById[pkg.id];
  if (!scraped) {
    throw new Error(`Missing scraped data for trek: ${pkg.id}`);
  }

  const location = pkg.location.split("·")[0]?.trim() || "Karnataka";
  const category = pkg.location.split("·")[1]?.trim() || scraped.category || "Trek";
  const distance =
    scraped.distance ||
    (pkg.elevation.includes("km") ? pkg.elevation.split("·").pop()?.trim() : "—") ||
    "—";

  const images =
    scraped.images.length > 0
      ? scraped.images.map((img) => ({
          ...img,
          alt: brandText(img.alt),
        }))
      : [{ src: pkg.image, alt: pkg.title }];

  const intro =
    brandText(scraped.overview.intro) ||
    brandText(scraped.metaDescription) ||
    brandText(
      `${pkg.title} is one of the most popular treks from Bangalore, covering ${distance} through the Western Ghats with transport, meals, and expert guidance included.`
    );

  return {
    slug: `${pkg.id}-trek`,
    title: brandText(scraped.title),
    metaDescription: brandText(scraped.metaDescription),
    location,
    altitude: scraped.altitude || pkg.elevation.split("·")[0]?.trim() || "—",
    distance,
    difficulty: scraped.difficulty || "Moderate",
    duration: scraped.duration || pkg.duration,
    pickupDrop: scraped.pickupDrop || "Bangalore → Bangalore",
    category: category.trim(),
    price: pkg.price,
    originalPrice: scraped.originalPrice,
    discountLabel: scraped.discountLabel,
    rating: scraped.rating || 5,
    reviewCount: scraped.reviewCount || 10,
    images,
    highlights:
      scraped.highlights.length > 0
        ? cleanList(scraped.highlights)
        : [`Expert-led ${pkg.title}`, `Duration: ${pkg.duration}`],
    overview: {
      intro,
      sections: scraped.overview.sections.map((section) => ({
        title: brandText(section.title),
        paragraphs: section.paragraphs.map(brandText),
        bullets: section.bullets?.map(brandText),
      })),
    },
    itinerary: scraped.itinerary.map((day) => ({
      ...day,
      title: brandText(day.title),
      description: brandText(day.description),
    })),
    seasons: scraped.seasons,
    seasonNote: brandText(scraped.seasonNote),
    routeSegments: scraped.routeSegments.map((segment) => ({
      ...segment,
      title: brandText(segment.title),
      description: brandText(segment.description),
    })),
    inclusions: cleanList(scraped.inclusions),
    exclusions: cleanList(scraped.exclusions),
    departures: scraped.departures.map((dep) => ({
      ...dep,
      price: pkg.price + " / person",
    })),
    whatToExpect: cleanList(scraped.whatToExpect),
    accommodations: brandText(scraped.accommodations),
    teamNote: brandText(scraped.teamNote),
    packList: scraped.packList.map((item) => ({
      title: brandText(item.title),
      description: brandText(item.description),
    })),
    packListAvoid: cleanList(scraped.packListAvoid),
    faqs: scraped.faqs.map((faq) => ({
      question: brandText(faq.question),
      answer: brandText(faq.answer),
    })),
    cancellationNotes: scraped.cancellationNotes.map(brandText),
    cancellationTable: scraped.cancellationTable,
    reviews: scraped.reviews.map((review) => ({
      ...review,
      quote: brandText(review.quote),
    })),
    totalReviews: scraped.totalReviews,
  };
}

export const trekDetails: TrekDetail[] = allPackages.map(buildTrekDetail);

export const trekDetailsBySlug = Object.fromEntries(
  trekDetails.map((trek) => [trek.slug, trek])
) as Record<string, TrekDetail>;

export const trekDetailIds = allPackages.map((pkg) => pkg.id);

export function getTrekBySlug(slug: string) {
  return trekDetailsBySlug[slug];
}
