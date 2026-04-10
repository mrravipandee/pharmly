import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle API proxying to backend
  if (pathname.startsWith("/api/")) {
    const apiPath = pathname.replace(/^\/api\//, "");
    const backendUrl = `${API_BASE}/api/${apiPath}`;

    try {
      const requestBody = request.method !== "GET" ? await request.text() : undefined;

      const response = await fetch(backendUrl, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(request.headers),
        },
        body: requestBody,
        credentials: "include",
      });

      // Clone response and set CORS headers
      const clonedResponse = new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      // Forward cookies from backend
      const setCookieHeader = response.headers.get("set-cookie");
      if (setCookieHeader) {
        clonedResponse.headers.set("set-cookie", setCookieHeader);
      }

      return clonedResponse;
    } catch (error) {
      console.error("API proxy error:", error);
      return NextResponse.json({ error: "API request failed" }, { status: 500 });
    }
  }

  // Handle authentication - protect dashboard routes
  const token = request.cookies.get("pharmly_token")?.value;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Run middleware on API routes
    "/api/:path*",
    // Run middleware on protected routes
    "/dashboard/:path*",
  ],
};
