"use client";

/**
 * useScrollAnimation – convenience hook for scroll-triggered animations.
 *
 * Wraps @gsap/react's `useGSAP` so every tween/timeline created inside
 * the callback is:
 *   - Scoped to the provided `containerRef` (auto-cleanup on unmount).
 *   - Killed safely on Next.js route changes.
 *
 * -----------------------------------------------------------------
 * Basic usage
 * -----------------------------------------------------------------
 *
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useScrollAnimation(({ gsap, ScrollTrigger }) => {
 *   gsap.from(ref.current, {
 *     y: 60,
 *     opacity: 0,
 *     duration: 0.8,
 *     ease: "power3.out",
 *     scrollTrigger: {
 *       trigger: ref.current,
 *       start: "top 80%",
 *       toggleActions: "play none none reverse",
 *     },
 *   });
 * }, { scope: ref });
 *
 * -----------------------------------------------------------------
 * Batch fade-in (multiple elements)
 * -----------------------------------------------------------------
 *
 * useScrollAnimation(() => {
 *   ScrollTrigger.batch(".card", {
 *     onEnter: (els) =>
 *       gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }),
 *   });
 * });
 *
 * -----------------------------------------------------------------
 * Horizontal scroll section
 * -----------------------------------------------------------------
 *
 * useScrollAnimation(({ gsap }) => {
 *   const panels = gsap.utils.toArray<HTMLElement>(".panel");
 *   gsap.to(panels, {
 *     xPercent: -100 * (panels.length - 1),
 *     ease: "none",
 *     scrollTrigger: {
 *       trigger: ".horizontal-container",
 *       pin: true,
 *       scrub: 1,
 *       snap: 1 / (panels.length - 1),
 *       end: () => "+=" + document.querySelector(".horizontal-container")!.scrollWidth,
 *     },
 *   });
 * });
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { RefObject } from "react";

// Register the useGSAP hook with GSAP core (once per app).
gsap.registerPlugin(useGSAP, ScrollTrigger);

type GSAPContext = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};

type UseScrollAnimationOptions = {
  /** Scope selector root — pass a ref to contain GSAP selectors. */
  scope?: RefObject<HTMLElement | null>;
  /** Re-run the effect when these values change (like useEffect deps). */
  dependencies?: unknown[];
};

export function useScrollAnimation(
  callback: (ctx: GSAPContext) => void,
  options: UseScrollAnimationOptions = {},
) {
  const { scope, dependencies = [] } = options;

  useGSAP(
    () => {
      callback({ gsap, ScrollTrigger });
    },
    {
      scope: scope as RefObject<HTMLElement>,
      dependencies,
      revertOnUpdate: true,
    },
  );
}
