"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageSquare } from "lucide-react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { CONTACT_PHONE_TEL, CONTACT_WHATSAPP_URL } from "@/lib/contact";

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  tripSlug: string;
  tripId: string;
}

interface CaptchaChallenge {
  a: number;
  b: number;
  token: string;
}

export default function BookNowModal({
  isOpen,
  onClose,
  tripTitle,
  tripSlug,
  tripId,
}: BookNowModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function loadCaptcha() {
    const res = await fetch("/api/bookings/captcha");
    if (!res.ok) {
      setError("Could not load verification. Please try again.");
      return;
    }
    const data = (await res.json()) as CaptchaChallenge;
    setCaptcha(data);
    setAnswer("");
    setError("");
  }

  useEffect(() => {
    if (!isOpen) return;

    setName("");
    setPhone("");
    setSubmitted(false);
    setError("");
    void loadCaptcha();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captcha) return;

    setIsSubmitting(true);
    setError("");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        tripTitle,
        tripSlug,
        tripId,
        answer: Number(answer),
        a: captcha.a,
        b: captcha.b,
        token: captcha.token,
        website: "",
      }),
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Failed to submit. Please try again.");
      if (res.status === 400) void loadCaptcha();
      return;
    }

    setSubmitted(true);
    window.setTimeout(() => {
      onClose();
    }, 1500);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-now-title"
    >
      {isSubmitting && <LoadingOverlay label="Submitting..." />}

      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close booking form"
      />

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm rounded-2xl bg-white p-4 sm:p-5 shadow-2xl border border-brand-border">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-brand-muted hover:bg-surface hover:text-brand-text"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="text-base font-bold text-green-700">
              Booking Request Received!
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              We will contact you shortly on {phone}.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cta mb-0.5">
              Book Now
            </p>
            <h2 id="book-now-title" className="text-base font-bold text-navy line-clamp-1 pr-6">
              {tripTitle}
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted"
                >
                  Full Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted"
                >
                  Mobile Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-captcha"
                  className="mb-1 block text-[11px] font-semibold uppercase text-brand-muted"
                >
                  {captcha
                    ? `Verification: ${captcha.a} + ${captcha.b} = ?`
                    : "Loading captcha..."}
                </label>
                <input
                  id="booking-captcha"
                  type="number"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter answer"
                  disabled={!captcha}
                  className="w-full rounded-lg border border-brand-border px-3 py-1.5 text-xs outline-none focus:border-cta focus:ring-1 focus:ring-cta disabled:bg-surface"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting || !captcha}
                className="w-full rounded-full bg-cta py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking Request"}
              </button>

              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-muted">
                <span>Instant help:</span>
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
          </>
        )}
      </div>
    </div>
  );
}
