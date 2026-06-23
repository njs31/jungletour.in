import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdminTreks } from "@/lib/treks/overrides";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const sectionOrder = [
  { key: "trek", label: "Package treks" },
  { key: "weekend-tour", label: "Weekend tours" },
  { key: "himalayan", label: "Himalayan treks" },
] as const;

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const trips = await listAdminTreks();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Admin Panel
            </p>
            <h1 className="text-xl font-bold text-gray-900">Manage Trips</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-600 hover:text-orange-600">
              View site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {sectionOrder.map((section) => {
          const sectionTrips = trips.filter((trip) => trip.kind === section.key);
          if (sectionTrips.length === 0) return null;

          return (
            <div
              key={section.key}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-800">{section.label}</h2>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Trip
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Duration
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Next trips
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {sectionTrips.map((trip) => (
                    <tr key={trip.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{trip.title}</p>
                        <p className="text-xs text-gray-500">{trip.kindLabel}</p>
                      </td>
                      <td className="px-4 py-3 text-orange-600 font-semibold">
                        {trip.price}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{trip.duration}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {trip.nextTripDates.length > 0
                          ? `${trip.nextTripDates.length} date(s)`
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            trip.isActive
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {trip.isActive ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/treks/${trip.id}`}
                          className="text-orange-600 hover:text-orange-700 font-semibold"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </main>
    </div>
  );
}
