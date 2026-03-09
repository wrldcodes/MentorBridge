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
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={mentorId}
                onChange={(event) => onMentorChange(event.target.value)}
                className="rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-[#1a1a1a] px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-400 dark:hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-black-500 dark:focus:ring-white focus:border-transparent transition-colors w-40"
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
                onClick={fetchSlots}
                disabled={!mentorId || loadingSlots}
                className="rounded-lg"
              >
                {loadingSlots ? "Loading..." : "Load slots"}
              </Button>
            </div>

            {slots.length > 0 && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 dark:text-white">
                    Available slots
                  </label>
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
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                          selectedSlot?.start === slot.start
                            ? "border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-500 dark:text-white shadow-md"
                            : "border-gray-300 dark:border-white/20 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-50 dark:hover:bg-[#222]"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 dark:text-white">
                    Topic (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Code review"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-[#1a1a1a] w-full max-w-xs px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-400 dark:hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
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
              <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No slots available. Try another mentor or ask them to set
                  availability.
                </p>
              </div>
            )}

            {(error || success) && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  error
                    ? "border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400"
                    : "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400"
                }`}
              >
                {error ?? success}
              </div>
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
