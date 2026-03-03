import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/(auth)/signin/page';
import SignUpPage from '@/app/(auth)/signup/page';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
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
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

// Mock the server actions
vi.mock('@/app/action/auth', () => ({
  signIn: vi.fn().mockResolvedValue({ success: true }),
  signUp: vi.fn().mockResolvedValue({ success: true }),
  getPostAuthRedirect: vi.fn().mockResolvedValue('/mentee/home'),
}));

describe('Auth Pages', () => {
  describe('LoginPage', () => {
    it('renders login form properly', () => {
      render(<LoginPage />);
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
    });
  });

  describe('SignUpPage', () => {
    it('renders sign up form properly', () => {
      render(<SignUpPage />);
      expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up as mentee/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up as mentor/i })).toBeInTheDocument();
    });

    it('requires role selection before google sign in', () => {
      // Mock window.alert
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      // Let's force no role selected initially by simulating navigating without role param
      // The component defaults to MENTEE, but we can verify clicking the google button still works if role is selected.
      // Wait, SignUpPage initializes with a default role of MENTEE but sets `roleExplicitlySelected` based on URL params.
      render(<SignUpPage />);
      
      const googleBtn = screen.getByRole('button', { name: /continue with google/i });
      expect(googleBtn).toBeDisabled();
      
      // Click a role
      fireEvent.click(screen.getByRole('button', { name: /sign up as mentor/i }));
      
      // Google button should be enabled now
      expect(googleBtn).not.toBeDisabled();
      expect(googleBtn).toHaveTextContent(/as Mentor/i);
      
      alertMock.mockRestore();
    });
  });
});
