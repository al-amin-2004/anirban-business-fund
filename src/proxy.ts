import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect to signin if the user is not authenticated and trying to access a private route
  const privateRoute = ["/profile"];
  if (!token && request.nextUrl.pathname.startsWith(privateRoute.join("|"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect to home if the user is authenticated and trying to access an auth route
  const authRoute = ["/signin", "/signout", "/verification"];
  if (token && authRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signout", "/verification"],
};
