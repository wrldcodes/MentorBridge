import { prisma } from "@/lib/prisma";

export async function getMenteeDashboardStats(userId: string | undefined) {
  if (!userId) {
    return {
      sessionsToday: 0,
      pendingRequestsCount: 0,
      activeMentorCount: 0,
      mentorCount: 0,
    };
  }

  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Fetch all data in parallel
  const [sessionsToday, pendingRequestsCount, activeMentors, mentorCount] =
    await Promise.all([
      // Count sessions scheduled for today
      prisma.mentorSession.count({
        where: {
          menteeId: userId,
          status: "SCHEDULED",
          startTime: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),

      // Count pending requests
      prisma.request.count({
        where: {
          menteeId: userId,
          status: "PENDING",
        },
      }),

      // Count unique active mentors (accepted requests)
      prisma.request.findMany({
        where: {
          menteeId: userId,
          status: "ACCEPTED",
        },
        distinct: ["mentorId"],
        select: { mentorId: true },
      }),

      // Count total available mentors
      prisma.user.count({
        where: {
          role: "MENTOR",
        },
      }),
    ]);

  return {
    sessionsToday,
    pendingRequestsCount,
    activeMentorCount: activeMentors.length,
    mentorCount,
  };
}
