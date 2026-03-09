import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Card, CardStack } from "@/components/ui/card";

const registerPlugin = vi.fn();
const flipGetState = vi.fn(() => ({ state: true }));
const flipFrom = vi.fn();

vi.mock("gsap", () => ({
  default: {
    registerPlugin,
  },
}));

vi.mock("gsap/all", () => ({
  Flip: {
    getState: flipGetState,
    from: flipFrom,
  },
}));

type MatchMediaListener = (event: MediaQueryListEvent) => void;

describe("CardStack", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("applies stacked class on mobile and runs Flip animation on cycle", async () => {
    let listener: MatchMediaListener | null = null;
    const mediaQuery = {
      matches: true,
      media: "(max-width: 767px)",
      onchange: null,
      addEventListener: (_: string, cb: MatchMediaListener) => {
        listener = cb;
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => mediaQuery),
    );

    const { container } = render(
      <CardStack>
        <Card>One</Card>
        <Card>Two</Card>
        <Card>Three</Card>
        <Card>Four</Card>
      </CardStack>,
    );

    const stack = container.querySelector(
      "[data-slot='card-stack']",
    ) as HTMLElement;
    const cycleButton = container.querySelector(
      "[aria-label='Tap to cycle cards']",
    ) as HTMLElement;

    await waitFor(() => {
      expect(stack.classList.contains("stacked")).toBe(true);
    });

    fireEvent.click(cycleButton);

    await waitFor(() => {
      expect(flipFrom).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          duration: 0.7,
          ease: "power1.inOut",
          stagger: 0.05,
        }),
      );
    });

    mediaQuery.matches = false;
    listener?.({ matches: false } as MediaQueryListEvent);

    await waitFor(() => {
      expect(stack.classList.contains("stacked")).toBe(false);
    });
  });
});
