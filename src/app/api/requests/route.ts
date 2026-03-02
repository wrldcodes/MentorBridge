import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { RequestStatus, Role } from "@prisma/client";

// Mentee: create a new mentorship request
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
  const { mentorId, topic, message } = body as {
    mentorId?: string;
    topic?: string;
    message?: string;
  };

  if (!mentorId) {
    return NextResponse.json(
      { error: "mentorId is required" },
      { status: 400 },
    );
  }

  if (mentorId === user.id) {
    return NextResponse.json(
      { error: "You cannot request yourself as a mentor." },
      { status: 400 },
    );
  }

  const mentor = await prisma.user.findUnique({
    where: { id: mentorId },
    select: { id: true, role: true },
  });

  if (!mentor || mentor.role !== Role.MENTOR) {
    return NextResponse.json(
      { error: "Selected mentor is not available." },
      { status: 400 },
    );
  }

  const existingPending = await prisma.request.findFirst({
    where: {
      mentorId,
      menteeId: user.id,
      status: RequestStatus.PENDING,
    },
    select: { id: true, status: true },
  });

  if (existingPending) {
    return NextResponse.json(
      {
        success: true,
        requestId: existingPending.id,
        status: existingPending.status,
        alreadyPending: true,
      },
      { status: 200 },
    );
  }

  const requestRecord = await prisma.request.create({
    data: {
      mentorId,
      menteeId: user.id,
      topic: topic && topic.trim().length > 0 ? topic : "Mentorship request",
      message: message && message.trim().length > 0 ? message : null,
    },
    select: {
      id: true,
      status: true,
    },
  });

  // TODO: Add real notification/email for the mentor here.

  return NextResponse.json(
    {
      success: true,
      requestId: requestRecord.id,
      status: requestRecord.status,
    },
    { status: 201 },
  );
}

// Mentor: list incoming mentorship requests (defaults to PENDING)
export async function GET(req: NextRequest) {
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

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status") as
    | keyof typeof RequestStatus
    | null;

  const statusFilter =
    statusParam && RequestStatus[statusParam]
      ? (statusParam as RequestStatus)
      : RequestStatus.PENDING;

  const requests = await prisma.request.findMany({
    where: {
      mentorId: user.id,
      status: statusFilter,
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

  return NextResponse.json({ requests });
}

