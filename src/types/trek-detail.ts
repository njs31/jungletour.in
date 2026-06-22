export interface TrekPickupPoint {
  name: string;
  time: string;
  landmark: string;
}

export interface TrekItineraryDay {
  day: string;
  title: string;
  description: string;
  pickupPoints?: TrekPickupPoint[];
}

export interface TrekSeason {
  period: string;
  label: string;
  description: string;
  variant: "best" | "scenic" | "off";
}

export interface TrekRouteSegment {
  title: string;
  distance: string;
  duration: string;
  description: string;
}

export interface TrekDeparture {
  date: string;
  status: string;
  price: string;
}

export interface TrekReview {
  id: string;
  initials: string;
  name: string;
  date: string;
  rating: number;
  quote: string;
}

export interface TrekCancellationRow {
  daysBefore: string;
  charge: string;
  refund: string;
}

export interface TrekDetail {
  slug: string;
  title: string;
  metaDescription: string;
  location: string;
  altitude: string;
  distance: string;
  difficulty: string;
  duration: string;
  pickupDrop: string;
  category: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  rating: number;
  reviewCount: number;
  images: { src: string; alt: string }[];
  highlights: string[];
  overview: {
    intro: string;
    sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  };
  itinerary: TrekItineraryDay[];
  seasons: TrekSeason[];
  seasonNote: string;
  routeSegments: TrekRouteSegment[];
  inclusions: string[];
  exclusions: string[];
  departures: TrekDeparture[];
  whatToExpect: string[];
  accommodations: string;
  teamNote: string;
  packList: { title: string; description: string }[];
  packListAvoid: string[];
  faqs: { question: string; answer: string }[];
  cancellationNotes: string[];
  cancellationTable: TrekCancellationRow[];
  reviews: TrekReview[];
  totalReviews: number;
}
