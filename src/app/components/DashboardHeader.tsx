"use client";

import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import React, { useState } from "react";
import UserName from "./UserName";
import UserEmail from "./UserEmail";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useNavigation } from "./NavigationContext";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, mobileMenuOpen, setMobileMenuOpen } = useNavigation();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-8 z-40 transition-all duration-300",
        isOpen ? "md:left-64" : "md:left-20",
        "left-0",
      )}
    >
      <div className="flex items-center gap-4">
        <Link href="/dashboard/mentor" className="font-krona text-lg">
          MentorBridge
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle - Mobile */}
        <div className="md:hidden">
          <ThemeToggle showLabel showThemeName />
        </div>

        {/* Theme Toggle - Desktop */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* User profile - Desktop Only */}
        <div className="hidden md:flex relative border-l-2 border-border items-center gap-3 pl-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="hidden md:flex flex-col">
            <UserName className="text-sm font-medium text-foreground" />
            <UserEmail className="text-xs text-muted-foreground" />
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <ChevronDown size={18} className="text-muted-foreground" />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1">
              <Link
                href="/profile"
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <User size={16} />
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
