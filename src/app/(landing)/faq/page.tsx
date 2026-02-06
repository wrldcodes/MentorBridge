import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-300">
              Find answers to common questions about MentorBridge
            </p>
          </div>

          <div className="space-y-4 mb-16">
            <FAQItem
              question="What is MentorBridge?"
              answer="MentorBridge is a platform that connects mentees with experienced mentors. Whether you're looking to develop new skills, navigate career transitions, or achieve specific goals, our platform makes it easy to find the right mentor for your needs."
            />

            <FAQItem
              question="How do I get started?"
              answer="Simply sign up as either a mentee or mentor. Mentees can browse mentor profiles and request sessions, while mentors can create their profile and start accepting mentee requests."
            />

            <FAQItem
              question="What does it cost?"
              answer="Mentees can use our platform for free. Mentors start with a free tier, with paid plans available for additional features like advanced analytics and certification management."
            />

            <FAQItem
              question="How do sessions work?"
              answer="Sessions are scheduled one-on-one meetings between mentors and mentees. You can communicate through our secure messaging platform and schedule sessions that work for both parties."
            />

            <FAQItem
              question="Can I get certified?"
              answer="Yes! Upon completing mentorship programs, mentees can earn recognized certificates to boost their professional profile and showcase their achievements."
            />

            <FAQItem
              question="How do mentors earn money?"
              answer="Mentors can earn money through their mentor subscription plans. Premium mentor plans offer higher earning potential with additional features and support."
            />

            <FAQItem
              question="Is my data secure?"
              answer="Yes, we take security seriously. All conversations and personal data are encrypted and protected. We comply with industry-standard security practices."
            />

            <FAQItem
              question="Can I cancel my subscription?"
              answer="Yes, you can cancel your subscription at any time. There are no long-term commitments or hidden fees."
            />
          </div>

          <div className="max-w-2xl mx-auto text-center bg-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Still have questions?
            </h2>
            <p className="text-slate-300 mb-8">
              Can't find the answer you're looking for? Our team is here to
              help.
            </p>
            <Link
              href="mailto:support@mentorbridge.com"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-gray-100"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
      <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
        <ChevronDown className="h-5 w-5 mr-2 text-blue-400" />
        {question}
      </h3>
      <p className="text-slate-300 ml-7">{answer}</p>
    </div>
  );
}
