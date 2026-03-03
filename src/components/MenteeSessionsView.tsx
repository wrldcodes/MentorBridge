"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { MentorSessionsList } from "./MentorSessionsList";
import {
  MatchedMentorItem,
  MenteeSessionItem,
  useMenteeSessionsView,
} from "@/hooks/useMenteeSessionsView";

type MenteeSessionsViewProps = {
  sessions: MenteeSessionItem[];
  matchedMentors: MatchedMentorItem[];
};

export function MenteeSessionsView({
  sessions,
  matchedMentors,
}: MenteeSessionsViewProps) {
  const {
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
  } = useMenteeSessionsView();

  return (
    <div className="flex flex-col gap-8">
      <MentorSessionsList sessions={sessions} isMentor={false} />

      {matchedMentors.length > 0 && (
        <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]">
          <CardHeader>
            <CardTitle>Book a session</CardTitle>
            <CardDescription>
              Choose a matched mentor and available time slot.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <select
                value={mentorId}
                onChange={(event) => onMentorChange(event.target.value)}
                className="form-input w-48"
              >
                <option value="">Select mentor</option>
                {matchedMentors.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name ?? "Unnamed mentor"}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                variant="outline"
                onClick={fetchSlots}
                disabled={!mentorId || loadingSlots}
              >
                {loadingSlots ? "Loading..." : "Load slots"}
              </Button>
            </div>

            {slots.length > 0 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available slots</label>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() =>
                          setSelectedSlot({
                            start: slot.start,
                            end: slot.end,
                          })
                        }
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          selectedSlot?.start === slot.start
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222]"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Topic (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Code review"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-input w-full max-w-xs"
                  />
                </div>

                <Button
                  onClick={handleBook}
                  disabled={!selectedSlot || isPending}
                >
                  {isPending ? "Booking..." : "Book session"}
                </Button>
              </>
            )}

            {mentorId && slotsLoaded && slots.length === 0 && !loadingSlots && (
              <p className="text-sm text-muted-foreground">
                No slots available. Try another mentor or ask them to set
                availability.
              </p>
            )}

            {(error || success) && (
              <p
                className={`text-sm ${
                  error
                    ? "text-red-500 dark:text-red-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {error ?? success}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {matchedMentors.length === 0 && (
        <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]">
          <CardHeader>
            <CardTitle>No matched mentors</CardTitle>
            <CardDescription>
              Get a mentor to accept your request first. Then you can book
              sessions here.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
