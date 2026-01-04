import Hero from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything you need to manage your pharmacy
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Billing</h3>
              <p className="text-gray-600">
                Generate professional bills instantly with automatic calculations and discounts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">
                Track sales, revenue, and customer trends with detailed analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-gray-600">
                Maintain customer records and purchase history for better service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}