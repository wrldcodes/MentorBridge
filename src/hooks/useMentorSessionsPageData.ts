import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMentorSessionsPageData() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== Role.MENTOR) {
    redirect("/home");
  }

  const sessions = await prisma.mentorSession.findMany({
    where: { mentorId: user.id },
    include: {
      mentor: { select: { id: true, name: true, image: true } },
      mentee: { select: { id: true, name: true, image: true } },
    },
    orderBy: { startTime: "desc" },
  });

  return sessions.map((session) => ({
    ...session,
    startTime: session.startTime.toISOString(),
    endTime: session.endTime?.toISOString() ?? null,
  }));
}
