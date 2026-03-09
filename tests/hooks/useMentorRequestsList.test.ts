import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  useMentorRequestsList,
  type MentorRequestItem,
} from "@/hooks/useMentorRequestsList";

const initialRequests: MentorRequestItem[] = [
  {
    id: "r1",
    topic: "Frontend mentoring",
    message: "Need help",
    status: "PENDING",
    createdAt: new Date().toISOString(),
    mentee: {
      id: "u1",
      name: "Mentee One",
      bio: "Learning React",
      skills: ["React"],
      image: null,
    },
  },
  {
    id: "r2",
    topic: "Backend architecture",
    message: null,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    mentee: {
      id: "u2",
      name: "Mentee Two",
      bio: "Node developer",
      skills: ["Node"],
      image: null,
    },
  },
];

describe("useMentorRequestsList", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("filters requests by search query", () => {
    const { result } = renderHook(() => useMentorRequestsList(initialRequests));

    act(() => {
      result.current.setQuery("react");
    });
    expect(
      result.current.filteredRequests.map((request) => request.id),
    ).toEqual(["r1"]);

    act(() => {
      result.current.setQuery("backend");
    });
    expect(
      result.current.filteredRequests.map((request) => request.id),
    ).toEqual(["r2"]);
  });

  it("removes request after successful action", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );

    const { result } = renderHook(() => useMentorRequestsList(initialRequests));

    act(() => {
      result.current.handleAction("r1", "ACCEPTED");
    });

    await waitFor(() => {
      expect(
        result.current.filteredRequests.map((request) => request.id),
      ).toEqual(["r2"]);
    });
  });

  it("sets error when request action fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Failed to update request" }),
      }),
    );

    const { result } = renderHook(() => useMentorRequestsList(initialRequests));

    act(() => {
      result.current.handleAction("r1", "REJECTED");
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to update request");
    });
  });
});
