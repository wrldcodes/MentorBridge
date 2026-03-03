import { useMemo, useState } from "react";

export type SessionStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type MentorSessionItem = {
  id: string;
  topic: string;
  status: SessionStatus;
  startTime: string | Date;
  endTime: string | Date | null;
  notes: string | null;
  mentor: { id: string; name: string | null; image: string | null };
  mentee: { id: string; name: string | null; image: string | null };
};

export function useMentorSessionsList(sessions: MentorSessionItem[]) {
  const [statusFilter, setStatusFilter] = useState<"all" | SessionStatus>(
    "all",
  );

  const filteredSessions = useMemo(() => {
    if (statusFilter === "all") return sessions;
    return sessions.filter((session) => session.status === statusFilter);
  }, [sessions, statusFilter]);

  const getStatusLabel = (status: SessionStatus) => {
    switch (status) {
      case "SCHEDULED":
        return "Scheduled";
      case "IN_PROGRESS":
        return "In progress";
      case "COMPLETED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getStatusClass = (status: SessionStatus) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-500/40";
      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-500/40";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-500/40";
      case "CANCELLED":
        return "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-500/40";
      default:
        return "";
    }
  };

  return {
    statusFilter,
    setStatusFilter,
    filteredSessions,
    getStatusLabel,
    getStatusClass,
  };
}
