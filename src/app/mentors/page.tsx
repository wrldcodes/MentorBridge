import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MentorBrowser } from "@/app/components/MentorBrowser";
import { RequestStatus, Role } from "@prisma/client";

export default async function MentorsPage() {
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

  const pendingMentorIds = pendingRequests.map((request) => request.mentorId);

  return (
    <div className="p-4 md:p-6">
      <MentorBrowser mentors={mentors} pendingMentorIds={pendingMentorIds} />
    </div>
  );
}

