"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, MapPin } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const MOCK_BUSINESSES = [
    {
        id: "mock-1",
        name: "Bloom & Brew Cafe",
        category: "Coffee & Bakery",
        rating: 4.9,
        video_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
        bio: "Artisan coffee and fresh pastries daily."
    },
    {
        id: "mock-2",
        name: "Urban Yoga Collective",
        category: "Wellness",
        rating: 5.0,
        video_url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600&auto=format&fit=crop",
        bio: "Find your balance in the heart of the city."
    },
    {
        id: "mock-3",
        name: "The Rusty Wrench",
        category: "Auto Repair",
        rating: 4.8,
        video_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop",
        bio: "Honest mechanics, fair prices, fast service."
    },
    {
        id: "mock-4",
        name: "Neon Nights Barber",
        category: "Grooming",
        rating: 4.7,
        video_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
        bio: "Sharp cuts and good vibes only."
    }
];

export function VideoFeed() {
    const [businesses, setBusinesses] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const fetchBusinesses = async () => {
            const { data } = await supabase
                .from('businesses')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && data.length > 0) {
                setBusinesses(data);
            } else {
                setBusinesses(MOCK_BUSINESSES);
            }
        };

        fetchBusinesses();
    }, []);

    return (
        <section className="py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                            Trending in Your Community
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-lg">Exploring <strong>San Francisco, CA</strong></span>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <a href="/explore" className="text-primary font-semibold hover:underline decoration-wavy underline-offset-4 flex items-center gap-1">
                            View All <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {businesses.length === 0 ? (
                        // Skeleton / Empty State
                        [1, 2, 3, 4].map((i) => (
                            <Card key={i} className="aspect-[9/16] border-0 bg-muted/20 animate-pulse rounded-3xl shadow-sm" />
                        ))
                    ) : (
                        businesses.map((business) => (
                            <Card
                                key={business.id}
                                className="group relative overflow-hidden rounded-3xl border-0 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 aspect-[9/16] cursor-pointer bg-black"
                            >
                                <CardContent className="p-0 h-full w-full">
                                    <div className="relative h-full w-full">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-black/90 z-10 transition-opacity duration-300 group-hover:via-black/20" />

                                        <Image
                                            src={business.video_url || "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=600&auto=format&fit=crop"}
                                            alt={business.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />

                                        {/* Play Button (Top Right) */}
                                        <div className="absolute top-4 right-4 z-20 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg hover:bg-white hover:text-primary text-white transition-colors">
                                                <Play className="h-5 w-5 fill-current ml-0.5" />
                                            </div>
                                        </div>

                                        {/* Content (Bottom) */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                                            <div className="mb-3 flex items-center gap-2">
                                                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium">
                                                    {business.category}
                                                </Badge>
                                                <div className="flex items-center text-yellow-400 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    <span className="ml-1 text-xs font-bold">5.0</span>
                                                </div>
                                            </div>

                                            <h3 className="font-heading text-xl font-bold leading-tight mb-2 text-white group-hover:text-primary-foreground">
                                                {business.name}
                                            </h3>

                                            <p className="text-sm text-gray-200 line-clamp-2 opacity-90 font-medium">
                                                {business.bio}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                <div className="mt-12 text-center sm:hidden">
                    <a href="/explore" className="text-primary font-semibold hover:underline decoration-wavy underline-offset-4">Browse All Businesses &rarr;</a>
                </div>
            </div>
        </section>
    );
}
