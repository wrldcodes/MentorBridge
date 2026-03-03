"use client";

import { useSession } from "next-auth/react";

export default function UserEmail({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user?.email) return null;

  return <span className={className}>{user.email}</span>;
}
