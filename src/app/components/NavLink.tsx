"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md border border-transparent group focus-visible:outline-none",
        isActive
          ? "bg-gray-800 border-gray-700 text-white dark:bg-gray-100 dark:border-gray-200 dark:text-black"
          : "text-gray-200 hover:bg-gray-800 hover:border-gray-700 active:bg-gray-800 active:border-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 dark:hover:border-gray-200 dark:active:bg-gray-100 dark:active:border-gray-200 focus-visible:bg-gray-800 focus-visible:border-gray-600 dark:focus-visible:bg-gray-100 dark:focus-visible:border-gray-200",
      )}
    >
      <span className="text-gray-400 dark:text-gray-500 mr-3">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
