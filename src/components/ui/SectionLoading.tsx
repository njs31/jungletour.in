import LoadingAnimation from "@/components/ui/LoadingAnimation";

export default function SectionLoading() {
  return (
    <div className="flex min-h-[280px] items-center justify-center py-16 md:py-24">
      <LoadingAnimation />
    </div>
  );
}
