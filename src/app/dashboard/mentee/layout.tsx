import React from "react";
import MenteeNavigation from "../../components/MenteeNavigation";
import DashboardHeader from "@/app/components/DashboardHeader";

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
          <MenteeNavigation />
          <DashboardHeader />
      <main className="pl-16 md:pl-64 pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
