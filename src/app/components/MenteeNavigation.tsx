"use client";

import Link from "next/link";
import {
  HomeIcon,
  CalendarIcon,
  MessageSquareIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import NavLink from "./NavLink";
import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function MenteeNavigation() {
  return (
    <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-black text-white dark:bg-white dark:text-black border-r border-gray-800 dark:border-gray-200 flex flex-col py-4 px-2 md:px-4">
      <div className="flex items-center justify-center md:justify-start mb-8 px-2">
        <Link
          href="/dashboard/mentee"
          className="text-white dark:text-black font-krona text-lg"
        >
          <span className="md:hidden">MB</span>
          <span className="hidden md:inline">MentorBridge</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-2">
        <NavLink
          href="/dashboard/mentee"
          icon={<HomeIcon size={20} />}
          label="Dashboard"
        />
        <NavLink
          href="/my-sessions"
          icon={<CalendarIcon size={20} />}
          label="My Sessions"
        />
        <NavLink
          href="/my-requests"
          icon={<MessageSquareIcon size={20} />}
          label="My Requests"
        />
        <NavLink
          href="/mentors"
          icon={<CalendarIcon size={20} />}
          label="Find Mentors"
        />
        <NavLink
          href="/profile/edit"
          icon={<SettingsIcon size={20} />}
          label="Settings"
        />
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-2">
          <ThemeToggle showLabel />
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-100 group"
        >
          <span className="text-gray-400 dark:text-gray-500 mr-3">
            <LogOutIcon size={20} />
          </span>
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
