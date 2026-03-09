import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  useMenteeRequestsList,
  type MenteeRequestItem,
} from "@/hooks/useMenteeRequestsList";

const requests: MenteeRequestItem[] = [
  {
    id: "req-1",
    topic: "React mentoring",
    message: "help",
    status: "PENDING",
    createdAt: new Date().toISOString(),
    mentor: {
      id: "m1",
      name: "Ada",
      bio: "Frontend",
      skills: ["React", "TypeScript"],
      image: null,
    },
  },
  {
    id: "req-2",
    topic: "Node architecture",
    message: null,
    status: "ACCEPTED",
    createdAt: new Date().toISOString(),
    mentor: {
      id: "m2",
      name: "Grace",
      bio: "Backend",
      skills: ["Node"],
      image: null,
    },
  },
];

describe("useMenteeRequestsList", () => {
  it("filters by query and status", () => {
    const { result } = renderHook(() => useMenteeRequestsList(requests));

    act(() => {
      result.current.setQuery("react");
    });
    expect(
      result.current.filteredRequests.map((request) => request.id),
    ).toEqual(["req-1"]);

    act(() => {
      result.current.setStatusFilter("ACCEPTED");
    });
    expect(
      result.current.filteredRequests.map((request) => request.id),
    ).toEqual([]);

    act(() => {
      result.current.setQuery("");
    });
    expect(
      result.current.filteredRequests.map((request) => request.id),
    ).toEqual(["req-2"]);
  });

  it("returns user-facing labels/classes for statuses", () => {
    const { result } = renderHook(() => useMenteeRequestsList(requests));

    expect(result.current.getStatusLabel("PENDING")).toBe("Pending");
    expect(result.current.getStatusLabel("ACCEPTED")).toBe("Accepted");
    expect(result.current.getStatusLabel("REJECTED")).toBe("Rejected");

    expect(result.current.getStatusClassName("PENDING")).toContain("amber");
    expect(result.current.getStatusClassName("ACCEPTED")).toContain("emerald");
    expect(result.current.getStatusClassName("REJECTED")).toContain("red");
  });
});
