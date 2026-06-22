import Image from "next/image";
import type { HimalayanTrek } from "@/types";

export default function HimalayanCard({ trek }: { trek: HimalayanTrek }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[3/4]">
      <Image
        src={trek.image}
        alt={trek.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-orange-500 rounded-full px-2 py-0.5 font-semibold">
            {trek.difficulty}
          </span>
          <span className="text-xs text-gray-300">{trek.location}</span>
        </div>
        <h3 className="font-bold text-base leading-tight">{trek.title}</h3>
        <div className="flex gap-3 text-xs text-gray-300 mt-1">
          <span>⏱ {trek.duration}</span>
          <span>⛰ {trek.elevation}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-orange-400">{trek.price}/person</p>
          <button className="text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
