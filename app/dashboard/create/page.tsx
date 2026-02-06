"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Clapperboard, Video, Image as ImageIcon, Sparkles } from "lucide-react";

export default function CreatorPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [businessId, setBusinessId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Fetch the business owned by this user
            const { data: business } = await supabase
                .from('businesses')
                .select('*')
                .eq('owner_id', user.id)
                .single();

            if (business) {
                setBusinessId(business.id);
                setVideoUrl(business.video_url || "");
                setThumbnailUrl(business.thumbnail_url || "");
                setCaption(business.bio || "");
            }
            setLoading(false);
        };

        fetchBusiness();
    }, [router, supabase]);

    const handlePublish = async () => {
        setSaving(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error("You must be logged in.");
                setSaving(false);
                return;
            }

            // Prepare payload
            const payload = {
                owner_id: user.id,
                name: businessId ? undefined : "My New Business", // Only set default name on create
                category: businessId ? undefined : "Local Business",
                video_url: videoUrl,
                thumbnail_url: thumbnailUrl,
                bio: caption,
                updated_at: new Date().toISOString(),
            };

            // Remove undefined keys to avoid overriding existing values with null/default if updating
            Object.keys(payload).forEach(key => payload[key as keyof typeof payload] === undefined && delete payload[key as keyof typeof payload]);

            // Atomic Upsert
            const { data, error } = await supabase
                .from('businesses')
                .upsert(payload, { onConflict: 'owner_id' })
                .select()
                .single();

            if (error) throw error;

            setBusinessId(data.id);
            toast.success("Reel published to Feed!");

            router.push('/dashboard');
            router.refresh();
        } catch (error: any) {
            toast.error("Failed to publish: " + (error.message || "Unknown error"));
            console.error("Publish Error:", error);
        } finally {
            setSaving(false);
        }
    };

    // Helper to determine media type (rough check)
    const isVideo = (url: string) => url.match(/\.(mp4|webm|mov)$/i) || url.includes("datastorage.googleapis.com") || url.includes("cloudinary");

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold flex items-center gap-2">
                        <Clapperboard className="w-8 h-8 text-primary" />
                        Creator Studio
                    </h1>
                    <p className="text-muted-foreground mt-1">Create and manage your feed presence.</p>
                </div>
                <Button onClick={handlePublish} disabled={saving} className="h-10 px-6 font-bold shadow-lg shadow-primary/20">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    {saving ? "Publishing..." : "Publish Reel"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="glass-card border-white/20">
                        <CardHeader>
                            <CardTitle>Media Source</CardTitle>
                            <CardDescription>Enter a direct link to your vertical video or high-res image.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="video-url">Media URL (Video or Image)</Label>
                                <div className="relative">
                                    <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="video-url"
                                        placeholder="https://..."
                                        className="pl-9 bg-background/50"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Tip: Supports Unsplash images or MP4 video links.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-white/20">
                        <CardHeader>
                            <CardTitle>Thumbnail & Details</CardTitle>
                            <CardDescription>What people see (not used if image is main media).</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="thumbnail-url">Cover Image URL</Label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="thumbnail-url"
                                        placeholder="https://..."
                                        className="pl-9 bg-background/50"
                                        value={thumbnailUrl}
                                        onChange={(e) => setThumbnailUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="caption">Caption (Bio)</Label>
                                <Textarea
                                    id="caption"
                                    placeholder="Write something catchy... #NewArrivals"
                                    className="min-h-[120px] bg-background/50 leading-relaxed"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Keep it action-oriented!</span>
                                    <span>{caption.length}/150</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Column */}
                <div className="lg:col-span-1">
                    <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Mobile Preview</p>
                    <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group">
                        {videoUrl ? (
                            <div className="relative h-full w-full">
                                {isVideo(videoUrl) ? (
                                    <video
                                        src={videoUrl}
                                        className="h-full w-full object-cover opacity-90"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    // Use standard img tag for preview to ensure external URLs load without Next.js config hassle for every domain
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={videoUrl}
                                        alt="Preview"
                                        className="h-full w-full object-cover opacity-90"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="font-bold text-white text-lg shadow-black/50 drop-shadow-md">{businessId ? "My Business" : "Preview"}</h3>
                                    <p className="text-white/80 text-xs line-clamp-2 mt-1">{caption || "Your caption here..."}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                                <Clapperboard className="w-16 h-16 opacity-20" />
                                <span className="text-sm">Media Preview</span>
                            </div>
                        )}

                        {/* Fake UI Overlay */}
                        <div className="absolute right-2 bottom-20 flex flex-col gap-4 items-center opacity-70">
                            <div className="w-10 h-10 rounded-full bg-white/20" />
                            <div className="w-10 h-10 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
