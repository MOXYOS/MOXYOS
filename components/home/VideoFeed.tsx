"use client"

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MapPin, Star, Calendar, Phone } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

import { ProfileCard } from "@/components/business/ProfileCard";
import { MOCK_BUSINESSES } from "@/lib/data/mock";


export function VideoFeed() {
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

            // Always combine real data with mocks to ensure the feed feels full
            if (data && data.length > 0) {
                // Filter out duplicates if any real data mimics mock IDs (unlikely but good practice)
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
        <>
            <section className="relative w-full max-w-md mx-auto h-[85vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide rounded-2xl bg-black my-8 border border-white/10 shadow-2xl">
                {businesses.map((business) => (
                    <div key={business.id} className="relative w-full h-full snap-center shrink-0 group">
                        {/* Video Background */}
                        {/* Video Background */}
                        <div className="absolute inset-0 bg-black cursor-pointer" onClick={() => handleOpenProfile(business)}>
                            {(() => {
                                // 1. Sanitize: Extract key URL part if garbage text exists
                                let rawUrl = business.video_url || "";
                                const urlMatch = rawUrl.match(/(https?:\/\/[^\s]+)/g);
                                const cleanUrl = urlMatch ? urlMatch[0] : rawUrl;

                                // 2. Robust Video Check
                                const isVideo = cleanUrl.match(/\.(mp4|webm|mov)$/i) ||
                                    cleanUrl.includes("datastorage.googleapis.com") ||
                                    cleanUrl.includes("cloudinary") ||
                                    cleanUrl.includes("pexels.com");

                                if (isVideo) {
                                    return (
                                        <video
                                            src={cleanUrl}
                                            className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    );
                                } else {
                                    // 3. Safe Image Fallback
                                    // Only render NextImage if it looks like a valid URL or path
                                    const isValidImage = cleanUrl.startsWith("http") || cleanUrl.startsWith("/");

                                    if (isValidImage) {
                                        return (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={cleanUrl}
                                                alt={business.name}
                                                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                            />
                                        );
                                    } else {
                                        // Fallback for completely invalid text
                                        return (
                                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                                <span className="text-white/20 text-xs">No Media</span>
                                            </div>
                                        );
                                    }
                                }
                            })()}
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
                        </div>

                        {/* Top Overlay: Location & Status */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
                            <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                                <MapPin className="w-3.5 h-3.5 text-white/90" />
                                <span className="text-xs font-medium text-white">{business.location || "Local"}</span>
                            </div>
                            <div className="bg-green-500/90 text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-lg shadow-green-900/20">
                                Open Now
                            </div>
                        </div>

                        {/* Right Side Action Bar */}
                        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-30 items-center">
                            <ActionButton icon={Heart} label="Follow" />
                            <ActionButton icon={MessageCircle} label="Review" onClick={() => handleOpenProfile(business)} />
                            <ActionButton icon={Share2} label="Share" />
                        </div>

                        {/* Bottom Info Section */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-32">
                            <div className="flex items-end justify-between mb-4 cursor-pointer" onClick={() => handleOpenProfile(business)}>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-white mb-1 shadow-sm drop-shadow-md">
                                        {business.name}
                                    </h3>
                                    <p className="text-white/80 text-sm line-clamp-2 max-w-[85%] font-light leading-relaxed">
                                        {business.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Primary Action Grid */}
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <Button
                                    onClick={() => handleOpenProfile(business)}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-purple-900/20 backdrop-blur-sm border-0 h-12 rounded-xl text-base transition-transform active:scale-95"
                                >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book Now
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleOpenProfile(business)}
                                    className="w-full border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md h-12 rounded-xl text-base transition-transform active:scale-95"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-white/60 pointer-events-none">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-white">{business.rating} Rating</span>
                                <span className="mx-1">•</span>
                                <span>{business.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <ProfileCard
                business={selectedBusiness}
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
        </>
    );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={onClick}>
            <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 group-hover:bg-white/20 group-hover:scale-110 shadow-lg active:scale-90">
                <Icon className="w-6 h-6 text-white stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-medium text-white shadow-black/50 drop-shadow-md opacity-90">{label}</span>
        </div>
    );
}
