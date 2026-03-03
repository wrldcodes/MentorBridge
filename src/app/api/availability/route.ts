import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// Mentor: list own availability
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user || user.role !== Role.MENTOR) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const availability = await prisma.availability.findMany({
    where: { userId: user.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ availability });
}

// Mentor: create availability slot
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user || user.role !== Role.MENTOR) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { dayOfWeek, startTime, endTime } = body as {
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
  };

  if (
    typeof dayOfWeek !== "number" ||
    dayOfWeek < 0 ||
    dayOfWeek > 6 ||
    typeof startTime !== "string" ||
    typeof endTime !== "string" ||
    !/^\d{1,2}:\d{2}$/.test(startTime) ||
    !/^\d{1,2}:\d{2}$/.test(endTime)
  ) {
    return NextResponse.json(
      { error: "dayOfWeek (0-6), startTime and endTime (HH:MM) required" },
      { status: 400 },
    );
  }

  const slot = await prisma.availability.create({
    data: {
      userId: user.id,
      dayOfWeek,
      startTime: startTime.padStart(5, "0"),
      endTime: endTime.padStart(5, "0"),
    },
  });

  return NextResponse.json(slot, { status: 201 });
}
