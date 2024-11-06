export interface ICartItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPercentage?: number;
  finalPrice?: number;
  quantity: number;
}
