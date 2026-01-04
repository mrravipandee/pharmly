// Alternative using only built-in Tailwind animations
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Star, 
  Award, 
  Shield, 
  Users,
  Clock,
  TrendingUp,
  Smartphone,
  MessageSquare,
  BarChart3,
  Download,
  ChevronRight,
  PlayCircle
} from "lucide-react";

export default function CTA() {
  const benefits = [
    { icon: Clock, text: "Setup in 5 minutes" },
    { icon: Shield, text: "No credit card required" },
    { icon: Star, text: "30-day free trial" },
    { icon: Users, text: "Unlimited customers" }
  ];

  const features = [
    { icon: MessageSquare, text: "WhatsApp billing" },
    { icon: BarChart3, text: "Sales analytics" },
    { icon: Smartphone, text: "Mobile app access" },
    { icon: TrendingUp, text: "Business growth" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm border border-white/30 animate-pulse">
            <Zap className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Ready to transform your
            <span className="block mt-3 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent animate-pulse">
              medical store?
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Start digital billing, manage customers, track sales, and grow your business 
            — all from one intelligent platform designed for modern pharmacies.
          </p>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="
                flex flex-col items-center justify-center
                p-4 rounded-xl
                bg-white/10 backdrop-blur-sm
                border border-white/20
                hover:bg-white/15
                transition-all duration-300
                group hover:scale-105
              ">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <span className="mt-3 text-sm font-medium text-white">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA */}
            <Link
              href="/register"
              className="
                group
                relative
                inline-flex items-center justify-center gap-4
                rounded-2xl
                bg-gradient-to-r from-white to-gray-100
                px-10 py-5
                text-lg md:text-xl font-bold text-teal-700
                hover:from-white hover:to-gray-50
                transition-all duration-300
                shadow-2xl shadow-emerald-900/30
                hover:shadow-3xl hover:shadow-emerald-900/50
                transform hover:-translate-y-1
                overflow-hidden
              "
            >
              {/* Background shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span>Start Free Trial</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/demo"
              className="
                group
                inline-flex items-center justify-center gap-4
                rounded-2xl
                bg-transparent
                px-10 py-5
                text-lg md:text-xl font-semibold text-white
                border-2 border-white/30
                hover:border-white hover:bg-white/10
                transition-all duration-300
                backdrop-blur-sm
                hover:shadow-xl
                hover:scale-105
              "
            >
              <PlayCircle className="w-6 h-6" />
              <span>Watch Demo</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <CheckCircle2 className="w-4 h-4 animate-spin" />
              <span>Everything you need to grow</span>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 text-emerald-300 animate-bounce">
                    <CheckCircle2 className="w-full h-full" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-20 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Rating */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" />
                  ))}
                </div>
                <p className="text-lg font-semibold text-white">4.9/5 Rating</p>
                <p className="text-sm text-white/70 mt-1">500+ Medical Stores</p>
              </div>

              {/* Trust */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold text-white">Most Trusted</p>
                <p className="text-sm text-white/70 mt-1">By Indian Pharmacies</p>
              </div>

              {/* Support */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold text-white">24/7 Support</p>
                <p className="text-sm text-white/70 mt-1">Hindi & English</p>
              </div>
            </div>

            {/* Final Micro CTA */}
            <div className="mt-12">
              <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Download className="w-4 h-4 text-white animate-bounce" />
                <span className="text-sm text-white/90">Also available as mobile app</span>
                <Link
                  href="/download"
                  className="text-sm font-semibold text-white hover:text-emerald-200 transition-colors"
                >
                  Download →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}