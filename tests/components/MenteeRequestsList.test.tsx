import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MenteeRequestsList } from "@/components/MenteeRequestsList";

const hookState = {
  query: "",
  setQuery: vi.fn(),
  statusFilter: "ALL" as const,
  setStatusFilter: vi.fn(),
  filteredRequests: [
    {
      id: "req-1",
      topic: "React mentoring",
      message: "Need help",
      status: "PENDING",
      createdAt: "2026-03-01T12:00:00.000Z",
      mentor: {
        id: "m1",
        name: "Ada",
        bio: "Frontend",
        skills: ["React"],
        image: null,
      },
    },
  ],
  getStatusLabel: vi.fn(() => "Pending"),
  getStatusClassName: vi.fn(() => "status-class"),
};

vi.mock("@/hooks/useMenteeRequestsList", () => ({
  useMenteeRequestsList: () => hookState,
}));

describe("MenteeRequestsList", () => {
  it("renders request card with mentor and status", () => {
    render(<MenteeRequestsList initialRequests={[]} />);

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getAllByText("Pending")[1]).toBeInTheDocument();
    expect(hookState.getStatusLabel).toHaveBeenCalledWith("PENDING");
  });

  it("wires search and status filter controls", () => {
    render(<MenteeRequestsList initialRequests={[]} />);

    fireEvent.change(screen.getByPlaceholderText(/search by mentor/i), {
      target: { value: "react" },
    });
    fireEvent.change(screen.getByDisplayValue("All statuses"), {
      target: { value: "ACCEPTED" },
    });

    expect(hookState.setQuery).toHaveBeenCalledWith("react");
    expect(hookState.setStatusFilter).toHaveBeenCalledWith("ACCEPTED");
  });
});
