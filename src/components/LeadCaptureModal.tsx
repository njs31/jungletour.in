"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { X } from "lucide-react";

const STORAGE_KEY = "jtt-lead-modal-dismissed";

export default function LeadCaptureModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (pathname === "/under-deployment") return;
    if (pathname?.startsWith("/admin")) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setIsOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function closeModal() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setIsOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
          website: "",
        }),
      });
    } catch {
      // Still close gracefully; admin can follow up via WhatsApp.
    }

    setSubmitted(true);
    setIsSubmitting(false);

    window.setTimeout(() => {
      closeModal();
    }, 1200);
  }

  if (pathname === "/under-deployment") return null;
  if (pathname?.startsWith("/admin")) return null;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      {isSubmitting && <LoadingOverlay label="Loading" />}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={closeModal}
        aria-label="Close enquiry form"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-brand-border px-4 py-3.5">
          <div>
            <h2
              id="lead-modal-title"
              className="font-display text-lg font-semibold text-navy"
            >
              Quick enquiry
            </h2>
            <p className="mt-0.5 text-xs text-brand-muted">
              We&apos;ll call you back shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full p-1.5 text-brand-muted transition-colors hover:bg-surface hover:text-brand-text"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2.25} />
          </button>
        </div>

        <div className="px-4 py-4">
          {submitted ? (
            <div className="py-6 text-center">
              <p className="font-semibold text-navy">Thanks! We&apos;ll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="lead-name" className="mb-1 block text-xs font-medium text-brand-text">
                  Name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-cta focus:ring-2 focus:ring-cta/20"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-xs font-medium text-brand-text">
                  Mobile
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-cta focus:ring-2 focus:ring-cta/20"
                />
              </div>

              <div>
                <label htmlFor="lead-message" className="mb-1 block text-xs font-medium text-brand-text">
                  Interest (optional)
                </label>
                <input
                  id="lead-message"
                  type="text"
                  placeholder="e.g. Weekend trek, Gokarna"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm outline-none focus:border-cta focus:ring-2 focus:ring-cta/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-cta py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover disabled:opacity-70"
              >
                {isSubmitting ? "Sending…" : "Request callback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
