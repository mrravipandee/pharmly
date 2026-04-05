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

    if (token) {
      // User has token - only redirect to dashboard from landing page
      if (pathname === "/") {
        router.push("/dashboard");
      }
    } else {
      // User doesn't have token - redirect to landing from protected pages
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/bill")) {
        router.push("/");
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
