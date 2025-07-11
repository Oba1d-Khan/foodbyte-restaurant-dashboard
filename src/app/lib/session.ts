import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

type SessionPayload = {
  userId: string;
  role: string;
  expiresAt: Date;
};

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000, // 1 day
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.log("Failed to verify session" + errorMessage);
    return null;
  }
}

// After user successfully login or signup
export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, role, expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  redirect("/");
}

export async function verifySession() {
  const cookieSession = (await cookies()).get(cookie.name)?.value;
  const session = await decrypt(cookieSession);
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId, role: session.role };
}

export async function deleteSession() {
  (await cookies()).delete("session");
  redirect("/login");
}
