"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  showLabel?: boolean;
  showThemeName?: boolean;
  className?: string;
}

export default function ThemeToggle({
  showLabel = false,
  showThemeName = false,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";
  const baseClasses = showLabel
    ? "w-full flex items-center px-2 py-2 text-sm font-medium rounded-md border border-transparent text-black dark:text-white hover:bg-gray-800 hover:border-gray-700 dark:hover:bg-gray-100 dark:hover:border-gray-200 focus-visible:outline-none focus-visible:bg-gray-800 focus-visible:border-gray-600 dark:focus-visible:bg-gray-100 dark:focus-visible:border-gray-200"
    : "inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none";

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(baseClasses, className)}
      >
        <SunIcon size={18} className="opacity-0" />
        {showLabel && (
          <span className="ml-3 hidden md:inline opacity-0">Theme</span>
        )}
        {showThemeName && <span className="ml-2 opacity-0">Light</span>}
      </button>
    );
  }

  const themeName = isDark ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(baseClasses, className)}
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      {showLabel && <span className="ml-3 hidden md:inline">Theme</span>}
      {showThemeName && <span className="ml-2 text-sm">{themeName}</span>}
    </button>
  );
}
