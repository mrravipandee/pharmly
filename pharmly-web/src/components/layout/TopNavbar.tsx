"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Settings, Store, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
  const [storeName, setStoreName] = useState<string>("Medical Store");
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoreName(localStorage.getItem("storeName") || "Medical Store");
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("storeId");
      localStorage.removeItem("storeName");
      localStorage.removeItem("storeWhatsapp");
      localStorage.removeItem("storeAddress");
      localStorage.removeItem("storeCity");
      localStorage.removeItem("storeDiscount");
      
      // Clear cookies
      document.cookie = "pharmly_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-20 md:px-0">
      <div
        className="
          mt-4
          ml-4
          mr-auto
          md:mx-auto
          flex
          items-center
          justify-between
          rounded-2xl
          border-2
          border-teal-600
          bg-white
          px-4
          py-3
          max-w-fit
          md:max-w-none
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
        <div className="flex items-center gap-2 md:gap-4 relative">
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

          {/* Logout */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              className="rounded-lg p-2 hover:bg-gray-100 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </button>
            
            {showLogoutMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
