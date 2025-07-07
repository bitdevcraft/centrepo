"use server";

import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth/auth-client";

const protectedRoutes = ["/cent"];
const signInRoutes = ["/auth/login", "/auth/signup"];

const loginUrl = "/auth/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();
  const headerList = await headers();

  const session = await authClient.getSession({
    fetchOptions: {
      headers: Object.fromEntries(headerList.entries()),
    },
  });

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  console.log(session);

  const isSignInRoute = signInRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  if (isSignInRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
