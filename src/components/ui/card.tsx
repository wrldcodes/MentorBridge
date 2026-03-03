"use client";
import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function CardStack({ children }: { children: React.ReactNode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".card");

    // Example: stack cards
    const state = Flip.getState(cards);
    containerRef.current.classList.toggle("stacked");
    Flip.from(state, {
      duration: 0.7,
      ease: "power1.inOut",
      stagger: 0.05,
    });
  }, []);

  return (
    <div ref={containerRef} className="card-container">
    {children}
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
