import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { TrendingFeed } from "@/components/home/TrendingFeed";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TrendingFeed />
      </main>
      <Footer />
    </div>
  );
}
