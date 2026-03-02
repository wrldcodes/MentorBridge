import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { RequestStatus, Role } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
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

  const body = await req.json();
  const { status } = body as { status?: keyof typeof RequestStatus };

  if (!status || !RequestStatus[status]) {
    return NextResponse.json(
      { error: "Valid status is required" },
      { status: 400 },
    );
  }

  if (status !== "ACCEPTED" && status !== "REJECTED") {
    return NextResponse.json(
      { error: "Status must be ACCEPTED or REJECTED" },
      { status: 400 },
    );
  }

  const requestRecord = await prisma.request.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      mentorId: true,
      menteeId: true,
      status: true,
      topic: true,
    },
  });

  if (!requestRecord) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (requestRecord.mentorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (requestRecord.status !== RequestStatus.PENDING) {
    return NextResponse.json(
      { error: "Only pending requests can be updated" },
      { status: 400 },
    );
  }

  const updated = await prisma.request.update({
    where: { id: requestRecord.id },
    data: {
      status: RequestStatus[status],
    },
    select: {
      id: true,
      status: true,
    },
  });

  // TODO: Hook in notifications (email / in-app) to notify the mentee.

  return NextResponse.json(
    {
      success: true,
      requestId: updated.id,
      status: updated.status,
    },
    { status: 200 },
  );
}

