import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import HashScroll from "@/components/layout/HashScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Jungle Tours & Treks: Treks & Weekend Tours from Bangalore",
  description:
    "Guided treks, weekend getaways, and sunrise climbs from Bangalore. Curated Western Ghats adventures since 2023.",
  keywords: "treks, trekking bangalore, western ghats, weekend tours, hiking",
  openGraph: {
    title: "Jungle Tours & Treks: Treks & Weekend Tours from Bangalore",
    description:
      "Guided treks and getaways from Bangalore. Creating memories since 2023.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, fraunces.variable, "font-sans")}>
      <body className="bg-white antialiased text-brand-text">
        <HashScroll />
        {children}
        <LeadCaptureModal />
      </body>
    </html>
  );
}
