import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import HashScroll from "@/components/layout/HashScroll";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jungle Tours & Treks: Treks & Weekend Tours from Bangalore",
  description:
    "Expert-led treks and tours from Bangalore. From misty Western Ghats ridgelines to sun-soaked coastal trails — curated for every kind of adventurer.",
  keywords: "treks, trekking bangalore, western ghats, weekend tours, hiking",
  openGraph: {
    title: "Jungle Tours & Treks: Treks & Weekend Tours from Bangalore",
    description:
      "Expert-led treks and tours from Bangalore. Curated for every kind of adventurer since 2017.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.className, "font-sans", geist.variable)}>
      <body className="antialiased">
        <HashScroll />
        {children}
        <LeadCaptureModal />
      </body>
    </html>
  );
}
