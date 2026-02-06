"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, MessageSquare, MapPin, ExternalLink, Star } from "lucide-react";

interface ProfileCardProps {
    business: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ProfileCard({ business, isOpen, onClose }: ProfileCardProps) {
    if (!business) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="bottom" className="h-[85vh] sm:h-[600px] rounded-t-[2rem] p-0 border-t-0 bg-transparent shadow-2xl backdrop-blur-none">
                {/* Glass Container */}
                <div className="h-full w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-t-[2rem] overflow-y-auto flex flex-col">

                    {/* Header Banner */}
                    <div className="relative h-32 w-full bg-gradient-to-r from-primary/20 to-secondary/20 shrink-0">
                        <div className="absolute -bottom-8 left-6">
                            <Avatar className="w-20 h-20 border-4 border-white dark:border-black shadow-lg">
                                <AvatarImage src={business.thumbnail_url} className="object-cover" />
                                <AvatarFallback>{business.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="px-6 pt-10 pb-8 flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <SheetTitle className="text-2xl font-heading font-bold">{business.name}</SheetTitle>
                                <SheetDescription className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {business.location || "San Francisco, CA"}
                                </SheetDescription>
                            </div>
                            <Badge variant="secondary" className="px-2.5 py-1 text-xs font-semibold">
                                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                                {business.rating || "5.0"}
                            </Badge>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {business.bio}
                        </p>

                        {/* Primary Actions */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <Button className="w-full h-12 text-base rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-purple-900/10">
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Now
                            </Button>
                            <Button variant="outline" className="w-full h-12 text-base rounded-xl border-2">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                            </Button>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <InfoTile icon={Phone} label="Call Business" value="+1 (415) 555-0123" />
                            <InfoTile icon={ExternalLink} label="Website" value="Available" />
                        </div>

                        {/* Latest Reviews Preview (Mock) */}
                        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                            <h4 className="font-semibold text-sm mb-3">Recent Vibe Check</h4>
                            <div className="flex gap-3 items-center">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-xs font-medium">"Absolutely loved the service! The team is super chill."</p>
                                    <span className="text-[10px] text-muted-foreground">John Doe • 2 hours ago</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sticky Bottom Actions */}
                    <div className="p-4 border-t bg-background/50 backdrop-blur-sm sticky bottom-0 z-50">
                        <Button
                            variant="ghost"
                            className="w-full text-muted-foreground hover:text-primary"
                            onClick={() => window.location.href = `/business/${business.id}`}
                        >
                            View Full Profile &rarr;
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function InfoTile({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-colors">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary">
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{label}</p>
                <p className="text-xs font-medium truncate max-w-[100px]">{value}</p>
            </div>
        </div>
    )
}
