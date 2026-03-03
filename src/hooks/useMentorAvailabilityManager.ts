import { useEffect, useState, useTransition } from "react";

export type AvailabilitySlotItem = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useMentorAvailabilityManager(
  initialSlots: AvailabilitySlotItem[],
) {
  const [slots, setSlots] = useState<AvailabilitySlotItem[]>(initialSlots);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSlots(initialSlots);
  }, [initialSlots]);

  const handleAdd = () => {
    setError(null);
    setSuccess(null);

    if (
      !/^\d{1,2}:\d{2}$/.test(startTime) ||
      !/^\d{1,2}:\d{2}$/.test(endTime)
    ) {
      setError("Use HH:MM format for times");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayOfWeek,
            startTime: startTime.padStart(5, "0"),
            endTime: endTime.padStart(5, "0"),
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to add slot");
        }

        const created = await response.json();
        setSlots((previousSlots) => [...previousSlots, created]);
        setSuccess("Slot added");
        setTimeout(() => setSuccess(null), 2000);
      } catch (availabilityError) {
        setError(
          availabilityError instanceof Error
            ? availabilityError.message
            : "Failed to add slot",
        );
      }
    });
  };

  const handleDelete = (id: string) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/availability/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");

        setSlots((previousSlots) =>
          previousSlots.filter((slot) => slot.id !== id),
        );
        setSuccess("Slot removed");
        setTimeout(() => setSuccess(null), 2000);
      } catch (availabilityError) {
        setError(
          availabilityError instanceof Error
            ? availabilityError.message
            : "Failed to delete",
        );
      }
    });
  };

  return {
    slots,
    dayOfWeek,
    startTime,
    endTime,
    error,
    success,
    isPending,
    setDayOfWeek,
    setStartTime,
    setEndTime,
    handleAdd,
    handleDelete,
  };
}
