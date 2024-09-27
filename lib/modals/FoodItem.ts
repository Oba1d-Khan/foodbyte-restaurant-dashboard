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
});

const FoodItem = models.FoodItem || model("FoodItem", foodItemSchema);

export default FoodItem;
