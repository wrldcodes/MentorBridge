"use client";

import { Bell, ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";
import UserName from "./UserName";
import UserEmail from "./UserEmail";
import { useSession, signOut } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed top-0 left-16 md:left-64 right-0 bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-8 z-40">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <button className="relative p-2 hover:bg-accent rounded-md transition-colors">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User profile */}
        <div className="relative flex border-l-2 border-border items-center gap-3 pl-4">
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
