import { 
  FileText, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Receipt,
  XCircle,
  CheckCircle2,
  ArrowRight,
  Smartphone
} from "lucide-react";

export default function Problems() {
  const problems = [
    {
      icon: FileText,
      title: "Paper bills get lost",
      description: "Customers lose paper bills, and you have no record when they come back again for the same medicines.",
      painPoints: [
        "No digital backup of transactions",
        "Cannot retrieve past bills",
        "Manual entry leads to errors"
      ],
      stat: "42% of medical stores face billing disputes"
    },
    {
      icon: Users,
      title: "No customer history",
      description: "You don't know who your regular customers are or what they usually purchase, making discounts and follow-ups difficult.",
      painPoints: [
        "No purchase history tracking",
        "Missing customer contact info",
        "Unable to personalize service"
      ],
      stat: "Regular customers spend 67% more"
    },
    {
      icon: TrendingUp,
      title: "Sales are unclear",
      description: "At the end of the day, it's hard to clearly know today's sales, growth, or whether business is improving.",
      painPoints: [
        "Manual sales calculation",
        "No real-time analytics",
        "Missing business insights"
      ],
      stat: "38% of stores lack proper sales tracking"
    },
    {
      icon: Clock,
      title: "Time-consuming processes",
      description: "Manual billing and inventory management consume hours daily that could be spent on customer service.",
      painPoints: [
        "Average 2+ hours on billing daily",
        "Slow customer checkout",
        "Manual stock updates"
      ],
      stat: "Reduces productivity by 40%"
    },
    {
      icon: Receipt,
      title: "Inventory mismanagement",
      description: "Out-of-stock situations and expired medicines due to poor inventory tracking.",
      painPoints: [
        "Stockouts during peak hours",
        "Expired inventory losses",
        "Overstocking issues"
      ],
      stat: "25% revenue loss from stock issues"
    },
    {
      icon: AlertCircle,
      title: "Customer dissatisfaction",
      description: "Long wait times and billing errors lead to poor customer experience and lost business.",
      painPoints: [
        "Slow billing processes",
        "Billing errors and disputes",
        "No digital receipts"
      ],
      stat: "Customer retention drops by 31%"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-200">
            <AlertCircle className="w-4 h-4" />
            <span>Common Pain Points</span>
          </div>
          
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Running a medical store
            <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              shouldn&apos;t be this hard
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Many medical stores still struggle with basic daily operations that 
            slow down business, reduce customer satisfaction, and limit growth potential.
          </p>
          
          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">67%</div>
              <div className="text-sm text-gray-600 mt-1">Manual processes</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">42%</div>
              <div className="text-sm text-gray-600 mt-1">Billing disputes</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">2.3h</div>
              <div className="text-sm text-gray-600 mt-1">Daily admin work</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-900">31%</div>
              <div className="text-sm text-gray-600 mt-1">Lost customers</div>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="
                relative h-full rounded-2xl bg-white p-6 lg:p-8
                border-2 border-gray-100
                shadow-lg hover:shadow-2xl
                transition-all duration-300
                hover:border-teal-200 hover:scale-[1.02]
                hover:bg-gradient-to-br hover:from-white hover:to-teal-50/20
              ">
                {/* Top Badge */}
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 border border-teal-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span>Common Issue</span>
                  </div>
                </div>

                {/* Problem Icon */}
                <div className="mb-6">
                  <div className="
                    w-14 h-14 rounded-xl
                    bg-gradient-to-br from-teal-50 to-emerald-50
                    border border-teal-100
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                  ">
                    <problem.icon className="w-7 h-7 text-teal-600" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900">
                  {problem.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {problem.description}
                </p>

                {/* Pain Points */}
                <div className="mt-6 space-y-3">
                  {problem.painPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-500">
                        <XCircle className="w-full h-full" />
                      </div>
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Stat */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                    <span className="font-semibold text-gray-900">
                      {problem.stat}
                    </span>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="
                  absolute inset-0 rounded-2xl border-2 border-teal-100
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 -z-10
                "></div>
              </div>

              {/* Background Effect */}
              <div className="
                absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50 to-transparent
                opacity-0 group-hover:opacity-100 blur-xl -z-20
                transition-opacity duration-300
              "></div>
            </div>
          ))}
        </div>

        {/* Solution Preview */}
        <div className="mt-20 lg:mt-24">
          <div className="
            rounded-2xl lg:rounded-3xl
            bg-gradient-to-r from-teal-600 to-emerald-600
            p-8 lg:p-12
            relative overflow-hidden
          ">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Smart Solution</span>
                </div>
                
                <h3 className="mt-6 text-3xl lg:text-4xl font-bold text-white">
                  Modern problems require modern solutions
                </h3>
                
                <p className="mt-4 text-lg text-white/90">
                  Transform your medical store operations with our comprehensive platform designed 
                  to eliminate these challenges and boost your business efficiency.
                </p>
                
                {/* Solution Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Smartphone, text: "Digital bills & WhatsApp receipts" },
                    { icon: Users, text: "Complete customer history" },
                    { icon: TrendingUp, text: "Real-time sales analytics" },
                    { icon: Clock, text: "Automated inventory management" },
                    { icon: FileText, text: "Paperless documentation" },
                    { icon: CheckCircle2, text: "Improved customer satisfaction" }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm lg:text-base">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button className="
                    group
                    inline-flex items-center justify-center gap-3
                    rounded-xl bg-white px-8 py-4
                    text-base font-semibold text-teal-700
                    hover:bg-gray-50
                    transition-all duration-300
                    shadow-lg hover:shadow-xl
                    transform hover:-translate-y-0.5
                  ">
                    <span>See how we solve these problems</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="
                    group
                    inline-flex items-center justify-center gap-3
                    rounded-xl bg-transparent px-8 py-4
                    text-base font-semibold text-white
                    border-2 border-white/30
                    hover:border-white hover:bg-white/10
                    transition-all duration-300
                    backdrop-blur-sm
                  ">
                    <span>Watch 2-min demo</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Preview */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            <span>Trusted by medical stores across India</span>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Reduced billing time by 70%. Our customers love the WhatsApp receipts!",
                name: "Rahul Sharma",
                store: "City Medical Store, Delhi"
              },
              {
                quote: "Inventory management is now effortless. No more stockouts during rush hours.",
                name: "Priya Patel",
                store: "Health Plus Pharmacy, Mumbai"
              },
              {
                quote: "Customer retention improved significantly with purchase history tracking.",
                name: "Anil Kumar",
                store: "Care & Cure Medical, Bangalore"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-left">
                  <div className="flex gap-1 text-amber-400">
                    {"★".repeat(5)}
                  </div>
                  <p className="mt-4 text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.store}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}