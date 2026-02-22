import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  return await getServerSession(authOptions);
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      bio: true,
      skills: true,
    },
  });

  return user;
});

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("next-auth.session-token");
}
