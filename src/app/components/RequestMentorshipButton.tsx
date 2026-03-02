"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";

type RequestMentorshipButtonProps = {
  mentorId: string;
  initialIsPending?: boolean;
};

export function RequestMentorshipButton({
  mentorId,
  initialIsPending = false,
}: RequestMentorshipButtonProps) {
  const [isPendingRequest, setIsPendingRequest] =
    useState<boolean>(initialIsPending);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  const isDisabled = isPendingRequest || isSubmitting;

  const handleClick = () => {
    if (isDisabled) return;

    setIsError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mentorId }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to submit request");
        }

        const data = await response.json();

        if (data.status === "PENDING") {
          setIsPendingRequest(true);
        }
      } catch (error) {
        setIsError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  };

  if (isPendingRequest) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="cursor-default border-amber-400/60 bg-amber-50 text-amber-800 dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-200"
      >
        Request Pending
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isSubmitting ? "Requesting..." : "Request Mentorship"}
      </Button>
      {isError && (
        <span className="text-xs text-red-500 dark:text-red-400">
          {isError}
        </span>
      )}
    </div>
  );
}

