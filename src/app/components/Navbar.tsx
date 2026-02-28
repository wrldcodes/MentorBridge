"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!navRef.current || !bgRef.current) return;

      const ctx = gsap.context(() => {
        // gsap.fromTo(
        //   navRef.current,
        //   { opacity: 0 },
        //   {
        //     opacity: 1,
        //     duration: 0.8,
        //     ease: "power2.out",
        //   },
        // );

        gsap.fromTo(
          bgRef.current,
          { opacity: 1 },
          {
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "50px top",
              end: "180px top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          navRef.current,
          { backdropFilter: "blur(0px)" },
          {
            backdropFilter: "blur(12px)",
            ease: "power2.out",
            duration: 0.8,
            
            scrollTrigger: {
              trigger: document.body,
              start: "50px top",
              end: "180px top",
              scrub: true,
            },
          },
        );
      });

      return () => ctx.revert();
    },
    { scope: navRef, dependencies: [] },
  );

  return (
    <header className="sticky top-0 z-50">
      <nav ref={navRef} className="landing-navbar landing-navbar--scrollable">
        <div
          ref={bgRef}
          className="landing-navbar__bg pointer-events-none absolute inset-0 rounded-3xl "
          aria-hidden
        />
        <div className="container relative z-10 mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-white dark:text-black font-krona">
            MentorBridge
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button
                  className="text-white border-white/40 bg-transparent hover:text-white hover:bg-white/15 dark:text-black dark:border-black/30 dark:bg-transparent dark:hover:text-black dark:hover:bg-black/10"
                  variant="outline"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                  variant="secondary"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
