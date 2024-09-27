import { NextResponse } from "next/server";
import connect from "@/lib/db";
import FoodItem from "@/lib/modals/FoodItem";

export const GET = async () => {
  try {
    await connect();
    const foodItems = await FoodItem.find({});

    return new NextResponse(JSON.stringify(foodItems), { status: 200 });
  } catch (error: any) {
    return (
      new NextResponse("Error in fetching data" + error.message),
      { status: 500 }
    );
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
  } catch (error: any) {
    return (
      new NextResponse("Error in submitting data" + error.message),
      {
        status: 500,
      }
    );
  }
};
