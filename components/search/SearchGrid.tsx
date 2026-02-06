"use client"

import { useState } from "react";
import { Star, MapPin, Heart, MessageCircle, Share2, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/business/ProfileCard";
import Link from "next/link";

export function SearchGrid({ results }: { results: any[] }) {
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleOpenProfile = (business: any) => {
        setSelectedBusiness(business);
        setIsProfileOpen(true);
    };

    return (
        <>
            {/* --- Mobile View: Vertical Reel Feed --- */}
            <div className="md:hidden relative w-full h-[calc(100vh-220px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide rounded-2xl bg-black border border-white/10 shadow-2xl">
                {results.map((business, i) => (
                    <div key={`mobile-${business.id || i}`} className="relative w-full h-full snap-center shrink-0 group">
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
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
                        </div>

                        {/* Top Overlay */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
                            <div className="bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                <MapPin className="w-3 h-3 text-white/90" />
                                <span className="text-[10px] font-medium text-white truncate max-w-[100px]">{business.location || "Local"}</span>
                            </div>
                            <div className="bg-green-500/90 text-black text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-lg shadow-green-900/20">
                                Open Now
                            </div>
                        </div>

                        {/* Right Actions */}
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

                        {/* Bottom Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pointer-events-none">
                            <div className="mb-3">
                                <h3 className="font-heading text-lg font-bold text-white mb-1 shadow-sm drop-shadow-md">
                                    {business.name}
                                </h3>
                                <p className="text-white/80 text-xs line-clamp-2 font-light leading-relaxed">
                                    {business.bio}
                                </p>
                            </div>

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

            {/* --- Desktop View: Grid Layout --- */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((business, i) => (
                    <div
                        key={business.id || i}
                        style={{ animationDelay: `${i * 100}ms` }}
                        className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
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
        </>
    );
}
