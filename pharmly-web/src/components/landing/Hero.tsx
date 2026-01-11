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
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { PharmlyScreen1 } from "../../../public";

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
                  <span>Used by 100+ medical stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free to use forever</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — DASHBOARD PREVIEW */}
          <div className="relative flex justify-center lg:justify-center">
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[380px]"
            >
              <Image
                src={PharmlyScreen1}
                alt="Pharmly Dashboard Preview"
                width={600}
                height={1000}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}