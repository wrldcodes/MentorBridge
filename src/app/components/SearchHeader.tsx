"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

export default function SearchHeader() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-card/50 rounded-lg border border-border">
      <SearchIcon size={20} className="text-muted-foreground" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}
