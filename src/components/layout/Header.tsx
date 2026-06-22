"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Tours", href: "#tours" },
  { label: "Himalayan", href: "#himalayan" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#why-us" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Jungle Tours & Treks"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              JUNGLE <span className="text-orange-500">Tours & Treks</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918310822183"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              +91 83108 22183
            </a>
            <a
              href="https://wa.me/918310822183"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-orange-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-orange-500 py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <a
              href="tel:+918310822183"
              className="block text-sm font-semibold text-orange-600 py-2"
            >
              +91 83108 22183
            </a>
            <a
              href="https://wa.me/918310822183"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
