"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import Link from "next/link";
import { signIn, ActionResponse, getPostAuthRedirect } from "@/app/action/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCredentialsSignIn = async (
    _prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    // Validate with Zod via server action
    const result = await signIn(formData);

    if (!result.success) {
      if (result.message === "USER_NOT_FOUND") {
        router.push("/signup");
        return { success: false, message: "" };
      }
      return result;
    }

    // Validation passed — create NextAuth session
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
        message: "Something went wrong. Please try again.",
      };
    }

    const redirectPath = await getPostAuthRedirect();
    router.push(redirectPath);
    return { success: true, message: "Authenticated" };
  };

  const [state, formAction, isPending] = useActionState(
    handleCredentialsSignIn,
    initialState,
  );

  const handleGoogleSignIn = async () => {
    const roleParam = searchParams.get("role");
    const normalizedRole =
      roleParam?.toLowerCase() === "mentor"
        ? "MENTOR"
        : roleParam?.toLowerCase() === "mentee"
          ? "MENTEE"
          : null;

    if (normalizedRole) {
      document.cookie = `pending_role=${normalizedRole}; path=/; max-age=300`;
    }

    await nextAuthSignIn("google", {
      callbackUrl: "/api/auth/check-profile",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-md bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
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
            </div>

            {!state.success && state.message && (
              <p className="text-sm text-red-500 text-center">
                {state.message}
              </p>
            )}
            {state.errors && (
              <div className="text-sm text-red-500 text-center">
                {state.errors.email?.[0] || state.errors.password?.[0]}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>

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
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-emerald-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
