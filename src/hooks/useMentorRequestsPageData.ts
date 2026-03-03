import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RequestStatus, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMentorRequestsPageData() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== Role.MENTOR) {
    redirect("/home");
  }

  return prisma.request.findMany({
    where: {
      mentorId: user.id,
      status: RequestStatus.PENDING,
    },
    select: {
      id: true,
      topic: true,
      message: true,
      status: true,
      createdAt: true,
      mentee: {
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
