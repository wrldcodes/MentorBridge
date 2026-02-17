"use client";

import { useSession } from "next-auth/react";

export default function UserName({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user?.name) return null;

  return <span className={className}>{user.name}</span>;
}
