import { useState, useTransition } from "react";

export function useRequestMentorshipButton(
  mentorId: string,
  initialIsPending = false,
) {
  const [isPendingRequest, setIsPendingRequest] =
    useState<boolean>(initialIsPending);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  const isDisabled = isPendingRequest || isSubmitting;

  const handleClick = () => {
    if (isDisabled) return;

    setError(null);

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
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong",
        );
      }
    });
  };

  return {
    isPendingRequest,
    error,
    isSubmitting,
    isDisabled,
    handleClick,
  };
}
