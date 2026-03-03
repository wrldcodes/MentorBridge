import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMenteeMyRequestsPageData() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== Role.MENTEE) {
    redirect("/home");
  }

  return prisma.request.findMany({
    where: {
      menteeId: user.id,
    },
    select: {
      id: true,
      topic: true,
      message: true,
      status: true,
      createdAt: true,
      mentor: {
        select: {
          id: true,
          name: true,
          bio: true,
          skills: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
