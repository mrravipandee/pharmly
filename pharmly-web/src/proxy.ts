import { NextRequest, NextResponse } from "next/server";

// This is the new Next.js 16 proxy function (renamed from middleware)
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle API proxying to backend
  if (pathname.startsWith("/api")) {
    const url = new URL(pathname, "http://localhost:4000");
    url.search = request.nextUrl.search;
    
    return NextResponse.rewrite(url);
  }

  // Handle authentication - protect dashboard routes
  const token = request.cookies.get("pharmly_token")?.value;
  
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
