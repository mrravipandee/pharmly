import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Solution from "@/components/landing/Solution";
import Trust from "@/components/landing/Trust";
import CTA from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Problems Section */}
      <Problems />

      {/* Solution Section */}
      <Solution />

      {/* Trust Section */}
      <Trust />

      {/* CTA Section */}
      <CTA />

    </div>
  );
}