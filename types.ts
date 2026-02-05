
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'Painting' | 'Plastering' | 'Commercial';
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
  date: string;
}
