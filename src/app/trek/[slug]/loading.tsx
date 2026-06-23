import LoadingAnimation from "@/components/ui/LoadingAnimation";

export default function TrekLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoadingAnimation size="lg" />
    </div>
  );
}
