/**
 * Product type definitions
 */

export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  specs: ProductSpecs;
  reviews: ProductReview[];
  // Optional fields that might be added later
  discount?: number;
  stock?: number;
  tags?: string[];
  relatedProducts?: string[];
}
