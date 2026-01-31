import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="mailto:imravipanday@gmail.com" 
                className="flex items-start gap-3 text-gray-600 hover:text-teal-600 transition-colors group"
              >
                <Mail className="w-5 h-5 text-teal-500 mt-0.5 group-hover:text-teal-600" />
                <span>imravipanday@gmail.com</span>
              </a>
              <a 
                href="tel:+917058548204" 
                className="flex items-start gap-3 text-gray-600 hover:text-teal-600 transition-colors group"
              >
                <Phone className="w-5 h-5 text-teal-500 mt-0.5 group-hover:text-teal-600" />
                <span>+91 70585 48204</span>
              </a>
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-teal-500 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                href="/features" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/pricing" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <div className="space-y-2">
              <Link 
                href="/privacy" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/gdpr" 
                className="block text-gray-600 hover:text-teal-600 transition-colors"
              >
                GDPR Compliance
              </Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} Pharmly. All rights reserved.
            </p>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-500">
            <Link href="/sitemap" className="hover:text-teal-600 transition-colors">
              Sitemap
            </Link>
            <Link href="/faq" className="hover:text-teal-600 transition-colors">
              FAQ
            </Link>
            <Link href="/support" className="hover:text-teal-600 transition-colors">
              Support
            </Link>
            <Link href="/blog" className="hover:text-teal-600 transition-colors">
              Blog
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}