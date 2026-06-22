import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Backpackers United: Treks & Weekend Tours from Bangalore",
  description:
    "Expert-led treks and tours from Bangalore. From misty Western Ghats ridgelines to sun-soaked coastal trails — curated for every kind of adventurer.",
  keywords: "treks, trekking bangalore, western ghats, weekend tours, hiking",
  openGraph: {
    title: "Backpackers United: Treks & Weekend Tours from Bangalore",
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
    <html lang="en" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
