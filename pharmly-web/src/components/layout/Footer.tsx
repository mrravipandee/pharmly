import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-lg font-semibold text-white">
                Pharmly
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Modern pharmacy management solution for efficient billing and customer management.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-teal-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-teal-400 transition">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-teal-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-teal-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-teal-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#privacy" className="hover:text-teal-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-teal-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Pharmly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
