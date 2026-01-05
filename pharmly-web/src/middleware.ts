import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("pharmly_token")?.value;

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // If accessing dashboard without token → redirect to login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"]
};
