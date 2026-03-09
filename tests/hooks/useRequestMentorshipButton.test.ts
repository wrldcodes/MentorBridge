import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRequestMentorshipButton } from "@/hooks/useRequestMentorshipButton";

describe("useRequestMentorshipButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts in pending state when initial flag is true", () => {
    const { result } = renderHook(() =>
      useRequestMentorshipButton("mentor-1", true),
    );

    expect(result.current.isPendingRequest).toBe(true);
    expect(result.current.isDisabled).toBe(true);
  });

  it("sets pending state after successful request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ status: "PENDING" }),
      }),
    );

    const { result } = renderHook(() => useRequestMentorshipButton("mentor-1"));

    act(() => {
      result.current.handleClick();
    });

    await waitFor(() => {
      expect(result.current.isPendingRequest).toBe(true);
    });
  });

  it("sets error when request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Failed to submit request" }),
      }),
    );

    const { result } = renderHook(() => useRequestMentorshipButton("mentor-1"));

    act(() => {
      result.current.handleClick();
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to submit request");
    });
  });
});
