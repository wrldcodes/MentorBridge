import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Handle /dashboard redirect based on role
  if (pathname === "/dashboard") {
    if (!token?.role) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const role = token.role.toLowerCase();
    const target =
      role === "mentor"
        ? "/dashboard/mentor"
        : role === "mentee"
          ? "/dashboard/mentee"
          : "/dashboard/mentee";

    return NextResponse.redirect(new URL(target, request.url));
  }

  // Protect dashboard routes - require authentication
  if (pathname.startsWith("/dashboard/")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Optional: Add role-based protection
    // if (pathname.startsWith("/dashboard/mentor") && token.role !== "MENTOR") {
    //   return NextResponse.redirect(new URL("/dashboard/mentee", request.url));
    // }
    // if (pathname.startsWith("/dashboard/mentee") && token.role !== "MENTEE") {
    //   return NextResponse.redirect(new URL("/dashboard/mentor", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
