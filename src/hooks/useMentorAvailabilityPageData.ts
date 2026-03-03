import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMentorAvailabilityPageData() {
  const user = await getCurrentUser();

  if (!user) redirect("/signin");
  if (user.role !== Role.MENTOR) redirect("/home");

  return prisma.availability.findMany({
    where: { userId: user.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
}
