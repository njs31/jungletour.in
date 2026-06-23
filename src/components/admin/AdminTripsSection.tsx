import Link from "next/link";
import { AdminTripCard } from "@/components/admin/AdminMobileCards";
import StatusBadge from "@/components/admin/StatusBadge";

export interface AdminTripListItem {
  id: string;
  slug?: string;
  kind: string;
  kindLabel: string;
  title: string;
  price: string;
  duration: string;
  nextTripDates: { date: string; status: string }[];
  isActive: boolean;
}

interface AdminTripsSectionProps {
  label: string;
  trips: AdminTripListItem[];
}

export default function AdminTripsSection({ label, trips }: AdminTripsSectionProps) {
  if (trips.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
      <div className="border-b border-brand-border bg-surface/80 px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold text-brand-text">{label}</h2>
        <p className="mt-0.5 text-xs text-brand-muted">{trips.length} trips</p>
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {trips.map((trip) => (
          <AdminTripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
            kindLabel={trip.kindLabel}
            price={trip.price}
            duration={trip.duration}
            nextTripDatesCount={trip.nextTripDates.length}
            isActive={trip.isActive}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-brand-border bg-surface/50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-brand-text">
                Trip
              </th>
              <th className="px-5 py-3 text-left font-semibold text-brand-text">
                Price
              </th>
              <th className="px-5 py-3 text-left font-semibold text-brand-text">
                Duration
              </th>
              <th className="px-5 py-3 text-left font-semibold text-brand-text">
                Next trips
              </th>
              <th className="px-5 py-3 text-left font-semibold text-brand-text">
                Status
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="border-b border-brand-border last:border-0 hover:bg-surface/50"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-brand-text">{trip.title}</p>
                  <p className="text-xs text-brand-muted">{trip.kindLabel}</p>
                </td>
                <td className="px-5 py-3.5 font-semibold text-cta">
                  {trip.price}
                </td>
                <td className="px-5 py-3.5 text-brand-muted">{trip.duration}</td>
                <td className="px-5 py-3.5 text-brand-muted">
                  {trip.nextTripDates.length > 0
                    ? `${trip.nextTripDates.length} date(s)`
                    : "—"}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge active={trip.isActive} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/admin/treks/${trip.id}`}
                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold text-cta transition-colors hover:bg-cta-light"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
