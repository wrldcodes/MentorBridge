import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MentorBrowser } from "@/components/MentorBrowser";

const mentors = [
  {
    id: "m1",
    name: "Ada",
    image: null,
    bio: "Frontend mentor",
    skills: ["React", "TypeScript"],
  },
  {
    id: "m2",
    name: "Grace",
    image: null,
    bio: "Backend mentor",
    skills: ["Node"],
  },
];

describe("MentorBrowser", () => {
  it("renders mentors and supports search", () => {
    render(<MentorBrowser mentors={mentors} pendingMentorIds={[]} />);

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Grace")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: "frontend" },
    });

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.queryByText("Grace")).not.toBeInTheDocument();
  });

  it("filters from skill badge click", () => {
    render(<MentorBrowser mentors={mentors} pendingMentorIds={[]} />);

    fireEvent.click(screen.getAllByText("Node")[0]);

    expect(screen.getByText("Grace")).toBeInTheDocument();
    expect(screen.queryByText("Ada")).not.toBeInTheDocument();
  });

  it("shows pending state button when mentor already requested", () => {
    render(<MentorBrowser mentors={mentors} pendingMentorIds={["m1"]} />);

    expect(screen.getByText("Request Pending")).toBeInTheDocument();
  });
});
