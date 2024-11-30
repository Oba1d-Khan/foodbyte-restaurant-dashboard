import { NextResponse } from "next/server";
import connect from "@/src/lib/db";
import FoodItem from "@/src/lib/models/FoodItem";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

export const GET = async () => {
  try {
    await connect();
    const foodItems = await FoodItem.find({});

    return new NextResponse(JSON.stringify(foodItems), { status: 200 });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return new NextResponse("Error in fetching data: " + errorMessage, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newFoodItem = new FoodItem(body);
    await newFoodItem.save();

    return new NextResponse(
      JSON.stringify({ message: "Food Item Added", foodItem: newFoodItem }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    return new NextResponse(
      "Error in fetching data: " + { error: errorMessage },
      {
        status: 500,
      }
    );
  }
};
