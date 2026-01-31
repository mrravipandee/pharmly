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
      </div>
    </section>
  );
}