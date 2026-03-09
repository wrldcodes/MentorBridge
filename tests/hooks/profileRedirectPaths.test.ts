import { describe, expect, it, vi } from "vitest";
import { getProfileRedirectPath } from "@/hooks/useProfileRedirectPath";
import { getProfileEditRedirectPath } from "@/hooks/useProfileEditRedirectPath";

vi.mock("@/hooks/useAuthenticatedUser", () => ({
  getAuthenticatedUser: vi.fn(),
}));

import { getAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

const getAuthenticatedUserMock = vi.mocked(getAuthenticatedUser);

describe("profile redirect helpers", () => {
  it("routes mentor to mentor paths", async () => {
    getAuthenticatedUserMock.mockResolvedValue({ role: "mentor" } as never);

    await expect(getProfileRedirectPath()).resolves.toBe("/mentor/profile");
    await expect(getProfileEditRedirectPath()).resolves.toBe(
      "/mentor/profile/edit",
    );
  });

  it("routes non-mentor to mentee paths", async () => {
    getAuthenticatedUserMock.mockResolvedValue({ role: "mentee" } as never);

    await expect(getProfileRedirectPath()).resolves.toBe("/mentee/profile");
    await expect(getProfileEditRedirectPath()).resolves.toBe(
      "/mentee/profile/edit",
    );
  });
});
