import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { LiveCounter } from "./LiveCounter";
import { SmartSearch } from "./SmartSearch";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                <LiveCounter />

                <h1 className="font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl max-w-4xl mb-6 drop-shadow-sm">
                    Discover local businesses <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative">
                        through video.
                    </span>
                </h1>

                <p className="mt-4 text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                    Experience the vibe before you visit. Watch authentic stories from cafes, salons, and creators in your community.
                </p>

                <SmartSearch />

                <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground font-medium">
                    <div className="flex -space-x-3">
                        {[
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                        ].map((src, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                                <img src={src} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <p>Join 2,000+ locals exploring today</p>
                </div>
            </div>
        </section>
    )
}
