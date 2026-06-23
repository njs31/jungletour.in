import { listBookingInquiries, type BookingInquiry } from "@/lib/bookings";

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

export default async function AdminBookingsSection() {
  const bookings = await listBookingInquiries();

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Booking submissions</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Enquiries submitted via Book Now on trek pages
          </p>
        </div>
        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
          {bookings.length} total
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="px-4 py-8 text-sm text-gray-500">
          No booking submissions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Mobile
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Trip
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: BookingInquiry) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <a
                      href={`tel:+91${booking.phone}`}
                      className="hover:text-orange-600"
                    >
                      +91 {booking.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {booking.trip_slug ? (
                      <a
                        href={`/trek/${booking.trip_slug}`}
                        className="hover:text-orange-600 font-medium"
                      >
                        {booking.trip_title}
                      </a>
                    ) : (
                      booking.trip_title
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {formatSubmittedAt(booking.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
