/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as React from "react";
import SignUpPage from "@/app/(auth)/signup/page";
import { signIn as nextAuthSignIn } from "next-auth/react";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

const push = vi.fn();
let mockRoleParam: string | null = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
  useSearchParams: () =>
    ({
      get: (key: string) => (key === "role" ? mockRoleParam : null),
    }) as URLSearchParams,
}));

vi.mock("@/app/action/auth", () => ({
  signUp: vi.fn().mockResolvedValue({
    success: true,
    message: "",
  }),
}));

const nextAuthSignInMock = vi.mocked(nextAuthSignIn);

describe("SignUpPage", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actionStateSpy: any;

  beforeEach(() => {
    mockRoleParam = null;
    document.cookie =
      "pending_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    push.mockReset();
    nextAuthSignInMock.mockClear();
    nextAuthSignInMock.mockResolvedValue({} as any);
    actionStateSpy = vi.spyOn(React, "useActionState").mockReturnValue([
      {
        success: false,
        message: "",
        errors: undefined,
      },
      vi.fn(),
      false,
    ]);
  });

  afterEach(() => {
    actionStateSpy.mockRestore();
  });

  it("defaults hidden role input to MENTEE when no query param provided", () => {
    render(<SignUpPage />);

    const hiddenRoleInput = screen.getByDisplayValue("MENTEE");
    expect(hiddenRoleInput).toHaveAttribute("name", "role");
    expect(hiddenRoleInput).toHaveValue("MENTEE");
  });

  it("preselects mentor when role=mentor in query", () => {
    mockRoleParam = "mentor";
    render(<SignUpPage />);

    const hiddenRoleInput = screen.getByDisplayValue("MENTOR");
    expect(hiddenRoleInput).toHaveValue("MENTOR");
  });

  it("sets pending role cookie and triggers google sign-in", async () => {
    const user = userEvent.setup();
    mockRoleParam = "mentor";
    render(<SignUpPage />);

    const googleButton = screen.getByRole("button", {
      name: /continue with google/i,
    });

    await user.click(googleButton);

    expect(document.cookie).toContain("pending_role=MENTOR");
    expect(vi.mocked(nextAuthSignIn)).toHaveBeenCalledWith("google", {
      callbackUrl: "/dashboard",
      role: "mentor",
    });
  });
});
