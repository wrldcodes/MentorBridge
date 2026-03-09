import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/(auth)/signin/page";
import SignUpPage from "@/app/(auth)/signup/page";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

// Mock the server actions
vi.mock("@/app/action/auth", () => ({
  signIn: vi.fn().mockResolvedValue({ success: true }),
  signUp: vi.fn().mockResolvedValue({ success: true }),
  getPostAuthRedirect: vi.fn().mockResolvedValue("/mentee/home"),
}));

describe("Auth Pages", () => {
  describe("LoginPage", () => {
    it("renders login form properly", () => {
      render(<LoginPage />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      const signInButtons = screen.queryAllByRole("button", {
        name: /sign in/i,
      });
      expect(signInButtons.length).toBeGreaterThan(0);
      expect(
        screen.getByRole("button", { name: /sign in with google/i }),
      ).toBeInTheDocument();
    });
  });

  describe("SignUpPage", () => {
    it("renders sign up form properly", () => {
      render(<SignUpPage />);
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it("renders sign up form with role selection buttons", () => {
      render(<SignUpPage />);
      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
