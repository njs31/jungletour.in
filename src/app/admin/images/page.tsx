import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listResolvedImageSlots } from "@/lib/images/overrides";
import AdminShell from "@/components/admin/AdminShell";
import AdminImagesManager from "@/components/admin/AdminImagesManager";

export default async function AdminImagesPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const slots = await listResolvedImageSlots();

  return (
    <AdminShell
      eyebrow="Media"
      title="Image library"
      backHref="/admin"
      backLabel="Dashboard"
      showSiteLink={false}
    >
      <AdminImagesManager initialSlots={slots} />
    </AdminShell>
  );
}
