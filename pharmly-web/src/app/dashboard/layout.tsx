import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - 30% on desktop, slides from right on mobile */}
      <Sidebar />
      
      {/* Main Content - 70% on desktop */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 md:right-0 md:left-auto w-auto">
          <TopNavbar />
        </div>
        <div className="p-4 md:p-6 lg:p-8 pt-10 mt-16">
          {children}
        </div>
      </main>
    </div>
  );
}