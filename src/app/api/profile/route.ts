import connect from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/lib/models/User";
import { getTokenData } from "@/src/utils/getTokenData";

connect();

export async function POST(request: NextRequest) {
  const userId = await getTokenData(request);
  if (!userId) {
    return NextResponse.json(
      { message: "Invalid or missing token" },
      { status: 401 }
    );
  }
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ message: "User not found!" }, { status: 500 });
  }

  return NextResponse.json(
    { data: user, message: "User found successfully!" },
    { status: 200 }
  );
}
