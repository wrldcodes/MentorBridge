import { RequestStatus } from "@prisma/client";
import { useMemo, useState } from "react";

export type MenteeRequestItem = {
  id: string;
  topic: string;
  message: string | null;
  status: RequestStatus;
  createdAt: string | Date;
  mentor: {
    id: string;
    name: string | null;
    bio: string | null;
    skills: string[];
    image: string | null;
  };
};

export function useMenteeRequestsList(initialRequests: MenteeRequestItem[]) {
  const [requests] = useState<MenteeRequestItem[]>(initialRequests);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "ACCEPTED" | "REJECTED"
  >("ALL");

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return requests.filter((request) => {
      if (statusFilter !== "ALL" && request.status !== statusFilter) {
        return false;
      }

      if (!normalizedQuery) return true;

      const mentor = request.mentor;
      const name = mentor.name?.toLowerCase() ?? "";
      const bio = mentor.bio?.toLowerCase() ?? "";
      const skillsText = mentor.skills.join(" ").toLowerCase();
      const topic = request.topic.toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        bio.includes(normalizedQuery) ||
        skillsText.includes(normalizedQuery) ||
        topic.includes(normalizedQuery)
      );
    });
  }, [query, requests, statusFilter]);

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const getStatusClassName = (status: RequestStatus) => {
    if (status === "PENDING") {
      return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-500/40";
    }
    if (status === "ACCEPTED") {
      return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-500/40";
    }
    return "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-500/40";
  };

  return {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    filteredRequests,
    getStatusLabel,
    getStatusClassName,
  };
}
