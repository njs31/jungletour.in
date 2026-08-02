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
  onError,
  showLabel = true,
  fill,
  width,
  height,
  ...props
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [props.src]);

  const image = (
    <>
      {!loaded && !failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#e8efe9]">
          <LoadingAnimation size="sm" showLabel={showLabel} label="Loading" />
        </div>
      )}
      {failed ? (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-navy to-navy-light" />
      ) : (
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
          onError={(event) => {
            setFailed(true);
            onError?.(event);
          }}
        />
      )}
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
