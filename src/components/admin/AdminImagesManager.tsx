"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageIcon, RotateCcw, Trash2, Upload } from "lucide-react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import type { ImageCategory, ResolvedImageSlot } from "@/types/image-override";

const categoryLabels: Record<ImageCategory, string> = {
  "trip-cover": "Trip covers",
  "trip-gallery": "Trek galleries",
  destination: "Destinations",
  blog: "Blog",
  site: "Site backgrounds",
};

interface AdminImagesManagerProps {
  initialSlots: ResolvedImageSlot[];
}

export default function AdminImagesManager({
  initialSlots,
}: AdminImagesManagerProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [slots, setSlots] = useState(initialSlots);
  const [activeCategory, setActiveCategory] = useState<ImageCategory | "all">(
    "all"
  );
  const [query, setQuery] = useState("");
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [uploadTarget, setUploadTarget] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchesCategory =
        activeCategory === "all" || slot.category === activeCategory;
      const matchesQuery =
        query.trim().length === 0 ||
        slot.label.toLowerCase().includes(query.toLowerCase()) ||
        slot.entityId.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [slots, activeCategory, query]);

  const categories = useMemo(() => {
    const unique = new Set(slots.map((slot) => slot.category));
    return ["all", ...Array.from(unique)] as const;
  }, [slots]);

  function openFilePicker(imageKey: string) {
    setUploadTarget(imageKey);
    setError("");
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const imageKey = uploadTarget;
    event.target.value = "";

    if (!file || !imageKey) return;

    setPendingKey(imageKey);
    setError("");

    const formData = new FormData();
    formData.append("imageKey", imageKey);
    formData.append("file", file);

    const res = await fetch("/api/admin/images/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPendingKey(null);
    setUploadTarget(null);

    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }

    setSlots((current) =>
      current.map((slot) =>
        slot.key === imageKey
          ? {
              ...slot,
              currentUrl: data.override.url,
              currentAlt: data.override.alt || slot.currentAlt,
              isOverridden: true,
              storagePath: data.override.storage_path,
              updatedAt: data.override.updated_at,
            }
          : slot
      )
    );
    router.refresh();
  }

  async function handleDelete(slot: ResolvedImageSlot) {
    if (
      !slot.isOverridden ||
      !confirm(`Reset "${slot.label}" to the default image?`)
    ) {
      return;
    }

    setPendingKey(slot.key);
    setError("");

    const res = await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageKey: slot.key }),
    });

    const data = await res.json();
    setPendingKey(null);

    if (!res.ok) {
      setError(data.error || "Delete failed");
      return;
    }

    setSlots((current) =>
      current.map((item) =>
        item.key === slot.key
          ? {
              ...item,
              currentUrl: item.defaultUrl,
              currentAlt: item.defaultAlt,
              isOverridden: false,
              storagePath: null,
              updatedAt: null,
            }
          : item
      )
    );
    router.refresh();
  }

  return (
    <>
      {pendingKey && <LoadingOverlay label="Loading" />}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="space-y-5">
        <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-brand-text">
                Manage website images
              </h2>
              <p className="mt-1 text-xs text-brand-muted">
                Uploads are stored in Supabase CDN. Reset removes your custom
                image and restores the default.
              </p>
            </div>
            <div className="w-full lg:max-w-sm">
              <label className="sr-only" htmlFor="image-search">
                Search images
              </label>
              <input
                id="image-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by trip or page..."
                className="w-full rounded-xl border border-brand-border px-3.5 py-2.5 text-sm outline-none focus:border-cta focus:ring-2 focus:ring-cta/20"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  activeCategory === category
                    ? "bg-navy text-white"
                    : "border border-brand-border bg-surface text-brand-muted hover:text-brand-text"
                }`}
              >
                {category === "all"
                  ? "All"
                  : categoryLabels[category as ImageCategory]}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <p className="text-sm text-brand-muted">
          Showing {filteredSlots.length} of {slots.length} images
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSlots.map((slot) => (
            <article
              key={slot.key}
              className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-surface">
                <Image
                  src={slot.currentUrl}
                  alt={slot.currentAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                {slot.isOverridden ? (
                  <span className="absolute left-3 top-3 rounded-full bg-cta px-2.5 py-1 text-[11px] font-semibold text-white">
                    Custom
                  </span>
                ) : null}
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <p className="text-sm font-semibold leading-snug text-brand-text">
                    {slot.label}
                  </p>
                  <p className="mt-1 text-xs text-brand-muted">
                    {categoryLabels[slot.category]}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openFilePicker(slot.key)}
                    disabled={pendingKey === slot.key}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cta px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
                  >
                    <Upload className="size-4" aria-hidden />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(slot)}
                    disabled={!slot.isOverridden || pendingKey === slot.key}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-border px-4 py-2.5 text-sm font-semibold text-brand-text transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {slot.isOverridden ? (
                      <>
                        <RotateCcw className="size-4" aria-hidden />
                        Reset
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4" aria-hidden />
                        Default
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredSlots.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white px-6 py-12 text-center">
            <ImageIcon className="mx-auto size-8 text-brand-subtle" />
            <p className="mt-3 text-sm font-medium text-brand-text">
              No images match your search
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              Try another category or clear the search box.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
