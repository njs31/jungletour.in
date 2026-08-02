"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type LoadingImageProps = ImageProps & {
  showLabel?: boolean;
};

export default function LoadingImage({
  className,
  onLoad,
  onError,
  showLabel: _showLabel = true,
  fill,
  width,
  height,
  ...props
}: LoadingImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fill) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-navy/20 to-surface" />
      );
    }
    return (
      <span
        className="inline-block bg-surface"
        style={{ width: width ?? undefined, height: height ?? undefined }}
      />
    );
  }

  const image = (
    <Image
      {...props}
      fill={fill}
      width={width}
      height={height}
      className={cn(className, "bg-surface")}
      onLoad={onLoad}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
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
