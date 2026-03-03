import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/(landing)/page';

// Mock the LandingHero component as it might use complex GSAP animations which could fail in jsdom
vi.mock('@/components/LandingHero', () => {
  return {
    default: () => <div data-testid="landing-hero-mock">Mocked Landing Hero</div>
  }
});

describe('LandingPage', () => {
  it('renders the landing page with the hero section', () => {
    render(<LandingPage />);
    const heroMock = screen.getByTestId('landing-hero-mock');
    expect(heroMock).toBeInTheDocument();
  });
});
