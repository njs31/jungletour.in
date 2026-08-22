import Link from "next/link";
import { isExternalHref, resolveTripHref } from "@/lib/trips/links";
import type { HimalayanTrek } from "@/types";

export default function HimalayanCard({ trek }: { trek: HimalayanTrek }) {
  const href = resolveTripHref(trek.id, trek.title);

  const card = (
    <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[3/4] bg-surface">
      <img
        src={trek.image}
        alt={trek.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-cta rounded-full px-2 py-0.5 font-bold">
            {trek.difficulty}
          </span>
          <span className="text-xs text-white/80 font-medium">{trek.location}</span>
        </div>
        <h3 className="font-bold text-base leading-tight group-hover:text-cta transition-colors">
          {trek.title}
        </h3>
        <div className="flex gap-3 text-xs text-white/80 mt-1 font-medium">
          <span>⏱ {trek.duration}</span>
          <span>⛰ {trek.elevation}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-extrabold text-cta">{trek.price}/person</p>
          <span className="text-xs font-semibold bg-white/20 group-hover:bg-cta backdrop-blur-sm rounded-full px-3 py-1 transition-colors">
            View Details
          </span>
        </div>
      </div>
    </div>
  );

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
}
