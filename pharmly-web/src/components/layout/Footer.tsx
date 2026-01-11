import Link from "next/link";
import { Heart, Shield, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import { PharmlyLogo } from "../../../public";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand with Icon */}
          <div className="">
            <div className="">
              <Image src={PharmlyLogo} alt="Pharmly Logo" className="w-16 h-[5.5rem]" width={40} height={40} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a 
              href="mailto:imravipanday@gmail.com" 
              className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>imravipanday@gmail.com</span>
            </a>
            <a 
              href="tel:+917058548204" 
              className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 70585 48204</span>
            </a>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>

        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <Shield className="w-3 h-3 text-teal-500" />
            <span>Your data is secure</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
          <div className="text-gray-600">
            ✓ Used by 100+ medical stores
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
          <div className="text-gray-600">
            ⭐ 4.2/5 average rating
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Pharmly | All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Made with <Heart className="w-3 h-3 inline text-red-400" /> in India for medical stores
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-teal-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-teal-600 transition-colors">
                Terms
              </Link>
              <Link href="/help" className="hover:text-teal-600 transition-colors">
                Help Center
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}