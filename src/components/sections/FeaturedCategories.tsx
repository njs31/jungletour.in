"use client";

import { useEffect, useState } from "react";
import PackageSlider from "@/components/ui/PackageSlider";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TrekCard as TrekCardType } from "@/types";

type TabId = "2nights" | "weekend" | "sunrise";

const tabs: { id: TabId; label: string }[] = [
  { id: "2nights", label: "Explore Treks" },
  { id: "weekend", label: "Weekend Getaways" },
  { id: "sunrise", label: "Sunrise Treks" },
];

const hashToTab: Record<string, TabId> = {
  "#2nights-packages": "2nights",
  "#weekend-escapes": "weekend",
  "#sunrise-treks": "sunrise",
};

interface FeaturedCategoriesProps {
  twoNightPackages: TrekCardType[];
  weekendEscapes: TrekCardType[];
  sunriseTreks: TrekCardType[];
}

export default function FeaturedCategories({
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
}: FeaturedCategoriesProps) {
  const dataMap: Record<TabId, TrekCardType[]> = {
    "2nights": twoNightPackages,
    weekend: weekendEscapes,
    sunrise: sunriseTreks,
  };
  const [activeTab, setActiveTab] = useState<TabId>("2nights");

  useEffect(() => {
    const syncTabFromHash = () => {
      const tab = hashToTab[window.location.hash];
      if (tab) setActiveTab(tab);
    };

    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  function selectTab(tab: TabId) {
    setActiveTab(tab);
    const hash = Object.entries(hashToTab).find(([, id]) => id === tab)?.[0];
    if (hash) {
      window.history.replaceState(null, "", hash);
    }
  }

  return (
    <section id="packages" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="relative h-0">
        <div id="2nights-packages" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
        <div id="weekend-escapes" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
        <div id="sunrise-treks" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Popular packages"
            title="Find your next trail"
            subtitle="Swipe through handpicked treks and getaways from Bangalore."
          />
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-navy text-white shadow-md"
                  : "bg-surface text-brand-muted hover:text-brand-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <PackageSlider
          key={activeTab}
          items={dataMap[activeTab]}
          ariaLabel={tabs.find((tab) => tab.id === activeTab)?.label}
        />
      </div>
    </section>
  );
}
