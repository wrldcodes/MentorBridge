"use client";

/**
 * AnimatedText
 *
 * Splits a string into words and staggers them in on scroll.
 * Great for hero headings.
 *
 * Usage:
 *   <AnimatedText text="Connecting Mentors with Mentees" element="h1" />
 */

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedTextProps {
  text: string;
  element?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
  start?: string;
}

export default function AnimatedText({
  text,
  element: Tag = "h2",
  className,
  stagger = 0.06,
  delay = 0,
  start = "top 90%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useScrollAnimation(
    ({ gsap }) => {
      const words = ref.current?.querySelectorAll("span.word");
      if (!words) return;
      gsap.from(words, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn("overflow-hidden", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </Tag>
  );
}
