import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RequestMentorshipButton } from "@/components/RequestMentorshipButton";

const hookState = {
  isPendingRequest: false,
  error: null as string | null,
  isSubmitting: false,
  isDisabled: false,
  handleClick: vi.fn(),
};

vi.mock("@/hooks/useRequestMentorshipButton", () => ({
  useRequestMentorshipButton: () => hookState,
}));

describe("RequestMentorshipButton", () => {
  it("renders pending state when request already pending", () => {
    hookState.isPendingRequest = true;
    render(<RequestMentorshipButton mentorId="m1" initialIsPending />);

    expect(screen.getByText("Request Pending")).toBeInTheDocument();
  });

  it("renders action state and triggers click handler", () => {
    hookState.isPendingRequest = false;
    hookState.isSubmitting = false;
    hookState.isDisabled = false;
    hookState.error = null;
    render(<RequestMentorshipButton mentorId="m1" />);

    fireEvent.click(
      screen.getByRole("button", { name: /request mentorship/i }),
    );
    expect(hookState.handleClick).toHaveBeenCalled();
  });

  it("shows error message from hook", () => {
    hookState.isPendingRequest = false;
    hookState.error = "Failed to submit request";
    render(<RequestMentorshipButton mentorId="m1" />);

    expect(screen.getByText("Failed to submit request")).toBeInTheDocument();
  });
});
