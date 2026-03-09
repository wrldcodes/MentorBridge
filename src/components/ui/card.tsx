"use client";
import * as React from "react";
import { Star, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/all";

import { cn } from "@/lib/utils";

gsap.registerPlugin(Flip);
const STACK_OFFSET_PX = 18;

function CardStack({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isStacked, setIsStacked] = React.useState(false);
  const childArray = React.Children.toArray(children);
  const [order, setOrder] = React.useState<number[]>(
    childArray.map((_, i) => i),
  );
  const orderRef = React.useRef(order);
  const pendingFlipStateRef = React.useRef<ReturnType<
    typeof Flip.getState
  > | null>(null);
  const isAnimatingRef = React.useRef(false);
  const [stackHeight, setStackHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    const nextOrder = childArray.map((_, i) => i);
    orderRef.current = nextOrder;
    setOrder(nextOrder);
  }, [childArray.length]);

  React.useEffect(() => {
    if (!isStacked) {
      const resetOrder = childArray.map((_, i) => i);
      orderRef.current = resetOrder;
      setOrder(resetOrder);
      pendingFlipStateRef.current = null;
      isAnimatingRef.current = false;
      setStackHeight(null);
    }
  }, [isStacked, childArray.length]);

  React.useLayoutEffect(() => {
    if (!isStacked) return;

    const container = containerRef.current;
    if (!container) return;

    const wrappers = Array.from(
      container.querySelectorAll<HTMLElement>("[data-flip-id]"),
    );
    if (!wrappers.length) return;

    const measure = () => {
      const tallestCard = wrappers.reduce(
        (maxHeight, wrapper) => Math.max(maxHeight, wrapper.offsetHeight),
        0,
      );

      if (!tallestCard) return;

      setStackHeight(tallestCard + (childArray.length - 1) * STACK_OFFSET_PX);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(measure);
    wrappers.forEach((wrapper) => resizeObserver.observe(wrapper));

    return () => resizeObserver.disconnect();
  }, [isStacked, order, childArray.length]);

  const handleClick = React.useCallback(() => {
    if (!isStacked || isAnimatingRef.current || orderRef.current.length < 2) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const wrappers = container.querySelectorAll<HTMLElement>("[data-flip-id]");
    if (!wrappers.length) return;

    const state = Flip.getState(wrappers);
    pendingFlipStateRef.current = state;
    isAnimatingRef.current = true;

    const prev = orderRef.current;
    const newOrder = [...prev.slice(1), prev[0]];
    orderRef.current = newOrder;
    setOrder(newOrder);
  }, [isStacked]);

  React.useLayoutEffect(() => {
    if (!isStacked || !pendingFlipStateRef.current) return;

    Flip.from(pendingFlipStateRef.current, {
      duration: 0.7,
      ease: "power1.inOut",
      stagger: 0.05,
      absolute: true,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    });

    pendingFlipStateRef.current = null;
  }, [order, isStacked]);

  if (!isStacked) {
    return (
      <div
        data-slot="card-stack"
        className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  // Mobile: stacked card deck — peeking cards behind the top card
  return (
    <div
      data-slot="card-stack"
      className={cn("stacked relative w-full select-none", className)}
      {...props}
    >
      <div
        ref={containerRef}
        className="relative w-full cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Tap to cycle cards"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        style={{
          minHeight: stackHeight !== null ? `${stackHeight}px` : undefined,
        }}
      >
        {order.map((originalIndex, stackPos) => {
          const isTop = stackPos === 0;
          const translateY = stackPos * STACK_OFFSET_PX;
          const scale = 1 - stackPos * 0.02;
          const shadow =
            stackPos === 0
              ? "0 10px 26px rgba(0,0,0,0.18)"
              : "0 6px 16px rgba(0,0,0,0.14)";

          return (
            <div
              key={originalIndex}
              data-flip-id={`card-${originalIndex}`}
              style={{
                position: isTop ? "relative" : "absolute",
                top: isTop ? undefined : 0,
                left: 0,
                right: 0,
                zIndex: childArray.length - stackPos,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transformOrigin: "top center",
                backgroundColor: "var(--card)",
                borderRadius: "var(--radius)",
                boxShadow: shadow,
                overflow: "hidden",
                willChange: "transform",
              }}
            >
              {childArray[originalIndex]}
            </div>
          );
        })}
      </div>

      {/* "Tap to explore" hint below the stack */}
      <div
        className="mt-3 flex flex-col items-center gap-1 pointer-events-none"
        aria-hidden="true"
      >
        <ChevronDown className="h-4 w-4 animate-bounce text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground/50 font-medium tracking-wide">
          Tap to explore
        </span>
      </div>
    </div>
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

function CardProfile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-profile"
      className={cn("flex items-center gap-4 px-6 py-4", className)}
      {...props}
    />
  );
}

function CardProfilePic({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-profile-pic"
      className={cn(
        "h-14 w-14 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden border-2 border-slate-600",
        className,
      )}
      {...props}
    />
  );
}

function CardName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-name"
      className={cn("font-semibold text-sm", className)}
      {...props}
    />
  );
}

function CardRate({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-rate"
      className={cn("flex items-center gap-1 font-medium", className)}
      {...props}
    >
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      {props.children}
    </div>
  );
}

function CardRole({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-role"
      className={cn("text-xs", className)}
      {...props}
    />
  );
}

function CardTestimonialHeader({
  className,
  profilePic,
  name,
  role,
  rating,
}: {
  className?: string;
  profilePic?: React.ReactNode;
  name?: React.ReactNode;
  role?: React.ReactNode;
  rating?: React.ReactNode;
}) {
  return (
    <div
      data-slot="card-testimonial-header"
      className={cn(
        "flex items-start justify-between gap-4 px-6 py-4",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div data-slot="profile-pic">{profilePic}</div>
        <div className="flex flex-col gap-1">
          <div data-slot="name">{name}</div>
          <div data-slot="role">{role}</div>
        </div>
      </div>
      <div data-slot="rating" className="flex-shrink-0">
        {rating}
      </div>
    </div>
  );
}

export {
  CardStack,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardProfile,
  CardProfilePic,
  CardName,
  CardRate,
  CardRole,
  CardTestimonialHeader,
};
