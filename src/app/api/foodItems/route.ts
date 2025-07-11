import { NextResponse } from "next/server";
import connect from "@/src/lib/db";
import FoodItem from "@/src/lib/models/FoodItem";
import { getErrorMessage } from "@/src/utils/getErrorMessage";
import { cookies } from "next/headers";
import { decrypt } from "@/src/app/lib/session";

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
    // Check session and role
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    if (!session || session.role !== "admin") {
      return new NextResponse("Forbidden: Admins only", { status: 403 });
    }
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

export const PUT = async (request: Request) => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    if (!session || session.role !== "admin") {
      return new NextResponse("Forbidden: Admins only", { status: 403 });
    }
    const body = await request.json();
    const { _id, ...updateFields } = body;
    if (!_id) {
      return new NextResponse("Missing food item ID", { status: 400 });
    }
    await connect();
    const updated = await FoodItem.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });
    if (!updated) {
      return new NextResponse("Food item not found", { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({ message: "Food Item Updated", foodItem: updated }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return new NextResponse("Error updating food item: " + errorMessage, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    if (!session || session.role !== "admin") {
      return new NextResponse("Forbidden: Admins only", { status: 403 });
    }
    const body = await request.json();
    const { _id } = body;
    if (!_id) {
      return new NextResponse("Missing food item ID", { status: 400 });
    }
    await connect();
    const deleted = await FoodItem.findByIdAndDelete(_id);
    if (!deleted) {
      return new NextResponse("Food item not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify({ message: "Food Item Deleted" }), {
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return new NextResponse("Error deleting food item: " + errorMessage, {
      status: 500,
    });
  }
};
