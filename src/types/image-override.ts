export type ImageCategory =
  | "trip-cover"
  | "trip-gallery"
  | "destination"
  | "blog"
  | "site";

export interface ImageSlot {
  key: string;
  label: string;
  category: ImageCategory;
  entityId: string;
  defaultUrl: string;
  defaultAlt: string;
}

export interface ImageOverride {
  image_key: string;
  url: string;
  alt: string | null;
  storage_path: string | null;
  updated_at: string;
}

export interface ResolvedImageSlot extends ImageSlot {
  currentUrl: string;
  currentAlt: string;
  isOverridden: boolean;
  storagePath: string | null;
  updatedAt: string | null;
}
