import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// Mentor: list own sessions | Mentee: list own sessions
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sessions = await prisma.mentorSession.findMany({
    where:
      user.role === Role.MENTOR ? { mentorId: user.id } : { menteeId: user.id },
    include: {
      mentor: { select: { id: true, name: true, image: true } },
      mentee: { select: { id: true, name: true, image: true } },
    },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json({ sessions });
}

// Mentee: book session with matched mentor
export async function POST(req: NextRequest) {
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

  const body = await req.json();
  const { mentorId, topic, startTime, endTime } = body as {
    mentorId?: string;
    topic?: string;
    startTime?: string;
    endTime?: string;
  };

  if (!mentorId || !startTime) {
    return NextResponse.json(
      { error: "mentorId and startTime required" },
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

  const start = new Date(startTime);
  const end = endTime
    ? new Date(endTime)
    : new Date(start.getTime() + 60 * 60 * 1000);

  if (isNaN(start.getTime()) || start <= new Date()) {
    return NextResponse.json(
      { error: "startTime must be a valid future datetime" },
      { status: 400 },
    );
  }

  const mentor = await prisma.user.findUnique({
    where: { id: mentorId },
    select: { id: true, role: true },
  });

  if (!mentor || mentor.role !== Role.MENTOR) {
    return NextResponse.json({ error: "Mentor not found" }, { status: 400 });
  }

  const sessionRecord = await prisma.mentorSession.create({
    data: {
      mentorId,
      menteeId: user.id,
      topic: topic?.trim() || "Mentoring session",
      startTime: start,
      endTime: end,
    },
    include: {
      mentor: { select: { id: true, name: true } },
      mentee: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(sessionRecord, { status: 201 });
}
