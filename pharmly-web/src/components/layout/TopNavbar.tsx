"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Settings, Store } from "lucide-react";

export default function TopNavbar() {
  const [storeName, setStoreName] = useState<string>("Medical Store");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoreName(localStorage.getItem("storeName") || "Medical Store");
    }
  }, []);

  return (
    <div className="sticky top-0 z-20 px-4 md:px-0">
      <div
        className="
          mx-auto
          mt-4
          flex
          items-center
          justify-between
          rounded-2xl
          border-2
          border-teal-600
          bg-white
          px-4
          py-3
          md:mr-10
        "
      >
        {/* LEFT: Store Info */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Store className="h-5 w-5 text-teal-600 shrink-0" />
          <span className="truncate text-sm font-medium text-gray-900 md:text-lg">
            {storeName}
          </span>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-500" />
          </button>

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <Settings className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
