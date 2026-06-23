import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { outer: "size-14", inner: "inset-[3px]", image: 40 },
  md: { outer: "size-20", inner: "inset-[4px]", image: 64 },
  lg: { outer: "size-28", inner: "inset-[5px]", image: 96 },
} as const;

type LoadingAnimationProps = {
  label?: string;
  showLabel?: boolean;
  size?: keyof typeof sizeMap;
  imageSrc?: string;
  className?: string;
};

export default function LoadingAnimation({
  label = "Loading",
  showLabel = true,
  size = "md",
  imageSrc = "/logo.png",
  className,
}: LoadingAnimationProps) {
  const dimensions = sizeMap[size];

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={cn("relative", dimensions.outer)}>
        <div
          className="absolute inset-0 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #2563eb 310deg, #3b82f6 360deg)",
          }}
        />
        <div
          className={cn(
            "absolute overflow-hidden rounded-full bg-white",
            dimensions.inner
          )}
        >
          <Image
            src={imageSrc}
            alt=""
            width={dimensions.image}
            height={dimensions.image}
            className="size-full object-cover"
            aria-hidden
          />
        </div>
      </div>
      {showLabel && (
        <p className="mt-3 text-sm font-semibold tracking-wide text-blue-600 uppercase">
          {label}
        </p>
      )}
    </div>
  );
}
