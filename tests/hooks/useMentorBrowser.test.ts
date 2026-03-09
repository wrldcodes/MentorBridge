import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  useMentorBrowser,
  type MentorBrowserItem,
} from "@/hooks/useMentorBrowser";

const mentors: MentorBrowserItem[] = [
  {
    id: "m1",
    name: "Ada Lovelace",
    image: null,
    bio: "Frontend engineer",
    skills: ["React", "TypeScript"],
  },
  {
    id: "m2",
    name: "Grace Hopper",
    image: null,
    bio: "Backend specialist",
    skills: ["Go", "TypeScript"],
  },
];

describe("useMentorBrowser", () => {
  it("returns all mentors when query is empty", () => {
    const { result } = renderHook(() => useMentorBrowser(mentors, ["m2"]));

    expect(result.current.filteredMentors).toHaveLength(2);
    expect(result.current.pendingSet.has("m2")).toBe(true);
  });

  it("filters mentors by query across name, bio, and skills", () => {
    const { result } = renderHook(() => useMentorBrowser(mentors, []));

    act(() => {
      result.current.setQuery("typescript");
    });
    expect(result.current.filteredMentors).toHaveLength(2);

    act(() => {
      result.current.setQuery("frontend");
    });
    expect(result.current.filteredMentors.map((mentor) => mentor.id)).toEqual([
      "m1",
    ]);

    act(() => {
      result.current.setQuery("  grace ");
    });
    expect(result.current.filteredMentors.map((mentor) => mentor.id)).toEqual([
      "m2",
    ]);
  });

  it("builds sorted unique skills", () => {
    const { result } = renderHook(() => useMentorBrowser(mentors, []));

    expect(result.current.uniqueSkills).toEqual(["Go", "React", "TypeScript"]);
  });
});
