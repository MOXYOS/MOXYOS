"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Store,
    Settings,
    LogOut,
    UserCircle
} from "lucide-react"

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Business Profile",
        href: "/dashboard/profile",
        icon: Store,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col border-r bg-muted/20">
            <div className="flex h-14 items-center border-b px-6">
                <span className="font-heading font-bold text-lg text-primary">MOXYOS Business</span>
            </div>
            <div className="flex-1 py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname === item.href
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t p-4">
                <div className="flex items-center gap-3 px-3 py-2">
                    <UserCircle className="h-8 w-8 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Business Owner</span>
                        <span className="text-xs text-muted-foreground">owner@moxyos.com</span>
                    </div>
                </div>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
