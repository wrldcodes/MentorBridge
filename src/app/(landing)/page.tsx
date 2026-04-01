import type { Metadata } from "next";
import LandingHero from "@/components/LandingHero";

export const metadata: Metadata = {
  title: "MentorBridge – Connect with Expert Mentors",
  description:
    "Find your perfect mentor on MentorBridge. Our platform matches you with experienced professionals to help you achieve your career goals faster.",
  alternates: {
    canonical: "https://mentorbridge.vercel.app",
  },
  openGraph: {
    title: "MentorBridge – Connect with Expert Mentors",
    description:
      "Find your perfect mentor on MentorBridge. Our platform matches you with experienced professionals to help you achieve your career goals faster.",
    url: "https://mentorbridge.vercel.app",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingHero />
    </div>
  );
}
