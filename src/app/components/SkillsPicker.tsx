"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SKILLS_BY_CATEGORY, type Skill } from "@/utils/constants";

interface SkillsPickerProps {
  defaultSelected?: string[];
}

export default function SkillsPicker({
  defaultSelected = [],
}: SkillsPickerProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(defaultSelected),
  );
  const [search, setSearch] = useState("");

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const lowerSearch = search.toLowerCase();

  const filteredCategories = Object.entries(SKILLS_BY_CATEGORY).reduce<
    Record<string, Skill[]>
  >((acc, [category, skills]) => {
    const matched = skills.filter(
      (s) =>
        s.label.toLowerCase().includes(lowerSearch) ||
        s.category.toLowerCase().includes(lowerSearch),
    );
    if (matched.length > 0) acc[category] = matched;
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      {/* Hidden inputs for form submission */}
      {Array.from(selected).map((id) => (
        <input key={id} type="hidden" name="skills" value={id} />
      ))}

      {/* Search */}
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      {/* Selected count */}
      {selected.size > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected.size} skill{selected.size !== 1 ? "s" : ""} selected
        </p>
      )}

      {/* Grouped skill chips */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {Object.entries(filteredCategories).map(([category, skills]) => (
          <div key={category}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const isSelected = selected.has(skill.id);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggle(skill.id)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full border transition-colors",
                      isSelected
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-gray-200 dark:border-white/10 hover:border-emerald-400 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400",
                    )}
                  >
                    {skill.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(filteredCategories).length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No skills match &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
