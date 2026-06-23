"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToTarget();
    const timer = window.setTimeout(scrollToTarget, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
