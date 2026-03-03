"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  AvailabilitySlotItem,
  useMentorAvailabilityManager,
} from "@/hooks/useMentorAvailabilityManager";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type MentorAvailabilityManagerProps = {
  initialSlots: AvailabilitySlotItem[];
};

export function MentorAvailabilityManager({
  initialSlots,
}: MentorAvailabilityManagerProps) {
  const {
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
  } = useMentorAvailabilityManager(initialSlots);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Set Availability</h1>
        <p className="text-sm text-muted-foreground">
          Add weekly time slots when you are available for mentoring sessions.
        </p>
      </header>

      <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]">
        <CardHeader>
          <CardTitle>Add slot</CardTitle>
          <CardDescription>
            Choose day and time range for your availability.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(Number(e.target.value))}
            className="form-input w-36"
          >
            {DAY_NAMES.map((name, i) => (
              <option key={i} value={i}>
                {name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="09:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-24"
          />
          <span className="flex items-center text-muted-foreground">–</span>
          <Input
            type="text"
            placeholder="10:00"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-24"
          />
          <Button size="sm" onClick={handleAdd} disabled={isPending}>
            {isPending ? "Adding..." : "Add slot"}
          </Button>
        </CardContent>
      </Card>

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

      <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]">
        <CardHeader>
          <CardTitle>Your availability</CardTitle>
          <CardDescription>
            Recurring weekly slots. Mentees can book sessions within these
            times.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No slots yet. Add one above.
            </p>
          ) : (
            <ul className="space-y-2">
              {slots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] px-4 py-2"
                >
                  <span className="text-sm font-medium">
                    {DAY_NAMES[slot.dayOfWeek]} {slot.startTime}–{slot.endTime}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
                    onClick={() => handleDelete(slot.id)}
                    disabled={isPending}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
