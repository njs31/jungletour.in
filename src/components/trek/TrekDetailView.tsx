"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  MapPin,
  Mountain,
  Route,
  Star,
  Timer,
  Users,
} from "lucide-react";
import type { TrekDetail } from "@/types/trek-detail";

const sectionNav = [
  { id: "highlights", label: "Highlights" },
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "best-time", label: "Best Time" },
  { id: "route", label: "Trail Route" },
  { id: "inclusions", label: "Inclusions" },
  { id: "reviews", label: "Reviews" },
  { id: "pack-list", label: "Pack List" },
  { id: "faq", label: "FAQ" },
  { id: "policy", label: "Policy" },
];

interface TrekDetailViewProps {
  trek: TrekDetail;
}

export default function TrekDetailView({ trek }: TrekDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                {trek.location} · {trek.altitude}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {trek.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                {trek.metaDescription}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  <Star size={14} className="fill-orange-500 text-orange-500" />
                  {trek.rating} Rating
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  <Users size={14} />
                  50,000+ Trekkers
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  Since 2017
                </span>
              </div>

              <div className="lg:hidden mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <PriceCard trek={trek} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={trek.images[activeImage].src}
                  alt={trek.images[activeImage].alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {trek.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === index
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts + sticky price */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-12 min-w-0">
            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FactCard icon={<Timer size={18} />} label="Duration" value={trek.duration} />
              <FactCard icon={<Mountain size={18} />} label="Max Altitude" value={trek.altitude} />
              <FactCard icon={<Route size={18} />} label="Distance" value={trek.distance} />
              <FactCard icon={<Mountain size={18} />} label="Difficulty" value={trek.difficulty} />
              <FactCard icon={<MapPin size={18} />} label="Pickup → Drop" value={trek.pickupDrop} />
              <FactCard icon={<Route size={18} />} label="Category" value={trek.category} />
            </div>

            {/* Highlights */}
            <section id="highlights" className="scroll-mt-36">
              <SectionTitle eyebrow="Trip Highlights" title="Trip Highlights" />
              <ul className="grid sm:grid-cols-2 gap-3">
                {trek.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-gray-700 bg-white rounded-xl border border-gray-100 px-4 py-3"
                  >
                    <span className="text-orange-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Overview */}
            <section id="overview" className="scroll-mt-36">
              <SectionTitle
                eyebrow="Overview"
                title="Kudremukh trek from Bangalore – Distance, Difficulty, Itinerary & Booking Guide"
              />
              <p className="text-gray-600 leading-relaxed mb-6">{trek.overview.intro}</p>
              {trek.overview.sections.map((section) => (
                <div key={section.title} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  {section.paragraphs.map((p) => (
                    <p key={p} className="text-gray-600 leading-relaxed mb-3">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-36">
              <SectionTitle eyebrow="Day by Day" title="Itinerary" />
              <div className="space-y-6">
                {trek.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
                      {day.day}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {day.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {day.description}
                    </p>
                    {day.pickupPoints && (
                      <ul className="mt-4 space-y-2">
                        {day.pickupPoints.map((point) => (
                          <li
                            key={point.name}
                            className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2"
                          >
                            <span className="font-semibold">{point.name}</span>{" "}
                            {point.time} — <em>{point.landmark}</em>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Best time */}
            <section id="best-time" className="scroll-mt-36">
              <SectionTitle eyebrow="When to Go" title="Best Time to Visit" />
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {trek.seasons.map((season) => (
                  <div
                    key={season.period}
                    className={`rounded-2xl border p-4 ${
                      season.variant === "best"
                        ? "border-orange-200 bg-orange-50"
                        : season.variant === "off"
                          ? "border-gray-200 bg-gray-100"
                          : "border-green-200 bg-green-50"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                      {season.period}
                    </p>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {season.label}
                    </h3>
                    <p className="text-sm text-gray-600">{season.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">{trek.seasonNote}</p>
            </section>

            {/* Route */}
            <section id="route" className="scroll-mt-36">
              <SectionTitle eyebrow="Trail Guide" title="Trek Route Breakdown" />
              <div className="space-y-4">
                {trek.routeSegments.map((segment, index) => (
                  <div
                    key={segment.title}
                    className="bg-white rounded-2xl border border-gray-100 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {segment.title}
                        </h3>
                        <p className="text-xs text-orange-600 font-medium mt-0.5">
                          {segment.distance} · {segment.duration}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {segment.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions */}
            <section id="inclusions" className="scroll-mt-36">
              <SectionTitle eyebrow="What's Covered" title="Inclusions & Exclusions" />
              <div className="grid sm:grid-cols-2 gap-6">
                <ListCard title="What's Included" items={trek.inclusions} positive />
                <ListCard title="What's Excluded" items={trek.exclusions} />
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-36">
              <SectionTitle
                eyebrow="Trekker Reviews"
                title={`What Trekkers Say (${trek.totalReviews} reviews)`}
              />
              <div className="space-y-4">
                {trek.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {review.date} · {review.rating}.0 / 5
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* What to expect */}
            <section className="scroll-mt-36">
              <SectionTitle eyebrow="Experience" title="What to Expect" />
              <ul className="space-y-3 mb-6">
                {trek.whatToExpect.map((item) => (
                  <li key={item} className="text-sm text-gray-600 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Accommodations</h3>
                  <p className="text-sm text-gray-600">{trek.accommodations}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Team</h3>
                  <p className="text-sm text-gray-600">{trek.teamNote}</p>
                </div>
              </div>
            </section>

            {/* Pack list */}
            <section id="pack-list" className="scroll-mt-36">
              <SectionTitle eyebrow="Pack List" title="Things to Carry" />
              <div className="space-y-3 mb-6">
                {trek.packList.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl border border-gray-100 p-4"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">What NOT to carry</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {trek.packListAvoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-36">
              <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
              <div className="space-y-2">
                {trek.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.question}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        type="button"
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span className="font-semibold text-gray-900 text-sm">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-gray-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Policy */}
            <section id="policy" className="scroll-mt-36 pb-8">
              <SectionTitle
                eyebrow="Cancellation & Payment"
                title="Transparent cancellation policy"
              />
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 mb-6">
                {trek.cancellationNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Days before
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Charge
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Refund
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trek.cancellationTable.map((row) => (
                      <tr key={row.daysBefore} className="border-t border-gray-100">
                        <td className="px-4 py-3 text-gray-700">{row.daysBefore}</td>
                        <td className="px-4 py-3 text-gray-700">{row.charge}</td>
                        <td className="px-4 py-3 text-gray-700">{row.refund}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <PriceCard trek={trek} />
              <Link
                href="/#2nights-packages"
                className="mt-4 block text-center text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Back to all treks
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
        <div>
          {trek.originalPrice && (
            <p className="text-xs text-gray-400 line-through">{trek.originalPrice}</p>
          )}
          <p className="text-lg font-bold text-orange-600">
            {trek.price}
            <span className="text-xs font-normal text-gray-500"> / person</span>
          </p>
        </div>
        <a
          href="https://wa.me/918310822183"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-orange-600 transition-colors"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
        {eyebrow}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="text-orange-500 mb-2">{icon}</div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function ListCard({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-gray-600">
            <span className={positive ? "text-green-500" : "text-red-400"}>
              {positive ? "✓" : "✗"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDepartureDate(date: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return date;
}

function PriceCard({ trek }: { trek: TrekDetail }) {
  const openDepartures = trek.departures.filter(
    (departure) => departure.status.toLowerCase() !== "cancelled"
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {trek.originalPrice && (
        <p className="text-sm text-gray-400 line-through">{trek.originalPrice}</p>
      )}
      <p className="text-3xl font-bold text-orange-600">
        {trek.price}
        <span className="text-sm font-normal text-gray-500"> / person</span>
      </p>
      {trek.discountLabel && (
        <span className="inline-block mt-2 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
          {trek.discountLabel}
        </span>
      )}
      {openDepartures.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Upcoming departures
          </p>
          <ul className="space-y-2">
            {openDepartures.map((departure) => (
              <li
                key={`${departure.date}-${departure.status}`}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-gray-700">{formatDepartureDate(departure.date)}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    departure.status.toLowerCase() === "full"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {departure.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5 space-y-2">
        <a
          href="https://wa.me/918310822183"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
        >
          Book Now
        </a>
        <a
          href="tel:+918310822183"
          className="block w-full text-center border border-orange-500 text-orange-600 font-semibold py-3 rounded-full hover:bg-orange-50 transition-colors text-sm"
        >
          Send Enquiry
        </a>
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">
        Call us anytime · +91 83108 22183
      </p>
    </div>
  );
}
