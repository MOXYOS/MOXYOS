import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { TrendingFeed } from "@/components/home/TrendingFeed";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrendingFeed />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
