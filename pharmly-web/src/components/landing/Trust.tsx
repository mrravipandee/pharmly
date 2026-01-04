import { 
  Shield,
  Lock,
  EyeOff,
  Smartphone,
  Flag,
  Server,
  FileLock,
  CheckCircle2,
  Users,
  Award,
  Globe,
  Clock,
  Zap,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

export default function Trust() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Your data stays private",
      description: "Customer and billing data is never shared with anyone and is used only for your store's operations.",
      features: ["End-to-end encryption", "GDPR compliance", "Zero data sharing"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: EyeOff,
      title: "No ads. No spam.",
      description: "We don't show ads or send marketing messages to your customers. Your WhatsApp stays clean.",
      features: ["Ad-free experience", "No promotional messages", "Clean communication"],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Flag,
      title: "Made for Indian medical stores",
      description: "Pharmly is built keeping Indian medical store workflows and daily billing needs in mind.",
      features: ["Local GST compliance", "Regional language support", "Indian currency"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Server,
      title: "Secure & reliable",
      description: "Your data is securely stored and accessible only to you, anytime you need it.",
      features: ["99.9% uptime", "Daily backups", "Military-grade security"],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: FileLock,
      title: "Compliance Ready",
      description: "Built with pharmacy regulations and compliance requirements in mind.",
      features: ["Audit trails", "Digital signatures", "Tax compliance"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Multi-device Access",
      description: "Access your store data securely from mobile, tablet, or desktop.",
      features: ["Cross-platform sync", "Offline mode", "Real-time updates"],
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support for Indian medical store owners.",
      features: ["Phone & chat support", "Hindi & English", "Quick resolution"],
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Role-based Access",
      description: "Control staff access levels to protect sensitive business data.",
      features: ["Custom permissions", "Activity logs", "Staff management"],
      gradient: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-200">
            <BadgeCheck className="w-4 h-4" />
            <span>Trust & Security</span>
          </div>
          
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Built with
            <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              trust and safety at the core
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Pharmly is designed specifically for medical stores, keeping your customer data private, 
            your business secure, and your operations compliant with industry standards.
          </p>
        </div>

        {/* Main Trust Grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.slice(0, 4).map((point, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="
                relative h-full rounded-2xl bg-white p-6 lg:p-8
                border-2 border-gray-100
                shadow-lg hover:shadow-2xl
                transition-all duration-300
                hover:scale-[1.02]
                hover:border-teal-100
                hover:bg-gradient-to-b hover:from-white hover:to-teal-50/30
              ">
                {/* Icon with Gradient */}
                <div className="mb-6">
                  <div className={`
                    w-14 h-14 rounded-xl
                    bg-gradient-to-br ${point.gradient}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                    shadow-lg
                  `}>
                    <point.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900">
                  {point.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {point.description}
                </p>

                {/* Features List */}
                <div className="mt-6 space-y-2">
                  {point.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 text-teal-500">
                        <ShieldCheck className="w-full h-full" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Effect */}
              <div className="
                absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50 to-transparent
                opacity-0 group-hover:opacity-100 blur-xl -z-10
                transition-opacity duration-300
              "></div>
            </div>
          ))}
        </div>

        {/* Additional Trust Points */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.slice(4).map((point, index) => (
            <div
              key={index + 4}
              className="group relative"
            >
              <div className="
                relative h-full rounded-2xl bg-white p-6 lg:p-8
                border-2 border-gray-100
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:scale-[1.02]
              ">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`
                    w-12 h-12 rounded-xl
                    bg-gradient-to-br ${point.gradient}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                    shadow-md
                  `}>
                    <point.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Certifications */}
        <div className="mt-20 lg:mt-24">
          <div className="
            rounded-2xl lg:rounded-3xl
            bg-gradient-to-br from-gray-900 to-gray-800
            p-8 lg:p-12
            relative overflow-hidden
          ">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <Award className="w-4 h-4" />
                  <span>Certifications & Compliance</span>
                </div>
                
                <h3 className="mt-6 text-3xl lg:text-4xl font-bold text-white">
                  Industry-leading security standards
                </h3>
                
                <p className="mt-4 text-lg text-white/90">
                  We maintain the highest security standards to protect your pharmacy data and ensure regulatory compliance.
                </p>
              </div>

              {/* Certifications Grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "GDPR Compliant",
                    description: "European data protection standards"
                  },
                  {
                    icon: Lock,
                    title: "HIPAA Ready",
                    description: "Medical data security protocols"
                  },
                  {
                    icon: Server,
                    title: "ISO 27001",
                    description: "Information security management"
                  },
                  {
                    icon: Globe,
                    title: "SOC 2 Type II",
                    description: "Service organization controls"
                  }
                ].map((cert, idx) => (
                  <div key={idx} className="
                    bg-white/5 rounded-xl p-6
                    backdrop-blur-sm
                    border border-white/10
                    hover:bg-white/10
                    transition-all duration-300
                    group
                  ">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 mx-auto">
                      <cert.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="mt-4 text-center font-semibold text-white">
                      {cert.title}
                    </h4>
                    <p className="mt-2 text-center text-sm text-white/70">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-white">Trusted by Indian Pharmacies</h4>
                    <p className="mt-2 text-white/70">Serving medical stores across 50+ cities</p>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">500+</div>
                      <div className="text-sm text-white/70">Medical Stores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">1M+</div>
                      <div className="text-sm text-white/70">Bills Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-white/70">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Commitment */}
        <div className="mt-16 lg:mt-20">
          <div className="
            rounded-2xl lg:rounded-3xl
            bg-gradient-to-r from-teal-50 to-emerald-50
            p-8 lg:p-12
            border border-teal-100
            relative overflow-hidden
          ">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Our Privacy Promise</span>
                  </div>
                  
                  <h3 className="mt-6 text-3xl lg:text-4xl font-bold text-gray-900">
                    Your data belongs to you
                  </h3>
                  
                  <p className="mt-4 text-lg text-gray-600">
                    We believe your pharmacy data should remain yours. That&apos;s why we never sell, share, 
                    or monetize your customer information.
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    {[
                      "No third-party data sharing",
                      "Local data storage option",
                      "Full data export anytime",
                      "Complete data deletion on request"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Security Visual */}
                <div className="relative">
                  <div className="
                    bg-white rounded-2xl p-8
                    border border-gray-200
                    shadow-xl
                  ">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Multi-layer Security</h4>
                        <p className="text-sm text-gray-600">Protecting your pharmacy data</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { level: "Application", status: "Encrypted" },
                        { level: "Database", status: "Secure" },
                        { level: "Network", status: "Protected" },
                        { level: "Access", status: "Controlled" }
                      ].map((layer, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                            <span className="font-medium text-gray-700">{layer.level} Layer</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                            {layer.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Last security audit: 30 days ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="
                    absolute -top-4 -right-4
                    bg-gradient-to-r from-teal-600 to-emerald-600
                    rounded-xl px-6 py-3
                    shadow-lg
                    transform rotate-3
                  ">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Zap className="w-4 h-4" />
                      <span>Secured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}