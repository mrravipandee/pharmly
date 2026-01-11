"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PharmlyLogo } from "../../../public";
import { PharmlyI } from "../../../public";

export default function Navbar() {
  const [isLoggedIn] = useState(() => {
    // Check if user is logged in by checking for token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      return !!token;
    }
    return false;
  });

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="hidden md:block">
            <Image src={PharmlyLogo} alt="Pharmly Logo" width={100} height={60} />
          </div>
          <div className="md:hidden block">
            <Image src={PharmlyI} alt="Pharmly Logo" width={60} height={60} />
          </div>
        </Link>

        {/* CENTER — LINKS (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-teal-600 transition">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-teal-600 transition">
            How it works
          </Link>
          <Link href="#contact" className="hover:text-teal-600 transition">
            Contact
          </Link>
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="
                  rounded-lg 
                  bg-teal-600 
                  px-4 
                  py-2 
                  text-sm 
                  font-semibold 
                  text-white 
                  hover:bg-teal-700 
                  transition
                "
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-teal-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  rounded-lg 
                  bg-teal-600 
                  px-4 
                  py-2 
                  text-sm 
                  font-semibold 
                  text-white 
                  hover:bg-teal-700 
                  transition
                "
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
