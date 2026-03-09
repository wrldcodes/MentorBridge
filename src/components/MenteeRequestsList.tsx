"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  MenteeRequestItem,
  useMenteeRequestsList,
} from "@/hooks/useMenteeRequestsList";

type MenteeRequestsListProps = {
  initialRequests: MenteeRequestItem[];
};

export function MenteeRequestsList({
  initialRequests,
}: MenteeRequestsListProps) {
  const {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    filteredRequests,
    getStatusLabel,
    getStatusClassName,
  } = useMenteeRequestsList(initialRequests);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Requests</h1>
          <p className="text-sm pt-2 text-muted-foreground">
            Track the status of your mentorship requests.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <Input
            placeholder="Search by mentor, skill, or topic..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="md:w-64"
          />
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as typeof statusFilter)
            }
            className="form-input md:w-40"
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </header>

      {filteredRequests.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No requests yet</CardTitle>
            <CardDescription>
              Browse mentors and send a mentorship request to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRequests.map((request) => {
            const mentor = request.mentor;

            return (
              <Card key={request.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span>{mentor.name ?? "Unnamed mentor"}</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusClassName(
                        request.status,
                      )}`}
                    >
                      {getStatusLabel(request.status)}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {request.topic || "Mentorship request"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {mentor.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {mentor.bio}
                    </p>
                  )}

                  {mentor.skills.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Skills:</span>{" "}
                      {mentor.skills.slice(0, 5).join(", ")}
                      {mentor.skills.length > 5 &&
                        ` +${mentor.skills.length - 5} more`}
                    </p>
                  )}

                  {request.message && (
                    <p className="rounded-md bg-muted px-3 py-2 text-sm">
                      “{request.message}”
                    </p>
                  )}

                  <p className="mt-1 text-xs text-muted-foreground">
                    Sent on{" "}
                    {new Date(request.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
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
