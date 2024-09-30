import { Schema, model, models } from "mongoose";

const foodItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Burgers",
      "Sandwiches",
      "Wraps",
      "Fries",
      "Beverages",
      "Donuts",
      "Coffee",
      "Milkshakes",
      "Lemonades",
      "Teas",
      "Extra",
    ],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const FoodItem = models.FoodItem || model("FoodItem", foodItemSchema);

export default FoodItem;
