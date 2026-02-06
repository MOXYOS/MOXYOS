"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { toast } from "sonner"


export function ProfileForm() {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)

    // Form State
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [bio, setBio] = useState("")
    const [videoUrl, setVideoUrl] = useState("")

    // Fetch user on mount
    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data: business } = await supabase
                    .from('businesses')
                    .select('*')
                    .eq('owner_id', user.id)
                    .single()

                if (business) {
                    setName(business.name)
                    setCategory(business.category)
                    setBio(business.bio || "")
                    setVideoUrl(business.video_url || "")
                }
            }
        }
        fetchData()
    }, [])

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        if (!user) {
            toast.error("You must be logged in to save.")
            setLoading(false)
            return
        }

        const updates = {
            owner_id: user.id,
            name: name,
            category: category,
            bio: bio,
            video_url: videoUrl,
            updated_at: new Date().toISOString(),
        }

        try {
            // 1. Ensure Profile Exists (Fix for FK Violation "Save Error: {}")
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (!profile) {
                console.log("Profile missing, creating auto-healing record...")
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({ id: user.id, email: user.email })

                if (profileError) {
                    console.error("Failed to auto-create profile:", profileError)
                    throw new Error("User profile corrupted. Please contact support.")
                }
            }

            // 2. Atomic Upsert of Business
            const { error: upsertError } = await supabase
                .from('businesses')
                .upsert(updates, { onConflict: 'owner_id' })

            if (upsertError) throw upsertError;

            toast.success("Profile saved successfully!")
        } catch (error: any) {
            console.error("Save Error Details:", JSON.stringify(error, null, 2))
            toast.error("Failed to save: " + (error.message || "Unknown error"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>
                    Manage how your business appears to customers on MOXYOS.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                            id="businessName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Bloom & Brew Cafe"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                                <SelectItem value="Wellness & Health">Wellness & Health</SelectItem>
                                <SelectItem value="Home Services">Home Services</SelectItem>
                                <SelectItem value="Retail">Retail</SelectItem>
                                <SelectItem value="Professional Services">Professional Services</SelectItem>
                                <SelectItem value="Local Business">Local Business</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio / Description</Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell your story..."
                            className="min-h-[120px]"
                        />
                        <p className="text-xs text-muted-foreground">This will be displayed on your profile card.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="videoUrl">Intro Video URL (Reel)</Label>
                        <Input
                            id="videoUrl"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://..."
                        />
                        <p className="text-xs text-muted-foreground">Link to a vertical video (9:16) introducing your business.</p>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
