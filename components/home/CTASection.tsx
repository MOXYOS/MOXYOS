import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-primary">
            {/* Subtle Brand Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative mx-auto px-4 z-10 text-center text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span>Join the revolution</span>
                </div>

                <h2 className="text-4xl md:text-7xl font-heading font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                    Ready to find your <br className="hidden md:block" />
                    next favorite spot?
                </h2>

                <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-medium opacity-90">
                    Join thousands of locals exploring their city in a whole new way.
                    It's time to see what's out there.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-heading font-bold shadow-xl shadow-black/20 rounded-full transition-all duration-300 hover:scale-105">
                            Get Started Now
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-heading font-bold bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300">
                            Explore Demo <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
