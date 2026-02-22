"use client";

import React from "react";
import MentorNavigation from "../components/MentorNavigation";
import DashboardHeader from "../components/DashboardHeader";
import {
  NavigationProvider,
  useNavigation,
} from "../components/NavigationContext";
import { cn } from "@/lib/utils";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <LayoutContent>{children}</LayoutContent>
    </NavigationProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useNavigation();

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <MentorNavigation />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          isOpen ? "md:pl-64" : "md:pl-20",
        )}
      >
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
