import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free MentorBridge account as a mentor or mentee and start your growth journey today.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
