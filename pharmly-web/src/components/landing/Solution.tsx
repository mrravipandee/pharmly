import { 
  MessageSquare, 
  Users, 
  Tag, 
  BarChart3,
  CheckCircle2,
  Zap,
  Shield,
  Smartphone,
  Download,
  ArrowRight,
  Clock,
  TrendingUp,
  PieChart,
  FileText
} from "lucide-react";

export default function Solution() {
  const solutions = [
    {
      icon: MessageSquare,
      title: "WhatsApp Billing",
      description: "Create bills and send them directly on WhatsApp so customers never lose their purchase details.",
      features: ["Instant delivery", "Digital receipts", "Reminder automation"],
      stat: "98% faster billing",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Customer Records",
      description: "Every bill is saved with customer details, making it easy to recognize repeat customers.",
      features: ["Purchase history", "Contact management", "Loyalty tracking"],
      stat: "67% more repeat customers",
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: Tag,
      title: "Automatic Discounts",
      description: "Give automatic discounts to regular customers and increase repeat visits without manual effort.",
      features: ["Smart loyalty programs", "Bulk purchase offers", "Seasonal discounts"],
      stat: "45% higher customer retention",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Sales Overview",
      description: "See today's sales, trends, and growth clearly from a simple dashboard.",
      features: ["Real-time analytics", "Daily reports", "Profit insights"],
      stat: "3x better decision making",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Your customer data and sales information are protected with enterprise-grade security.",
      features: ["Encrypted storage", "Regular backups", "Access controls"],
      stat: "100% data privacy",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description: "Reduce manual work by automating billing, inventory, and customer follow-ups.",
      features: ["Quick billing", "Auto reminders", "Batch processing"],
      stat: "Save 2+ hours daily",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: PieChart,
      title: "Inventory Management",
      description: "Track stock levels, get low stock alerts, and manage expiry dates effortlessly.",
      features: ["Stock alerts", "Expiry tracking", "Supplier management"],
      stat: "30% less stock waste",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: FileText,
      title: "Paperless Operations",
      description: "Go completely digital with electronic bills, receipts, and documentation.",
      features: ["Digital archives", "Easy retrieval", "Tax compliance"],
      stat: "Zero paper bills",
      color: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full -translate-y-1/2 translate-x-1/3 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full translate-y-1/2 -translate-x-1/3 opacity-20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>The Complete Solution</span>
          </div>
          
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            One intelligent system to
            <span className="block mt-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              transform your medical store
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Pharmly helps medical store owners handle billing, customers, inventory, 
            and daily sales — all from one intuitive platform designed for modern pharmacy operations.
          </p>
        </div>

        {/* Demo Dashboard Preview */}
        <div className="mt-20 lg:mt-28">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    <Zap className="w-4 h-4" />
                    <span>Live Dashboard Demo</span>
                  </div>
                  
                  <h3 className="mt-6 text-3xl lg:text-4xl font-bold text-white">
                    See everything in one place
                  </h3>
                  
                  <p className="mt-4 text-lg text-white/90">
                    Our unified dashboard gives you complete visibility into your store&apos;s operations, 
                    from sales and inventory to customer satisfaction.
                  </p>
                  
                  {/* Dashboard Stats */}
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    {[
                      { value: "₹ 18,420", label: "Today's Sales", change: "+12%" },
                      { value: "42", label: "Bills Generated", change: "+8%" },
                      { value: "18", label: "WhatsApp Receipts", change: "+15%" },
                      { value: "92%", label: "Customer Satisfaction", change: "+5%" }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <span className="text-sm font-semibold text-emerald-400">{stat.change}</span>
                        </div>
                        <p className="text-sm text-white/70 mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button className="
                      group
                      inline-flex items-center justify-center gap-3
                      rounded-xl bg-white px-8 py-4
                      text-base font-semibold text-gray-900
                      hover:bg-gray-50
                      transition-all duration-300
                      shadow-lg hover:shadow-xl
                      transform hover:-translate-y-0.5
                    ">
                      <span>Try Live Demo</span>
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
                      <Download className="w-5 h-5" />
                      <span>Download App</span>
                    </button>
                  </div>
                </div>
                
                {/* Dashboard Visual */}
                <div className="relative">
                  <div className="
                    rounded-2xl bg-gray-800 border border-gray-700
                    p-6 shadow-2xl
                    relative z-10
                  ">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <h4 className="font-semibold text-white">Pharmly Dashboard</h4>
                      </div>
                      <div className="text-xs text-gray-400">Live updates</div>
                    </div>
                    
                    {/* Sales Chart */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-300">Daily Sales Trend</p>
                        <p className="text-teal-400 font-semibold">+12.5% growth</p>
                      </div>
                      <div className="h-32 flex items-end gap-1">
                        {[30, 45, 60, 75, 90, 85, 95].map((height, idx) => (
                          <div
                            key={idx}
                            className="flex-1 bg-gradient-to-t from-teal-500 to-emerald-500 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-teal-400" />
                          </div>
                          <div>
                            <p className="text-sm text-white">WhatsApp bill sent</p>
                            <p className="text-xs text-gray-400">2 minutes ago</p>
                          </div>
                        </div>
                        <span className="text-teal-400 font-semibold">₹ 890</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-sm text-white">New customer added</p>
                            <p className="text-xs text-gray-400">10 minutes ago</p>
                          </div>
                        </div>
                        <span className="text-emerald-400 font-semibold">+1</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="
                    absolute -bottom-4 -right-4 w-64 h-64
                    bg-gradient-to-br from-teal-500/20 to-emerald-500/20
                    rounded-2xl -z-10 blur-2xl
                  "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}