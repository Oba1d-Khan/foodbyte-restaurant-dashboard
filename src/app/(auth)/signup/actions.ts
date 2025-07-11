"use server";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import User from "@/src/lib/models/User";
import { createSession } from "@/src/app/lib/session";
import connect from "@/src/lib/db";
import { sendEmail } from "@/src/utils/emailer";

connect();

// 1. Zod Validation for SignUp
const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});
export async function signup(state: unknown, formData: FormData) {
  const validationResult = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }
  const { username, email, password } = validationResult.data;

  // 2a. check if user already exsists else create new
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { errors: { email: ["Email is already in use"] } };
  }

  // 2b. Create user
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "user", // Explicitly set role
  });

  const user = await newUser.save();

  await sendEmail({ email, emailType: "VERIFY", userId: user._id });

  // 3. Create session
  await createSession(user._id, user.role);

  return { message: "Signup successful!", success: true };
}
