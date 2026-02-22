import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border border-gray-800 dark:border-gray-200 rounded-3xl p-1 m-3 bg-black text-white dark:bg-white dark:text-black shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-white dark:text-black font-krona">
          MentorBridge
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/features"
            className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button
                className="text-white border-white/40 bg-transparent hover:text-white hover:bg-white/15 dark:text-black dark:border-black/30 dark:bg-transparent dark:hover:text-black dark:hover:bg-black/10"
                variant="outline"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                variant="secondary"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
