import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/IJwtPayload";
import { cookies } from "next/headers";
import { getErrorMessage } from "./getErrorMessage";
export async function getTokenData() {
  const token = (await cookies()).get("token")?.value || "";
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as IJwtPayload;
    return decodedToken.id || null;
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
