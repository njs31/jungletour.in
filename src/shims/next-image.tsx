import { cn } from "@/lib/utils";

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  sizes: _sizes,
  quality: _quality,
  className,
  style,
  loading,
  ...props
}: ImageProps) {
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading={resolvedLoading}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      style={fill ? { objectFit: undefined, ...style } : style}
    />
  );
}
