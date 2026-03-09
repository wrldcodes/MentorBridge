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
  MentorRequestItem,
  useMentorRequestsList,
} from "@/hooks/useMentorRequestsList";

type MentorRequestsListProps = {
  initialRequests: MentorRequestItem[];
};

export function MentorRequestsList({
  initialRequests,
}: MentorRequestsListProps) {
  const { query, setQuery, error, isPending, filteredRequests, handleAction } =
    useMentorRequestsList(initialRequests);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Requests</h1>
          <p className="text-sm pt-2 text-muted-foreground">
            Review and respond to incoming mentorship requests.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Input
            placeholder="Search by mentee, skill, or topic..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </header>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {filteredRequests.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No pending requests</CardTitle>
            <CardDescription>
              When mentees request you as a mentor, they will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRequests.map((request) => {
            const mentee = request.mentee;

            return (
              <Card key={request.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span>{mentee.name ?? "Unnamed mentee"}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.createdAt).toLocaleString()}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {request.topic || "Mentorship request"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {mentee.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {mentee.bio}
                    </p>
                  )}

                  {mentee.skills.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Skills:</span>{" "}
                      {mentee.skills.slice(0, 5).join(", ")}
                      {mentee.skills.length > 5 &&
                        ` +${mentee.skills.length - 5} more`}
                    </p>
                  )}

                  {request.message && (
                    <p className="rounded-md bg-muted px-3 py-2 text-sm">
                      “{request.message}”
                    </p>
                  )}

                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleAction(request.id, "REJECTED")}
                    >
                      {isPending ? "Updating..." : "Reject"}
                    </Button>
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleAction(request.id, "ACCEPTED")}
                    >
                      {isPending ? "Updating..." : "Accept"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
