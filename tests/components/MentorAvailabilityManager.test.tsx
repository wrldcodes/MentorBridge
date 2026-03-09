import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MentorAvailabilityManager } from "@/components/MentorAvailabilityManager";

const hookState = {
  slots: [{ id: "slot-1", dayOfWeek: 1, startTime: "09:00", endTime: "10:00" }],
  dayOfWeek: 1,
  startTime: "09:00",
  endTime: "10:00",
  error: null as string | null,
  success: null as string | null,
  isPending: false,
  setDayOfWeek: vi.fn(),
  setStartTime: vi.fn(),
  setEndTime: vi.fn(),
  handleAdd: vi.fn(),
  handleDelete: vi.fn(),
};

vi.mock("@/hooks/useMentorAvailabilityManager", () => ({
  useMentorAvailabilityManager: () => hookState,
}));

describe("MentorAvailabilityManager", () => {
  it("renders availability section and triggers add", () => {
    render(<MentorAvailabilityManager initialSlots={[]} />);

    fireEvent.change(screen.getByDisplayValue("Mon"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByDisplayValue("09:00"), {
      target: { value: "08:30" },
    });
    fireEvent.change(screen.getByDisplayValue("10:00"), {
      target: { value: "09:30" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add slot/i }));

    expect(hookState.setDayOfWeek).toHaveBeenCalledWith(2);
    expect(hookState.setStartTime).toHaveBeenCalledWith("08:30");
    expect(hookState.setEndTime).toHaveBeenCalledWith("09:30");
    expect(hookState.handleAdd).toHaveBeenCalled();
  });

  it("triggers delete for existing slot", () => {
    render(<MentorAvailabilityManager initialSlots={[]} />);

    fireEvent.click(screen.getByRole("button", { name: /remove/i }));

    expect(hookState.handleDelete).toHaveBeenCalledWith("slot-1");
  });
});
