import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") ?? "";
  const skills = searchParams.getAll("skills");

  const where: any = {
    role: Role.MENTOR,
  };

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { bio: { contains: q, mode: "insensitive" } },
      { skills: { has: q } },
    ];
  }

  if (skills.length > 0) {
    where.skills = {
      hasSome: skills,
    };
  }

  const mentors = await prisma.user.findMany({
    where,
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
  });

  return NextResponse.json({ mentors });
}

