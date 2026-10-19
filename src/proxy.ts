import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const profileRoute = pathname.startsWith("/profile");
  const adminRoute = pathname.startsWith("/admin");
  const authsRoute = ["/signin", "/signup", "/verification"].includes(pathname);

  // Redirect logic based on authentication and route access
  if (!token && (profileRoute || adminRoute)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (token && authsRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check for admin access if the user is authenticated and trying to access an admin route
  if (token && adminRoute) {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    try {
      const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role: string;
      };

      if (decode.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/signin",
    "/signup",
    "/verification",
  ],
};
