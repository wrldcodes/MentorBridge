import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Mentorship Pricing
        </h1>
        <p className="text-xl text-slate-300">
          Choose the perfect plan for your mentoring journey
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Mentee Plan */}
        <PricingCard
          title="Mentee"
          price="Free"
          description="Access to mentors and learning resources."
          features={[
            { name: "Find mentors", included: true },
            { name: "Request sessions", included: true },
            { name: "Chat with mentors", included: true },
            { name: "Learning resources", included: true },
            { name: "Progress tracking", included: false },
            { name: "Certifications", included: false },
            { name: "Priority support", included: false },
          ]}
          buttonText="Sign Up as Mentee"
          buttonLink="/signup?role=mentee"
        />

        {/* Premium Mentee Plan */}
        <PricingCard
          title="Premium Mentee"
          price="$19"
          period="per month"
          description="Enhanced mentoring with priority access."
          features={[
            { name: "Find mentors", included: true },
            { name: "Request sessions", included: true },
            { name: "Chat with mentors", included: true },
            { name: "Learning resources", included: true },
            { name: "Progress tracking", included: true },
            { name: "Certifications", included: true },
            { name: "Priority support", included: true },
          ]}
          buttonText="Upgrade to Premium"
          buttonLink="/signup?role=mentee&plan=premium"
        />

        {/* Mentor Plan */}
        <PricingCard
          title="Mentor"
          price="$29"
          period="per month"
          description="Start mentoring and earn while sharing your expertise."
          features={[
            { name: "Create mentor profile", included: true },
            { name: "Accept mentee requests", included: true },
            { name: "Unlimited sessions", included: true },
            { name: "Earnings tracking", included: true },
            { name: "Advanced analytics", included: true },
            { name: "Certifications management", included: true },
            { name: "Priority support", included: false },
          ]}
          buttonText="Become a Mentor"
          buttonLink="/signup?role=mentor"
          highlighted
          badge="Most Popular"
        />

        {/* Premium Mentor Plan */}
        <PricingCard
          title="Premium Mentor"
          price="$59"
          period="per month"
          description="Advanced tools for professional mentors."
          features={[
            { name: "Everything in Mentor", included: true },
            { name: "Premium badge", included: true },
            { name: "Advanced scheduling", included: true },
            { name: "Custom resources", included: true },
            { name: "Performance reports", included: true },
            { name: "Issue certificates", included: true },
            { name: "Priority 24/7 support", included: true },
          ]}
          buttonText="Upgrade to Premium"
          buttonLink="/signup?role=mentor&plan=premium"
        />
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center bg-card/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to get started?
        </h2>
        <p className="text-lg text-slate-300 mb-8">
          Join thousands of mentors and mentees growing together on
          MentorBridge.
        </p>
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
  );
}

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
  badge?: string;
}

function PricingCard({
  title,
  price,
  period = "per month",
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? "bg-white border-2 border-white shadow-md relative"
          : "bg-slate-800 border border-slate-700 shadow-sm"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
      <h3
        className={`text-xl font-bold mb-2 ${highlighted ? "text-black" : "text-white"}`}
      >
        {title}
      </h3>
      <div className="mb-4">
        <span
          className={`text-3xl font-bold ${highlighted ? "text-black" : "text-white"}`}
        >
          {price}
        </span>
        {price !== "Custom" && price !== "Free" && (
          <span className={highlighted ? "text-gray-700" : "text-slate-300"}>
            {" "}
            {period}
          </span>
        )}
      </div>
      <p className={`mb-6 ${highlighted ? "text-gray-700" : "text-slate-300"}`}>
        {description}
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-slate-600 mr-2 flex-shrink-0" />
            )}
            <span
              className={
                feature.included
                  ? highlighted
                    ? "text-black"
                    : "text-white"
                  : "text-slate-600"
              }
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className={`w-full inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium shadow transition-colors ${
          highlighted
            ? "bg-gray-600 text-white hover:bg-gray-700"
            : "bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
