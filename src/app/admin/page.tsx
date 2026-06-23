import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdminTreks } from "@/lib/treks/overrides";
import { listBookingInquiries } from "@/lib/bookings";
import { buildImageCatalog } from "@/lib/images/catalog";
import AdminShell from "@/components/admin/AdminShell";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminBookingsSection from "@/components/admin/AdminBookingsSection";
import AdminTripsSection from "@/components/admin/AdminTripsSection";
import AdminQuickNav from "@/components/admin/AdminQuickNav";

const sectionOrder = [
  { key: "trek", label: "Package treks" },
  { key: "weekend-tour", label: "Weekend tours" },
  { key: "himalayan", label: "Himalayan treks" },
] as const;

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const [trips, bookings] = await Promise.all([
    listAdminTreks(),
    listBookingInquiries(),
  ]);

  const activeTrips = trips.filter((trip) => trip.isActive).length;

  return (
    <AdminShell eyebrow="Dashboard" title="Jungle Tours & Treks">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <AdminStatCard
          label="Bookings"
          value={bookings.length}
          hint="All submissions"
        />
        <AdminStatCard
          label="Active trips"
          value={activeTrips}
          hint={`${trips.length} total trips`}
        />
      </div>

      <Link
        href="/admin/images"
        className="mb-2 flex items-center justify-between rounded-2xl border border-brand-border bg-white p-4 shadow-sm transition-colors hover:border-cta/30 hover:bg-cta-light/40 sm:p-5"
      >
        <div>
          <p className="text-sm font-semibold text-brand-text">Image library</p>
          <p className="mt-1 text-xs text-brand-muted">
            Upload, replace, or reset {buildImageCatalog().length} website images
          </p>
        </div>
        <span className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white">
          Manage
        </span>
      </Link>

      <AdminQuickNav />

      <div className="space-y-6 sm:space-y-8">
        <AdminBookingsSection />

        <div id="trips" className="scroll-mt-28 space-y-6 sm:space-y-8">
          {sectionOrder.map((section) => (
            <AdminTripsSection
              key={section.key}
              label={section.label}
              trips={trips.filter((trip) => trip.kind === section.key)}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
