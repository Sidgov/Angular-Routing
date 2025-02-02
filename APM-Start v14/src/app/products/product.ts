/* Defines the product entity */
export interface Product {
  id: number | null;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface ProductsResolved {
  products: Product[] | null;
  error?: string;
}

export interface ProductResolved {
  product: Product | null;
  error?: string;
}
