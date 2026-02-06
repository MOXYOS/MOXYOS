'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            alert('Check your email for a confirmation link!')
            setLoading(false)
        }
    }

    return (
        <Card className="w-full border-gray-100 bg-white shadow-2xl shadow-gray-200/50">
            <CardHeader className="text-center space-y-4 pt-10">
                <div className="flex justify-center mb-2">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image
                            src="/icons/logo-long.svg"
                            alt="MOXYOS"
                            width={160}
                            height={45}
                            className="h-12 w-auto"
                        />
                    </Link>
                </div>
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-heading font-bold text-gray-900">Create an account</CardTitle>
                    <CardDescription className="text-gray-500">
                        Enter your email below to start your journey
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-10 pb-2">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="h-11 bg-gray-50/50 border-gray-200 text-gray-900 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="h-11 bg-gray-50/50 border-gray-200 text-gray-900 focus:bg-white transition-all"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 mt-4 font-heading font-bold text-md bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/20" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 justify-center py-8 border-t border-gray-50">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline ml-1">
                    Sign in here
                </Link>
            </CardFooter>
        </Card>
    )
}
