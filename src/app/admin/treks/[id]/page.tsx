import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminTrekFormData } from "@/lib/treks/overrides";
import TrekEditForm from "@/components/admin/TrekEditForm";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Edit trip
            </p>
            <h1 className="text-xl font-bold text-gray-900">{trek.title}</h1>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <TrekEditForm initial={trek} />
        </div>
        <p className="mt-4 text-center">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-orange-600">
            ← Back to all treks
          </Link>
        </p>
      </main>
    </div>
  );
}
