import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, skills: true, role: true },
  });

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const isComplete = !!(user.name && user.skills.length > 0);

  if (!isComplete) {
    return NextResponse.redirect(new URL("/profile/edit", request.url));
  }

  return NextResponse.redirect(new URL("/home", request.url));
}
