"use client";

import { useEffect, useState } from "react";
import LoadingImage from "@/components/ui/LoadingImage";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { X } from "lucide-react";

const STORAGE_KEY = "jtt-lead-modal-dismissed";

const galleryImages = [
  {
    src: "https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/adarsh-sudheesan-yADr4J5jzOM-unsplash_11zon.webp",
    alt: "Hampi heritage temple at sunset",
  },
  {
    src: "https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/1765892138399_1723637842674_2.webp",
    alt: "Himalayan trek group in the snow",
  },
  {
    src: "https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/testimage--munnar_11zon.webp",
    alt: "Munnar tea plantation hills",
  },
];

const countryCodes = ["+91", "+1", "+44", "+61", "+971", "+65"];

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    message: "",
    expectingCallback: true,
  });

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setIsOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

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

    // TODO: wire to Supabase form_submissions table
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitted(true);
    setIsSubmitting(false);

    window.setTimeout(() => {
      closeModal();
    }, 1200);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      {isSubmitting && <LoadingOverlay label="Loading" />}
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={closeModal}
        aria-label="Close lead form"
      />

      <div className="relative z-10 flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 z-20 rounded-full p-1.5 text-brand-text transition-colors hover:bg-surface hover:text-brand-text"
          aria-label="Close"
        >
          <X size={22} strokeWidth={2.25} />
        </button>

        {/* Image gallery — desktop */}
        <div className="hidden w-[38%] shrink-0 flex-col gap-2 bg-surface p-2 sm:flex">
          {galleryImages.map((image) => (
            <div key={image.src} className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
              <LoadingImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {/* Image strip — mobile */}
          <div className="grid grid-cols-3 gap-1.5 p-2 sm:hidden">
            {galleryImages.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <LoadingImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  showLabel={false}
                />
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
          <div className="mb-5 pr-8 sm:mb-6">
            <h2
              id="lead-modal-title"
              className="text-xl font-bold leading-snug text-navy sm:text-2xl"
            >
              Looking for Your Next Adventure?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-[0.95rem]">
              Connect with our travel experts for exclusive itineraries and best
              deals tailored to your unique travel experiences.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-semibold text-navy">
                Thank you! We&apos;ll be in touch soon.
              </p>
              <p className="mt-2 text-sm text-brand-muted">
                Our team will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-brand-text">
                  Name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="Enter your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-subtle focus:border-navy focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-medium text-brand-text">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    id="lead-country-code"
                    value={form.countryCode}
                    onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                    className="w-[5.5rem] shrink-0 rounded-lg border border-brand-border bg-white px-2 py-2.5 text-sm text-brand-text outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
                    aria-label="Country code"
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="min-w-0 flex-1 rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-subtle focus:border-navy focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-brand-text">
                  Message
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  placeholder="Tell Us More"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-brand-border px-3.5 py-2.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-subtle focus:border-navy focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.expectingCallback}
                  onChange={(e) =>
                    setForm({ ...form, expectingCallback: e.target.checked })
                  }
                  className="size-4 rounded border-brand-border text-navy focus:ring-navy/30"
                />
                <span className="text-sm font-medium text-navy">
                  Expecting a Callback
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-cta py-3 text-sm font-semibold text-white transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Loading" : "Send"}
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
