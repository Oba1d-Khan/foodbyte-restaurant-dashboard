"use server";
import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import User from "@/src/lib/models/User";
import connect from "@/src/lib/db";
import bcryptjs from "bcryptjs";

// connect db
await connect();
// Zod Validation schema for login
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

// Login function
export async function login(prevState: unknown, formAction: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formAction));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }

  // Verify the password
  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      errors: {
        password: "Invalid email or password",
      },
    };
  }

  // Create a session
  await createSession(user._id, user.role);

  // Redirect to the home page
  redirect("/");
}

// Logout function
export async function logout() {
  await deleteSession();
}
