"use client";

import LoadingAnimation from "@/components/ui/LoadingAnimation";

type LoadingOverlayProps = {
  label?: string;
  imageSrc?: string;
};

export default function LoadingOverlay({
  label = "Loading",
  imageSrc,
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/85 backdrop-blur-sm">
      <LoadingAnimation label={label} imageSrc={imageSrc} size="lg" />
    </div>
  );
}
