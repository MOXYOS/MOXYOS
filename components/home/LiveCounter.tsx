"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function LiveCounter() {
    const [count, setCount] = useState<number | null>(null)
    const supabase = createClient()

    useEffect(() => {
        // Fetch initial count
        const fetchCount = async () => {
            const { count } = await supabase
                .from('businesses')
                .select('*', { count: 'exact', head: true })
            setCount(count || 0)
        }

        fetchCount()

        // Subscribe to real-time changes
        const channel = supabase
            .channel('realtime_businesses')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'businesses' }, (payload) => {
                setCount((prev) => (prev !== null ? prev + 1 : 1))
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    if (count === null) return null // Loading state

    return (
        <Badge variant="secondary" className="px-3 py-1 mb-4 flex items-center gap-2 animate-in fade-in zoom-in duration-500">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-heading font-bold text-primary">{count}</span>
            <span className="text-muted-foreground">Community Connections</span>
        </Badge>
    )
}
