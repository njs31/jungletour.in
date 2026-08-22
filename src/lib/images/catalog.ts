import {
  twoNightPackages,
  weekendEscapes,
  sunriseTreks,
} from "@/data/packages";
import { weekendTours } from "@/data/tours";
import { himalayanTreks } from "@/data/himalayan";
import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";
import { trekDetailsBySlug } from "@/data/treks/registry";
import type { ImageSlot } from "@/types/image-override";

export const SITE_IMAGE_DEFAULTS = {
  hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
  ctaBanner:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
} as const;

export function buildImageCatalog(): ImageSlot[] {
  const slots: ImageSlot[] = [];

  const allPackages = [
    ...twoNightPackages,
    ...weekendEscapes,
    ...sunriseTreks,
  ];

  for (const pkg of allPackages) {
    slots.push({
      key: `trip:${pkg.id}:cover`,
      label: `${pkg.title} — Cover`,
      category: "trip-cover",
      entityId: pkg.id,
      defaultUrl: pkg.image,
      defaultAlt: pkg.title,
    });

    const detail = trekDetailsBySlug[`${pkg.id}-trek`];
    detail?.images.forEach((image, index) => {
      slots.push({
        key: `trip:${pkg.id}:gallery:${index}`,
        label: `${pkg.title} — Gallery ${index + 1}`,
        category: "trip-gallery",
        entityId: pkg.id,
        defaultUrl: image.src,
        defaultAlt: image.alt,
      });
    });
  }

  for (const tour of weekendTours) {
    slots.push({
      key: `trip:${tour.id}:cover`,
      label: `${tour.title} — Cover`,
      category: "trip-cover",
      entityId: tour.id,
      defaultUrl: tour.image,
      defaultAlt: tour.title,
    });
  }

  for (const trek of himalayanTreks) {
    slots.push({
      key: `trip:${trek.id}:cover`,
      label: `${trek.title} — Cover`,
      category: "trip-cover",
      entityId: trek.id,
      defaultUrl: trek.image,
      defaultAlt: trek.title,
    });
  }

  for (const dest of destinations) {
    slots.push({
      key: `destination:${dest.id}`,
      label: `${dest.name} — Destination`,
      category: "destination",
      entityId: dest.id,
      defaultUrl: dest.image,
      defaultAlt: dest.name,
    });
  }

  for (const post of blogPosts) {
    slots.push({
      key: `blog:${post.id}`,
      label: `${post.title} — Blog`,
      category: "blog",
      entityId: post.id,
      defaultUrl: post.image,
      defaultAlt: post.title,
    });
  }

  slots.push(
    {
      key: "site:hero",
      label: "Homepage — Hero background",
      category: "site",
      entityId: "hero",
      defaultUrl: SITE_IMAGE_DEFAULTS.hero,
      defaultAlt: "Jungle Tours & Treks hero",
    },
    {
      key: "site:cta-banner",
      label: "Homepage — CTA banner background",
      category: "site",
      entityId: "cta-banner",
      defaultUrl: SITE_IMAGE_DEFAULTS.ctaBanner,
      defaultAlt: "Call to action banner",
    }
  );

  return slots;
}

export function getImageSlotByKey(key: string) {
  return buildImageCatalog().find((slot) => slot.key === key) ?? null;
}
