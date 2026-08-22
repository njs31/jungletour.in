"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { X, Phone, MessageSquare } from "lucide-react";
import { CONTACT_PHONE_TEL, CONTACT_WHATSAPP_URL } from "@/lib/contact";

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

    const timer = window.setTimeout(() => setIsOpen(true), 2500);
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
      // Still close gracefully
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      {isSubmitting && <LoadingOverlay label="Submitting..." />}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={closeModal}
        aria-label="Close enquiry form"
      />

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl border border-brand-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border px-4 py-3 bg-surface">
          <div>
            <h2
              id="lead-modal-title"
              className="font-display text-base font-bold text-navy"
            >
              Quick Enquiry
            </h2>
            <p className="text-[11px] text-brand-muted">
              Get details & package info
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full p-1 text-brand-muted transition-colors hover:bg-gray-200 hover:text-brand-text"
            aria-label="Close"
          >
            <X size={16} strokeWidth={2.25} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4">
          {submitted ? (
            <div className="py-4 text-center">
              <p className="font-bold text-green-700 text-sm">Thank You!</p>
              <p className="mt-1 text-xs text-brand-muted">
                Our trip advisor will call you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="lead-name" className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted">
                  Name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted">
                  Mobile Number
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta"
                />
              </div>

              <div>
                <label htmlFor="lead-message" className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted">
                  Trek / Tour Interest (Optional)
                </label>
                <input
                  id="lead-message"
                  type="text"
                  placeholder="e.g. Kudremukh, Gokarna"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-cta py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-cta-hover disabled:opacity-70 shadow-sm"
              >
                {isSubmitting ? "Sending..." : "Request Callback"}
              </button>

              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-muted">
                <span>Or reach us directly:</span>
                <div className="flex gap-2">
                  <a href={CONTACT_PHONE_TEL} className="text-navy font-semibold hover:underline flex items-center gap-0.5">
                    <Phone size={10} /> Call
                  </a>
                  <span>·</span>
                  <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline flex items-center gap-0.5">
                    <MessageSquare size={10} /> WhatsApp
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
