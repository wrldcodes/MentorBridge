"use client";

import { Button } from "./ui/button";
import { useRequestMentorshipButton } from "@/hooks/useRequestMentorshipButton";

type RequestMentorshipButtonProps = {
  mentorId: string;
  initialIsPending?: boolean;
};

export function RequestMentorshipButton({
  mentorId,
  initialIsPending = false,
}: RequestMentorshipButtonProps) {
  const { isPendingRequest, error, isSubmitting, isDisabled, handleClick } =
    useRequestMentorshipButton(mentorId, initialIsPending);

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
      {error && (
        <span className="text-xs text-red-500 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}
