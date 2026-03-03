import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RequestStatus, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMentorsPageData() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== Role.MENTEE) {
    redirect("/home");
  }

  const [mentors, pendingRequests] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: Role.MENTOR,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        skills: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.request.findMany({
      where: {
        menteeId: user.id,
        status: RequestStatus.PENDING,
      },
      select: {
        mentorId: true,
      },
    }),
  ]);

  return {
    mentors,
    pendingMentorIds: pendingRequests.map((request) => request.mentorId),
  };
}
