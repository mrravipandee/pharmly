import Link from "next/link";
import { 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  MessageSquare, 
  Users, 
  Shield,
  Smartphone,
  Zap,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-teal-50/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-teal-100/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-50/30 to-transparent rounded-full translate-x-1/4 translate-y-1/4"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT — TEXT CONTENT */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-100">
              <Zap className="w-4 h-4" />
              <span>Built specifically for medical stores</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Smart billing for
              <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                modern medical stores
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Streamline your pharmacy operations with AI-powered billing, instant WhatsApp
              notifications, and real-time sales analytics — all in one intuitive platform.
            </p>

            {/* Feature Points */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: BarChart3, text: "Real-time sales analytics" },
                { icon: MessageSquare, text: "WhatsApp billing & reminders" },
                { icon: Users, text: "Customer management" },
                { icon: Shield, text: "Data privacy & security" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 text-teal-600">
                    <CheckCircle className="w-full h-full" />
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="
                  group inline-flex items-center justify-center gap-3
                  rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600
                  px-8 py-4 text-base font-semibold text-white
                  hover:from-teal-700 hover:to-emerald-700
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  transform hover:-translate-y-0.5
                "
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#how-it-works"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-xl bg-white px-8 py-4
                  text-base font-medium text-gray-700
                  border-2 border-gray-200
                  hover:border-teal-200 hover:bg-teal-50
                  transition-all duration-300
                  shadow-sm hover:shadow-md
                "
              >
                <Smartphone className="w-5 h-5" />
                <span>See Live Demo</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Used by 500+ medical stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>30-day free trial</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — DASHBOARD PREVIEW */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="
              relative rounded-2xl bg-white p-6 lg:p-8
              shadow-2xl shadow-teal-100/50
              border border-gray-100
              transform hover:scale-[1.02] transition-transform duration-300
            ">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <h3 className="font-semibold text-gray-900">Live Dashboard</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Real-time analytics</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-teal-700">+12% today</span>
                </div>
              </div>

              {/* Sales Amount */}
              <div className="mb-8">
                <p className="text-sm text-gray-500">Today&apos;s Total Sales</p>
                <p className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">₹ 18,420</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm text-gray-500">74% of target</span>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Shree Sai Medical</p>
                      <p className="text-sm text-gray-500">10:30 AM • Regular Customer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹ 490</p>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-xs text-emerald-700">
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Sent</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Om Pharma</p>
                      <p className="text-sm text-gray-500">09:15 AM • Bulk Order</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹ 1,120</p>
                    <span className="text-xs text-gray-500">Paid</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">New Customer</p>
                      <p className="text-sm text-gray-500">Yesterday • First Purchase</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹ 350</p>
                    <span className="text-xs text-gray-500">Pending</span>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">42</p>
                  <p className="text-sm text-gray-500">Bills Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-sm text-gray-500">WhatsApp Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-500">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Floating Elements for Depth */}
            <div className="
              absolute -bottom-6 -left-6 w-64 h-64
              bg-gradient-to-br from-teal-100 to-emerald-100
              rounded-2xl -z-10 blur-xl opacity-50
            "></div>
            <div className="
              absolute -top-6 -right-6 w-48 h-48
              bg-gradient-to-br from-emerald-50 to-teal-50
              rounded-2xl -z-10 blur-xl opacity-50
            "></div>

            {/* App Badge */}
            <div className="
              absolute -right-4 top-1/4
              bg-white rounded-xl p-4
              shadow-lg border border-gray-100
              transform -rotate-6
            ">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Mobile App</p>
                  <p className="text-xs text-gray-500">Available now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}