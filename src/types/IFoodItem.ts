export interface IFoodItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPercentage?: number;
  finalPrice?: number;
  category?:
    | "Featured"
    | "Burgers"
    | "Sandwiches"
    | "Wraps"
    | "Fries"
    | "Beverages"
    | "Donuts"
    | "Coffee"
    | "Milkshakes"
    | "Lemonades"
    | "Teas"
    | "Extra";
  isFeatured?: boolean;
}
