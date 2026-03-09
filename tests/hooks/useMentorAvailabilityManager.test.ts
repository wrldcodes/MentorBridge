import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  useMentorAvailabilityManager,
  type AvailabilitySlotItem,
} from "@/hooks/useMentorAvailabilityManager";

const initialSlots: AvailabilitySlotItem[] = [
  { id: "s1", dayOfWeek: 1, startTime: "09:00", endTime: "10:00" },
];

describe("useMentorAvailabilityManager", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("validates time format before API call", () => {
    const { result } = renderHook(() =>
      useMentorAvailabilityManager(initialSlots),
    );
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    act(() => {
      result.current.setStartTime("9");
      result.current.setEndTime("10:00");
    });

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.error).toBe("Use HH:MM format for times");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("adds a slot after successful API response", async () => {
    const createdSlot: AvailabilitySlotItem = {
      id: "s2",
      dayOfWeek: 2,
      startTime: "09:00",
      endTime: "10:00",
    };

    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdSlot,
    });

    vi.stubGlobal("fetch", fetchSpy);

    const { result } = renderHook(() =>
      useMentorAvailabilityManager(initialSlots),
    );

    act(() => {
      result.current.setDayOfWeek(2);
      result.current.setStartTime("9:00");
      result.current.setEndTime("10:00");
      result.current.handleAdd();
    });

    await waitFor(() => {
      expect(result.current.slots).toHaveLength(2);
      expect(result.current.success).toBe("Slot added");
    });

    const [, requestInit] = fetchSpy.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(requestInit.body as string);

    expect(requestInit.method).toBe("POST");
    expect(body.startTime).toBe("09:00");
    expect(body.endTime).toBe("10:00");
  });

  it("deletes slot after successful API response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );

    const { result } = renderHook(() =>
      useMentorAvailabilityManager(initialSlots),
    );

    act(() => {
      result.current.handleDelete("s1");
    });

    await waitFor(() => {
      expect(result.current.slots).toHaveLength(0);
      expect(result.current.success).toBe("Slot removed");
    });
  });
});
