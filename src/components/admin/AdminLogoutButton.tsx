"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {loading && <LoadingOverlay label="Loading" />}
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-2.5 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-surface hover:text-red-600 disabled:opacity-60 sm:px-3"
      >
        <LogOut className="size-4" aria-hidden />
        <span className="hidden sm:inline">{loading ? "Loading" : "Log out"}</span>
      </button>
    </>
  );
}
