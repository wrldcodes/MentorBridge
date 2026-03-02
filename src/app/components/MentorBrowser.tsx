"use client";

import { useMemo, useState } from "react";
import { RequestMentorshipButton } from "./RequestMentorshipButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

type Mentor = {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  skills: string[];
};

type MentorBrowserProps = {
  mentors: Mentor[];
  pendingMentorIds: string[];
};

export function MentorBrowser({
  mentors,
  pendingMentorIds,
}: MentorBrowserProps) {
  const [query, setQuery] = useState("");

  const pendingSet = useMemo(
    () => new Set(pendingMentorIds),
    [pendingMentorIds],
  );

  const filteredMentors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mentors;

    return mentors.filter((mentor) => {
      const name = mentor.name?.toLowerCase() ?? "";
      const bio = mentor.bio?.toLowerCase() ?? "";
      const skillsText = mentor.skills.join(" ").toLowerCase();

      return (
        name.includes(q) || bio.includes(q) || skillsText.includes(q)
      );
    });
  }, [mentors, query]);

  const uniqueSkills = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((mentor) => {
      mentor.skills.forEach((skill) => set.add(skill));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [mentors]);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-gray-50 p-4 shadow-sm dark:border-dark-border-subtle dark:bg-[#111111]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Find a Mentor</h1>
            <p className="text-sm text-muted-foreground">
              Browse mentors by skills, experience, and interests.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-2 md:flex-row md:items-center">
            <Input
              placeholder="Search by name, skill, or topic..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {uniqueSkills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {uniqueSkills.slice(0, 10).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer text-xs"
                onClick={() => setQuery(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.length === 0 ? (
          <Card className="col-span-full text-center">
            <CardHeader>
              <CardTitle>No mentors found</CardTitle>
              <CardDescription>
                Try adjusting your search or filters.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{mentor.name ?? "Unnamed Mentor"}</span>
                </CardTitle>
                <CardDescription>
                  {mentor.bio || "This mentor hasn't added a bio yet."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {mentor.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 5).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {mentor.skills.length > 5 && (
                      <span className="text-xs text-muted-foreground">
                        +{mentor.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-2">
                  <RequestMentorshipButton
                    mentorId={mentor.id}
                    initialIsPending={pendingSet.has(mentor.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}

