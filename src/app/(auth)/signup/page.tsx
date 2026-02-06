"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import Link from "next/link";
import { signUp, type ActionResponse } from "@/app/action/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (
    _prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    // Validate & create user via server action
    const result = await signUp(formData);

    if (!result.success) {
      return result;
    }

    // Account created — sign them in automatically
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const authResult = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (authResult?.error) {
      return {
        success: false,
        message:
          "Account created but failed to sign in. Please log in manually.",
      };
    }

    router.push("/dashboard");
    return { success: true, message: "Account created successfully" };
  };

  const [state, formAction, isPending] = useActionState(
    handleSignUp,
    initialState,
  );

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("logged in user:", user, {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Error signing in with Google:", err);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-md bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {state.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {state.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {state.errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {state.errors.confirmPassword[0]}
                </p>
              )}
            </div>

            {!state.success && state.message && !state.errors && (
              <p className="text-sm text-red-500 text-center">
                {state.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isPending ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-emerald-500 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full"
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
