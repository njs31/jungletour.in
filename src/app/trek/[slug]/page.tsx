import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrekDetailView from "@/components/trek/TrekDetailView";
import { trekDetailIds } from "@/data/treks";
import { getTrekBySlugWithOverrides } from "@/lib/treks/overrides";

export const revalidate = 60;

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return trekDetailIds.map((id) => ({ slug: `${id}-trek` }));
}

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekBySlugWithOverrides(slug);
  if (!trek) return {};

  return {
    title: trek.title,
    description: trek.metaDescription,
    openGraph: {
      title: trek.title,
      description: trek.metaDescription,
      images: trek.images[0] ? [{ url: trek.images[0].src }] : undefined,
    },
  };
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = await getTrekBySlugWithOverrides(slug);

  if (!trek) notFound();

  return (
    <>
      <Header />
      <main>
        <TrekDetailView trek={trek} />
      </main>
      <Footer />
    </>
  );
}
