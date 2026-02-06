import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, MessageCircle, Phone, Globe, Share2, Clock, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/ui/BackButton";

export default async function BusinessProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch business data
    const { data: business } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

    // Fallback for demo/dev if Supabase returns null (or if using mock ID)
    let displayBusiness = business;

    // Todo: Better mock handling for 'mock-' IDs in production if needed, but for now we assume real DB or direct ID match.
    // Ideally we seed the DB properly so we don't need this check, but for the 'mock-' IDs in the feed, we might want a fallback.

    // NOTE: For this step, if it's not found in DB, we'll show a "Not Found" or handle mock data if we want to support the landing page mocks deep-linking.
    if (!displayBusiness && id.startsWith('mock-')) {
        // Quick fallback for the landing page mocks so the link works!
        displayBusiness = {
            id: id,
            name: id === 'mock-4' ? "Neon Nights Barber" : "Bloom & Brew Cafe",
            bio: "Sharp cuts and good vibes only. We specialize in fades, beard trims, and hot towel shaves.",
            location: "San Francisco, CA",
            rating: 4.8,
            category: "Grooming",
            video_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
            thumbnail_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
            verified: true
        }
    }

    if (!displayBusiness) {
        return <div className="min-h-screen flex items-center justify-center">Business not found</div>;
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full">
                <Image
                    src={displayBusiness.video_url || displayBusiness.thumbnail_url}
                    alt={displayBusiness.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <BackButton />
            </div>

            {/* Header Content */}
            <div className="px-6 -mt-12 relative z-10">
                <div className="flex justify-between items-end mb-4">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                        <AvatarImage src={displayBusiness.thumbnail_url} className="object-cover" />
                        <AvatarFallback>{displayBusiness.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2 mb-2">
                        <Button size="icon" variant="secondary" className="rounded-full shadow-md">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full shadow-md">
                            <MessageCircle className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-heading font-bold">{displayBusiness.name}</h1>
                        {displayBusiness.verified && (
                            <CheckCircle className="w-5 h-5 text-blue-500 fill-current text-white" />
                        )}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm gap-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-foreground">{displayBusiness.rating}</span>
                            <span>(120+ Reviews)</span>
                        </div>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{displayBusiness.category}</span>
                    </div>
                </div>

                {/* Primary Actions */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <Button className="h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                    </Button>
                    <Button variant="outline" className="h-12 text-base font-semibold rounded-xl">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                    </Button>
                </div>

                {/* Tabs / Navigation (Sticky) */}
                <div className="flex border-b mb-6 sticky top-0 bg-background/95 backdrop-blur-md z-20 overflow-x-auto no-scrollbar">
                    {['Services', 'About', 'Reviews', 'Portfolio'].map((tab, i) => (
                        <button key={tab} className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* About Section */}
                    <section>
                        <h2 className="font-heading text-xl font-bold mb-3">About</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {displayBusiness.bio}
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                <MapPin className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs font-bold uppercase text-muted-foreground">Location</p>
                                    <p className="text-sm font-medium">{displayBusiness.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                <Clock className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs font-bold uppercase text-muted-foreground">Hours</p>
                                    <p className="text-sm font-medium text-green-600">Open Now • Closes 9 PM</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section>
                        <h2 className="font-heading text-xl font-bold mb-4">Popular Services</h2>
                        <div className="space-y-3">
                            {['Haircut & Beard Trim', 'Hot Towel Shave', 'Kids Cut'].map((service, i) => (
                                <div key={i} className="flex justify-between items-center p-4 border rounded-xl hover:bg-muted/20 transition-colors">
                                    <div>
                                        <p className="font-semibold">{service}</p>
                                        <p className="text-xs text-muted-foreground">45 mins</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold">${25 + (i * 10)}</span>
                                        <Button size="sm" variant="secondary" className="h-8 w-8 rounded-full p-0">
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
