"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Pharmly
          </span>
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
        </div>
      </nav>
    </header>
  );
}
