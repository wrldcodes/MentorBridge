import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// Mentee: get available slots for a matched mentor
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user || user.role !== Role.MENTEE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const mentorId = req.nextUrl.searchParams.get("mentorId");
  if (!mentorId) {
    return NextResponse.json(
      { error: "mentorId query param required" },
      { status: 400 },
    );
  }

  const acceptedRequest = await prisma.request.findFirst({
    where: {
      mentorId,
      menteeId: user.id,
      status: "ACCEPTED",
    },
  });

  if (!acceptedRequest) {
    return NextResponse.json(
      { error: "You must be matched with this mentor first" },
      { status: 400 },
    );
  }

  const availability = await prisma.availability.findMany({
    where: { userId: mentorId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const existingSessions = await prisma.mentorSession.findMany({
    where: {
      mentorId,
      status: { in: ["SCHEDULED", "IN_PROGRESS"] },
      startTime: { gte: new Date() },
    },
    select: { startTime: true, endTime: true },
  });

  const now = new Date();
  const concreteSlots: { start: string; end: string; label: string }[] = [];

  for (let week = 0; week < 4; week++) {
    for (const av of availability) {
      const base = new Date(now);
      base.setDate(base.getDate() + week * 7);
      let diff = av.dayOfWeek - base.getDay();
      if (diff < 0) diff += 7;
      const slotDate = new Date(base);
      slotDate.setDate(slotDate.getDate() + diff);
      const [sh, sm] = av.startTime.split(":").map(Number);
      const [eh, em] = av.endTime.split(":").map(Number);
      const start = new Date(slotDate);
      start.setHours(sh, sm, 0, 0);
      const end = new Date(slotDate);
      end.setHours(eh, em, 0, 0);
      if (start <= now) continue;
      const overlaps = existingSessions.some((s) => {
        const sEnd = s.endTime ?? new Date(s.startTime.getTime() + 60 * 60 * 1000);
        return start < sEnd && end > s.startTime;
      });
      if (overlaps) continue;
      const label = `${slotDate.toLocaleDateString()} ${av.startTime}-${av.endTime}`;
      concreteSlots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        label,
      });
    }
  }

  concreteSlots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const mentors = await prisma.user.findMany({
    where: {
      id: mentorId,
      role: Role.MENTOR,
    },
    select: { id: true, name: true },
  });

  return NextResponse.json({
    slots: concreteSlots,
    existingSessions: existingSessions.map((s) => ({
      start: s.startTime.toISOString(),
      end: s.endTime?.toISOString(),
    })),
    mentor: mentors[0] ?? null,
  });
}
