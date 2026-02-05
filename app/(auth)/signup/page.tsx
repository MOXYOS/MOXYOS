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
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Link href="/">
                            <Image
                                src="/icons/logo-long.svg"
                                alt="MOXYOS"
                                width={140}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>
                    <CardTitle className="text-2xl font-heading font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your business account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full font-bold" disabled={loading}>
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline font-medium text-primary ml-1">
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
