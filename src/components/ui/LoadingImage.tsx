"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import LoadingAnimation from "@/components/ui/LoadingAnimation";

type LoadingImageProps = ImageProps & {
  showLabel?: boolean;
};

export default function LoadingImage({
  className,
  onLoad,
  showLabel = true,
  fill,
  width,
  height,
  ...props
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [props.src]);

  const image = (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/90">
          <LoadingAnimation size="sm" showLabel={showLabel} label="Loading" />
        </div>
      )}
      <Image
        {...props}
        fill={fill}
        width={width}
        height={height}
        className={cn(
          className,
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );

  if (fill) return image;

  return (
    <span
      className="relative inline-block"
      style={{ width: width ?? undefined, height: height ?? undefined }}
    >
      {image}
    </span>
  );
}
