import Link from "next/link";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import type { BookingInquiry } from "@/lib/bookings";

interface AdminBookingCardProps {
  booking: BookingInquiry;
  submittedLabel: string;
  whatsappHref: string;
}

export default function AdminBookingCard({
  booking,
  submittedLabel,
  whatsappHref,
}: AdminBookingCardProps) {
  return (
    <article className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-brand-text">{booking.name}</p>
          <p className="mt-0.5 text-xs text-brand-muted">{submittedLabel}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <p className="text-brand-muted">
          <span className="font-medium text-brand-text">+91 {booking.phone}</span>
        </p>
        <p className="text-brand-text">
          {booking.trip_slug ? (
            <Link
              href={`/trek/${booking.trip_slug}`}
              className="font-medium text-brand-text underline-offset-2 hover:text-cta hover:underline"
            >
              {booking.trip_title}
            </Link>
          ) : (
            booking.trip_title
          )}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={`tel:+91${booking.phone}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2.5 text-xs font-semibold text-white"
        >
          <Phone className="size-3.5" aria-hidden />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-600 px-3 py-2.5 text-xs font-semibold text-white"
        >
          WhatsApp
        </a>
      </div>
    </article>
  );
}

interface AdminTripCardProps {
  id: string;
  title: string;
  kindLabel: string;
  price: string;
  duration: string;
  nextTripDatesCount: number;
  isActive: boolean;
}

export function AdminTripCard({
  id,
  title,
  kindLabel,
  price,
  duration,
  nextTripDatesCount,
  isActive,
}: AdminTripCardProps) {
  return (
    <article className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold leading-snug text-brand-text">{title}</p>
          <p className="mt-1 text-xs text-brand-muted">{kindLabel}</p>
        </div>
        <StatusBadge active={isActive} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-muted">
        <span className="font-semibold text-cta">{price}</span>
        <span>{duration}</span>
        <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
          <Calendar className="size-3.5" aria-hidden />
          {nextTripDatesCount > 0
            ? `${nextTripDatesCount} date${nextTripDatesCount === 1 ? "" : "s"}`
            : "No dates"}
        </span>
      </div>

      <Link
        href={`/admin/treks/${id}`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-border bg-surface px-4 py-2.5 text-sm font-semibold text-brand-text transition-colors hover:border-cta/30 hover:bg-cta-light hover:text-cta-hover sm:w-auto"
      >
        Edit trip
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </article>
  );
}
