import { useMemo, useState } from "react";

export type MentorBrowserItem = {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  skills: string[];
};

export function useMentorBrowser(
  mentors: MentorBrowserItem[],
  pendingMentorIds: string[],
) {
  const [query, setQuery] = useState("");

  const pendingSet = useMemo(
    () => new Set(pendingMentorIds),
    [pendingMentorIds],
  );

  const filteredMentors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return mentors;

    return mentors.filter((mentor) => {
      const name = mentor.name?.toLowerCase() ?? "";
      const bio = mentor.bio?.toLowerCase() ?? "";
      const skillsText = mentor.skills.join(" ").toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        bio.includes(normalizedQuery) ||
        skillsText.includes(normalizedQuery)
      );
    });
  }, [mentors, query]);

  const uniqueSkills = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((mentor) => {
      mentor.skills.forEach((skill) => set.add(skill));
    });
    return Array.from(set).sort((leftSkill, rightSkill) =>
      leftSkill.localeCompare(rightSkill),
    );
  }, [mentors]);

  return {
    query,
    setQuery,
    pendingSet,
    filteredMentors,
    uniqueSkills,
  };
}
