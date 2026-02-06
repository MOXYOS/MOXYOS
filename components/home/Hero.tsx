import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { LiveCounter } from "./LiveCounter";
import { SmartSearch } from "./SmartSearch";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse delay-700 mix-blend-multiply"></div>
                <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse mix-blend-multiply"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
                    <LiveCounter />
                </div>

                <h1 className="mt-8 font-heading text-6xl font-extrabold tracking-tight text-foreground sm:text-8xl max-w-5xl mb-8 drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
                    Discover local <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x bg-[length:200%_auto]">
                        magic via video.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                    Experience the vibe before you visit. Watch authentic stories from cafes, salons, and creators in your community.
                </p>

                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both relative z-50">
                    <SmartSearch />
                </div>

                <div className="mt-16 flex items-center gap-6 text-sm text-muted-foreground font-medium animate-in fade-in duration-1000 delay-700 fill-mode-both">
                    <div className="flex -space-x-4 hover:space-x-1 transition-all duration-300">
                        {[
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
                        ].map((src, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted overflow-hidden shadow-sm hover:scale-110 hover:z-10 transition-transform duration-300">
                                <img src={src} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400">★</span>)}
                        </div>
                        <p>Join 2,000+ locals exploring today</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
