"use client";

import { useMemo } from "react";
import { Calendar } from "@/app/components/ui/calendar";

type MentorScheduleCalendarProps = {
  scheduledDates: string[];
};

function parseLocalDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function MentorScheduleCalendar({
  scheduledDates,
}: MentorScheduleCalendarProps) {
  const highlightedDates = useMemo(() => {
    const uniqueDateKeys = Array.from(new Set(scheduledDates));
    return uniqueDateKeys.map(parseLocalDate);
  }, [scheduledDates]);

  return (
    <div className="space-y-3">
      <Calendar
        className="rounded-md border w-full max-w-[50%] mx-auto"
        modifiers={{ scheduled: highlightedDates }}
        modifiersClassNames={{
          scheduled: "bg-primary/20 text-primary font-semibold",
        }}
        hidden={{ dayOfWeek: [0, 6] }}
      />
      <p className="text-xs text-muted-foreground text-center">
        Highlighted dates show days with scheduled mentor sessions.
      </p>
    </div>
  );
}
