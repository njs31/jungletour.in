export interface TrekTripDate {
  date: string;
  status: string;
}

export interface TrekOverride {
  trek_id: string;
  price: string | null;
  original_price: string | null;
  discount_label: string | null;
  title: string | null;
  meta_description: string | null;
  duration: string | null;
  difficulty: string | null;
  altitude: string | null;
  distance: string | null;
  next_trip_dates: TrekTripDate[];
  highlights: string[] | null;
  is_active: boolean;
  updated_at: string;
}

export interface TrekOverrideInput {
  price?: string;
  original_price?: string;
  discount_label?: string;
  title?: string;
  meta_description?: string;
  duration?: string;
  difficulty?: string;
  altitude?: string;
  distance?: string;
  next_trip_dates?: TrekTripDate[];
  highlights?: string[];
  is_active?: boolean;
}
