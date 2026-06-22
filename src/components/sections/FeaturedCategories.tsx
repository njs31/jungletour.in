"use client";

import { useEffect, useState } from "react";
import TrekCard from "@/components/ui/TrekCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TrekCard as TrekCardType } from "@/types";

type TabId = "2nights" | "weekend" | "sunrise";

const tabs: { id: TabId; label: string; emoji: string }[] = [
  { id: "2nights", label: "2 Nights Packages", emoji: "🏕" },
  { id: "weekend", label: "Weekend Escapes", emoji: "🌄" },
  { id: "sunrise", label: "Sunrise Treks", emoji: "🌅" },
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
    <section id="packages" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <div className="relative h-0">
        <div id="2nights-packages" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
        <div id="weekend-escapes" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
        <div id="sunrise-treks" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Curated for you"
            title="Treks: Trails Worth Every Step"
            subtitle="Handpicked adventures from the Western Ghats and beyond."
          />
        </div>

        {/* Tab switcher */}
        <div className="flex gap-3 flex-wrap mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => selectTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataMap[activeTab].map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>
      </div>
    </section>
  );
}
