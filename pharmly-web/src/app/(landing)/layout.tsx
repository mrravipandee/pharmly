import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />
      
      {/* Main content in center */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
