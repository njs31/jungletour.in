export interface TrekCard {
  id: string;
  title: string;
  location: string;
  duration: string;
  elevation: string;
  price: string;
  badge: string;
  badgeEmoji: string;
  image: string;
  category: "2nights" | "weekend" | "sunrise";
}

export interface TourCard {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  badge: string;
  badgeEmoji: string;
  image: string;
}

export interface HimalayanTrek {
  id: string;
  title: string;
  location: string;
  difficulty: string;
  duration: string;
  elevation: string;
  price: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  count: string;
  image: string;
}

export interface Testimonial {
  id: string;
  initials: string;
  name: string;
  trek: string;
  rating: number;
  quote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
