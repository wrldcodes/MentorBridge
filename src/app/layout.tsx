import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mentorbridge.vercel.app"),
  title: {
    default: "MentorBridge – Connect with Expert Mentors",
    template: "%s | MentorBridge",
  },
  description:
    "MentorBridge is a modern accelerator platform that connects mentees with expert mentors to accelerate career growth, skill development, and professional success.",
  keywords: [
    "mentorship",
    "mentor",
    "mentee",
    "career growth",
    "professional development",
    "skill development",
    "online mentoring",
    "MentorBridge",
  ],
  authors: [{ name: "MentorBridge Team" }],
  creator: "MentorBridge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mentorbridge.vercel.app",
    siteName: "MentorBridge",
    title: "MentorBridge – Connect with Expert Mentors",
    description:
      "MentorBridge is a modern accelerator platform that connects mentees with expert mentors to accelerate career growth, skill development, and professional success.",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "MentorBridge – Connect with Expert Mentors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MentorBridge – Connect with Expert Mentors",
    description:
      "Connect with expert mentors and accelerate your career growth on MentorBridge.",
    images: ["/hero-bg.jpg"],
  },
  alternates: {
    canonical: "https://mentorbridge.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
