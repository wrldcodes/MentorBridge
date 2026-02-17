import React from "react";
import MentorNavigation from "../../components/MentorNavigation";
import DashboardHeader from "../../components/DashboardHeader";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MentorNavigation />
      <DashboardHeader />
      <main className="pl-16 md:pl-64 pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
