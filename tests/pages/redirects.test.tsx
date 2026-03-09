import { describe, expect, it, vi, beforeEach } from "vitest";
import MentorRootPage from "@/app/mentor/page";
import MenteeRootPage from "@/app/mentee/page";
import ProfilePage from "@/app/profile/page";

const redirectMock = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/hooks/useProfileRedirectPath", () => ({
  getProfileRedirectPath: vi.fn(),
}));

import { getProfileRedirectPath } from "@/hooks/useProfileRedirectPath";

const getProfileRedirectPathMock = vi.mocked(getProfileRedirectPath);

describe("root page redirects", () => {
  beforeEach(() => {
    redirectMock.mockReset();
    getProfileRedirectPathMock.mockReset();
  });

  it("redirects mentor root to /mentor/home", () => {
    MentorRootPage();
    expect(redirectMock).toHaveBeenCalledWith("/mentor/home");
  });

  it("redirects mentee root to /mentee/home", () => {
    MenteeRootPage();
    expect(redirectMock).toHaveBeenCalledWith("/mentee/home");
  });

  it("redirects profile root using resolved path", async () => {
    getProfileRedirectPathMock.mockResolvedValue("/mentor/profile");

    await ProfilePage();
    expect(getProfileRedirectPathMock).toHaveBeenCalled();
    expect(redirectMock).toHaveBeenCalledWith("/mentor/profile");
  });
});
