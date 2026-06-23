import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminTrekFormData } from "@/lib/treks/overrides";
import TrekEditForm from "@/components/admin/TrekEditForm";
import AdminShell from "@/components/admin/AdminShell";

interface AdminTrekPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTrekEditPage({ params }: AdminTrekPageProps) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { id } = await params;
  const trek = await getAdminTrekFormData(id);
  if (!trek) notFound();

  return (
    <AdminShell
      eyebrow="Edit trip"
      title={trek.title}
      backHref="/admin"
      backLabel="Dashboard"
      showSiteLink={false}
    >
      <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-6 md:p-8">
        <TrekEditForm initial={trek} />
      </div>
    </AdminShell>
  );
}
