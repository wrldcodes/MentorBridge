import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMenteeMySessionsPageData() {
  const user = await getCurrentUser();

  if (!user) redirect("/signin");
  if (user.role !== Role.MENTEE) redirect("/home");

  const [sessions, acceptedRequests] = await Promise.all([
    prisma.mentorSession.findMany({
      where: { menteeId: user.id },
      include: {
        mentor: { select: { id: true, name: true, image: true } },
        mentee: { select: { id: true, name: true, image: true } },
      },
      orderBy: { startTime: "desc" },
    }),
    prisma.request.findMany({
      where: { menteeId: user.id, status: "ACCEPTED" },
      select: { mentorId: true },
    }),
  ]);

  const mentorIds = [
    ...new Set(acceptedRequests.map((request) => request.mentorId)),
  ];
  const matchedMentors = await prisma.user.findMany({
    where: { id: { in: mentorIds } },
    select: { id: true, name: true },
  });

  const sessionsData = sessions.map((session) => ({
    ...session,
    startTime: session.startTime.toISOString(),
    endTime: session.endTime?.toISOString() ?? null,
  }));

  return {
    sessions: sessionsData,
    matchedMentors,
  };
}
