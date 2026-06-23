"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LoadingImage from "@/components/ui/LoadingImage";

const navLinks = [
  { label: "2 Nights Packages", href: "#2nights-packages" },
  { label: "Weekend Escapes", href: "#weekend-escapes" },
  { label: "Sunrise Treks", href: "#sunrise-treks" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/#home"
            className="flex items-center gap-2 flex-shrink-0"
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
            <span className="font-bold text-sm sm:text-base">
              <span className="text-navy">JUNGLE</span>{" "}
              <span className="text-cta">Tours & Treks</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-text hover:text-cta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918310822183"
              className="text-sm font-semibold text-cta hover:text-cta-hover transition-colors"
            >
              +91 83108 22183
            </a>
            <a
              href="https://wa.me/918310822183"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cta hover:bg-cta-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-brand-text hover:text-cta"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-brand-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-brand-text hover:text-cta py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-brand-border">
            <a
              href="tel:+918310822183"
              className="block text-sm font-semibold text-cta py-2"
            >
              +91 83108 22183
            </a>
            <a
              href="https://wa.me/918310822183"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-cta text-white text-sm font-semibold px-5 py-2 rounded-full"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
