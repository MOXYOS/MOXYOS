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

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
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
                    <CardTitle className="text-2xl font-heading font-bold text-gray-900">Welcome back</CardTitle>
                    <CardDescription className="text-gray-500">
                        Enter your email to sign in to your dashboard
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 px-10">
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
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-xs font-semibold text-primary hover:underline transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="h-11 bg-gray-50/50 border-gray-200 text-gray-900 focus:bg-white transition-all"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 mt-2 font-heading font-bold text-md bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/20" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                        <span className="bg-white px-4 text-gray-400">Secure access via</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full h-11 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-semibold" type="button">
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Google Workspace
                </Button>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 justify-center pb-10 border-t border-gray-50">
                New to the community?{" "}
                <Link href="/signup" className="font-bold text-primary hover:underline ml-1">
                    Sign up now
                </Link>
            </CardFooter>
        </Card>
    )
}
