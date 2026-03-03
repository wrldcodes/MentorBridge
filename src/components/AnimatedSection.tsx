"use client";

/**
 * AnimatedSection
 *
 * Drop-in wrapper that fades + slides its children into view when the
 * element enters the viewport.  Uses `useScrollAnimation` under the hood.
 *
 * Props:
 *  - animation   "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale"
 *  - delay       stagger delay in seconds (default 0)
 *  - duration    tween duration in seconds (default 0.7)
 *  - start       ScrollTrigger `start` string (default "top 85%")
 *  - className   extra Tailwind classes
 *
 * Usage:
 *   <AnimatedSection animation="fadeUp">
 *     <h2>Hello</h2>
 *   </AnimatedSection>
 */

import { useRef } from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Animation = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  start?: string;
  className?: string;
  as?: ElementType;
}

const fromVariants: Record<Animation, gsap.TweenVars> = {
  fadeUp: { y: 50, opacity: 0 },
  fadeDown: { y: -50, opacity: 0 },
  fadeLeft: { x: -60, opacity: 0 },
  fadeRight: { x: 60, opacity: 0 },
  scale: { scale: 0.85, opacity: 0 },
};

export default function AnimatedSection({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  start = "top 85%",
  className,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollAnimation(
    ({ gsap }) => {
      gsap.from(ref.current, {
        ...fromVariants[animation],
        duration,
        delay,
        ease: "power3.out",
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
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
