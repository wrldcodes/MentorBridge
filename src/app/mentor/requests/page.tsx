import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MentorRequestsList } from "@/app/components/MentorRequestsList";
import { RequestStatus, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function MentorRequestsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== Role.MENTOR) {
    redirect("/home");
  }

  const requests = await prisma.request.findMany({
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

  return (
    <div className="p-4 md:p-8">
      <MentorRequestsList initialRequests={requests} />
    </div>
  );
}

