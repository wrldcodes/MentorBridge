import { NextResponse } from "next/server";
import { SKILLS } from "@/utils/constants";

export async function GET() {
  return NextResponse.json({ data: SKILLS });
}
