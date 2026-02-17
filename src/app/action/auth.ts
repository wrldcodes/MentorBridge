"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["MENTOR", "MENTEE"], {
      message: "Role is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function signIn(formData: FormData): Promise<ActionResponse> {
  // Extract data from form
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate with Zod
  const validationResult = SignInSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validationResult.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: "USER_NOT_FOUND" };
  }

  if (!user.password) {
    return { success: false, message: "Please continue with Google" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, message: "Invalid password" };
  }

  return { success: true, message: "Authenticated" };
}

export async function signUp(formData: FormData): Promise<ActionResponse> {
  const rawRole = formData.get("role");
  const normalizedRole =
    typeof rawRole === "string" && rawRole.toUpperCase() === "MENTOR"
      ? "MENTOR"
      : "MENTEE";
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    role: normalizedRole,
  };

  const validationResult = SignUpSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
        errors: {
          email: ["User with this email already exists"],
        },
      };
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as Role,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Failed to create user",
        error: "Failed to create user",
      };
    }

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message: "An error occurred while creating your account",
      error: "Failed to create account",
    };
  }
}

export async function signOut(): Promise<void> {
  redirect("/signin");
}
