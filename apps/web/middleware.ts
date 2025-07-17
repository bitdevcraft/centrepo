"use server";

import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@repo/cent-auth";
import { headers } from "next/headers";

const protectedRoutes = ["/cent"];
const signInRoutes = ["/auth/login", "/auth/signup"];

const loginUrl = "/auth/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();

  const sessionCookie = await auth.api.getSession({
    headers: await headers(),
  });
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  console.log(sessionCookie);

  const isSignInRoute = signInRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  if (isSignInRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
  runtime: "nodejs",
};
