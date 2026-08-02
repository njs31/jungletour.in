import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAdminTreks } from "@/lib/treks/overrides";
import { listBookingInquiries } from "@/lib/bookings";
import { buildImageCatalog } from "@/lib/images/catalog";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
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

function startOfDayIST(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return new Date(`${parts}T00:00:00+05:30`);
}

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const [trips, bookings] = await Promise.all([
    listAdminTreks(),
    listBookingInquiries(),
  ]);

  const activeTrips = trips.filter((trip) => trip.isActive).length;
  const todayStart = startOfDayIST();
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 6);

  const todayBookings = bookings.filter(
    (b) => new Date(b.created_at) >= todayStart
  ).length;
  const weekBookings = bookings.filter(
    (b) => new Date(b.created_at) >= weekStart
  ).length;
  const recent = bookings.slice(0, 5);
  const imageSlots = buildImageCatalog().length;

  return (
    <AdminShell eyebrow="Client dashboard" title="Jungle Tours & Treks">
      <div className="mb-4 rounded-2xl border border-cta/20 bg-cta-light/50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-navy">Daily workflow</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-brand-muted sm:text-sm">
          <li>Check new booking / enquiry submissions below</li>
          <li>Call or WhatsApp the customer from the row actions</li>
          <li>Update trip prices/dates from Trips → Edit</li>
          <li>Replace website photos from Image library</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={CONTACT_PHONE_TEL}
            className="rounded-full bg-navy px-3.5 py-2 text-xs font-semibold text-white"
          >
            Your line · {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-3.5 py-2 text-xs font-semibold text-white"
          >
            Open business WhatsApp
          </a>
          <Link
            href="/"
            className="rounded-full border border-brand-border bg-white px-3.5 py-2 text-xs font-semibold text-brand-text"
          >
            View live site
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <AdminStatCard
          label="Today"
          value={todayBookings}
          hint="New enquiries"
        />
        <AdminStatCard
          label="This week"
          value={weekBookings}
          hint="Last 7 days"
        />
        <AdminStatCard
          label="All bookings"
          value={bookings.length}
          hint="Total submissions"
        />
        <AdminStatCard
          label="Active trips"
          value={activeTrips}
          hint={`${trips.length} total · ${imageSlots} images`}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/images"
          className="flex items-center justify-between rounded-2xl border border-brand-border bg-white p-4 shadow-sm transition-colors hover:border-cta/30 hover:bg-cta-light/40 sm:p-5"
        >
          <div>
            <p className="text-sm font-semibold text-brand-text">Image library</p>
            <p className="mt-1 text-xs text-brand-muted">
              Upload or reset {imageSlots} website images
            </p>
          </div>
          <span className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white">
            Manage
          </span>
        </Link>
        <a
          href="#bookings"
          className="flex items-center justify-between rounded-2xl border border-brand-border bg-white p-4 shadow-sm transition-colors hover:border-cta/30 hover:bg-cta-light/40 sm:p-5"
        >
          <div>
            <p className="text-sm font-semibold text-brand-text">Latest leads</p>
            <p className="mt-1 text-xs text-brand-muted">
              {recent[0]
                ? `Newest: ${recent[0].name} · ${recent[0].trip_title}`
                : "No enquiries yet"}
            </p>
          </div>
          <span className="rounded-full border border-brand-border px-4 py-2 text-xs font-semibold text-brand-text">
            Open
          </span>
        </a>
      </div>

      <AdminQuickNav />

      <div className="space-y-6 sm:space-y-8">
        <AdminBookingsSection bookings={bookings} />

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
