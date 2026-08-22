"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrekCard from "@/components/ui/TrekCard";
import type { TrekCard as TrekCardType, TourCard } from "@/types";

interface PackageSliderProps {
  items: (TrekCardType | TourCard)[];
  ariaLabel?: string;
}

export default function PackageSlider({
  items,
  ariaLabel = "Packages",
}: PackageSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 300;
    const amount = (cardWidth + 16) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div className="relative group/slider">
      {/* Top Header controls for desktop */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Showing {items.length} Packages
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="inline-flex size-9 items-center justify-center rounded-full border border-brand-border bg-white text-navy shadow-sm transition-all hover:border-cta hover:bg-cta hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy disabled:hover:border-brand-border"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="inline-flex size-9 items-center justify-center rounded-full border border-brand-border bg-white text-navy shadow-sm transition-all hover:border-cta hover:bg-cta hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy disabled:hover:border-brand-border"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Side floating arrows for seamless sliding */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 size-10 items-center justify-center rounded-full border border-brand-border bg-white/95 text-navy shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-cta hover:text-white md:flex"
          aria-label="Scroll left floating"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 size-10 items-center justify-center rounded-full border border-brand-border bg-white/95 text-navy shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-cta hover:text-white md:flex"
          aria-label="Scroll right floating"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[280px] shrink-0 snap-start sm:w-[310px] md:w-[320px]"
          >
            <TrekCard trek={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
