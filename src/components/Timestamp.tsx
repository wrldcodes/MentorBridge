"use client";

import { useState, useLayoutEffect } from "react";

function getOrdinalDay(day: number) {
  if (day > 3 && day < 21) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function Timestamp() {
  const [time, setTime] = useState<number | null>(null);
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date().getFullYear());
  }, []);
  if (time) {
    return time;
  }
  return null;
}

export function CurrentDate() {
  const [date, setDate] = useState<string | null>(null);
  useLayoutEffect(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
    const day = getOrdinalDay(now.getDate());
    const month = now.toLocaleDateString("en-US", { month: "long" });

    setDate(`${weekday}, ${day} ${month}`);
  }, []);
  if (date) {
    return (
      <p className="font-medium font-inter text-muted-foreground">{date}</p>
    );
  }
  return null;
}

function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

type TimeGreetingProps = {
  name?: string | null;
};

export function TimeGreeting({ name }: TimeGreetingProps) {
  const firstName = name?.trim().split(" ")[0] || "there";
  const greeting = getTimeGreeting();

  return (
    <>
      Good {greeting}! {firstName}
    </>
  );
}
