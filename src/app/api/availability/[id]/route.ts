import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// Mentor: update availability slot
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;
  const slot = await prisma.availability.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!slot || slot.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const { dayOfWeek, startTime, endTime } = body as {
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
  };

  const data: { dayOfWeek?: number; startTime?: string; endTime?: string } = {};
  if (typeof dayOfWeek === "number" && dayOfWeek >= 0 && dayOfWeek <= 6) {
    data.dayOfWeek = dayOfWeek;
  }
  if (typeof startTime === "string" && /^\d{1,2}:\d{2}$/.test(startTime)) {
    data.startTime = startTime.padStart(5, "0");
  }
  if (typeof endTime === "string" && /^\d{1,2}:\d{2}$/.test(endTime)) {
    data.endTime = endTime.padStart(5, "0");
  }

  const updated = await prisma.availability.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

// Mentor: delete availability slot
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;
  const slot = await prisma.availability.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!slot || slot.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.availability.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
