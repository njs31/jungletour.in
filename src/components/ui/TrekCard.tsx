import LoadingImage from "@/components/ui/LoadingImage";
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
    <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <LoadingImage
          src={trek.image}
          alt={trek.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-brand-text flex items-center gap-1">
          <span>{trek.badgeEmoji}</span>
          <span>{trek.badge}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-brand-subtle uppercase tracking-wide font-medium">
          {trek.location}
        </p>
        <h3 className="font-semibold text-brand-text mt-1 text-sm leading-snug line-clamp-2 group-hover:text-cta transition-colors">
          {trek.title}
        </h3>
        <div className="flex gap-3 text-xs text-brand-muted mt-2">
          <span>⏱ {trek.duration}</span>
          {"elevation" in trek && trek.elevation && (
            <span>📍 {trek.elevation}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4">
          <div>
            <p className="text-xs text-brand-subtle">Starting from</p>
            <p className="text-cta font-bold text-sm">
              {trek.price}/person
            </p>
          </div>
          <span className="text-xs font-semibold text-cta border border-cta rounded-full px-4 py-1.5 group-hover:bg-cta group-hover:text-white transition-colors duration-200">
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
