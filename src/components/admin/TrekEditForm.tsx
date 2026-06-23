"use client";

import { useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { TrekTripDate } from "@/types/trek-override";
import type { AdminTripKind } from "@/lib/trips/catalog";

interface TrekFormData {
  trekId: string;
  kind: AdminTripKind;
  slug?: string;
  title: string;
  metaDescription: string;
  price: string;
  originalPrice: string;
  discountLabel: string;
  duration: string;
  difficulty: string;
  altitude: string;
  distance: string;
  nextTripDates: TrekTripDate[];
  highlights: string[];
  isActive: boolean;
}

export default function TrekEditForm({ initial }: { initial: TrekFormData }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isFullTrek = form.kind === "trek";

  function updateTripDate(index: number, field: keyof TrekTripDate, value: string) {
    setForm((prev) => ({
      ...prev,
      nextTripDates: prev.nextTripDates.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addTripDate() {
    setForm((prev) => ({
      ...prev,
      nextTripDates: [...prev.nextTripDates, { date: "", status: "Open" }],
    }));
  }

  function removeTripDate(index: number) {
    setForm((prev) => ({
      ...prev,
      nextTripDates: prev.nextTripDates.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/admin/treks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trekId: form.trekId,
        title: form.title,
        metaDescription: form.metaDescription,
        price: form.price,
        originalPrice: form.originalPrice || null,
        discountLabel: form.discountLabel || null,
        duration: form.duration,
        difficulty: form.difficulty,
        altitude: form.altitude,
        distance: form.distance,
        nextTripDates: form.nextTripDates.filter((d) => d.date.trim()),
        highlights: form.highlights.filter(Boolean),
        isActive: form.isActive,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Failed to save");
      return;
    }

    setMessage("Saved successfully");
    router.refresh();
  }

  return (
    <>
      {saving && <LoadingOverlay label="Loading" />}
      <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
        <Field label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        {isFullTrek && (
          <>
            <Field label="Original price" value={form.originalPrice} onChange={(v) => setForm({ ...form, originalPrice: v })} />
            <Field label="Discount label" value={form.discountLabel} onChange={(v) => setForm({ ...form, discountLabel: v })} placeholder="20% OFF" />
            <Field label="Difficulty" value={form.difficulty} onChange={(v) => setForm({ ...form, difficulty: v })} />
            <Field label="Altitude" value={form.altitude} onChange={(v) => setForm({ ...form, altitude: v })} />
            <Field label="Distance" value={form.distance} onChange={(v) => setForm({ ...form, distance: v })} />
          </>
        )}
        {!isFullTrek && form.kind === "himalayan" && (
          <Field label="Difficulty" value={form.difficulty} onChange={(v) => setForm({ ...form, difficulty: v })} />
        )}
        {!isFullTrek && form.kind === "himalayan" && (
          <Field label="Elevation" value={form.altitude} onChange={(v) => setForm({ ...form, altitude: v })} />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500"
        />
      </div>

      {isFullTrek && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta description</label>
            <textarea
              rows={3}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Highlights (one per line)
            </label>
            <textarea
              rows={6}
              value={form.highlights.join("\n")}
              onChange={(e) =>
                setForm({ ...form, highlights: e.target.value.split("\n") })
              }
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
        </>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Next trip dates
          </label>
          <button
            type="button"
            onClick={addTripDate}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            + Add date
          </button>
        </div>
        <div className="space-y-3">
          {form.nextTripDates.length === 0 && (
            <p className="text-sm text-gray-500">No upcoming dates added yet.</p>
          )}
          {form.nextTripDates.map((trip, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="date"
                value={/^\d{4}-\d{2}-\d{2}$/.test(trip.date) ? trip.date : ""}
                onChange={(e) => updateTripDate(index, "date", e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500"
              />
              <select
                value={trip.status}
                onChange={(e) => updateTripDate(index, "status", e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
              >
                <option>Open</option>
                <option>Full</option>
                <option>Cancelled</option>
              </select>
              <button
                type="button"
                onClick={() => removeTripDate(index)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="size-4 rounded border-gray-300 text-orange-500"
        />
        Trip is active on the website
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full disabled:opacity-60"
        >
          {saving ? "Loading" : "Save changes"}
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center px-6 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back
        </Link>
        {form.slug && (
          <Link
            href={`/trek/${form.slug}`}
            className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Preview page
          </Link>
        )}
      </div>
    </form>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500"
      />
    </div>
  );
}
