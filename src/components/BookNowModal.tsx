"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

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
    }, 1800);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-now-title"
    >
      {isSubmitting && <LoadingOverlay label="Loading" />}

      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close booking form"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-green-700">
              Booking request received!
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Our team will contact you shortly on {phone}.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
              Book Now
            </p>
            <h2 id="book-now-title" className="text-xl font-bold text-gray-900 pr-8">
              {tripTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Share your details and we&apos;ll get back to you to confirm your
              booking.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-1.5 block text-sm font-medium text-gray-800"
                >
                  Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-1.5 block text-sm font-medium text-gray-800"
                >
                  Mobile number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-captcha"
                  className="mb-1.5 block text-sm font-medium text-gray-800"
                >
                  {captcha
                    ? `What is ${captcha.a} + ${captcha.b}?`
                    : "Loading verification..."}
                </label>
                <input
                  id="booking-captcha"
                  type="number"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer"
                  disabled={!captcha}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:bg-gray-50"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting || !captcha}
                className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Loading" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
