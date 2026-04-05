"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Pages that don't require authentication
    const publicPages = ["/", "/login", "/register"];
    const isPublicPage = publicPages.includes(pathname);

    if (token) {
      // User has token - redirect to dashboard if on public pages
      if (isPublicPage && pathname !== "/dashboard") {
        router.push("/dashboard");
      }
    } else {
      // User doesn't have token - redirect to landing if accessing dashboard
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/bill")) {
        router.push("/");
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
