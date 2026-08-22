import Link from "next/link";
import { getTrekDetailHref } from "@/data/treks";
import { isExternalHref, resolveTripHref } from "@/lib/trips/links";
import type { TrekCard as TrekCardType } from "@/types";

interface TrekCardProps {
  trek: TrekCardType | import("@/types").TourCard;
  href?: string;
}

export default function TrekCard({ trek, href }: TrekCardProps) {
  const detailHref =
    href ??
    ("category" in trek
      ? getTrekDetailHref(trek.id)
      : resolveTripHref(trek.id, trek.title));

  const card = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={trek.image}
          alt={trek.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        
        {trek.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold text-navy shadow-sm">
            {trek.badgeEmoji} {trek.badge}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/90">
            {trek.location}
          </p>
          <h3 className="mt-0.5 font-display text-base font-bold leading-snug text-white line-clamp-1">
            {trek.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between text-xs text-brand-muted font-medium">
          <span>⏱ {trek.duration}</span>
          {"elevation" in trek && trek.elevation && (
            <span>⛰ {trek.elevation}</span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-brand-border/60 pt-3">
          <div>
            <p className="text-[10px] uppercase font-semibold text-brand-muted">Starting from</p>
            <p className="text-base font-extrabold text-cta">{trek.price}</p>
          </div>
          <span className="rounded-full bg-cta px-4 py-1.5 text-xs font-bold text-white transition-all group-hover:bg-cta-hover group-hover:shadow-md">
            View Details
          </span>
        </div>
      </div>
    </div>
  );

  if (!detailHref) return card;

  if (isExternalHref(detailHref)) {
    return (
      <a
        href={detailHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={detailHref} className="block h-full">
      {card}
    </Link>
  );
}
