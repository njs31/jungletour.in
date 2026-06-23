import Link from "next/link";
import { listBookingInquiries, type BookingInquiry } from "@/lib/bookings";
import AdminBookingCard from "@/components/admin/AdminMobileCards";

function formatSubmittedAt(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function formatSubmittedShort(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

export default async function AdminBookingsSection() {
  const bookings = await listBookingInquiries();

  return (
    <section
      id="bookings"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-brand-border bg-surface/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-sm font-semibold text-brand-text">Booking submissions</h2>
          <p className="mt-0.5 text-xs text-brand-muted">
            Enquiries from Book Now on trek pages
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-cta-light px-3 py-1 text-xs font-semibold text-cta-hover ring-1 ring-cta/10">
          {bookings.length} total
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-brand-muted sm:px-5">
          No booking submissions yet.
        </p>
      ) : (
        <>
          <div className="space-y-3 p-4 md:hidden">
            {bookings.map((booking: BookingInquiry) => (
              <AdminBookingCard
                key={booking.id}
                booking={booking}
                submittedLabel={formatSubmittedShort(booking.created_at)}
              />
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-brand-border bg-surface/50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-brand-text">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-brand-text">
                    Mobile
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-brand-text">
                    Trip
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-brand-text">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: BookingInquiry) => (
                  <tr
                    key={booking.id}
                    className="border-b border-brand-border last:border-0 hover:bg-surface/50"
                  >
                    <td className="px-5 py-3.5 font-medium text-brand-text">
                      {booking.name}
                    </td>
                    <td className="px-5 py-3.5 text-brand-muted">
                      <a
                        href={`tel:+91${booking.phone}`}
                        className="hover:text-cta"
                      >
                        +91 {booking.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-brand-text">
                      {booking.trip_slug ? (
                        <Link
                          href={`/trek/${booking.trip_slug}`}
                          className="font-medium hover:text-cta"
                        >
                          {booking.trip_title}
                        </Link>
                      ) : (
                        booking.trip_title
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-brand-muted">
                      {formatSubmittedAt(booking.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
