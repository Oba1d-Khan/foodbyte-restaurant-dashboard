import connect from "@/src/lib/db";
import { NextResponse } from "next/server";
import User from "@/src/lib/models/User";
import { cookies } from "next/headers";
import { decrypt } from "@/src/app/lib/session";

connect();

export async function POST() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return NextResponse.json(
      { message: "Invalid or missing session" },
      { status: 401 }
    );
  }
  const user = await User.findOne({ _id: session.userId }).select("-password");

  if (!user) {
    return NextResponse.json({ message: "User not found!" }, { status: 500 });
  }

  return NextResponse.json(
    { data: user, message: "User found successfully!" },
    { status: 200 }
  );
}
