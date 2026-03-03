import { RequestStatus } from "@prisma/client";
import { useMemo, useState, useTransition } from "react";

export type MentorRequestItem = {
  id: string;
  topic: string;
  message: string | null;
  status: RequestStatus;
  createdAt: string | Date;
  mentee: {
    id: string;
    name: string | null;
    bio: string | null;
    skills: string[];
    image: string | null;
  };
};

export function useMentorRequestsList(initialRequests: MentorRequestItem[]) {
  const [requests, setRequests] =
    useState<MentorRequestItem[]>(initialRequests);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return requests;

    return requests.filter((request) => {
      const name = request.mentee.name?.toLowerCase() ?? "";
      const bio = request.mentee.bio?.toLowerCase() ?? "";
      const skillsText = request.mentee.skills.join(" ").toLowerCase();
      const topic = request.topic.toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        bio.includes(normalizedQuery) ||
        skillsText.includes(normalizedQuery) ||
        topic.includes(normalizedQuery)
      );
    });
  }, [query, requests]);

  const handleAction = (id: string, status: "ACCEPTED" | "REJECTED") => {
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/requests/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to update request");
        }

        setRequests((previousRequests) =>
          previousRequests.filter((request) => request.id !== id),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return {
    query,
    setQuery,
    error,
    isPending,
    filteredRequests,
    handleAction,
  };
}
