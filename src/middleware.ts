import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Clean URL → role-scoped route rewrites
const MENTOR_REWRITES: Record<string, string> = {
  "/home": "/mentor/home",
  "/requests": "/mentor/requests",
  "/sessions": "/mentor/sessions",
  "/availability": "/mentor/availability",
  "/profile": "/mentor/profile",
  "/profile/edit": "/mentor/profile/edit",
};

const MENTEE_REWRITES: Record<string, string> = {
  "/home": "/mentee/home",
  "/my-sessions": "/mentee/my-sessions",
  "/my-requests": "/mentee/my-requests",
  "/mentors": "/mentee/mentors",
  "/profile": "/mentee/profile",
  "/profile/edit": "/mentee/profile/edit",
};

const ALL_CLEAN_PATHS = new Set([
  ...Object.keys(MENTOR_REWRITES),
  ...Object.keys(MENTEE_REWRITES),
]);

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // /dashboard → /home (middleware then rewrites /home to role-scoped route)
  if (pathname === "/dashboard") {
    if (!token?.role) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Protect direct access to scoped routes
  if (pathname.startsWith("/mentor/") || pathname.startsWith("/mentee/")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Rewrite clean paths to role-scoped internals
  if (ALL_CLEAN_PATHS.has(pathname)) {
    if (!token?.role) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    const role = token.role.toLowerCase();
    const map = role === "mentor" ? MENTOR_REWRITES : MENTEE_REWRITES;
    const target = map[pathname];
    if (target) {
      return NextResponse.rewrite(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/mentor/:path*",
    "/mentee/:path*",
    "/home",
    "/requests",
    "/sessions",
    "/availability",
    "/my-sessions",
    "/my-requests",
    "/mentors",
    "/profile",
    "/profile/edit",
  ],
};
