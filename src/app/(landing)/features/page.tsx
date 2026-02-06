import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Features
          </h1>
          <p className="text-xl text-slate-300">
            Discover how MentorBridge can help you connect, learn, and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Find Expert Mentors"
            description="Connect with experienced professionals who can guide you through your career journey and help you achieve your goals."
          />
          <FeatureCard
            title="Flexible Scheduling"
            description="Schedule sessions that work for you. Mentor and mentee can coordinate their availability to fit their busy lives."
          />
          <FeatureCard
            title="Secure Messaging"
            description="Communicate with your mentor through our secure platform. Share files, resources, and keep all conversations in one place."
          />
          <FeatureCard
            title="Track Progress"
            description="Monitor your growth with progress tracking. Set goals, track milestones, and celebrate achievements."
          />
          <FeatureCard
            title="Certifications"
            description="Earn recognized certificates upon completing mentorship programs to boost your professional profile."
          />
          <FeatureCard
            title="Community Support"
            description="Be part of a thriving community of mentors and mentees. Share experiences and learn from others."
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Ready to start your journey?
          </h2>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup?role=mentee"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-gray-100"
            >
              Find a Mentor
            </Link>
            <Link
              href="/signup?role=mentor"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-start mb-4">
        <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}

function PlanCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
}: PlanCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? "bg-purple-900 border-2 border-purple-700 shadow-md"
          : "bg-gray-800 border border-gray-700 shadow-sm"
      }`}
    >
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-400">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className={`w-full inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium shadow transition-colors ${
          highlighted
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
