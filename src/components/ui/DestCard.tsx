import LoadingImage from "@/components/ui/LoadingImage";
import Link from "next/link";
import { getDestinationHref } from "@/lib/trips/links";
import type { Destination } from "@/types";

export default function DestCard({ dest }: { dest: Destination }) {
  const href = getDestinationHref(dest.id);

  return (
    <Link href={href} className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square">
      <LoadingImage
        src={dest.image}
        alt={dest.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-base group-hover:text-orange-300 transition-colors">
          {dest.name}
        </h3>
        <p className="text-xs text-gray-300 mt-0.5">{dest.count}</p>
      </div>
    </Link>
  );
}
