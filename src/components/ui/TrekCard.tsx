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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <LoadingImage
          src={trek.image}
          alt={trek.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 82vw, 300px"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-text shadow-sm">
          {trek.badgeEmoji} {trek.badge}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-medium uppercase tracking-wide text-white/80">
            {trek.location}
          </p>
          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-white line-clamp-2">
            {trek.title}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex gap-3 text-xs text-brand-muted">
          <span>{trek.duration}</span>
          {"elevation" in trek && trek.elevation && (
            <span>{trek.elevation}</span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <p className="text-[11px] text-brand-subtle">From</p>
            <p className="text-sm font-bold text-cta">{trek.price}</p>
          </div>
          <span className="rounded-full border border-cta px-3.5 py-1.5 text-xs font-semibold text-cta transition-colors group-hover:bg-cta group-hover:text-white">
            Details
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
