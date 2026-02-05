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

    // Fetch user on mount (simple version)
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        if (!user) {
            toast.error("You must be logged in to save.")
            setLoading(false)
            return
        }

        const formData = new FormData(event.currentTarget)
        const updates = {
            owner_id: user.id,
            name: formData.get('businessName'),
            category: formData.get('category'),
            bio: formData.get('bio'),
            video_url: formData.get('videoUrl'),
            updated_at: new Date().toISOString(),
        }

        // Upsert business data (assuming one business per owner for MVP)
        // We first check if a business exists for this owner
        const { data: existing } = await supabase.from('businesses').select('id').eq('owner_id', user.id).single()

        let error;
        if (existing) {
            const { error: updateError } = await supabase.from('businesses').update(updates).eq('id', existing.id)
            error = updateError
        } else {
            const { error: insertError } = await supabase.from('businesses').insert(updates)
            error = insertError
        }

        if (error) {
            toast.error("Failed to save profile.")
            console.error(error)
        } else {
            toast.success("Profile saved successfully!")
        }
        setLoading(false)
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
                        <Input id="businessName" name="businessName" placeholder="e.g. Bloom & Brew Cafe" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                                <SelectItem value="Wellness & Health">Wellness & Health</SelectItem>
                                <SelectItem value="Home Services">Home Services</SelectItem>
                                <SelectItem value="Retail">Retail</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio / Description</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell your story..."
                            className="min-h-[120px]"
                        />
                        <p className="text-xs text-muted-foreground">This will be displayed on your profile card.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="videoUrl">Intro Video URL (Reel)</Label>
                        <Input id="videoUrl" name="videoUrl" placeholder="https://..." />
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
