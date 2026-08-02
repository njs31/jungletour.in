"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { Menu, Phone, X } from "lucide-react";
import LoadingImage from "@/components/ui/LoadingImage";

const navLinks = [
  { label: "Explore Treks", href: "#2nights-packages" },
  { label: "Weekend Getaways", href: "#weekend-escapes" },
  { label: "Sunrise Treks", href: "#sunrise-treks" },
  { label: "Tours", href: "#tours" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/#home"
            className="flex flex-shrink-0 items-center gap-2"
            onClick={(e) => {
              if (window.location.pathname !== "/") return;
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
              window.history.replaceState(null, "", "/#home");
            }}
          >
            <LoadingImage
              src="/logo.png"
              alt="Jungle Tours & Treks"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
              showLabel={false}
            />
            <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
              <span className="text-navy">Jungle</span>{" "}
              <span className="text-cta">Tours & Treks</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-text transition-colors hover:text-cta"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={CONTACT_PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-cta hover:text-cta"
            >
              <Phone className="size-3.5" aria-hidden />
              Call
            </a>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
            >
              WhatsApp
            </a>
          </div>

          <button
            className="rounded-md p-2 text-brand-text hover:text-cta lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="space-y-3 border-t border-brand-border bg-white px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-brand-text hover:text-cta"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 border-t border-brand-border pt-3">
            <a
              href={CONTACT_PHONE_TEL}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-border py-2.5 text-sm font-semibold text-navy"
            >
              <Phone className="size-3.5" aria-hidden />
              Call
            </a>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-cta py-2.5 text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-center text-xs text-brand-muted">
            {CONTACT_PHONE_DISPLAY}
          </p>
        </div>
      )}
    </header>
  );
}
