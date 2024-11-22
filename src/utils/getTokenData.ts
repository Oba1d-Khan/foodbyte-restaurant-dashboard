import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/IJwtPayload";
import { cookies } from "next/headers";
export async function getTokenData(request: NextRequest) {
  const token = (await cookies()).get("token")?.value || "";
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as IJwtPayload;
    return decodedToken.id || null;
  } catch (error: any) {
    throw new Error("Token verification failed:", error.message);
    return null;
  }
}
