import Link from "next/link";
import { getDestinationHref } from "@/lib/trips/links";
import type { Destination } from "@/types";

export default function DestCard({ dest }: { dest: Destination }) {
  const href = getDestinationHref(dest.id);

  return (
    <Link href={href} className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-surface">
      <img
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent group-hover:from-black/90 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-base group-hover:text-cta transition-colors">
          {dest.name}
        </h3>
        <p className="text-xs text-white/80 font-medium mt-0.5">{dest.count}</p>
      </div>
    </Link>
  );
}
