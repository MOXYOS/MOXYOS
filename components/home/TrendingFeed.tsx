"use client"

import { useState, useEffect } from "react";
import { Star, MapPin, ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MOCK_BUSINESSES } from "@/lib/data/mock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileCard } from "@/components/business/ProfileCard";

export function TrendingFeed() {
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchBusinesses = async () => {
            const { data } = await supabase
                .from('businesses')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && data.length > 0) {
                const realIds = new Set(data.map(b => b.id));
                const filteredMocks = MOCK_BUSINESSES.filter(m => !realIds.has(m.id));
                setBusinesses([...data, ...filteredMocks]);
            } else {
                setBusinesses(MOCK_BUSINESSES);
            }
        };

        fetchBusinesses();
    }, []);

    const handleOpenProfile = (business: any) => {
        setSelectedBusiness(business);
        setIsProfileOpen(true);
    };

    return (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                        Trending in Your Community
                    </h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>Exploring <strong>San Francisco, CA</strong></span>
                    </div>
                </div>
                <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80">
                    View All <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {businesses.map((business, i) => (
                    <div
                        key={business.id || i}
                        className="relative w-[85vw] sm:w-[280px] aspect-[9/16] sm:h-[500px] shrink-0 rounded-3xl overflow-hidden snap-center cursor-pointer group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-white/5 bg-black"
                    >
                        {/* Media Background */}
                        <div className="absolute inset-0 bg-black cursor-pointer" onClick={() => handleOpenProfile(business)}>
                            {(() => {
                                let rawUrl = business.video_url || business.thumbnail_url || "";
                                const urlMatch = rawUrl.match(/(https?:\/\/[^\s]+)/g);
                                const cleanUrl = urlMatch ? urlMatch[0] : rawUrl;

                                const isVideo = cleanUrl.match(/\.(mp4|webm|mov)$/i) ||
                                    cleanUrl.includes("datastorage.googleapis.com") ||
                                    cleanUrl.includes("cloudinary") ||
                                    cleanUrl.includes("pexels.com");

                                if (isVideo) {
                                    return (
                                        <video
                                            src={cleanUrl}
                                            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    )
                                }

                                return (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={cleanUrl}
                                        alt={business.name}
                                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                    />
                                )
                            })()}
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
                        </div>


                        {/* Top Overlay: Location & Status */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
                            <div className="bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                <MapPin className="w-3 h-3 text-white/90" />
                                <span className="text-[10px] font-medium text-white truncate max-w-[100px]">{business.location || "Local"}</span>
                            </div>
                            <div className="bg-green-500/90 text-black text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-lg shadow-green-900/20">
                                Open Now
                            </div>
                        </div>

                        {/* Reels UI - Right Side Actions */}
                        <div className="absolute right-3 bottom-36 flex flex-col gap-4 items-center z-30">
                            <div className="flex flex-col items-center gap-1 group/icon cursor-pointer">
                                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 group-hover/icon:bg-white/20 transition-all">
                                    <Heart className="w-5 h-5 text-white stroke-[1.5]" />
                                </div>
                                <span className="text-[9px] font-medium text-white shadow-black/50">Follow</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group/icon cursor-pointer" onClick={() => handleOpenProfile(business)}>
                                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 group-hover/icon:bg-white/20 transition-all">
                                    <MessageCircle className="w-5 h-5 text-white stroke-[1.5]" />
                                </div>
                                <span className="text-[9px] font-medium text-white shadow-black/50">Review</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group/icon cursor-pointer">
                                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 group-hover/icon:bg-white/20 transition-all">
                                    <Share2 className="w-5 h-5 text-white stroke-[1.5]" />
                                </div>
                                <span className="text-[9px] font-medium text-white shadow-black/50">Share</span>
                            </div>
                        </div>

                        {/* Bottom Info Section */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pointer-events-none">
                            <div className="mb-3">
                                <h3 className="font-heading text-lg font-bold text-white mb-1 shadow-sm drop-shadow-md">
                                    {business.name}
                                </h3>
                                <p className="text-white/80 text-xs line-clamp-2 font-light leading-relaxed">
                                    {business.bio}
                                </p>
                            </div>

                            {/* Primary Action Grid */}
                            <div className="grid grid-cols-2 gap-2 mt-2 pointer-events-auto">
                                <Button
                                    onClick={() => handleOpenProfile(business)}
                                    size="sm"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-purple-900/20 backdrop-blur-sm border-0 h-9 rounded-lg text-xs"
                                >
                                    Book Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOpenProfile(business)}
                                    className="w-full border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md h-9 rounded-lg text-xs"
                                >
                                    Call
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 mt-3 text-[10px] font-medium text-white/60">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-white">{business.rating} Rating</span>
                                <span className="mx-1">•</span>
                                <span className="text-white/90">{business.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProfileCard
                business={selectedBusiness}
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
        </section>
    );
}
