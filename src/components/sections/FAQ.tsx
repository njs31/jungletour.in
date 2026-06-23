"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <SectionHeader
            eyebrow="Common questions"
            title="Frequently Asked Questions"
            centered
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-brand-border rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface transition-colors"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="font-semibold text-brand-text text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-brand-subtle transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
