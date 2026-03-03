import { useState, useTransition } from "react";

export type MenteeSessionStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type MenteeSessionItem = {
  id: string;
  topic: string;
  status: MenteeSessionStatus;
  startTime: string;
  endTime: string | null;
  notes: string | null;
  mentor: { id: string; name: string | null; image: string | null };
  mentee: { id: string; name: string | null; image: string | null };
};

export type MatchedMentorItem = {
  id: string;
  name: string | null;
};

type SlotItem = { start: string; end: string; label: string };

export function useMenteeSessionsView() {
  const [mentorId, setMentorId] = useState<string>("");
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onMentorChange = (selectedMentorId: string) => {
    setMentorId(selectedMentorId);
    setSlots([]);
    setSelectedSlot(null);
    setSlotsLoaded(false);
  };

  const fetchSlots = () => {
    if (!mentorId) return;
    setError(null);
    setSlots([]);
    setSelectedSlot(null);
    setSlotsLoaded(false);
    setLoadingSlots(true);

    fetch(`/api/sessions/available?mentorId=${encodeURIComponent(mentorId)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSlots(data.slots ?? []);
        }
        setSlotsLoaded(true);
      })
      .catch(() => {
        setError("Failed to load slots");
        setSlotsLoaded(true);
      })
      .finally(() => setLoadingSlots(false));
  };

  const handleBook = () => {
    if (!selectedSlot || !mentorId) {
      setError("Select a mentor and time slot");
      return;
    }

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mentorId,
            topic: topic.trim() || "Mentoring session",
            startTime: selectedSlot.start,
            endTime: selectedSlot.end,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to book");
        }

        setSuccess("Session booked successfully");
        setSelectedSlot(null);
        setSlots([]);
        setTopic("");

        setTimeout(() => {
          setSuccess(null);
          window.location.reload();
        }, 1500);
      } catch (bookingError) {
        setError(
          bookingError instanceof Error
            ? bookingError.message
            : "Failed to book",
        );
      }
    });
  };

  return {
    mentorId,
    slots,
    slotsLoaded,
    loadingSlots,
    selectedSlot,
    topic,
    error,
    success,
    isPending,
    onMentorChange,
    setSelectedSlot,
    setTopic,
    fetchSlots,
    handleBook,
  };
}
