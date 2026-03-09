"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarIcon,
  MessageSquareIcon,
  SettingsIcon,
  LogOutIcon,
  PanelLeftClose,
  PanelLeft,
  UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useNavigation } from "./NavigationContext";

export default function MenteeNavigation() {
  const pathname = usePathname();
  const { isOpen, setIsOpen, mobileMenuOpen, setMobileMenuOpen } =
    useNavigation();

  const navItems = [
    { href: "/home", icon: HomeIcon, label: "Home" },
    { href: "/my-sessions", icon: CalendarIcon, label: "My Sessions" },
    {
      href: "/my-requests",
      icon: MessageSquareIcon,
      label: "My Requests",
    },
    { href: "/mentors", icon: CalendarIcon, label: "Find Mentors" },
    { href: "/profile", icon: UserIcon, label: "My Account" },
    { href: "/profile/edit", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed top-16 right-4 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
            <nav className="py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-label interactive",
                      isActive && "bg-accent",
                    )}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-border pt-2 px-4 pb-2">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center px-2 py-2 text-label rounded-md interactive"
              >
                <LogOutIcon size={20} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Collapsible Sidebar */}
      <aside
        className={cn(
          "hidden md:flex fixed inset-y-0 left-0 surface-inverted border-r border-gray-800 dark:border-gray-200 flex-col py-6 anim-layout",
          isOpen ? "w-64 px-4" : "w-20 px-3",
        )}
      >
        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 flex flex-col",
            isOpen ? "space-y-2" : "space-y-4 items-center",
          )}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center rounded-lg border border-transparent transition-colors mb-2",
              "text-gray-400 dark:text-gray-500 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black",
              isOpen ? "px-3 py-2.5" : "p-3 justify-center",
            )}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            {isOpen ? (
              <>
                <PanelLeftClose
                  size={20}
                  className="mr-3 text-gray-400 dark:text-gray-500"
                />
                <span className="text-sm font-medium">Collapse</span>
              </>
            ) : (
              <PanelLeft size={28} strokeWidth={1.5} />
            )}
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (!isOpen) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg border transition-colors group",
                    isActive
                      ? "bg-gray-800 border-gray-700 text-white dark:bg-gray-100 dark:border-gray-200 dark:text-black"
                      : "border-transparent text-gray-400 dark:text-gray-500 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black",
                  )}
                  title={item.label}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link-expanded",
                  isActive
                    ? "bg-gray-800 border-gray-700 text-white dark:bg-gray-100 dark:border-gray-200 dark:text-black"
                    : "border-transparent text-gray-200 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-100",
                )}
              >
                <Icon
                  size={20}
                  className="mr-3 text-gray-400 dark:text-gray-500"
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div
          className={cn(
            "pt-4 border-t border-gray-800 dark:border-gray-200",
            !isOpen && "flex flex-col items-center",
          )}
        >
          <button
            onClick={() => signOut()}
            className={cn(
              "w-full flex items-center rounded-lg text-gray-200 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors",
              isOpen ? "px-3 py-2.5" : "p-3 justify-center",
            )}
            title="Sign Out"
          >
            <LogOutIcon
              size={isOpen ? 20 : 28}
              strokeWidth={1.5}
              className={isOpen ? "mr-3 text-gray-400 dark:text-gray-500" : ""}
            />
            {isOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
