/// <reference types="vitest/globals" />
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import LoginPage from "@/app/(auth)/signin/page";
import { signIn as nextAuthSignIn } from "next-auth/react";

// ─── Module mocks ────────────────────────────────────────────────────────────

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

const push = vi.fn();
let mockRoleParam: string | null = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () =>
    ({
      get: (key: string) => (key === "role" ? mockRoleParam : null),
    }) as URLSearchParams,
}));

vi.mock("@/app/action/auth", () => ({
  signIn: vi
    .fn()
    .mockResolvedValue({ success: true, message: "Authenticated" }),
  getPostAuthRedirect: vi.fn().mockResolvedValue("/mentor/dashboard"),
}));

// Mock react's useActionState at module level (ESM-safe)
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return { ...actual, useActionState: vi.fn() };
});

// ─── Typed mock references ───────────────────────────────────────────────────

import { useActionState } from "react";
import { signIn as actionSignIn, getPostAuthRedirect } from "@/app/action/auth";

const nextAuthSignInMock = vi.mocked(nextAuthSignIn);
const useActionStateMock = vi.mocked(useActionState);
const getPostAuthRedirectMock = vi.mocked(getPostAuthRedirect);
const actionSignInMock = vi.mocked(actionSignIn);

// ─── Helper: make useActionState behave like a static UI (no action runs) ────
function mockStaticActionState() {
  useActionStateMock.mockReturnValue([
    { success: false, message: "", errors: undefined } as any,
    vi.fn() as any,
    false,
  ]);
}

// Helper: make useActionState actually invoke the bound action on submit
function mockLiveActionState() {
  useActionStateMock.mockImplementation((action: any, initialState: any) => {
    const formAction = async (payload: FormData) => {
      await action(initialState, payload);
    };
    return [initialState, formAction as any, false];
  });
}

// ─── Google sign-in tests ─────────────────────────────────────────────────────

describe("LoginPage — Google sign in", () => {
  beforeEach(() => {
    mockRoleParam = null;
    document.cookie =
      "pending_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    push.mockReset();
    nextAuthSignInMock.mockReset();
    nextAuthSignInMock.mockResolvedValue({} as any);
    mockStaticActionState();
  });

  it("does not set pending_role cookie when no role param is provided", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    expect(document.cookie).not.toContain("pending_role=");
    expect(nextAuthSignInMock).toHaveBeenCalledWith("google", {
      callbackUrl: "/api/auth/check-profile",
    });
  });

  it("sets pending_role=MENTOR cookie when role=mentor query param exists", async () => {
    const user = userEvent.setup();
    mockRoleParam = "mentor";
    render(<LoginPage />);

    await user.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    expect(document.cookie).toContain("pending_role=MENTOR");
    expect(nextAuthSignInMock).toHaveBeenCalledWith("google", {
      callbackUrl: "/api/auth/check-profile",
    });
  });
});

// ─── Credentials redirect tests ───────────────────────────────────────────────

describe("LoginPage — credentials redirect after sign in", () => {
  beforeEach(() => {
    push.mockReset();
    nextAuthSignInMock.mockReset();
    nextAuthSignInMock.mockResolvedValue({} as any);
    actionSignInMock.mockResolvedValue({
      success: true,
      message: "Authenticated",
    });
    mockLiveActionState();
  });

  it("redirects to /mentor/dashboard when profile is complete", async () => {
    getPostAuthRedirectMock.mockResolvedValue("/mentor/dashboard");

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), "mentor@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /sign in$/i }));
    });

    expect(push).toHaveBeenCalledWith("/mentor/dashboard");
  });

  it("redirects to /mentor/profile/edit when mentor profile is incomplete", async () => {
    getPostAuthRedirectMock.mockResolvedValue("/mentor/profile/edit");

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), "mentor@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /sign in$/i }));
    });

    expect(push).toHaveBeenCalledWith("/mentor/profile/edit");
  });

  it("redirects to /mentee/dashboard when mentee profile is complete", async () => {
    getPostAuthRedirectMock.mockResolvedValue("/mentee/dashboard");

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), "mentee@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /sign in$/i }));
    });

    expect(push).toHaveBeenCalledWith("/mentee/dashboard");
  });

  it("redirects to /mentee/profile/edit when mentee profile is incomplete", async () => {
    getPostAuthRedirectMock.mockResolvedValue("/mentee/profile/edit");

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), "mentee@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /sign in$/i }));
    });

    expect(push).toHaveBeenCalledWith("/mentee/profile/edit");
  });
});
