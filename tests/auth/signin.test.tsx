import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as React from "react";
import LoginPage from "@/app/(auth)/signin/page";
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
  useSearchParams: () => ({
    get: (key: string) => (key === "role" ? mockRoleParam : null),
  }) as URLSearchParams,
}));

vi.mock("@/app/action/auth", () => ({
  signIn: vi.fn().mockResolvedValue({
    success: true,
    message: "Authenticated",
  }),
}));

const nextAuthSignInMock = vi.mocked(nextAuthSignIn);

describe("LoginPage", () => {
  let actionStateSpy: vi.SpiedFunction<(typeof React)["useActionState"]>;

  beforeEach(() => {
    mockRoleParam = null;
    document.cookie =
      "pending_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    push.mockReset();
    nextAuthSignInMock.mockClear();
    nextAuthSignInMock.mockResolvedValue({} as any);
    actionStateSpy = vi
      .spyOn(React, "useActionState")
      .mockReturnValue([{
        success: false,
        message: "",
        errors: undefined,
      }, vi.fn(), false]);
  });

  afterEach(() => {
    actionStateSpy.mockRestore();
  });

  it("does not set pending role cookie when no role param provided", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const googleButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    await user.click(googleButton);

    expect(document.cookie).not.toContain("pending_role=");
    expect(nextAuthSignInMock).toHaveBeenCalledWith("google", {
      callbackUrl: "/dashboard",
    });
  });

  it("stores pending role cookie when role query param exists", async () => {
    const user = userEvent.setup();
    mockRoleParam = "mentor";
    render(<LoginPage />);

    const googleButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    await user.click(googleButton);

    expect(document.cookie).toContain("pending_role=MENTOR");
    expect(nextAuthSignInMock).toHaveBeenCalledWith("google", {
      callbackUrl: "/dashboard",
    });
  });
});
