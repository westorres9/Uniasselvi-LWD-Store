import { Category } from "./category";
import { Brand } from "./brand";

export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  specs: string;
  price: number;
  imageUrl: string;
  available: boolean;
  saleOff: boolean;
  brand: Brand;
  category: Category;
};
