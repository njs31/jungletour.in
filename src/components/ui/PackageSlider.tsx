"use client";

import { useRef } from "react";
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

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 320);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-text shadow-sm transition-colors hover:border-cta hover:text-cta"
          aria-label="Scroll packages left"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-text shadow-sm transition-colors hover:border-cta hover:text-cta"
          aria-label="Scroll packages right"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[min(82vw,280px)] shrink-0 snap-start sm:w-[300px]"
          >
            <TrekCard trek={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
