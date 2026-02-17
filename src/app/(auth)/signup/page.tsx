"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import Link from "next/link";
import { signUp, type ActionResponse } from "@/app/action/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

type RoleOption = "MENTOR" | "MENTEE";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const initialRole: RoleOption =
    roleParam?.toLowerCase() === "mentor"
      ? "MENTOR"
      : roleParam?.toLowerCase() === "mentee"
        ? "MENTEE"
        : "MENTEE";

  // If user came from landing page with explicit role param, trust it
  const hasRoleParam =
    roleParam !== null &&
    (roleParam.toLowerCase() === "mentor" ||
      roleParam.toLowerCase() === "mentee");

  const [selectedRole, setSelectedRole] = useState<RoleOption>(initialRole);
  const [roleExplicitlySelected, setRoleExplicitlySelected] =
    useState(hasRoleParam);

  const handleRoleSelection = (role: RoleOption) => {
    setSelectedRole(role);
    setRoleExplicitlySelected(true);
  };

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
    if (!roleExplicitlySelected) {
      alert(
        "Please select your role (Mentor or Mentee) before continuing with Google.",
      );
      return;
    }

    document.cookie = `pending_role=${selectedRole}; path=/; max-age=300`;
    await nextAuthSignIn("google", {
      callbackUrl: "/dashboard",
      role: selectedRole.toLowerCase(),
    });
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
            <input type="hidden" name="role" value={selectedRole} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                I want to sign up as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={selectedRole === "MENTEE" ? "secondary" : "outline"}
                  onClick={() => handleRoleSelection("MENTEE")}
                  className="w-full"
                >
                  Sign up as Mentee
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === "MENTOR" ? "secondary" : "outline"}
                  onClick={() => handleRoleSelection("MENTOR")}
                  className="w-full"
                >
                  Sign up as Mentor
                </Button>
              </div>
              {!roleExplicitlySelected && (
                <p className="text-xs text-muted-foreground text-center">
                  Please select your role to continue
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
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
              disabled={isPending || !roleExplicitlySelected}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!roleExplicitlySelected}
          >
            Continue with Google
            {roleExplicitlySelected && selectedRole && (
              <span className="">
                (as {selectedRole === "MENTOR" ? "Mentor" : "Mentee"})
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
