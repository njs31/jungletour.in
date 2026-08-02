"use client";

import { useState } from "react";
import LoadingImage from "@/components/ui/LoadingImage";
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
import BookNowModal from "@/components/BookNowModal";
import type { TrekDetail } from "@/types/trek-detail";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";

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
  const [bookingOpen, setBookingOpen] = useState(false);
  const tripId = trek.slug.replace(/-trek$/, "");

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cta mb-2">
                {trek.location} · {trek.altitude}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-text leading-tight mb-4">
                {trek.title}
              </h1>
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-5">
                {trek.metaDescription}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-light px-3 py-1 text-xs font-semibold text-cta-hover">
                  <Star size={14} className="fill-cta text-cta" />
                  {trek.rating} Rating
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand-text">
                  <Users size={14} />
                  5000+ Travelers
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand-text">
                  Since 2023
                </span>
              </div>

              <div className="lg:hidden mb-6 rounded-2xl border border-brand-border bg-surface p-4">
                <PriceCard trek={trek} onBookNow={() => setBookingOpen(true)} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <LoadingImage
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
                        ? "border-cta"
                        : "border-transparent"
                    }`}
                  >
                    <LoadingImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="120px"
                      showLabel={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts + sticky price */}
      <section className="border-b border-brand-border bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-muted hover:border-cta-muted hover:text-cta transition-colors"
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
                    className="flex gap-2 text-sm text-brand-text bg-white rounded-xl border border-brand-border px-4 py-3"
                  >
                    <span className="text-cta mt-0.5">✓</span>
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
              <p className="text-brand-muted leading-relaxed mb-6">{trek.overview.intro}</p>
              {trek.overview.sections.map((section) => (
                <div key={section.title} className="mb-8">
                  <h3 className="text-lg font-semibold text-brand-text mb-3">
                    {section.title}
                  </h3>
                  {section.paragraphs.map((p) => (
                    <p key={p} className="text-brand-muted leading-relaxed mb-3">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc pl-5 space-y-1.5 text-brand-muted text-sm">
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
                    className="bg-white rounded-2xl border border-brand-border p-5 sm:p-6"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-cta mb-1">
                      {day.day}
                    </p>
                    <h3 className="text-lg font-semibold text-brand-text mb-3">
                      {day.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {day.description}
                    </p>
                    {day.pickupPoints && (
                      <ul className="mt-4 space-y-2">
                        {day.pickupPoints.map((point) => (
                          <li
                            key={point.name}
                            className="text-sm text-brand-text bg-surface rounded-lg px-3 py-2"
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
                        ? "border-cta/30 bg-cta-light"
                        : season.variant === "off"
                          ? "border-brand-border bg-surface"
                          : "border-green-200 bg-green-50"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-1">
                      {season.period}
                    </p>
                    <h3 className="font-semibold text-brand-text mb-2">
                      {season.label}
                    </h3>
                    <p className="text-sm text-brand-muted">{season.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-brand-muted">{trek.seasonNote}</p>
            </section>

            {/* Route */}
            <section id="route" className="scroll-mt-36">
              <SectionTitle eyebrow="Trail Guide" title="Trek Route Breakdown" />
              <div className="space-y-4">
                {trek.routeSegments.map((segment, index) => (
                  <div
                    key={segment.title}
                    className="bg-white rounded-2xl border border-brand-border p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-text">
                          {segment.title}
                        </h3>
                        <p className="text-xs text-cta font-medium mt-0.5">
                          {segment.distance} · {segment.duration}
                        </p>
                        <p className="text-sm text-brand-muted mt-2 leading-relaxed">
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
                    className="bg-white rounded-2xl border border-brand-border p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-cta-light text-cta-hover flex items-center justify-center text-sm font-bold">
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-text text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-brand-subtle">
                          {review.date} · {review.rating}.0 / 5
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed">
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
                  <li key={item} className="text-sm text-brand-muted leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-brand-border p-4">
                  <h3 className="font-semibold text-brand-text mb-2">Accommodations</h3>
                  <p className="text-sm text-brand-muted">{trek.accommodations}</p>
                </div>
                <div className="bg-white rounded-xl border border-brand-border p-4">
                  <h3 className="font-semibold text-brand-text mb-2">Our Team</h3>
                  <p className="text-sm text-brand-muted">{trek.teamNote}</p>
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
                    className="bg-white rounded-xl border border-brand-border p-4"
                  >
                    <h3 className="font-semibold text-brand-text text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-muted">{item.description}</p>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-brand-text mb-3">What NOT to carry</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-brand-muted">
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
                      className="bg-white rounded-xl border border-brand-border overflow-hidden"
                    >
                      <button
                        type="button"
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span className="font-semibold text-brand-text text-sm">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-brand-subtle transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-brand-muted leading-relaxed">
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
              <ul className="list-disc pl-5 space-y-2 text-sm text-brand-muted mb-6">
                {trek.cancellationNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <div className="overflow-x-auto rounded-xl border border-brand-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">
                        Days before
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">
                        Charge
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">
                        Refund
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trek.cancellationTable.map((row) => (
                      <tr key={row.daysBefore} className="border-t border-brand-border">
                        <td className="px-4 py-3 text-brand-text">{row.daysBefore}</td>
                        <td className="px-4 py-3 text-brand-text">{row.charge}</td>
                        <td className="px-4 py-3 text-brand-text">{row.refund}</td>
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
              <PriceCard trek={trek} onBookNow={() => setBookingOpen(true)} />
              <Link
                href="/#2nights-packages"
                className="mt-4 block text-center text-sm text-cta hover:text-cta-hover font-medium"
              >
                ← Back to all treks
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-brand-border px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
        <div>
          {trek.originalPrice && (
            <p className="text-xs text-brand-subtle line-through">{trek.originalPrice}</p>
          )}
          <p className="text-lg font-bold text-cta">
            {trek.price}
            <span className="text-xs font-normal text-brand-muted"> / person</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="bg-cta text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-cta-hover transition-colors"
        >
          Book Now
        </button>
      </div>

      <BookNowModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        tripTitle={trek.title}
        tripSlug={trek.slug}
        tripId={tripId}
      />
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
      <p className="text-xs font-bold uppercase tracking-widest text-cta mb-1">
        {eyebrow}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold text-brand-text">{title}</h2>
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
    <div className="bg-white rounded-xl border border-brand-border p-4">
      <div className="text-cta mb-2">{icon}</div>
      <p className="text-xs text-brand-subtle uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-brand-text">{value}</p>
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
    <div className="bg-white rounded-2xl border border-brand-border p-5">
      <h3 className="font-semibold text-brand-text mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-brand-muted">
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

function PriceCard({
  trek,
  onBookNow,
}: {
  trek: TrekDetail;
  onBookNow: () => void;
}) {
  const openDepartures = trek.departures.filter(
    (departure) => departure.status.toLowerCase() !== "cancelled"
  );

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
      {trek.originalPrice && (
        <p className="text-sm text-brand-subtle line-through">{trek.originalPrice}</p>
      )}
      <p className="text-3xl font-bold text-cta">
        {trek.price}
        <span className="text-sm font-normal text-brand-muted"> / person</span>
      </p>
      {trek.discountLabel && (
        <span className="inline-block mt-2 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
          {trek.discountLabel}
        </span>
      )}
      {openDepartures.length > 0 && (
        <div className="mt-4 border-t border-brand-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted mb-2">
            Upcoming departures
          </p>
          <ul className="space-y-2">
            {openDepartures.map((departure) => (
              <li
                key={`${departure.date}-${departure.status}`}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-brand-text">{formatDepartureDate(departure.date)}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    departure.status.toLowerCase() === "full"
                      ? "bg-surface text-brand-muted"
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
        <button
          type="button"
          onClick={onBookNow}
          className="block w-full text-center bg-cta hover:bg-cta-hover text-white font-semibold py-3 rounded-full transition-colors text-sm"
        >
          Book Now
        </button>
        <a
          href={CONTACT_PHONE_TEL}
          className="block w-full text-center border border-cta text-cta font-semibold py-3 rounded-full hover:bg-cta-light transition-colors text-sm"
        >
          Send Enquiry
        </a>
      </div>
      <p className="text-xs text-brand-subtle text-center mt-3">
        Call us anytime · {CONTACT_PHONE_DISPLAY}
      </p>
    </div>
  );
}
