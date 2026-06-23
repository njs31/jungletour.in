"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

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
        className="text-sm font-medium text-gray-600 hover:text-red-600 disabled:opacity-60"
      >
        {loading ? "Loading" : "Log out"}
      </button>
    </>
  );
}
