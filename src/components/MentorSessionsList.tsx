"use client";

import {
  MentorSessionItem,
  SessionStatus,
  useMentorSessionsList,
} from "@/hooks/useMentorSessionsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type MentorSessionsListProps = {
  sessions: MentorSessionItem[];
  isMentor: boolean;
};

export function MentorSessionsList({
  sessions,
  isMentor,
}: MentorSessionsListProps) {
  const {
    statusFilter,
    setStatusFilter,
    filteredSessions,
    getStatusClass,
    getStatusLabel,
  } = useMentorSessionsList(sessions);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {isMentor ? "My Sessions" : "My Sessions"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isMentor
              ? "Sessions with your mentees"
              : "Your scheduled mentoring sessions"}
          </p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | SessionStatus)
          }
          className="rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-[#1a1a1a] px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-400 dark:hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors w-40"
        >
          <option value="all">All</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </header>

      {filteredSessions.length === 0 ? (
        <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]">
          <CardHeader>
            <CardTitle>No sessions</CardTitle>
            <CardDescription>
              {isMentor
                ? "Accept mentorship requests to schedule sessions with mentees."
                : "Book a session with a matched mentor to get started."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSessions.map((session) => {
            const other = isMentor ? session.mentee : session.mentor;
            return (
              <Card
                key={session.id}
                className="flex flex-col justify-between border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121212]"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span>{other.name ?? "Unknown"}</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
                        session.status,
                      )}`}
                    >
                      {getStatusLabel(session.status)}
                    </span>
                  </CardTitle>
                  <CardDescription>{session.topic}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.startTime).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {session.endTime &&
                      ` – ${new Date(session.endTime).toLocaleTimeString(
                        undefined,
                        { timeStyle: "short" },
                      )}`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
